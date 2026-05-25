import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

type RequestCategory =
  | "page"
  | "pdf"
  | "api"
  | "asset"
  | "document"
  | "search"
  | "unknown";

type UserAgentFamily =
  | "bot"
  | "mobile_browser"
  | "desktop_browser"
  | "unknown";

type AccessPayload = {
  occurred_at?: string;
  visitor_hash: string;
  user_agent_hash: string;
  session_hash: string;
  request_method?: string;
  request_path: string;
  request_category?: RequestCategory;
  referrer_origin?: string | null;
  country_code?: string | null;
  region_code?: string | null;
  city_name?: string | null;
  user_agent_family?: UserAgentFamily;
  is_anomaly?: boolean;
  anomaly_type?: string | null;
  anomaly_score?: number;
};

export async function POST(request: NextRequest) {
  const expectedKey = process.env.VALORAIPLUS_INGEST_KEY;
  const receivedKey = request.headers.get("x-valoraiplus-ingest-key");

  if (!expectedKey || receivedKey !== expectedKey) {
    return NextResponse.json(
      { ok: false, status: "rejected", reason: "invalid_ingest_key" },
      { status: 401 }
    );
  }

  let payload: AccessPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, status: "rejected", reason: "invalid_json" },
      { status: 400 }
    );
  }

  const validationError = validatePayload(payload);
  if (validationError) {
    return NextResponse.json(
      { ok: false, status: "rejected", reason: validationError },
      { status: 400 }
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.warn("[VALORAIPLUS access-log] skipped: supabase_not_configured");

    return NextResponse.json(
      { ok: true, status: "skipped", reason: "supabase_not_configured" },
      { status: 200 }
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  // Insert only the columns that exist in migration-003
  const insertPayload = {
    visitor_hash:     payload.visitor_hash,
    user_agent_hash:  payload.user_agent_hash,
    session_hash:     payload.session_hash,
    request_method:   (payload.request_method ?? "GET").slice(0, 16),
    request_path:     payload.request_path.slice(0, 1000),
    request_category: payload.request_category ?? "unknown",
    referrer_origin:  payload.referrer_origin?.slice(0, 500)  ?? null,
    country_code:     payload.country_code?.slice(0, 10)       ?? null,
    region_code:      payload.region_code?.slice(0, 32)        ?? null,
    city_name:        payload.city_name?.slice(0, 128)         ?? null,
    user_agent_family: payload.user_agent_family                ?? "unknown",
    is_anomaly:       payload.is_anomaly                       ?? false,
    anomaly_type:     payload.anomaly_type?.slice(0, 128)      ?? null,
    anomaly_score:    clampScore(payload.anomaly_score),
    created_at:       payload.occurred_at ?? new Date().toISOString(),
  };

  const { error } = await supabase
    .from("valoraiplus_access_logs")
    .insert(insertPayload);

  if (error) {
    const normalized = normalizeSupabaseError(error);

    console.warn("[VALORAIPLUS access-log] skipped:", normalized);

    return NextResponse.json(
      {
        ok: true,
        status: "skipped",
        reason: normalized.reason,
        supabase_code: normalized.code,
      },
      { status: 200 }
    );
  }

  return NextResponse.json({ ok: true, status: "logged" }, { status: 200 });
}

function validatePayload(payload: AccessPayload): string | null {
  if (!payload || typeof payload !== "object") return "missing_payload";
  if (!payload.visitor_hash || !isHexSha256(payload.visitor_hash)) return "invalid_visitor_hash";
  if (!payload.user_agent_hash || !isHexSha256(payload.user_agent_hash)) return "invalid_user_agent_hash";
  if (!payload.session_hash || !isHexSha256(payload.session_hash)) return "invalid_session_hash";
  if (!payload.request_path || typeof payload.request_path !== "string") return "invalid_request_path";
  if (payload.request_path.length > 1000) return "request_path_too_long";
  return null;
}

function isHexSha256(value: string): boolean {
  return /^[a-f0-9]{64}$/.test(value);
}

function clampScore(score?: number): number {
  if (typeof score !== "number" || Number.isNaN(score)) return 0;
  return Math.max(0, Math.min(100, Math.round(score)));
}

function normalizeSupabaseError(error: {
  code?: string;
  message?: string;
  details?: string;
  hint?: string;
}) {
  const message = `${error.message ?? ""} ${error.details ?? ""} ${
    error.hint ?? ""
  }`.toLowerCase();

  const tableMissing =
    error.code === "42P01" ||
    error.code === "PGRST205" ||
    message.includes("does not exist") ||
    message.includes("could not find the table") ||
    message.includes("schema cache");

  const columnMissing =
    error.code === "42703" ||
    (message.includes("column") && message.includes("does not exist"));

  if (tableMissing) {
    return { reason: "table_missing_run_migration_003", code: error.code ?? "unknown" };
  }

  if (columnMissing) {
    return { reason: "column_missing_run_phase2_patch", code: error.code ?? "unknown" };
  }

  return { reason: "supabase_insert_failed", code: error.code ?? "unknown" };
}
