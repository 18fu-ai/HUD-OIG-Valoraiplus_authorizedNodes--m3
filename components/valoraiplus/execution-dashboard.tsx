"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Clock, AlertTriangle, Play, Loader2 } from "lucide-react";

type GateStatus = "pass" | "fail" | "skipped" | "pending" | "running";

type GateResult = {
  gate: number;
  name: string;
  status: "pass" | "fail" | "skipped";
  detail: string;
  data?: Record<string, unknown>;
  timestamp: string;
};

type ExecutionSummary = {
  passed: number;
  failed: number;
  skipped: number;
  total: number;
  automated_gates_clear: boolean;
};

type ExecutionResponse = {
  ok: boolean;
  summary: ExecutionSummary;
  results: GateResult[];
  executed_at: string;
  error?: string;
  detail?: string;
};

const GATE_DEFINITIONS = [
  { gate: 1, name: "MIGRATE", description: "Apply database migrations 001–004 via Supabase" },
  { gate: 2, name: "VERIFY SCHEMA", description: "Confirm 8 Phase 1 + 3 Phase 2 tables present" },
  { gate: 3, name: "COUNT DOCS", description: "Exact document count for CUD-26-682107" },
  { gate: 4, name: "VERIFY COLUMN", description: "Confirm user_agent_family in access logs table" },
  { gate: 5, name: "PUSH & DEPLOY", description: "git push origin mission-creation (manual)" },
  { gate: 6, name: "TEST ROUTES", description: "Verify case-summary + access-log API routes" },
  { gate: 7, name: "SMOKE TEST API", description: "POST /api/valoraiplus/access-log returns 200" },
  { gate: 8, name: "LODGE DOC 108", description: "Manual submission to court clerk (manual)" },
];

function StatusIcon({ status }: { status: GateStatus }) {
  switch (status) {
    case "pass":
      return <CheckCircle className="w-5 h-5 text-emerald-400" />;
    case "fail":
      return <XCircle className="w-5 h-5 text-red-400" />;
    case "skipped":
      return <AlertTriangle className="w-5 h-5 text-amber-400" />;
    case "running":
      return <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />;
    default:
      return <Clock className="w-5 h-5 text-zinc-500" />;
  }
}

function statusBg(status: GateStatus) {
  switch (status) {
    case "pass": return "border-emerald-800/50 bg-emerald-950/30";
    case "fail": return "border-red-800/50 bg-red-950/30";
    case "skipped": return "border-amber-800/50 bg-amber-950/20";
    case "running": return "border-blue-800/50 bg-blue-950/30";
    default: return "border-zinc-800 bg-zinc-900/30";
  }
}

function statusLabel(status: GateStatus) {
  switch (status) {
    case "pass": return <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">PASS</span>;
    case "fail": return <span className="text-xs font-mono text-red-400 uppercase tracking-widest">FAIL</span>;
    case "skipped": return <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">MANUAL</span>;
    case "running": return <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">RUNNING</span>;
    default: return <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">PENDING</span>;
  }
}

export default function ExecutionDashboard() {
  const [isRunning, setIsRunning] = useState(false);
  const [response, setResponse] = useState<ExecutionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const gateResultMap = new Map<number, GateResult>(
    response?.results.map((r) => [r.gate, r]) ?? []
  );

  function getGateStatus(gateNum: number): GateStatus {
    if (!response && !isRunning) return "pending";
    if (isRunning) return "running";
    const result = gateResultMap.get(gateNum);
    if (!result) return "pending";
    return result.status;
  }

  async function executeGates() {
    setIsRunning(true);
    setResponse(null);
    setError(null);

    try {
      const res = await fetch("/api/valoraiplus/execute-gates", {
        method: "POST",
      });
      const data: ExecutionResponse = await res.json();
      setResponse(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsRunning(false);
    }
  }

  const allClear = response?.summary.automated_gates_clear;
  const hasRun = !!response;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono">
      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-5">
        <div className="max-w-4xl mx-auto flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
              VALORAIPLUS — mission-creation @ 1b9773d
            </p>
            <h1 className="text-xl font-semibold text-zinc-100 tracking-tight">
              Automated Gate Execution
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Gates 1–4 + 6–7 automated &nbsp;&bull;&nbsp; Gates 5 + 8 manual
            </p>
          </div>

          <button
            onClick={executeGates}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed border border-zinc-700 transition-colors"
          >
            {isRunning ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            {isRunning ? "Executing..." : hasRun ? "Re-Execute" : "Execute Gates"}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-4">
        {/* Summary Bar */}
        {hasRun && response && (
          <div className={`rounded-md border px-5 py-4 ${allClear ? "border-emerald-800/50 bg-emerald-950/20" : "border-red-800/50 bg-red-950/20"}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {allClear ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
                <span className={`text-sm font-medium ${allClear ? "text-emerald-300" : "text-red-300"}`}>
                  {allClear
                    ? "Automated gates cleared — proceed to manual Gates 5 and 8"
                    : "One or more automated gates failed — do not proceed until resolved"}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-zinc-400">
                <span><span className="text-emerald-400">{response.summary.passed}</span> passed</span>
                <span><span className="text-red-400">{response.summary.failed}</span> failed</span>
                <span><span className="text-amber-400">{response.summary.skipped}</span> manual</span>
              </div>
            </div>
            <p className="text-xs text-zinc-500 mt-2">
              Executed at: {response.executed_at}
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-md border border-red-800/50 bg-red-950/20 px-5 py-4">
            <p className="text-sm text-red-300">Execution error: {error}</p>
          </div>
        )}

        {/* Gate Cards */}
        <div className="space-y-2">
          {GATE_DEFINITIONS.map((def) => {
            const status = getGateStatus(def.gate);
            const result = gateResultMap.get(def.gate);

            return (
              <div
                key={def.gate}
                className={`rounded-md border px-5 py-4 transition-colors ${statusBg(status)}`}
              >
                <div className="flex items-start gap-4">
                  {/* Gate number */}
                  <div className="flex-shrink-0 w-7 h-7 rounded flex items-center justify-center bg-zinc-800 text-xs font-bold text-zinc-400">
                    {def.gate}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <StatusIcon status={status} />
                      <span className="text-sm font-medium text-zinc-200">
                        {def.name}
                      </span>
                      {statusLabel(status)}
                    </div>

                    <p className="text-xs text-zinc-500 mb-2">
                      {def.description}
                    </p>

                    {result && (
                      <div className="mt-2 rounded bg-zinc-900/60 border border-zinc-800 px-3 py-2">
                        <p className="text-xs text-zinc-300 break-all">
                          {result.detail}
                        </p>
                        {result.data && Object.keys(result.data).length > 0 && (
                          <pre className="text-xs text-zinc-500 mt-1 overflow-x-auto">
                            {JSON.stringify(result.data, null, 2)}
                          </pre>
                        )}
                        <p className="text-xs text-zinc-600 mt-1">{result.timestamp}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rollback Protocol */}
        <div className="rounded-md border border-zinc-800 px-5 py-4 mt-6">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Rollback Protocol</p>
          <p className="text-xs text-zinc-400 leading-relaxed">
            If any gate fails: preserve the exact error, stop execution, do not proceed to subsequent gates.
            Assess whether correctable. If not correctable, apply controlled rollback or corrective migration.
            Gate 8 (Document 108 lodging) is manual and cannot be automated.
          </p>
        </div>

        {/* Administrative Safety Boundary */}
        <div className="rounded-md border border-zinc-800 px-5 py-4">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Administrative Safety Boundary</p>
          <p className="text-xs text-zinc-400 leading-relaxed">
            This dashboard assists record organization. It does not replace the official court docket,
            filed PDFs, proof of service, agency receipts, or authenticated exhibits.
            The Court determines all matters of admissibility, weight, and legal effect.
          </p>
        </div>
      </div>
    </div>
  );
}
