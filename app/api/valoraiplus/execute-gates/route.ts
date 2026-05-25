import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { getSupabaseServiceClient } from "@/lib/valoraiplus/supabase-server";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

type GateResult = {
  gate: number;
  name: string;
  status: "pass" | "fail" | "skipped";
  detail: string;
  data?: Record<string, unknown>;
  timestamp: string;
};

function now() {
  return new Date().toISOString();
}

function loadMigration(filename: string): string {
  const filePath = join(process.cwd(), "supabase", "migrations", filename);
  return readFileSync(filePath, "utf-8");
}

export async function POST() {
  const results: GateResult[] = [];
  let supabase: ReturnType<typeof getSupabaseServiceClient>;

  try {
    supabase = getSupabaseServiceClient();
  } catch (err) {
    return NextResponse.json({
      ok: false,
      error: "missing_env_vars",
      detail: "NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set",
      results: [],
    }, { status: 500 });
  }

  // ─── Gate 1: Apply Migrations 001–004 ───────────────────────────────────────
  const migrations = [
    "001_phase1_secure_case_core.sql",
    "002_seed_cud_26_682107_priority_tranche.sql",
    "003_valoraiplus_safe_access_audit_phase2.sql",
    "004_valoraiplus_access_audit_request_category_patch.sql",
  ];

  let gate1Pass = true;
  const gate1Details: string[] = [];

  for (const filename of migrations) {
    try {
      const sql = loadMigration(filename);
      // Supabase JS client does not expose raw SQL execution outside RPC.
      // We verify the migration is readable and record it for manual application.
      // Gate 2 will confirm the actual database state post-migration.
      gate1Details.push(`${filename}: loaded (${sql.split("\n").length} lines) — apply manually in Supabase SQL Editor`);
    } catch (e) {
      gate1Details.push(`${filename}: FILE READ ERROR — ${(e as Error).message}`);
      gate1Pass = false;
    }
  }

  results.push({
    gate: 1,
    name: "MIGRATE — Verify migration files + apply in Supabase SQL Editor",
    status: gate1Pass ? "pass" : "fail",
    detail: gate1Details.join(" | "),
    data: { note: "Supabase JS client does not execute raw DDL. Files are verified readable. Apply each in Supabase Dashboard > SQL Editor." },
    timestamp: now(),
  });

  // ─── Gate 2: Verify Schema ───────────────────────────────────────────────────
  const expectedTables = [
    "cases", "documents", "document_events", "document_relationships",
    "deadlines", "agencies", "agency_submissions", "audit_log", "user_roles",
    "valoraiplus_access_logs", "valoraiplus_session_rollups",
    "valoraiplus_network_fingerprints",
  ];

  // Check each table by attempting a count — works without needing exec_sql RPC
  const tableChecks = await Promise.all(
    expectedTables.map(async (table) => {
      const { error } = await supabase.from(table as "cases").select("*", { count: "exact", head: true });
      // If error contains "does not exist" the table is missing; other errors (RLS) mean it exists
      const missing = error?.message?.includes("does not exist") || error?.message?.includes("relation") || false;
      return { table, found: !missing };
    })
  );

  const foundTables = tableChecks.filter((t) => t.found).map((t) => t.table);
  const missingTables = tableChecks.filter((t) => !t.found).map((t) => t.table);
  const gate2Pass = missingTables.length === 0;

  results.push({
    gate: 2,
    name: "VERIFY SCHEMA — Confirm 8 Phase 1 + 3 Phase 2 tables",
    status: gate2Pass ? "pass" : "fail",
    detail: gate2Pass
      ? `All ${expectedTables.length} tables confirmed present`
      : `Missing tables: ${missingTables.join(", ")}`,
    data: { found: foundTables, missing: missingTables },
    timestamp: now(),
  });

  // ─── Gate 3: Document Count ──────────────────────────────────────────────────
  const { data: caseRow, error: caseError } = await supabase
    .from("cases")
    .select("id, case_number")
    .eq("case_number", "CUD-26-682107")
    .single();

  let docCount = 0;
  let countError: { message: string } | null = caseError;

  if (caseRow && !caseError) {
    const { count, error: docErr } = await supabase
      .from("documents")
      .select("*", { count: "exact", head: true })
      .eq("case_id", caseRow.id);
    docCount = count ?? 0;
    countError = docErr;
  }

  const gate3Pass = !countError && !!caseRow && docCount >= 0;

  results.push({
    gate: 3,
    name: "COUNT DOCS — Exact document count for CUD-26-682107",
    status: countError || !caseRow ? "fail" : "pass",
    detail: countError
      ? `Query error: ${countError.message}`
      : !caseRow
        ? "Case CUD-26-682107 not found — seed migration may not have applied"
        : `case_number=CUD-26-682107 | doc_count=${docCount}`,
    data: caseRow ? { case_number: caseRow.case_number, doc_count: docCount } : {},
    timestamp: now(),
  });

  // ─── Gate 4: Verify Column ───────────────────────────────────────────────────
  // Query information_schema via Supabase — service role can read this
  const { data: colData, error: colError } = await supabase
    .from("information_schema.columns" as "cases")
    .select("column_name, data_type")
    .eq("table_schema", "public")
    .eq("table_name", "valoraiplus_access_logs")
    .eq("column_name", "user_agent_family");

  const colFound = colData && Array.isArray(colData) && colData.length > 0;
  const gate4Pass = colFound && !colError;

  results.push({
    gate: 4,
    name: "VERIFY COLUMN — user_agent_family in valoraiplus_access_logs",
    status: colError ? "fail" : gate4Pass ? "pass" : "fail",
    detail: colError
      ? `Query error: ${colError.message}`
      : gate4Pass
        ? `user_agent_family confirmed present (type: ${(colData as Array<{data_type: string}>)[0]?.data_type ?? "text"})`
        : "Column user_agent_family NOT FOUND — migration 003 may not have applied",
    data: colData?.[0] ?? {},
    timestamp: now(),
  });

  // ─── Gate 5: Push/Deploy — cannot be automated here, mark as manual ─────────
  results.push({
    gate: 5,
    name: "PUSH & DEPLOY — git push origin mission-creation",
    status: "skipped",
    detail: "Manual step: run 'git push origin mission-creation' from terminal. Vercel auto-deploys on push.",
    timestamp: now(),
  });

  // ─── Gate 6: Test Routes — verify API is reachable ───────────────────────────
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
    || process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  let gate6Pass = false;
  let gate6Detail = "";

  try {
    const [caseRes, trafficRes] = await Promise.allSettled([
      fetch(`${baseUrl}/api/valoraiplus/case-summary?case_number=CUD-26-682107`, {
        headers: { "x-api-key": process.env.VALORAIPLUS_INGEST_KEY ?? "" },
      }),
      fetch(`${baseUrl}/api/valoraiplus/access-log`, {
        headers: { "x-api-key": process.env.VALORAIPLUS_INGEST_KEY ?? "" },
      }),
    ]);

    const caseStatus = caseRes.status === "fulfilled" ? caseRes.value.status : "error";
    const trafficStatus = trafficRes.status === "fulfilled" ? trafficRes.value.status : "error";

    gate6Pass = caseStatus === 200 && trafficStatus === 200;
    gate6Detail = `case-summary: ${caseStatus} | access-log GET: ${trafficStatus}`;
  } catch (e) {
    gate6Detail = `Route fetch error: ${(e as Error).message}`;
  }

  results.push({
    gate: 6,
    name: "TEST ROUTES — /api/valoraiplus/case-summary + access-log GET",
    status: gate6Pass ? "pass" : "fail",
    detail: gate6Detail,
    timestamp: now(),
  });

  // ─── Gate 7: Smoke Test API ───────────────────────────────────────────────────
  const testPayload = {
    visitor_hash: "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
    user_agent_hash: "fedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210",
    session_hash: "abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789",
    request_path: "/gate-7-smoke-test",
    request_category: "api",
  };

  let gate7Pass = false;
  let gate7Detail = "";
  let gate7Data: Record<string, unknown> = {};

  try {
    const smokeRes = await fetch(`${baseUrl}/api/valoraiplus/access-log`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.VALORAIPLUS_INGEST_KEY ?? "",
      },
      body: JSON.stringify(testPayload),
    });
    const smokeBody = await smokeRes.json();
    gate7Pass = smokeRes.status === 200 && smokeBody.ok === true;
    gate7Detail = `HTTP ${smokeRes.status} | response: ${JSON.stringify(smokeBody)}`;
    gate7Data = smokeBody;
  } catch (e) {
    gate7Detail = `Smoke test error: ${(e as Error).message}`;
  }

  results.push({
    gate: 7,
    name: "SMOKE TEST API — POST /api/valoraiplus/access-log",
    status: gate7Pass ? "pass" : "fail",
    detail: gate7Detail,
    data: gate7Data,
    timestamp: now(),
  });

  // ─── Gate 8: Lodge Document 108 — manual, cannot be automated ────────────────
  results.push({
    gate: 8,
    name: "LODGE DOCUMENT 108 — Manual submission to court clerk",
    status: "skipped",
    detail: "Manual step: physically submit Document 108 to Los Angeles Superior Court Dept 12 clerk. Obtain and preserve filing receipt.",
    timestamp: now(),
  });

  // ─── Summary ─────────────────────────────────────────────────────────────────
  const passed = results.filter((r) => r.status === "pass").length;
  const failed = results.filter((r) => r.status === "fail").length;
  const skipped = results.filter((r) => r.status === "skipped").length;
  const allAutomatedPassed = failed === 0;

  return NextResponse.json({
    ok: allAutomatedPassed,
    summary: {
      passed,
      failed,
      skipped,
      total: results.length,
      automated_gates_clear: allAutomatedPassed,
    },
    results,
    executed_at: now(),
  });
}
