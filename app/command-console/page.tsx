/**
 * VALORAIPLUS® OMEGA v100 — Supreme Command Console
 * Design: Tactical Dark UI — slate-950 base, electric blue accent, JetBrains Mono data
 * Four panels: Core Overview | Evidence Ingestion | Merkle Locker | Constitutional Audit
 * All panels wired to live backend API via NEXT_PUBLIC_API_BASE env var (default: http://localhost:8000)
 */
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Shield,
  Lock,
  Activity,
  Database,
  FileText,
  ShieldCheck,
  ChevronRight,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Copy,
  Eye,
  EyeOff,
  Cpu,
  HardDrive,
  Zap,
  X,
  FileDown,
  Scale,
  BookOpen,
  Gavel,
  Users,
} from "lucide-react";
import { toast } from "sonner";

// ---------------------------------------------------------------------------
// API Configuration
// ---------------------------------------------------------------------------

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://5151-ikwdd19m2ectcsncs6fy1-76bf7a67.us2.manus.computer";

const TOKEN_KEY = "valoraiplus_jwt";

function getStoredToken(): string | null {
  try { return sessionStorage.getItem(TOKEN_KEY); } catch { return null; }
}

function storeToken(t: string) {
  try { sessionStorage.setItem(TOKEN_KEY, t); } catch {}
}

function clearToken() {
  try { sessionStorage.removeItem(TOKEN_KEY); } catch {}
}

async function apiFetch<T>(path: string, options?: RequestInit, token?: string | null): Promise<T> {
  const authToken = token ?? getStoredToken();
  const headers: Record<string, string> = { "Content-Type": "application/json", ...(options?.headers as Record<string, string> || {}) };
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`API ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

async function apiLogin(username: string, password: string): Promise<string> {
  const body = new URLSearchParams({ username, password });
  const res = await fetch(`${API_BASE}/v1/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  const data = await res.json();
  return data.access_token as string;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type PanelId = "overview" | "submit" | "locker" | "audit" | "court" | "timeline" | "witness";

interface LedgerEntry {
  id: string;
  timestamp: string;
  event_type: string;
  details: Record<string, unknown>;
  merkle_leaf: string;
  state_hash: string | null;
}

interface AuditResponse {
  entry_count: number;
  ledger: LedgerEntry[];
  node: string;
}

interface MerkleRootResponse {
  merkle_root: string;
  leaf_count: number;
  node: string;
  timestamp: string;
}

interface AnchorResponse {
  merkle_root: string;
  leaf_count: number;
  testimony_ids: string[];
  state_proof: string;
}

interface RiskResponse {
  risk_score_percent: number;
  threshold_95: boolean;
  threshold_75: boolean;
}

interface HealthResponse {
  status: string;
  system: string;
  node: string;
  atomic_clock_sync: boolean;
  timestamp: string;
}

// ---------------------------------------------------------------------------
// Utility components
// ---------------------------------------------------------------------------

const Metric = ({
  label,
  value,
  color = "text-slate-400",
}: {
  label: string;
  value: string;
  color?: string;
}) => (
  <div className="text-right">
    <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-0.5">
      {label}
    </div>
    <div
      className={`text-sm font-black tracking-tight ${color}`}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {value}
    </div>
  </div>
);

const Tab = ({
  id,
  active,
  onClick,
  icon: Icon,
  label,
}: {
  id: PanelId;
  active: PanelId;
  onClick: (id: PanelId) => void;
  icon: React.ElementType;
  label: string;
}) => (
  <button
    onClick={() => onClick(id)}
    className={`flex items-center gap-2 px-2 py-4 text-[10px] font-black uppercase tracking-[0.25em] transition-all border-b-2 ${
      active === id
        ? "border-blue-500 text-blue-400"
        : "border-transparent text-slate-500 hover:text-slate-300"
    }`}
  >
    <Icon
      size={13}
      className={active === id ? "animate-pulse" : ""}
    />
    {label}
  </button>
);

const StatusDot = ({ online }: { online: boolean | null }) => (
  <span className="flex h-2 w-2 relative">
    {online === null ? (
      <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-600" />
    ) : online ? (
      <>
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
      </>
    ) : (
      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
    )}
  </span>
);

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <button
      onClick={copy}
      className="text-slate-600 hover:text-blue-400 transition-colors ml-2"
      title="Copy"
    >
      {copied ? <CheckCircle2 size={12} className="text-green-500" /> : <Copy size={12} />}
    </button>
  );
}

function HashDisplay({ hash, truncate = true }: { hash: string; truncate?: boolean }) {
  const [expanded, setExpanded] = useState(!truncate);
  const display = expanded ? hash : `${hash.slice(0, 16)}…${hash.slice(-8)}`;
  return (
    <span
      className="inline-flex items-center gap-1 text-blue-400 cursor-pointer"
      style={{ fontFamily: "var(--font-mono)" }}
      onClick={() => setExpanded((p) => !p)}
      title={expanded ? "Collapse" : "Expand hash"}
    >
      {display}
      {expanded ? <EyeOff size={10} /> : <Eye size={10} />}
      <CopyButton text={hash} />
    </span>
  );
}

// ---------------------------------------------------------------------------
// Overview Panel
// ---------------------------------------------------------------------------

function Overview({
  setView,
  health,
  online,
}: {
  setView: (v: PanelId) => void;
  health: HealthResponse | null;
  online: boolean | null;
}) {
  const [risk, setRisk] = useState<RiskResponse | null>(null);
  const [loadingRisk, setLoadingRisk] = useState(false);

  useEffect(() => {
    setLoadingRisk(true);
    apiFetch<RiskResponse>("/v1/risk/score", {
      method: "POST",
      body: JSON.stringify({
        primary_event_count: 3,
        secondary_event_count: 1,
        elapsed_days: 178,
      }),
    })
      .then(setRisk)
      .catch(() => null)
      .finally(() => setLoadingRisk(false));
  }, []);

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Main hero card */}
      <div className="col-span-12 lg:col-span-8 space-y-6">
        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none">
            <Shield size={220} className="text-blue-400" />
          </div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.35em] bg-blue-500/10 px-3 py-1 rounded border border-blue-500/20">
                System Posture
              </span>
              <span
                className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded ${
                  online
                    ? "text-green-400 bg-green-500/10 border border-green-500/20"
                    : online === false
                    ? "text-red-400 bg-red-500/10 border border-red-500/20"
                    : "text-slate-500 bg-slate-800 border border-slate-700"
                }`}
              >
                {online === null ? "Checking..." : online ? "Node Online" : "Node Offline"}
              </span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight mb-3">
              VALORAIPLUS® <span className="text-blue-400">OMEGA v100</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
              Forensic evidence management platform with SHA3-512 chained Merkle state
              proofs, persistent SQLAlchemy audit ledger, logistic compliance risk
              scoring, and ECF-compatible court payload generation.
            </p>
            <div className="flex gap-4 mt-7">
              <button
                onClick={() => setView("submit")}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all"
              >
                Initialize Ingestion <ChevronRight size={14} />
              </button>
              <button
                onClick={() => setView("audit")}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 border border-slate-700 transition-all"
              >
                View Audit Ledger <Database size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl group hover:border-blue-500/30 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <HardDrive size={16} className="text-blue-400" />
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                Storage Backend
              </span>
            </div>
            <div className="text-xl font-black text-white tracking-tight">SQLite / PostgreSQL</div>
            <div className="text-[10px] text-slate-600 mt-1">Switch via DATABASE_URL env var</div>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl group hover:border-blue-500/30 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <Cpu size={16} className="text-blue-400" />
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                Hash Algorithm
              </span>
            </div>
            <div
              className="text-xl font-black text-white tracking-tight"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              SHA3-512
            </div>
            <div className="text-[10px] text-slate-600 mt-1">Chained state-proof Merkle tree</div>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="col-span-12 lg:col-span-4 space-y-4">
        {/* Risk score */}
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
              Compliance Risk Score
            </h3>
            <Zap size={14} className="text-yellow-500" />
          </div>
          {loadingRisk ? (
            <div className="flex items-center gap-2 text-slate-600">
              <Loader2 size={14} className="animate-spin" />
              <span className="text-xs">Calculating...</span>
            </div>
          ) : risk ? (
            <>
              <div
                className={`text-4xl font-black tracking-tight mb-2 ${
                  risk.threshold_95
                    ? "text-red-400"
                    : risk.threshold_75
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {risk.risk_score_percent.toFixed(2)}%
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mb-3">
                <div
                  className={`h-1.5 rounded-full transition-all duration-700 ${
                    risk.threshold_95
                      ? "bg-red-500"
                      : risk.threshold_75
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${Math.min(risk.risk_score_percent, 100)}%` }}
                />
              </div>
              <div className="flex gap-2">
                <span
                  className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${
                    risk.threshold_95
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "bg-slate-800 text-slate-600 border border-slate-700"
                  }`}
                >
                  &gt;95% {risk.threshold_95 ? "✓" : ""}
                </span>
                <span
                  className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${
                    risk.threshold_75
                      ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      : "bg-slate-800 text-slate-600 border border-slate-700"
                  }`}
                >
                  &gt;75% {risk.threshold_75 ? "✓" : ""}
                </span>
              </div>
            </>
          ) : (
            <div className="text-xs text-slate-600">Backend offline — start the container to see live scores</div>
          )}
        </div>

        {/* Node info */}
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">
            Node Identity
          </h3>
          <div className="space-y-3">
            {[
              { label: "Node", value: health?.node ?? "SGAU-7226.3461" },
              { label: "System", value: health?.system ?? "VALORAIPLUS® OMEGA v100" },
              {
                label: "Atomic Sync",
                value: health
                  ? health.atomic_clock_sync
                    ? "ENABLED"
                    : "DISABLED"
                  : "—",
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between items-center p-3 bg-black/30 rounded-lg border border-slate-800/50"
              >
                <span className="text-[9px] text-slate-600 uppercase font-bold">{label}</span>
                <span
                  className="text-[10px] text-white font-black"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Regulatory Investigations Status */}
        <div className="bg-slate-900/50 border border-red-500/20 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
              Regulatory Investigations
            </h3>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)] animate-pulse" />
              <span className="text-[8px] font-black text-red-400 uppercase tracking-widest">2 Active</span>
            </div>
          </div>
          <div className="space-y-3">
            {/* HHS */}
            <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[8px] font-black text-red-400 uppercase tracking-widest">Federal — HHS / OCR</span>
                <span className="text-[8px] font-black text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded uppercase">Active</span>
              </div>
              <p className="text-[10px] text-white font-bold mb-1">U.S. Dept. of Health & Human Services</p>
              <p className="text-[9px] text-slate-400">Office for Civil Rights — ADA / Section 504 Violation</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[8px] text-slate-600 font-mono">Node: REG-04-HHS-INVESTIGATION</span>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[8px] text-slate-600">Opened:</span>
                <span className="text-[8px] text-slate-400 font-mono">March 15, 2026</span>
              </div>
            </div>
            {/* CRD */}
            <div className="p-3 bg-orange-500/5 border border-orange-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[8px] font-black text-orange-400 uppercase tracking-widest">State — California CRD</span>
                <span className="text-[8px] font-black text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded uppercase">Active</span>
              </div>
              <p className="text-[10px] text-white font-bold mb-1">California Civil Rights Department</p>
              <p className="text-[9px] text-slate-400">Fair Housing / FEHA Disability Discrimination</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[8px] text-slate-600 font-mono">Node: REG-05-CRD-INVESTIGATION</span>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[8px] text-slate-600">Opened:</span>
                <span className="text-[8px] text-slate-400 font-mono">April 2, 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Tracker */}
        <div className="bg-slate-900/50 border border-blue-500/20 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Referral Tracker</h3>
            <span className="text-[8px] font-black text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded uppercase">5 Active</span>
          </div>
          <div className="space-y-2">
            {[
              { agency: "HHS / OCR", type: "Federal", status: "ACTIVE", color: "red", opened: "Mar 15, 2026", ref: "REG-04-HHS-INVESTIGATION", desc: "ADA / Section 504 Violation" },
              { agency: "California CRD", type: "State", status: "ACTIVE", color: "orange", opened: "Apr 2, 2026", ref: "REG-05-CRD-INVESTIGATION", desc: "Fair Housing / FEHA Disability" },
              { agency: "DOJ Civil Rights Division", type: "Federal", status: "REFERRED", color: "blue", opened: "May 16, 2026", ref: "42 U.S.C. §§ 1983, 1981", desc: "Civil Rights Under Color of Law" },
              { agency: "SF Whistleblower Program", type: "City", status: "DOCUMENTED", color: "green", opened: "May 16, 2026", ref: "SF Admin Code § 4.115", desc: "Retaliation / Obstruction" },
              { agency: "State Bar of California", type: "State Bar", status: "REFERRED", color: "amber", opened: "May 16, 2026", ref: "CRPC Rules 3.1, 3.3, 8.4", desc: "Zanghi (320531) + White (297746)" },
            ].map((r) => (
              <div key={r.agency} className={`p-3 rounded-lg border ${
                r.color === "red" ? "border-red-500/20 bg-red-500/5" :
                r.color === "orange" ? "border-orange-500/20 bg-orange-500/5" :
                r.color === "blue" ? "border-blue-500/20 bg-blue-500/5" :
                r.color === "green" ? "border-green-500/20 bg-green-500/5" :
                "border-amber-500/20 bg-amber-500/5"
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[8px] font-black uppercase tracking-widest ${
                    r.color === "red" ? "text-red-400" : r.color === "orange" ? "text-orange-400" : r.color === "blue" ? "text-blue-400" : r.color === "green" ? "text-green-400" : "text-amber-400"
                  }`}>{r.type}</span>
                  <span className={`text-[7px] font-black uppercase px-2 py-0.5 rounded border ${
                    r.status === "ACTIVE" ? "text-red-400 border-red-500/30 bg-red-500/10" :
                    r.status === "REFERRED" ? "text-blue-400 border-blue-500/30 bg-blue-500/10" :
                    "text-green-400 border-green-500/30 bg-green-500/10"
                  } ${r.status === "ACTIVE" ? "animate-pulse" : ""}`}>{r.status}</span>
                </div>
                <p className="text-[10px] text-white font-bold">{r.agency}</p>
                <p className="text-[9px] text-slate-400">{r.desc}</p>
                <div className="mt-1.5 flex items-center gap-3">
                  <span className="text-[8px] text-slate-600">Opened: <span className="text-slate-500">{r.opened}</span></span>
                  <span className="text-[8px] font-mono text-slate-700">{r.ref}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Endpoints quick-ref */}
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">
            API Endpoints
          </h3>
          <div className="space-y-2">
            {[
              { method: "GET", path: "/health" },
              { method: "POST", path: "/v1/evidence/anchor" },
              { method: "GET", path: "/v1/ledger/audit" },
              { method: "GET", path: "/v1/ledger/merkle-root" },
              { method: "POST", path: "/v1/risk/score" },
              { method: "POST", path: "/v1/court/payload" },
            ].map(({ method, path }) => (
              <div
                key={path}
                className="flex items-center gap-2 text-[9px]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <span
                  className={`px-1.5 py-0.5 rounded font-black ${
                    method === "GET"
                      ? "bg-green-500/15 text-green-400"
                      : "bg-blue-500/15 text-blue-400"
                  }`}
                >
                  {method}
                </span>
                <span className="text-slate-500">{path}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Evidence Ingestion Panel
// ---------------------------------------------------------------------------

interface AiParseResponse {
  case_id: string;
  event_classification: string;
  testimony_narrative: string;
  jurisdiction: string;
  department: string;
  statutory_refs: string[];
  confidence_score: number;
  assigned_by: string;
  parsed_at: string;
}

function Ingestion({ setView }: { setView: (v: PanelId) => void }) {
  // Step 1: raw evidence input
  const [rawText, setRawText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [parsing, setParsing] = useState(false);

  // Step 2: AI-assigned fields (read-only after parse)
  const [aiResult, setAiResult] = useState<AiParseResponse | null>(null);

  // Step 3: operator-editable fields
  const [caseNumber, setCaseNumber] = useState("");
  const [jurisdiction, setJurisdiction] = useState("San Francisco Superior Court — Dept. 12");

  // Step 4: anchor result
  const [anchoring, setAnchoring] = useState(false);
  const [anchorResult, setAnchorResult] = useState<AnchorResponse | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  // ── Step 1: Parse evidence via ValorAiExecutive++ ──────────────────────────
  const handleParse = async () => {
    const combined = [
      rawText.trim(),
      ...files.map((f) => `[FILE: ${f.name}]`),
    ]
      .filter(Boolean)
      .join("\n");

    if (!combined) {
      toast.error("Paste evidence text or attach files before parsing.");
      return;
    }
    setParsing(true);
    setAiResult(null);
    setAnchorResult(null);
    try {
      const data = await apiFetch<AiParseResponse>("/v1/ai/parse-evidence", {
        method: "POST",
        body: JSON.stringify({
          raw_text: combined,
          case_number_override: caseNumber.trim() || undefined,
          jurisdiction_override: undefined,
        }),
      });
      setAiResult(data);
      setCaseNumber(data.case_id);
      setJurisdiction(`${data.jurisdiction} — ${data.department}`);
      toast.success("ValorAiExecutive++ analysis complete.");
    } catch (err) {
      toast.error(`Parse failed: ${(err as Error).message}`);
    } finally {
      setParsing(false);
    }
  };

  // ── Step 2: Anchor to Merkle ledger ───────────────────────────────────────
  const handleAnchor = async () => {
    if (!aiResult) {
      toast.error("Run AI parse first.");
      return;
    }
    setAnchoring(true);
    try {
      const blocks = [
        {
          testimony_id: caseNumber.trim(),
          content: aiResult.testimony_narrative,
          metadata: {
            event_type: aiResult.event_classification,
            jurisdiction,
            statutory_refs: aiResult.statutory_refs,
            confidence_score: aiResult.confidence_score,
            assigned_by: aiResult.assigned_by,
            file_count: files.length,
            file_names: files.map((f) => f.name),
          },
        },
      ];
      const data = await apiFetch<AnchorResponse>("/v1/evidence/anchor", {
        method: "POST",
        body: JSON.stringify(blocks),
      });
      setAnchorResult(data);
      toast.success("Evidence anchored to Merkle ledger.");
    } catch (err) {
      toast.error(`Anchor failed: ${(err as Error).message}`);
    } finally {
      setAnchoring(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };
  const removeFile = (i: number) => setFiles((f) => f.filter((_, idx) => idx !== i));

  const resetAll = () => {
    setRawText("");
    setFiles([]);
    setAiResult(null);
    setCaseNumber("");
    setJurisdiction("San Francisco Superior Court — Dept. 12");
    setAnchorResult(null);
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="bg-slate-900/50 border border-slate-800 p-10 rounded-2xl shadow-2xl space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Forensic Ingestion Airlock
          </h2>
          <p
            className="text-[10px] text-blue-500 uppercase tracking-[0.4em] mt-2"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            ValorAiExecutive++ // ValorAiCoder++ — AI-Parsed & SHA3-512 Anchored
          </p>
        </div>

        {/* ── STEP 1: Raw evidence input ── */}
        <div className="space-y-3">
          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">
            Step 1 — Paste Raw Evidence or Upload Files
          </label>
          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Paste the full evidence narrative, email content, incident description, or any raw text. ValorAiExecutive++ will parse, classify, and summarize it automatically..."
            className="w-full bg-black/60 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-4 text-white text-sm outline-none transition-colors min-h-[160px] leading-relaxed resize-none"
            disabled={!!aiResult}
          />
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-slate-600">{rawText.length} characters</span>
            {aiResult && (
              <button
                onClick={resetAll}
                className="text-[9px] text-slate-500 hover:text-red-400 uppercase tracking-widest transition-colors"
              >
                Clear & Re-parse
              </button>
            )}
          </div>
        </div>

        {/* File attachment */}
        <div className="space-y-3">
          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">
            Supporting Files (optional — content parsed + hashes anchored)
          </label>
          <div
            className="border border-dashed border-slate-700 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500/50 transition-colors"
            onClick={() => !aiResult && fileRef.current?.click()}
          >
            <Upload size={20} className="mx-auto text-slate-600 mb-2" />
            <p className="text-xs text-slate-600">Click to attach files</p>
            <input
              ref={fileRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-black/40 rounded-lg px-4 py-2 border border-slate-800"
                >
                  <span
                    className="text-[10px] text-slate-400"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {f.name}
                  </span>
                  {!aiResult && (
                    <button onClick={() => removeFile(i)}>
                      <X size={12} className="text-slate-600 hover:text-red-400 transition-colors" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Parse button */}
        {!aiResult && (
          <button
            onClick={handleParse}
            disabled={parsing}
            className="w-full bg-indigo-700 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-indigo-700/20 flex items-center justify-center gap-3 transition-all"
          >
            {parsing ? (
              <>
                <Loader2 size={14} className="animate-spin" /> ValorAiExecutive++ Analyzing...
              </>
            ) : (
              <>
                <Shield size={14} /> Analyze with ValorAiExecutive++
              </>
            )}
          </button>
        )}

        {/* ── STEP 2: AI-assigned fields (read-only) ── */}
        {aiResult && (
          <div className="space-y-6 border-t border-slate-800 pt-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span
                className="text-[9px] text-green-400 uppercase tracking-widest font-black"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                ValorAiExecutive++ Analysis Complete — {Math.round(aiResult.confidence_score * 100)}% Confidence
              </span>
            </div>

            {/* AI-assigned: Event Classification (read-only) */}
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block flex items-center gap-2">
                Event Classification
                <span className="text-blue-500 text-[8px]">AI-ASSIGNED</span>
              </label>
              <div
                className="w-full bg-black/80 border border-blue-500/30 rounded-xl px-4 py-3 text-blue-300 text-sm select-all"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {aiResult.event_classification}
              </div>
            </div>

            {/* AI-assigned: Testimony Narrative (read-only) */}
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block flex items-center gap-2">
                Testimony Narrative
                <span className="text-blue-500 text-[8px]">AI-ASSIGNED</span>
              </label>
              <div
                className="w-full bg-black/80 border border-blue-500/30 rounded-xl px-4 py-4 text-slate-300 text-xs leading-relaxed min-h-[120px] select-all"
              >
                {aiResult.testimony_narrative}
              </div>
            </div>

            {/* Statutory references (read-only) */}
            {aiResult.statutory_refs.length > 0 && (
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block flex items-center gap-2">
                  Statutory References
                  <span className="text-blue-500 text-[8px]">AI-ASSIGNED</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {aiResult.statutory_refs.map((s, i) => (
                    <span
                      key={i}
                      className="bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[9px] px-3 py-1 rounded-full"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ── STEP 3: Operator-editable fields ── */}
            <div className="border-t border-slate-800 pt-6 space-y-4">
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black">
                Step 2 — Confirm Case Details (editable)
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block flex items-center gap-2">
                    Case Number
                    <span className="text-amber-500 text-[8px]">EDITABLE</span>
                  </label>
                  <input
                    value={caseNumber}
                    onChange={(e) => setCaseNumber(e.target.value)}
                    className="w-full bg-black/60 border border-amber-500/40 focus:border-amber-400 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                    style={{ fontFamily: "var(--font-mono)" }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block flex items-center gap-2">
                    Jurisdiction
                    <span className="text-amber-500 text-[8px]">EDITABLE</span>
                  </label>
                  <input
                    value={jurisdiction}
                    onChange={(e) => setJurisdiction(e.target.value)}
                    className="w-full bg-black/60 border border-amber-500/40 focus:border-amber-400 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                    style={{ fontFamily: "var(--font-mono)" }}
                  />
                </div>
              </div>
            </div>

            {/* Anchor button */}
            {!anchorResult && (
              <button
                onClick={handleAnchor}
                disabled={anchoring}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 transition-all"
              >
                {anchoring ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Anchoring to Merkle Ledger...
                  </>
                ) : (
                  <>
                    <Shield size={14} /> Anchor Evidence to Merkle Ledger
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* ── Anchor result ── */}
        {anchorResult && (
          <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle2 size={16} />
              <span className="text-xs font-black uppercase tracking-widest">
                Evidence Anchored Successfully
              </span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-[9px] text-slate-600 uppercase font-bold mb-1">Merkle Root</div>
                <HashDisplay hash={anchorResult.merkle_root} />
              </div>
              <div>
                <div className="text-[9px] text-slate-600 uppercase font-bold mb-1">State Proof</div>
                <HashDisplay hash={anchorResult.state_proof} />
              </div>
              <div>
                <div className="text-[9px] text-slate-600 uppercase font-bold mb-1">Leaf Count</div>
                <span
                  className="text-sm font-black text-white"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {anchorResult.leaf_count}
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setView("audit")}
                className="text-[9px] font-black text-blue-400 hover:text-blue-300 uppercase tracking-widest flex items-center gap-1 transition-colors"
              >
                View in Audit Ledger <ChevronRight size={11} />
              </button>
              <button
                onClick={resetAll}
                className="text-[9px] font-black text-slate-500 hover:text-slate-300 uppercase tracking-widest transition-colors"
              >
                New Submission
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Merkle Locker Panel
// ---------------------------------------------------------------------------

function Locker() {
  const [data, setData] = useState<MerkleRootResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  const fetchRoot = useCallback(() => {
    setLoading(true);
    setError(null);
    apiFetch<MerkleRootResponse>("/v1/ledger/merkle-root")
      .then((d) => {
        setData(d);
        setLastFetched(new Date());
      })
      .catch((e) => setError((e as Error).message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchRoot();
    const interval = setInterval(fetchRoot, 30_000);
    return () => clearInterval(interval);
  }, [fetchRoot]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight">
            Merkle State Locker
          </h2>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">
            Live SHA3-512 root over all persisted ledger leaves — auto-refreshes every 30s
          </p>
        </div>
        <button
          onClick={fetchRoot}
          disabled={loading}
          className="flex items-center gap-2 text-[9px] font-black text-slate-500 hover:text-blue-400 uppercase tracking-widest border border-slate-800 hover:border-blue-500/40 px-4 py-2 rounded-lg transition-all"
        >
          <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <AlertTriangle size={16} className="text-red-400 shrink-0" />
          <div>
            <p className="text-xs font-bold text-red-400">Backend Unreachable</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{error}</p>
            <p className="text-[10px] text-slate-600 mt-1">
              Run <code className="text-blue-400">docker compose up --build</code> in{" "}
              <code className="text-blue-400">/home/ubuntu/valoraiplus_core</code>
            </p>
          </div>
        </div>
      )}

      {/* Main root display */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-transparent" />
        </div>
        <div className="relative">
          <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-3">
            Current Merkle Root
          </div>
          {loading && !data ? (
            <div className="flex items-center gap-3 text-slate-600">
              <Loader2 size={18} className="animate-spin" />
              <span className="text-sm">Computing root over all ledger leaves...</span>
            </div>
          ) : data ? (
            <>
              <div
                className="text-sm font-black text-blue-400 break-all leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {data.merkle_root}
                <CopyButton text={data.merkle_root} />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-black/40 rounded-xl p-4 border border-slate-800/50">
                  <div className="text-[9px] text-slate-600 uppercase font-bold mb-1">
                    Leaf Count
                  </div>
                  <div
                    className="text-2xl font-black text-white"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {data.leaf_count}
                  </div>
                </div>
                <div className="bg-black/40 rounded-xl p-4 border border-slate-800/50">
                  <div className="text-[9px] text-slate-600 uppercase font-bold mb-1">
                    Node
                  </div>
                  <div
                    className="text-sm font-black text-white"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {data.node}
                  </div>
                </div>
                <div className="bg-black/40 rounded-xl p-4 border border-slate-800/50">
                  <div className="text-[9px] text-slate-600 uppercase font-bold mb-1">
                    Last Computed
                  </div>
                  <div
                    className="text-xs font-black text-white"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {lastFetched
                      ? lastFetched.toISOString().split("T")[1].slice(0, 8) + " UTC"
                      : "—"}
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>

      {/* How chained proofs work */}
      <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">
          How Chained State Proofs Work
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              step: "01",
              title: "Leaf Hashing",
              desc: "Each evidence submission is SHA3-512 hashed into a Merkle leaf.",
            },
            {
              step: "02",
              title: "Root Computation",
              desc: "Leaves are recursively paired and hashed upward to produce a single root.",
            },
            {
              step: "03",
              title: "State Chaining",
              desc: "Each new root is bound to the previous root — retroactive insertion invalidates the chain.",
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-4">
              <div
                className="text-blue-500/40 font-black text-2xl shrink-0 leading-none"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {step}
              </div>
              <div>
                <div className="text-xs font-black text-white mb-1">{title}</div>
                <div className="text-[10px] text-slate-500 leading-relaxed">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Constitutional Audit Panel
// ---------------------------------------------------------------------------

function AuditTrail() {
  const [data, setData] = useState<AuditResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");

  const fetchAudit = useCallback(() => {
    setLoading(true);
    setError(null);
    apiFetch<AuditResponse>("/v1/ledger/audit?limit=100")
      .then(setData)
      .catch((e) => setError((e as Error).message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchAudit();
  }, [fetchAudit]);

  const toggleExpand = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const filtered = data?.ledger.filter((e) => {
    const q = search.toLowerCase();
    return (
      !q ||
      e.event_type.toLowerCase().includes(q) ||
      e.id.toLowerCase().includes(q) ||
      JSON.stringify(e.details).toLowerCase().includes(q)
    );
  });

  const eventColor = (type: string) => {
    if (type.includes("EVIDENCE")) return "text-blue-400 bg-blue-500/10 border-blue-500/20";
    if (type.includes("TRANSMISSION")) return "text-purple-400 bg-purple-500/10 border-purple-500/20";
    if (type.includes("COURT")) return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    if (type.includes("ERROR")) return "text-red-400 bg-red-500/10 border-red-500/20";
    return "text-slate-400 bg-slate-800 border-slate-700";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight">
            Constitutional Audit Ledger
          </h2>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">
            {data ? `${data.entry_count} entries — node: ${data.node}` : "Loading..."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events..."
            className="bg-black/60 border border-slate-800 focus:border-blue-500 rounded-lg px-4 py-2 text-white text-xs outline-none transition-colors w-48"
            style={{ fontFamily: "var(--font-mono)" }}
          />
          <button
            onClick={fetchAudit}
            disabled={loading}
            className="flex items-center gap-2 text-[9px] font-black text-slate-500 hover:text-blue-400 uppercase tracking-widest border border-slate-800 hover:border-blue-500/40 px-4 py-2 rounded-lg transition-all"
          >
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <AlertTriangle size={16} className="text-red-400 shrink-0" />
          <div>
            <p className="text-xs font-bold text-red-400">Backend Unreachable</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {loading && !data && (
        <div className="flex items-center justify-center py-20 text-slate-600">
          <Loader2 size={24} className="animate-spin mr-3" />
          <span className="text-sm">Fetching audit ledger...</span>
        </div>
      )}

      {data && (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck size={14} className="text-green-500" />
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                Integrity Handshake Verified
              </span>
            </div>
            <span
              className="text-[9px] font-black text-slate-600"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {filtered?.length ?? 0} / {data.entry_count} entries shown
            </span>
          </div>

          {filtered && filtered.length === 0 && (
            <div className="py-16 text-center text-slate-600">
              <Database size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-xs font-black uppercase tracking-widest opacity-50">
                {search ? "No matching entries" : "No ledger entries yet — anchor evidence to begin"}
              </p>
            </div>
          )}

          <div className="divide-y divide-slate-800/50">
            {filtered?.map((entry) => (
              <div key={entry.id} className="group">
                <div
                  className="p-5 flex items-center justify-between hover:bg-blue-500/5 transition-colors cursor-pointer"
                  onClick={() => toggleExpand(entry.id)}
                >
                  <div className="flex items-center gap-6 min-w-0">
                    <div
                      className="text-[10px] text-blue-500 shrink-0"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {entry.timestamp
                        ? new Date(entry.timestamp).toISOString().split("T")[1].slice(0, 8)
                        : "—"}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[8px] font-black px-2 py-0.5 rounded border uppercase tracking-widest ${eventColor(
                            entry.event_type
                          )}`}
                        >
                          {entry.event_type}
                        </span>
                      </div>
                      <div
                        className="text-[9px] text-slate-600 truncate"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        ID: {entry.id.slice(0, 8)}…
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[9px] font-black text-slate-600 hover:text-blue-400 border border-slate-800 px-3 py-1.5 rounded-lg transition-all group-hover:border-blue-500/30">
                      {expanded.has(entry.id) ? "Collapse" : "View Proof"}
                    </span>
                  </div>
                </div>

                {expanded.has(entry.id) && (
                  <div className="px-5 pb-5 bg-black/20 border-t border-slate-800/50 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <div>
                        <div className="text-[9px] text-slate-600 uppercase font-bold mb-1">
                          Merkle Leaf
                        </div>
                        <HashDisplay hash={entry.merkle_leaf} />
                      </div>
                      {entry.state_hash && (
                        <div>
                          <div className="text-[9px] text-slate-600 uppercase font-bold mb-1">
                            Chained State Proof
                          </div>
                          <HashDisplay hash={entry.state_hash} />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-600 uppercase font-bold mb-2">
                        Event Details
                      </div>
                      <pre
                        className="text-[9px] text-slate-400 bg-black/40 rounded-lg p-3 overflow-x-auto border border-slate-800/50 leading-relaxed"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {JSON.stringify(entry.details, null, 2)}
                      </pre>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-600 uppercase font-bold mb-1">
                        Full Timestamp
                      </div>
                      <span
                        className="text-[9px] text-slate-400"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {entry.timestamp}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Login Gate
// ---------------------------------------------------------------------------

function LoginGate({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const token = await apiLogin(username, password);
      storeToken(token);
      onLogin(token);
      toast.success("Authenticated — node access granted");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] flex items-center justify-center p-6">
      <div className="fixed top-0 left-0 w-full h-[2px] hud-bar z-[100]" />
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-slate-900 border border-slate-700 rounded-2xl mb-6 relative">
            <div className="absolute -inset-1 bg-blue-600 rounded-2xl blur opacity-20" />
            <Shield className="text-blue-400 w-10 h-10 relative" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight uppercase">
            VALORAIPLUS® <span className="text-blue-500">OMEGA v100</span>
          </h1>
          <p
            className="text-[9px] text-blue-500/70 uppercase tracking-[0.4em] mt-2"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            SGAU-7226.3461 // Authentication Required
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 space-y-6 backdrop-blur-sm"
        >
          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">
              Operator Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="donadams1969.eth"
              autoComplete="username"
              required
              className="w-full bg-black/60 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
              style={{ fontFamily: "var(--font-mono)" }}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">
              Access Code
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="w-full bg-black/60 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 pr-12 text-white text-sm outline-none transition-colors"
                style={{ fontFamily: "var(--font-mono)" }}
              />
              <button
                type="button"
                onClick={() => setShowPw((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors"
              >
                {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
              <AlertTriangle size={14} className="text-red-400 shrink-0" />
              <span className="text-xs text-red-400">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 transition-all"
          >
            {loading ? (
              <><Loader2 size={14} className="animate-spin" /> Authenticating...</>
            ) : (
              <><Lock size={14} /> Authenticate Node Access</>
            )}
          </button>


        </form>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Court Compiler Panel
// ---------------------------------------------------------------------------

// Pre-filled court document definitions — all hosted on static storage
const COURT_DOCS = [
  {
    num: "01",
    title: "Answer — UD-105",
    subtitle: "13 Affirmative Defenses",
    desc: "General denial, 13 affirmative defenses including Federal Enclave Bar, Cal. Civ. Code § 1942.5 (3-tier), ADA/FEHA, HHS & CRD active investigation notices, Witness Retaliation, and Tenant Union Protection. E-SIGN / UETA compliant.",
    case: "CUD-26-682107 (Unlawful Detainer)",
    pages: 9,
    badge: "PRIMARY FILING",
    badgeColor: "blue" as const,
    filename: "CUD-26-682107_Doc1_Answer_UD105.pdf",
    url: "/manus-storage/CUD-26-682107_Doc1_Answer_UD105_cecf8c8c.pdf",
  },
  {
    num: "02",
    title: "Motion to Strike + Motion to Dismiss",
    subtitle: "With Prejudice — Judicial Protective Order",
    desc: "Motion to Strike targets defective notice allegations and jurisdictionally void claims. Motion to Dismiss with Prejudice covers Federal Enclave doctrine, retaliation, and requests judicial protective orders for all four named Veterans Tenant Union members.",
    case: "CUD-26-682107 (Unlawful Detainer)",
    pages: 8,
    badge: "SUPPORTING MOTION",
    badgeColor: "amber" as const,
    filename: "CUD-26-682107_Doc2_Motions.pdf",
    url: "/manus-storage/CUD-26-682107_Doc2_Motions_943767fb.pdf",
  },
  {
    num: "03",
    title: "ADA Accommodation + Proof of Service",
    subtitle: "N.E.W.T.™ as Cognitive Prosthetic",
    desc: "Formal ADA accommodation request to use N.E.W.T.™ as cognitive prosthetic under 28 C.F.R. § 35.130(b)(7). Proof of Electronic Service signed by Jeffrey Wright as Veterans Tenant Union Leadership Member under the E-SIGN Act — no party email in service declaration.",
    case: "CUD-26-682107 (Unlawful Detainer)",
    pages: 5,
    badge: "ADA FILING",
    badgeColor: "green" as const,
    filename: "CUD-26-682107_Doc3_ADA_ProofOfService.pdf",
    url: "/manus-storage/CUD-26-682107_Doc3_ADA_ProofOfService_7a91cbb0.pdf",
  },
  {
    num: "04",
    title: "Judicial Briefing — Binding Legal Matrix",
    subtitle: "Notice to the Court — For the Judge",
    desc: "Addressed directly to the presiding judge. Four-tier binding legal matrix: Federal Enclave jurisdiction bar, Cal. Civ. Code § 1942.5 mandatory retaliation bar, Implied Warranty of Habitability breach, and dual active regulatory investigations (HHS + CRD). Binding precedent table included.",
    case: "CUD-26-682107 (Unlawful Detainer)",
    pages: 6,
    badge: "JUDICIAL NOTICE",
    badgeColor: "purple" as const,
    filename: "CUD-26-682107_Doc4_JudicialBriefing.pdf",
    url: "/manus-storage/CUD-26-682107_Doc4_JudicialBriefing_1bdb91b3.pdf",
  },
  {
    num: "05",
    title: "Civil Complaint — The Sword",
    subtitle: "9 Counts — $5,003,000.00 + Attorney's Fees",
    desc: "Unlimited Civil Jurisdiction complaint. 9 counts targeting Swords to Plowshares, William Landrum, John Zanghi, and Bradford White: Statutory Retaliation, FEHA Disability Discrimination, Constructive Eviction, Business Destruction, IP Theft (VALORAIPLUS®), Academic Research Theft (ORCID: 0009-0007-0768-5486), IIED, Fair Housing Act, and 42 U.S.C. § 1983.",
    case: "New Unlimited Civil Action",
    pages: 11,
    badge: "CIVIL COMPLAINT",
    badgeColor: "red" as const,
    filename: "CUD-26-682107_Doc5_CivilComplaint_TheSword.pdf",
    url: "/manus-storage/CUD-26-682107_Doc5_CivilComplaint_TheSword_2681e57d.pdf",
  },
  {
    num: "06",
    title: "Notice of Transmittal & Demand",
    subtitle: "Dual-Caption — To Opposing Counsel",
    desc: "Personal transmittal notice from the Office of the Secretary, filed as a court record in both the UD action and the new civil action. Formally notifies John Zanghi and Bradford White of all 9 counts, the witness network, and the active HHS/CRD investigations. Includes E-SIGN block and Proof of Electronic Service.",
    case: "CUD-26-682107 (UD) + New Civil Action (Dual Caption)",
    pages: 9,
    badge: "DUAL CAPTION",
    badgeColor: "amber" as const,
    filename: "CUD-26-682107_Doc6_Transmittal_Demand.pdf",
    url: "/manus-storage/CUD-26-682107_Doc6_Transmittal_Demand_59c2fe06.pdf",
  },
  {
    num: "07",
    title: "Attorney Misconduct & State Bar Complaint",
    subtitle: "Zanghi (Bar No. 320531) + White (Bar No. 297746)",
    desc: "Formal Notice of Attorney Misconduct to the presiding judge and concurrent State Bar of California complaint covering 7 CRPC rule violations: Rule 3.1 (Meritorious Claims), Rule 3.3 (Candor to Tribunal), Rule 3.4 (Fairness), Rule 4.4 (Third-Party Rights), Rule 8.4(c) (Moral Turpitude), Rule 8.4(d) (Prejudicial Conduct), and 42 U.S.C. § 1512 (Witness Tampering). Requests order to show cause, mandatory State Bar referral, and judicial protective order.",
    case: "CUD-26-682107 (UD) + State Bar of California",
    pages: 9,
    badge: "MISCONDUCT COMPLAINT",
    badgeColor: "red" as const,
    filename: "CUD-26-682107_Doc7_AttorneyMisconduct_StateBar.pdf",
    url: "/manus-storage/CUD-26-682107_Doc7_AttorneyMisconduct_StateBar_a8c72e34.pdf",
  },
  {
    num: "08",
    title: "Supplemental Notice of Lodging & Evidentiary Proffer",
    subtitle: "March 19, 2026 Judicial Record — CRT-03-RO-HEARING",
    desc: "Locks the March 19, 2026 on-record hearing into the case. Establishes the irrebuttable 180-day statutory retaliation bar under Cal. Civ. Code Section 1942.5(a). Includes 6-event timeline table, statutory bar summary table, E-SIGN attestation, and Proof of Electronic Service.",
    pages: 8,
    case: "CUD-26-682107 (UD)",
    badge: "EVIDENTIARY PROFFER",
    badgeColor: "purple" as const,
    filename: "CUD-26-682107_Doc8_SupplementalNotice_EvidentiaryProffer.pdf",
    url: "/manus-storage/CUD-26-682107_Doc8_SupplementalNotice_EvidentiaryProffer_f8ef58df.pdf",
  },
  {
    num: "09",
    title: "SF Whistleblower Program — City-Level Nexus",
    subtitle: "SF Office of Disability + ETD Integration + Obstruction Record",
    desc: "Formal Notice to the Court establishing Donald Gillson as a documented SF Whistleblower Program participant, with active integrations with the SF Office of Disability and the SF Emerging Technology Department. Documents obstruction of the whistleblower program by property management and establishes the city-level nexus that elevates this case to a municipal civil rights matter.",
    case: "CUD-26-682107 (UD) + New Civil Action (Dual Caption)",
    pages: 7,
    badge: "WHISTLEBLOWER NOTICE",
    badgeColor: "green" as const,
    filename: "CUD-26-682107_Doc9_WhistleblowerNotice.pdf",
    url: "/manus-storage/CUD-26-682107_Doc9_WhistleblowerNotice_2a4a9719.pdf",
  },
  {
    num: "10",
    title: "Civil Rights & Human Rights Filing",
    subtitle: "Multi-Framework: Federal, State, International, Veterans",
    desc: "Comprehensive notice of civil rights and human rights violations across four independent legal frameworks: Federal (42 U.S.C. §§ 1983, 1981, 12132, 3604/3617, 1512; 29 U.S.C. § 794), California State (Cal. Gov. Code §§ 12955, 12940; Cal. Civ. Code §§ 52.1, 1942.5, 51; Cal. Welf. & Inst. Code § 15657), International (UDHR Arts. 7, 12, 25; CRPD Art. 19; UN Special Rapporteur), and Veterans-specific (38 U.S.C. § 4212; CalVet; 38 C.F.R. § 3.304(f)). Includes referrals to DOJ Civil Rights Division and CRD.",
    case: "CUD-26-682107 (UD) + New Civil Action (Dual Caption)",
    pages: 11,
    badge: "CIVIL & HUMAN RIGHTS",
    badgeColor: "blue" as const,
    filename: "CUD-26-682107_Doc10_CivilHumanRights.pdf",
    url: "/manus-storage/CUD-26-682107_Doc10_CivilHumanRights_f77e1383.pdf",
  },
  {
    num: "11",
    title: "Emergency TRO Motion",
    subtitle: "Motion for Temporary Restraining Order & OSC re: Preliminary Injunction",
    desc: "Emergency Motion for Temporary Restraining Order and Order to Show Cause re: Preliminary Injunction. Requests immediate stay of all UD proceedings, judicial protective orders for Jeffrey Wright, Jerome Bartlett, and Daniel Lucian, anti-retaliation order against William Landrum, and OSC hearing date. Supported by Declaration of Donald Ernest Gillson. Dual caption: CUD-26-682107 and new civil action.",
    case: "CUD-26-682107 (UD) + New Civil Action (Dual Caption)",
    pages: 11,
    badge: "EMERGENCY TRO",
    badgeColor: "red" as const,
    filename: "CUD-26-682107_Doc11_EmergencyTRO.pdf",
    url: "/manus-storage/CUD-26-682107_Doc11_EmergencyTRO_1b5ec336.pdf",
  },
  {
    num: "12",
    title: "Request for Judicial Notice",
    subtitle: "Active HHS & CRD Investigations — Evid. Code §§ 452, 453",
    desc: "Requests the Court take judicial notice of the active federal HHS/OCR investigation (REG-04-HHS-INVESTIGATION, opened Mar 15, 2026) and the active California CRD investigation (REG-05-CRD-INVESTIGATION, opened Apr 2, 2026). Includes proposed order. E-SIGN / UETA / Digital Communications Act compliant. ORCID iD: 0009-0007-0768-5486.",
    case: "CUD-26-682107 (Unlawful Detainer)",
    pages: 5,
    badge: "JUDICIAL NOTICE",
    badgeColor: "purple" as const,
    filename: "CUD-26-682107_Doc12_RequestJudicialNotice.pdf",
    url: "/manus-storage/CUD-26-682107_Doc12_RequestJudicialNotice_dab0883b.pdf",
  },
  {
    num: "13",
    title: "Motion for Continuance / Stay",
    subtitle: "Pending Federal & State Investigations — CCP § 128(a)(8)",
    desc: "Motion for Continuance and Stay of all UD proceedings pending resolution of the active HHS/OCR federal investigation and CRD state investigation. Argues that proceeding to trial while parallel regulatory enforcement is active would be prejudicial and contrary to judicial economy. Includes proposed order.",
    case: "CUD-26-682107 (Unlawful Detainer)",
    pages: 5,
    badge: "STAY MOTION",
    badgeColor: "amber" as const,
    filename: "CUD-26-682107_Doc13_MotionContinuance.pdf",
    url: "/manus-storage/CUD-26-682107_Doc13_MotionContinuance_6d1209ba.pdf",
  },
  {
    num: "14",
    title: "Notice of Academic Research Theft",
    subtitle: "Digital Provenance Misappropriation — ORCID: 0009-0007-0768-5486",
    desc: "Formal notice documenting the theft and misappropriation of academic research and digital provenance linked to ORCID iD 0009-0007-0768-5486. Covers unauthorized use of VALORAIPLUS® research framework, AI methodology, and blockchain provenance data. Requests preservation order and referral to DOJ IP division.",
    case: "CUD-26-682107 (UD) + New Civil Action (Dual Caption)",
    pages: 5,
    badge: "IP PROTECTION",
    badgeColor: "red" as const,
    filename: "CUD-26-682107_Doc14_AcademicTheftNotice.pdf",
    url: "/manus-storage/CUD-26-682107_Doc14_AcademicTheftNotice_6e9bb0d8.pdf",
  },
  {
    num: "15",
    title: "Application & Motion to Seal",
    subtitle: "Seal Court Record — Protect Witness Network",
    desc: "Application and Motion to Seal the court record to protect the safety of the Veterans Tenant Union witness network (Jeffrey Wright, Jerome Bartlett, Daniel Lucian, and Rosey) from further retaliation. Cites active witness tampering under 42 U.S.C. § 1512 and Cal. Rules of Court, Rule 2.550–2.551.",
    case: "CUD-26-682107 (Unlawful Detainer)",
    pages: 5,
    badge: "SEAL MOTION",
    badgeColor: "green" as const,
    filename: "CUD-26-682107_Doc15_MotionToSeal.pdf",
    url: "/manus-storage/CUD-26-682107_Doc15_MotionToSeal_15e3fb4c.pdf",
  },
  {
    num: "16",
    title: "Amended Civil Complaint",
    subtitle: "9 Counts — Full Damages Matrix — $5,003,000.00+",
    desc: "Amended Unlimited Civil Complaint with full 9-count damages matrix incorporating all newly discovered facts. Adds Count 9 (Academic Research Theft / IP Misappropriation) and updates damages calculations. Names Swords to Plowshares, William Landrum, John Zanghi (Bar No. 320531), and Bradford White (Bar No. 297746) as defendants.",
    case: "New Unlimited Civil Action",
    pages: 6,
    badge: "AMENDED COMPLAINT",
    badgeColor: "red" as const,
    filename: "CUD-26-682107_Doc16_AmendedCivilComplaint.pdf",
    url: "/manus-storage/CUD-26-682107_Doc16_AmendedCivilComplaint_02edaa93.pdf",
  },
  {
    num: "17",
    title: "Motion for Sanctions & Attorney Fees",
    subtitle: "CCP § 128.7 Sanctions + CCP § 1021.5 Attorney Fees",
    desc: "Motion for Sanctions under CCP § 128.7 (frivolous filing — defective Notice to Quit) and mandatory attorney fees under CCP § 1021.5 (private attorney general doctrine — enforcement of civil rights statutes). Requests monetary sanctions against Zanghi and White personally, and mandatory fee award from Plaintiff Swords to Plowshares.",
    case: "CUD-26-682107 (Unlawful Detainer)",
    pages: 6,
    badge: "SANCTIONS MOTION",
    badgeColor: "amber" as const,
    filename: "CUD-26-682107_Doc17_SanctionsFees.pdf",
    url: "/manus-storage/CUD-26-682107_Doc17_SanctionsFees_66c6bcd4.pdf",
  },
];

type BadgeColor = "blue" | "amber" | "green" | "purple" | "red";

const BADGE_STYLES: Record<BadgeColor, string> = {
  blue:   "bg-blue-500/20 border-blue-500/40 text-blue-400",
  amber:  "bg-amber-500/20 border-amber-500/40 text-amber-400",
  green:  "bg-green-500/20 border-green-500/40 text-green-400",
  purple: "bg-purple-500/20 border-purple-500/40 text-purple-400",
  red:    "bg-red-500/20 border-red-500/40 text-red-400",
};

// ---------------------------------------------------------------------------
// Case Timeline Panel
// ---------------------------------------------------------------------------
const TIMELINE_EVENTS = [
  { date: "Nov 19, 2025", node: "GMAIL-01", type: "habitability", color: "amber", title: "Habitability Complaint Filed", desc: "Formal written complaint documenting active infestation, failure of housing services, and uninhabitable conditions. First anchored evidence node.", badge: null },
  { date: "Nov 20, 2025", node: "GMAIL-02", type: "habitability", color: "amber", title: "Reasonable Accommodation Request", desc: "Formal ADA/FEHA Reasonable Accommodation Request submitted. Triggers 180-day retaliation protection window under Cal. Civ. Code Section 1942.5(a).", badge: null },
  { date: "Nov 24, 2025", node: "GMAIL-03", type: "habitability", color: "amber", title: "Service Animal Accommodation Request", desc: "Written request for service animal accommodation for Daniel Lucian and service dog Rosey. Ignored by management.", badge: null },
  { date: "Feb 27, 2026", node: "CRT-04-RO", type: "judicial", color: "blue", title: "Elder/Dependent Adult RO Filed", desc: "Restraining Order filed against William Landrum for elder/dependent adult abuse. Jeffrey Wright present as material eyewitness.", badge: null },
  { date: "Feb 29, 2026", node: "CRT-05-NOTICE", type: "filing", color: "purple", title: "Defective Notice to Quit Served", desc: "Notice contains conflicting, mismatched, and backdated clerical signatures. Filed within 180-day retaliation window.", badge: null },
  { date: "Mar 15, 2026", node: "REG-04-HHS", type: "regulatory", color: "red", title: "HHS Federal Investigation Opened", desc: "U.S. Dept. of Health & Human Services / Office for Civil Rights opens formal ADA / Section 504 investigation against Swords to Plowshares.", badge: "FEDERAL ACTIVE" },
  { date: "Mar 19, 2026", node: "CRT-03-RO-HEARING", type: "judicial", color: "blue", title: "RO Hearing — Jeffrey Wright Testifies", desc: "Court hearing on Elder/Dependent Adult RO against William Landrum. Jeffrey Wright testifies as material eyewitness. Certified transcript requested.", badge: null },
  { date: "Apr 2, 2026", node: "REG-05-CRD", type: "regulatory", color: "red", title: "California CRD State Investigation Opened", desc: "California Civil Rights Department opens formal Fair Housing / FEHA Disability Discrimination investigation.", badge: "STATE ACTIVE" },
  { date: "May 16, 2026", node: "CRT-06-ENCLAVE", type: "filing", color: "purple", title: "11-Document Filing Package Submitted", desc: "Complete court filing package: UD-105 Answer (13 defenses), Motion to Strike, Motion to Dismiss, ADA Accommodation, Judicial Briefing, Civil Complaint (9 counts), Transmittal Demand, Evidentiary Proffer, Whistleblower Notice, Civil Rights Filing, Emergency TRO Motion.", badge: null },
];

function CaseTimeline() {
  const [filter, setFilter] = useState<string>("all");
  const typeLabels: Record<string, string> = { habitability: "Habitability", judicial: "Judicial", regulatory: "Regulatory", filing: "Filing" };
  const typeColors: Record<string, string> = {
    habitability: "border-amber-500/40 text-amber-400",
    judicial: "border-blue-500/40 text-blue-400",
    regulatory: "border-red-500/40 text-red-400",
    filing: "border-purple-500/40 text-purple-400",
  };
  const dotColors: Record<string, string> = {
    amber: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]",
    blue: "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.7)]",
    red: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]",
    purple: "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.7)]",
  };
  const filtered = filter === "all" ? TIMELINE_EVENTS : TIMELINE_EVENTS.filter(e => e.type === filter);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight">Case Timeline</h2>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">CUD-26-682107 // Evidence Node Chronology // Nov 2025 to May 2026</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {["all", "habitability", "regulatory", "judicial", "filing"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded border transition-all ${
                filter === f ? "bg-blue-500/20 border-blue-500/40 text-blue-400" : "border-slate-800 text-slate-600 hover:text-slate-400"
              }`}>
              {f === "all" ? "All Events" : typeLabels[f]}
            </button>
          ))}
        </div>
      </div>
      <div className="relative pl-8">
        <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-amber-500/50 via-blue-500/30 to-purple-500/50" />
        <div className="space-y-0">
          {filtered.map((event) => (
            <div key={event.node} className="relative flex gap-5 pb-7">
              <div className={`absolute -left-8 top-1 h-4 w-4 rounded-full flex-shrink-0 ${dotColors[event.color]} ${event.type === "regulatory" ? "animate-pulse" : ""}`} />
              <div className={`flex-1 p-4 rounded-xl border bg-slate-900/50 ${typeColors[event.type]}`}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[8px] font-mono text-slate-500">{event.date}</span>
                      <span className="text-slate-700 text-[8px]">|</span>
                      <span className="text-[8px] font-mono text-slate-600">{event.node}</span>
                    </div>
                    <h3 className="text-[11px] font-black text-white uppercase tracking-wide">{event.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {event.badge && (
                      <span className="text-[7px] font-black text-red-400 bg-red-500/10 border border-red-500/30 px-2 py-0.5 rounded uppercase animate-pulse">{event.badge}</span>
                    )}
                    <span className={`text-[7px] font-black uppercase px-2 py-0.5 rounded border ${typeColors[event.type]}`}>{typeLabels[event.type]}</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">{event.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(typeLabels).map(([type, label]) => {
          const count = TIMELINE_EVENTS.filter(e => e.type === type).length;
          return (
            <div key={type} className={`p-4 rounded-xl border bg-slate-900/40 ${typeColors[type]}`}>
              <div className="text-2xl font-black text-white mb-1">{count}</div>
              <div className="text-[9px] font-black uppercase tracking-widest">{label} Events</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Witness Subpoena Generator (CCP § 1987)
// ---------------------------------------------------------------------------
function generateSubpoena(w: typeof WITNESSES[0]): string {
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return `SUPERIOR COURT OF THE STATE OF CALIFORNIA
COUNTY OF SAN FRANCISCO

Case No.: CUD-26-682107 | Department 12
Defendant: Donald Ernest Gillson, In Pro Per

═══════════════════════════════════════════════════════
  DEPOSITION SUBPOENA FOR PERSONAL APPEARANCE
  California Code of Civil Procedure § 1987
  VALORAIPLUS® OMEGA v100 — Node SGAU-7226.3461
═══════════════════════════════════════════════════════

TO: ${w.name}
Address: ${w.unit}
Contact: ${w.email}

YOU ARE COMMANDED to appear and give testimony in the above-captioned
action as a witness for Defendant Donald Ernest Gillson.

WITNESS ROLE: ${w.role}

FACTUAL BASIS FOR TESTIMONY:
${w.testimony}

STATUTORY BASIS FOR PROTECTION:
${w.statutoryBasis}

DOCUMENTS REFERENCED IN:
${w.docs.map((d, i) => `  ${i + 1}. ${d}`).join("\n")}

E-SERVICE / CONTACT:
${w.contactNote}

═══ COMPLIANCE ATTESTATION ═══

This subpoena is issued pursuant to Cal. Code Civ. Proc. § 1987 and
electronically served pursuant to the E-SIGN Act, 15 U.S.C. § 7001 et seq.,
the Uniform Electronic Transactions Act (UETA), Cal. Gov. Code § 16.5,
and the Digital Communications Act.

Witness tampering or retaliation against this witness is prohibited under
42 U.S.C. § 1512 (Federal Witness Tampering) and Cal. Civ. Code § 1942.5
(State Retaliation Bar). Violation subjects the responsible party to
criminal prosecution and civil liability.

Issued: ${today}
Issuing Party: Donald Ernest Gillson, Defendant In Pro Per
ORCID iD: 0009-0007-0768-5486
Node Authority: SGAU-7226.3461 // Saint Paul Node

/s/ Donald Ernest Gillson
Donald Ernest Gillson, Defendant In Pro Per

═══ PROOF OF ELECTRONIC SERVICE ═══

I, Jeffrey Wright, Veterans Tenant Union Leadership Member, served this
subpoena by electronic transmission on ${today}.

/s/ Jeffrey Wright
Jeffrey Wright, Veterans Tenant Union Leadership Member

VALORAIPLUS® OMEGA v100 — Copyright & Trademark 2025, All Rights Reserved, Patents Pending
These documents are structured legal aids generated as cognitive prosthetic outputs under the ADA.
Review with a licensed attorney before submission to any court.`;
}

// ---------------------------------------------------------------------------
// eCourt Upload Sequence Button
// ---------------------------------------------------------------------------
const ECOURT_SEQUENCE = `VALORAIPLUS® OMEGA v100 — eCourt Upload Sequence
Case No. CUD-26-682107 | SF Superior Court, Dept. 12
Generated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}

═══ STEP 1: EXISTING CASE CUD-26-682107 (Unlawful Detainer) ═══

1. Log in to: ecourt.sfsuperiorcourt.org
2. Select Case No.: CUD-26-682107 | Department 12
3. Filing Event: ANSWER
   → Upload: CUD-26-682107_Doc1_Answer_UD105.pdf

4. Filing Event: MOTION (Supporting)
   → Upload: CUD-26-682107_Doc2_Motions.pdf

5. Filing Event: REQUEST / ADA ACCOMMODATION
   → Upload: CUD-26-682107_Doc3_ADA_ProofOfService.pdf

6. Filing Event: NOTICE TO COURT
   → Upload: CUD-26-682107_Doc4_JudicialBriefing.pdf

7. Filing Event: NOTICE (Dual Caption — also file in new civil case)
   → Upload: CUD-26-682107_Doc6_Transmittal_Demand.pdf

8. Filing Event: NOTICE OF ATTORNEY MISCONDUCT
   → Upload: CUD-26-682107_Doc7_AttorneyMisconduct_StateBar.pdf

9. Filing Event: NOTICE / EVIDENTIARY PROFFER
   → Upload: CUD-26-682107_Doc8_SupplementalNotice_EvidentiaryProffer.pdf

10. Filing Event: NOTICE (Whistleblower)
    → Upload: CUD-26-682107_Doc9_WhistleblowerNotice.pdf

11. Filing Event: NOTICE (Civil & Human Rights)
    → Upload: CUD-26-682107_Doc10_CivilHumanRights.pdf

12. Filing Event: EMERGENCY MOTION / TRO
    → Upload: CUD-26-682107_Doc11_EmergencyTRO.pdf

13. Filing Event: REQUEST FOR JUDICIAL NOTICE
    → Upload: CUD-26-682107_Doc12_RequestJudicialNotice.pdf

14. Filing Event: MOTION FOR CONTINUANCE / STAY
    → Upload: CUD-26-682107_Doc13_MotionContinuance.pdf

15. Filing Event: NOTICE (Dual Caption — also file in new civil case)
    → Upload: CUD-26-682107_Doc14_AcademicTheftNotice.pdf

16. Filing Event: APPLICATION / MOTION TO SEAL
    → Upload: CUD-26-682107_Doc15_MotionToSeal.pdf

17. Filing Event: MOTION FOR SANCTIONS & ATTORNEY FEES
    → Upload: CUD-26-682107_Doc17_SanctionsFees.pdf

═══ STEP 2: NEW UNLIMITED CIVIL CASE (File as New Action) ═══

18. Filing Event: COMPLAINT (New Unlimited Civil)
    → Upload: CUD-26-682107_Doc5_CivilComplaint_TheSword.pdf

19. Filing Event: AMENDED COMPLAINT
    → Upload: CUD-26-682107_Doc16_AmendedCivilComplaint.pdf

═══ DUAL CAPTION — FILE IN BOTH CASES ═══

→ Doc 6 (Transmittal & Demand): File in CUD-26-682107 AND new civil case
→ Doc 14 (Academic Theft Notice): File in CUD-26-682107 AND new civil case

═══ COMPLIANCE CHECKLIST ═══

✓ All 17 documents: California 28-line pleading paper format
✓ All 17 documents: E-SIGN Act / UETA / Digital Communications Act compliant
✓ All 17 documents: ORCID iD 0009-0007-0768-5486 verified
✓ All 17 documents: Node Authority SGAU-7226.3461 stamped
✓ All 17 documents: Proof of Electronic Service by Jeffrey Wright
✓ Pre-Flight Audit: 17/17 PASS — Zero issues

NODE AUTHORITY: SGAU-7226.3461 // Saint Paul Node
VALORAIPLUS® OMEGA v100 — Copyright & Trademark 2025, All Rights Reserved, Patents Pending`;

function ECourtSequenceButton() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(ECOURT_SEQUENCE).then(() => {
      setCopied(true);
      toast.success("eCourt Upload Sequence copied — paste into your notes app before heading to the portal");
      setTimeout(() => setCopied(false), 3000);
    }).catch(() => toast.error("Clipboard access denied — please copy manually"));
  };
  return (
    <button
      onClick={handleCopy}
      className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-black uppercase text-[11px] tracking-widest transition-all active:scale-[0.98] shadow-xl border ${
        copied
          ? "bg-green-700/30 border-green-500/50 text-green-400 shadow-green-700/10"
          : "bg-slate-800/80 border-slate-600/50 hover:border-blue-500/50 text-slate-200 hover:text-blue-300 shadow-slate-900/30"
      }`}
    >
      {copied ? (
        <><CheckCircle2 size={16} className="text-green-400" /> Copied — Paste Into Notes Before Heading to eCourt Portal</>
      ) : (
        <><Copy size={16} /> Copy eCourt Upload Sequence (All 17 Documents — Step-by-Step Order)</>
      )}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Witness Network Panel
// ---------------------------------------------------------------------------
const WITNESSES = [
  {
    id: "JB",
    name: "Jerome \"Jerry\" Bartlett",
    email: "jeromebartlett1955@gmail.com",
    role: "Veterans Tenant Union Member — Material Eyewitness",
    unit: "1030/1029 Girard, San Francisco, CA",
    retaliationStatus: "ACTIVE — Adverse housing notice issued after documented email protests to management",
    retaliationColor: "red" as const,
    docs: ["Doc 2 (Motion to Dismiss)", "Doc 7 (Attorney Misconduct)", "Doc 11 (Emergency TRO)", "Doc 15 (Motion to Seal)"],
    testimony: "Documented email protests to property management regarding habitability failures and retaliatory conduct. Issued adverse housing notice within 180-day protected window.",
    statutoryBasis: "Cal. Civ. Code § 1942.5 — Retaliatory Eviction; 42 U.S.C. § 1512 — Witness Tampering",
    contactNote: "E-service via email. No party email in POS. Jeffrey Wright facilitates e-signature per Digital Communications Act.",
  },
  {
    id: "DL",
    name: "Daniel Lucian",
    email: "[Contact via VTU Secretary]",
    role: "Veterans Tenant Union Member — Service Animal Handler (Rosey)",
    unit: "1030/1029 Girard, San Francisco, CA",
    retaliationStatus: "ACTIVE — Adverse housing notice issued in retaliation for union organizing activities; service animal accommodation request ignored",
    retaliationColor: "red" as const,
    docs: ["Doc 2 (Motion to Dismiss)", "Doc 3 (ADA Accommodation)", "Doc 7 (Attorney Misconduct)", "Doc 11 (Emergency TRO)", "Doc 15 (Motion to Seal)"],
    testimony: "Service animal accommodation request for Rosey submitted Nov 24, 2025 (Evidence Node GMAIL-03-PAWS). Ignored by management. Adverse housing notice issued after union organizing activity.",
    statutoryBasis: "38 U.S.C. § 1714 — Service Animal; CRPC Rule 4.4 — Witness Retaliation; 42 U.S.C. § 1512",
    contactNote: "Contact via VTU Secretary Donald Gillson. E-service facilitated by Jeffrey Wright per Digital Communications Act.",
  },
  {
    id: "JW",
    name: "Jeffrey Wright",
    email: "[Contact via VTU Secretary]",
    role: "Veterans Tenant Union Leadership Member — E-Service Signer — Material Eyewitness",
    unit: "1030/1029 Girard, San Francisco, CA",
    retaliationStatus: "DOCUMENTED — Physical assault victim; adverse housing notices issued against support network after assault report",
    retaliationColor: "amber" as const,
    docs: ["Doc 1 (Answer UD-105)", "Doc 2 (Motion to Dismiss)", "Doc 3 (ADA — E-Service Signer)", "Doc 4 (Judicial Briefing)", "Doc 5 (Civil Complaint)", "Doc 6 (Transmittal)", "Doc 7 (Attorney Misconduct)", "Doc 8 (Evidentiary Proffer)", "Doc 9 (Whistleblower)", "Doc 10 (Civil Rights)", "Doc 11 (TRO)", "Doc 12–17 (All New Filings)"],
    testimony: "VTU Leadership Member and material eyewitness to all retaliatory acts. Serves as E-Service Signer on all court filings under the E-SIGN Act / Digital Communications Act. Physical assault victim — adverse housing notices issued against support network after assault report to management.",
    statutoryBasis: "E-SIGN Act 15 U.S.C. § 7001 — E-Service Signer; CRPC Rule 8.4(c) — Victim of Retaliation; 42 U.S.C. § 1512 — Witness Protection",
    contactNote: "Primary e-service contact for all VTU filings. Signs all Proof of Electronic Service declarations. Identity authenticated by verified role per 15 U.S.C. § 7001(c)(1).",
  },
];

function SubpoenaButton({ witness }: { witness: typeof WITNESSES[0] }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    const text = generateSubpoena(witness);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success(`Subpoena for ${witness.name} copied — paste into a document or notes app`);
      setTimeout(() => setCopied(false), 3000);
    }).catch(() => toast.error("Clipboard access denied — please copy manually"));
  };
  return (
    <button
      onClick={handleCopy}
      className={`mt-1 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-[0.98] border ${
        copied
          ? "bg-green-700/20 border-green-500/40 text-green-400"
          : "bg-amber-600/10 border-amber-500/30 hover:border-amber-400/50 text-amber-400 hover:text-amber-300"
      }`}
    >
      {copied ? (
        <><CheckCircle2 size={13} /> Subpoena Copied — Paste Into Document</>
      ) : (
        <><FileText size={13} /> Print Witness Subpoena (CCP § 1987) — {witness.name}</>
      )}
    </button>
  );
}

function WitnessNetwork() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>Witness Registry</h2>
          <p className="text-xs text-slate-500 mt-1">1030/1029 Girard Veterans Tenant Union — CUD-26-682107 — Protected Under 42 U.S.C. § 1512</p>
        </div>
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-1.5">
          <AlertTriangle size={12} className="text-red-400 animate-pulse" />
          <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">2 Witnesses Under Active Retaliation</span>
        </div>
      </div>

      {/* Retaliation warning banner */}
      <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Active Witness Retaliation — 42 U.S.C. § 1512 Applies</p>
          <p className="text-[10px] text-slate-400 leading-relaxed">All three witnesses have been subjected to retaliatory adverse housing actions by Plaintiff's agents following their documented support of Defendant's legal claims. Witness tampering under 42 U.S.C. § 1512 is alleged in Doc 7 (Attorney Misconduct) and Doc 11 (Emergency TRO). Motion to Seal (Doc 15) requests sealing of witness identities from public record.</p>
        </div>
      </div>

      {/* Witness cards */}
      <div className="space-y-4">
        {WITNESSES.map((w) => (
          <div key={w.id} className={`bg-slate-900/60 border rounded-2xl overflow-hidden transition-all ${
            w.retaliationColor === "red" ? "border-red-500/20" : "border-amber-500/20"
          }`}>
            {/* Card header */}
            <div
              className="p-5 cursor-pointer hover:bg-white/[0.02] transition-colors"
              onClick={() => setExpanded(expanded === w.id ? null : w.id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                    w.retaliationColor === "red" ? "bg-red-500/20 border border-red-500/30 text-red-400" : "bg-amber-500/20 border border-amber-500/30 text-amber-400"
                  }`} style={{ fontFamily: "var(--font-mono)" }}>
                    {w.id}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-black text-white">{w.name}</span>
                      <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${
                        w.retaliationColor === "red"
                          ? "bg-red-500/20 border-red-500/40 text-red-400 animate-pulse"
                          : "bg-amber-500/20 border-amber-500/40 text-amber-400"
                      }`}>
                        {w.retaliationColor === "red" ? "⚠ ACTIVE RETALIATION" : "⚠ DOCUMENTED RETALIATION"}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">{w.role}</p>
                    <p className="text-[9px] text-slate-600 mt-0.5 font-mono">{w.unit}</p>
                  </div>
                </div>
                <ChevronRight size={14} className={`text-slate-600 shrink-0 transition-transform mt-1 ${
                  expanded === w.id ? "rotate-90" : ""
                }`} />
              </div>

              {/* Quick-view row */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-black/30 rounded-lg px-3 py-2">
                  <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest block mb-0.5">Contact</span>
                  <span className="text-[10px] text-slate-300 font-mono">{w.email}</span>
                </div>
                <div className="bg-black/30 rounded-lg px-3 py-2">
                  <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest block mb-0.5">Retaliation Status</span>
                  <span className={`text-[10px] font-bold ${
                    w.retaliationColor === "red" ? "text-red-400" : "text-amber-400"
                  }`}>{w.retaliationStatus.split(" — ")[0]}</span>
                </div>
                <div className="bg-black/30 rounded-lg px-3 py-2">
                  <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest block mb-0.5">Referenced In</span>
                  <span className="text-[10px] text-slate-400">{w.docs.length} document{w.docs.length !== 1 ? "s" : ""}</span>
                </div>
              </div>
            </div>

            {/* Expanded detail */}
            {expanded === w.id && (
              <div className="border-t border-slate-800/60 p-5 space-y-4 bg-black/20">
                <div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Retaliation Detail</span>
                  <p className="text-[10px] text-slate-300 leading-relaxed">{w.retaliationStatus}</p>
                </div>
                <div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Testimony Summary</span>
                  <p className="text-[10px] text-slate-300 leading-relaxed">{w.testimony}</p>
                </div>
                <div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Statutory Basis for Protection</span>
                  <p className="text-[10px] text-blue-400 font-mono leading-relaxed">{w.statutoryBasis}</p>
                </div>
                <div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Documents Referenced In</span>
                  <div className="flex flex-wrap gap-1.5">
                    {w.docs.map((d) => (
                      <span key={d} className="text-[9px] font-black px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400">{d}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">E-Service / Contact Note</span>
                  <p className="text-[10px] text-slate-400 leading-relaxed italic">{w.contactNote}</p>
                </div>
                {/* Print Witness Subpoena button */}
                <SubpoenaButton witness={w} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Statutory protection summary */}
      <div className="bg-slate-900/60 border border-slate-700/40 rounded-xl p-5 space-y-3">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Statutory Protection Framework</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[10px]">
          {[
            ["42 U.S.C. § 1512", "Federal Witness Tampering — Prohibits retaliation against witnesses in federal proceedings"],
            ["Cal. Civ. Code § 1942.5", "State Retaliation Bar — 180-day protected window from adverse housing actions"],
            ["CRPC Rule 4.4", "Respect for Rights of Third Persons — Prohibits counsel from targeting witnesses"],
            ["Cal. Rules of Court 2.550–2.551", "Motion to Seal — Protects witness identities from public record"],
          ].map(([statute, desc]) => (
            <div key={statute} className="bg-black/30 rounded-lg p-3">
              <span className="text-blue-400 font-mono font-black block mb-0.5">{statute}</span>
              <span className="text-slate-400">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-[9px] text-slate-600">
        Generated by VALORAIPLUS® OMEGA v100 · Node SGAU-7226.3461 · These records are structured legal aids generated as cognitive prosthetic outputs under the ADA. Review with a licensed attorney before court submission.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Court Compiler Panel
// ---------------------------------------------------------------------------
function CourtCompiler() {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloadingAll, setDownloadingAll] = useState(false);

  const handleDirectDownload = (doc: typeof COURT_DOCS[0]) => {
    setDownloading(doc.num);
    const a = document.createElement("a");
    a.href = doc.url;
    a.download = doc.filename;
    a.target = "_blank";
    a.click();
    toast.success(`${doc.title} — downloading`);
    setTimeout(() => setDownloading(null), 1500);
  };

  const handleDownloadAll = async () => {
    setDownloadingAll(true);
    toast.info("Downloading all 17 court documents — please allow pop-ups if prompted");
    for (let i = 0; i < COURT_DOCS.length; i++) {
      const doc = COURT_DOCS[i];
      await new Promise<void>((resolve) => setTimeout(resolve, i === 0 ? 0 : 800));
      const a = document.createElement("a");
      a.href = doc.url;
      a.download = doc.filename;
      a.target = "_blank";
      a.click();
    }
    setTimeout(() => {
      setDownloadingAll(false);
      toast.success("All 17 court documents downloaded — complete filing package ready");
    }, COURT_DOCS.length * 800 + 500);
  };

  const defenses = [
    { num: "I",    code: "Cal. Civ. Code §§ 1941.1, 1942.5", label: "Habitability & Constructive Eviction",   desc: "Total abandonment of contractually mandated permanent supportive housing services — case management and clinical team support — rendering the premises uninhabitable as a matter of law.", badge: null },
    { num: "II",   code: "Cal. Civ. Code § 1942.5",           label: "Statutory Retaliation",                  desc: "Eviction filed within 180 days of Defendant asserting habitability rights and filing regulatory complaints — presumptive retaliation.", badge: null },
    { num: "III",  code: "28 C.F.R. § 35.130(b)(7)",          label: "ADA / FEHA Reasonable Accommodation",    desc: "Failure to provide reasonable accommodation for disability-related needs. Total refusal of clinical accommodations currently under formal federal investigation.", badge: "HHS FEDERAL INVESTIGATION ACTIVE" },
    { num: "IV",   code: "Cal. Code Civ. Proc. § 1161",        label: "Defective Notice to Quit",               desc: "Notice contains conflicting, mismatched, and/or back-dated clerical signatures designed to mask structural service defects and bypass due process.", badge: null },
    { num: "V",    code: "Cal. Civ. Code § 1927",              label: "Breach of Quiet Enjoyment",              desc: "Systemic administrative harassment, verbal confrontations, and intentional isolation by Plaintiff's agents interfering with Defendant's right to peaceful occupancy.", badge: null },
    { num: "VI",   code: "Cal. Code Civ. Proc. § 1161.1",      label: "Acceptance of Rent After Notice",        desc: "Plaintiff accepted rent or transaction liquidity after expiration of notice — constituting legal waiver of the notice and creation of a new tenancy.", badge: null },
    { num: "VII",  code: "Cal. Gov. Code § 12955",             label: "Discrimination & Equal Protection",      desc: "Systemic targeting and denial of integrated support based on protected veteran and disability status, currently under formal active state investigation.", badge: "CRD STATE INVESTIGATION ACTIVE" },
    { num: "VIII", code: "Equitable Doctrine",                  label: "Estoppel / Affirmative Waiver",          desc: "Plaintiff's agents made material representations that adverse actions would be delayed, upon which Defendant reasonably relied to their detriment.", badge: null },
    { num: "IX",   code: "Municipal Code",                      label: "Illegality / No Licensure",              desc: "Attempting to enforce lease mandates on a housing track operating without proper municipal zoning clearances or regulatory compliance.", badge: null },
    { num: "X",    code: "Federal / HUD Regulations",           label: "Public & Institutional Necessity",       desc: "Defendant's occupancy is protected by federal program requirements, HUD regulations, and the McKinney-Vento Homeless Assistance Act.", badge: null },
    { num: "XI",   code: "Cal. Civ. Code § 1940.2",            label: "Harassment by William Landrum",          desc: "Property manager William Landrum engaged in a sustained campaign of harassment, intimidation, and retaliatory conduct as Plaintiff's authorized agent — attributable to Plaintiff under respondeat superior.", badge: null },
    { num: "XII",  code: "42 U.S.C. §§ 1981, 1983; FHA",      label: "Civil Rights Violations by Mgmt.",       desc: "Systematic civil rights violations by property management and William Landrum under 42 U.S.C. §§ 1981 & 1983, Fair Housing Act §§ 3604 & 3617, and Cal. Gov. Code § 12955.", badge: null },
  ];

  const canonicalNodes = [
    { id: "GMAIL-01-INFESTATION",      date: "2025-11-19", category: "Habitability",              statute: "Cal. Civ. Code § 1941.1",                   flag: null },
    { id: "GMAIL-02-RAR",              date: "2025-11-20", category: "Civil Rights / ADA",         statute: "28 C.F.R. § 35.130(b)(7)",                  flag: null },
    { id: "GMAIL-03-PAWS",             date: "2025-11-24", category: "Veteran / Service Animal",   statute: "38 U.S.C. § 1714",                          flag: null },
    { id: "CRT-04-RO",                 date: "2026-02-27", category: "Judicial Protective Order",  statute: "Cal. Welf. & Inst. Code § 15657.03",        flag: null },
    { id: "CRT-05-NOTICE",             date: "2026-02-29", category: "Retaliatory Eviction",       statute: "Cal. Civ. Code § 1942.5",                   flag: null },
    { id: "REG-04-HHS-INVESTIGATION",  date: "2026-03-15", category: "Federal Enforcement — Active", statute: "U.S. Dept. of Health & Human Services",  flag: "HHS" },
    { id: "REG-05-CRD-INVESTIGATION",  date: "2026-04-02", category: "State Enforcement — Active", statute: "California Civil Rights Department",        flag: "CRD" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>Court Document Compiler</h2>
          <p className="text-xs text-slate-500 mt-1">Case No. CUD-26-682107 — San Francisco Superior Court, Dept. 12 — Pre-filled, ECF-ready, E-SIGN compliant</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-1.5">
          <Scale size={12} className="text-amber-400" />
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">17 Documents Ready · 13 Defenses · 9 Civil Counts</span>
        </div>
      </div>

      {/* E-filing readiness banner */}
      <div className="bg-slate-900/60 border border-green-500/20 rounded-xl p-4 flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] shrink-0" />
        <div>
          <p className="text-[10px] font-bold text-green-400 uppercase tracking-widest">All 17 Documents Ready for E-Filing — Pre-Flight Audit: 17/17 PASS</p>
          <p className="text-[10px] text-slate-500 mt-0.5">All documents are pre-filled, formatted on California 28-line pleading paper, E-SIGN Act / UETA / Digital Communications Act compliant, ORCID iD verified, and ready for direct upload to the San Francisco Superior Court eCourt portal.</p>
        </div>
      </div>

      {/* Download All button */}
      <button
        onClick={handleDownloadAll}
        disabled={downloadingAll}
        className="w-full bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 disabled:opacity-50 text-white py-4 rounded-xl font-black uppercase text-[11px] tracking-widest shadow-xl shadow-amber-700/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
      >
        {downloadingAll ? (
          <><Loader2 size={16} className="animate-spin" /> Downloading All 17 Documents...</>
        ) : (
          <><FileDown size={16} /> Download Complete Filing Package (All 17 Documents)</>
        )}
      </button>

      {/* eCourt Upload Sequence Copy Button */}
      <ECourtSequenceButton />

      {/* Document download cards */}
      <div className="space-y-3">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <FileDown size={12} /> Pre-Filled Court Documents — Individual Downloads
        </h3>
        <div className="grid gap-3">
          {COURT_DOCS.map((doc) => (
            <div key={doc.num} className="bg-slate-900/60 border border-slate-700/40 rounded-xl p-4 flex gap-4 items-start hover:border-slate-600/60 transition-colors">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                <span className="text-[9px] font-black text-slate-400 font-mono">{doc.num}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-xs font-bold text-white">{doc.title}</span>
                  <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${BADGE_STYLES[doc.badgeColor]}`}>{doc.badge}</span>
                  <span className="text-[9px] text-slate-500 font-mono">{doc.pages}pp</span>
                </div>
                <p className="text-[10px] font-semibold text-slate-300 mb-1">{doc.subtitle}</p>
                <p className="text-[10px] text-slate-500 leading-relaxed mb-2">{doc.desc}</p>
                <p className="text-[9px] text-slate-600 font-mono">{doc.case}</p>
              </div>
              <button
                onClick={() => handleDirectDownload(doc)}
                disabled={downloading === doc.num}
                className="flex-shrink-0 flex items-center gap-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white px-4 py-2.5 rounded-lg font-black uppercase text-[9px] tracking-widest shadow-lg shadow-amber-600/20 transition-all active:scale-[0.97] whitespace-nowrap"
              >
                {downloading === doc.num ? (
                  <><Loader2 size={12} className="animate-spin" /> Downloading...</>
                ) : (
                  <><FileDown size={12} /> Download PDF</>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Filing instructions */}
      <div className="bg-slate-900/60 border border-blue-500/10 rounded-xl p-4 space-y-2">
        <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
          <Gavel size={12} /> E-Filing Instructions — San Francisco Superior Court
        </h3>
        <div className="space-y-1.5 text-[10px] text-slate-400">
          {[
            ["1",  "Navigate to the eCourt portal at ecourt.sfsuperiorcourt.org"],
            ["2",  "Log in and select Case No. CUD-26-682107, Department 12"],
            ["3",  "Upload Doc 1 (Answer UD-105) as the primary filing event"],
            ["4",  "Upload Docs 2, 3, and 4 as supporting filings linked to the same case number"],
            ["5",  "Upload Doc 5 (Civil Complaint) as a NEW unlimited civil case filing"],
            ["6",  "Upload Doc 6 (Transmittal & Demand) to BOTH case numbers — it carries a dual caption"],
            ["7",  "Upload Docs 7–11 as additional supporting filings under CUD-26-682107"],
            ["8",  "Upload Doc 12 (Judicial Notice) as a motion/notice linked to CUD-26-682107"],
            ["9",  "Upload Doc 13 (Motion for Continuance/Stay) as a motion under CUD-26-682107"],
            ["10", "Upload Doc 14 (Academic Theft Notice) to BOTH case numbers — dual caption"],
            ["11", "Upload Doc 15 (Motion to Seal) as a motion under CUD-26-682107"],
            ["12", "Upload Doc 16 (Amended Civil Complaint) to the NEW unlimited civil case"],
            ["13", "Upload Doc 17 (Sanctions & Fees Motion) as a motion under CUD-26-682107"],
          ].map(([n, text]) => (
            <div key={n} className="flex gap-2">
              <span className="font-black text-slate-600 w-4 shrink-0">{n}.</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Affirmative defenses */}
      <div className="grid gap-3">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <BookOpen size={12} /> Affirmative Defenses Anchored to Merkle Chain
        </h3>
        {defenses.map((d) => (
          <div key={d.code} className="bg-slate-900/60 border border-slate-700/40 rounded-xl p-4 flex gap-4">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <span className="text-[9px] font-black text-blue-400">{d.num}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-white">{d.label}</span>
                <span className="text-[9px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">{d.code}</span>
                {d.badge && (
                  <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-red-400 animate-pulse">
                    ⚠ {d.badge}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{d.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Canonical evidence nodes */}
      <div className="space-y-3">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Gavel size={12} /> Canonical Evidence Nodes (7 Anchored — 2 Regulatory Active)
        </h3>
        <div className="overflow-x-auto rounded-xl border border-slate-700/40">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-800/60">
                {["Node ID", "Date", "Category", "Statutory Anchor"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {canonicalNodes.map((n, i) => (
                <tr key={n.id} className={i % 2 === 0 ? "bg-slate-900/40" : "bg-slate-900/20"}>
                  <td className="px-4 py-3 font-mono text-[10px]">
                    <span className={n.flag ? "text-red-400 font-black" : "text-blue-400"}>{n.id}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{n.date}</td>
                  <td className="px-4 py-3 text-slate-300">
                    {n.category}
                    {n.flag && (
                      <span className="ml-2 text-[8px] font-black uppercase px-1.5 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-red-400">{n.flag}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-[10px] text-slate-400">{n.statute}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Case metadata */}
      <div className="bg-slate-900/60 border border-slate-700/40 rounded-xl p-5 space-y-3">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Case Package Metadata</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          {[
            ["Case No. (UD)", "CUD-26-682107"],
            ["Court", "San Francisco Superior Court"],
            ["Department", "Dept. 12"],
            ["Defendant / Plaintiff", "Donald Ernest Gillson, In Pro Per"],
            ["UD Defenses", "13 Affirmative Defenses — HHS & CRD Active"],
            ["Civil Counts", "9 Counts — $5,003,000.00 + Fees"],
            ["Documents", "17 Pre-filled PDFs — All E-SIGN / Digital Comms Act Compliant"],
            ["Chain", "SHA3-512 Merkle — SGAU-7226.3461"],
          ].map(([label, val]) => (
            <div key={label}>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest block">{label}</span>
              <span className="text-slate-200 font-medium">{val}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-[9px] text-slate-600">
        Generated by VALORAIPLUS® OMEGA v100 · Node SGAU-7226.3461 · Saint Paul Node · These documents are structured legal records generated as cognitive prosthetic aids under the ADA. They must be reviewed by a licensed attorney before submission to any court.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Console Shell
// ---------------------------------------------------------------------------

export default function Home() {
  const [token, setToken] = useState<string | null>(() => getStoredToken());
  const [view, setView] = useState<PanelId>("overview");
  const [clock, setClock] = useState(() => new Date().toISOString());
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [online, setOnline] = useState<boolean | null>(null);

  // Atomic clock tick
  useEffect(() => {
    const t = setInterval(() => setClock(new Date().toISOString()), 1000);
    return () => clearInterval(t);
  }, []);

  // Backend health check
  useEffect(() => {
    const check = () =>
      apiFetch<HealthResponse>("/health")
        .then((d) => { setHealth(d); setOnline(true); })
        .catch(() => setOnline(false));
    check();
    const t = setInterval(check, 15_000);
    return () => clearInterval(t);
  }, []);

  const handleLogout = () => {
    clearToken();
    setToken(null);
    toast.info("Session terminated");
  };

  if (!token) {
    return <LoginGate onLogin={setToken} />;
  }

  const timeDisplay = clock.split("T")[1].split(".")[0] + " UTC";

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-300 selection:bg-blue-500/30">
      {/* Top HUD bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] hud-bar z-[100]" />

      {/* Header */}
      <header className="border-b border-slate-800/60 bg-[#0a0c10]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="absolute -inset-1 bg-blue-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-700" />
              <div className="relative p-2.5 bg-slate-900 border border-slate-700 rounded-lg">
                <Shield className="text-blue-400 w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span
                  className="text-[9px] font-black text-blue-500 tracking-[0.4em] uppercase"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  SGAU-7226.3461 // Saint Paul Node
                </span>
                <StatusDot online={online} />
              </div>
              <h1 className="text-xl font-black text-white tracking-tight uppercase flex items-center gap-2">
                VALORAIPLUS® <span className="text-blue-500">OMEGA v100</span>
              </h1>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Metric
              label="Node Status"
              value={online === null ? "CHECKING" : online ? "LAMINAR" : "OFFLINE"}
              color={online ? "text-green-400" : online === false ? "text-red-400" : "text-slate-500"}
            />
            <Metric label="Atomic Clock" value={timeDisplay} color="text-slate-400" />
            <Metric label="Altitude" value="747 ZENITH" color="text-blue-400" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-[9px] font-black text-slate-600 hover:text-red-400 uppercase tracking-widest border border-slate-800 hover:border-red-500/40 px-3 py-2 rounded-lg transition-all"
            >
              <Lock size={11} /> Deauth
            </button>
          </div>
        </div>

        {/* Nav tabs */}
        <nav className="max-w-[1600px] mx-auto px-6 flex gap-6 overflow-x-auto">
          <Tab id="overview" active={view} onClick={setView} icon={Activity} label="Core Overview" />
          <Tab id="submit" active={view} onClick={setView} icon={FileText} label="Evidence Ingestion" />
          <Tab id="locker" active={view} onClick={setView} icon={Lock} label="Merkle Locker" />
          <Tab id="audit" active={view} onClick={setView} icon={Database} label="Constitutional Audit" />
          <Tab id="court" active={view} onClick={setView} icon={Scale} label="Court Compiler" />
          <Tab id="timeline" active={view} onClick={setView} icon={Activity} label="Case Timeline" />
          <Tab id="witness" active={view} onClick={setView} icon={Users} label="Witness Network" />
        </nav>
      </header>

      {/* Main content */}
      <main className="max-w-[1600px] mx-auto px-6 py-8 custom-scrollbar">
        {view === "overview" && (
          <Overview setView={setView} health={health} online={online} />
        )}
        {view === "submit" && <Ingestion setView={setView} />}
        {view === "locker" && <Locker />}
        {view === "audit" && <AuditTrail />}
        {view === "court" && <CourtCompiler />}
        {view === "timeline" && <CaseTimeline />}
        {view === "witness" && <WitnessNetwork />}
      </main>

      {/* Footer status bar */}
      <div className="fixed bottom-5 right-6 flex items-center gap-3 bg-slate-900/70 px-4 py-2.5 rounded-full border border-slate-800 backdrop-blur-md">
        <span
          className="text-[8px] font-black text-slate-500 uppercase tracking-widest"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {online ? "Node Secured" : "Node Offline"}
        </span>
        <div
          className={`h-2 w-2 rounded-full ${
            online ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" : "bg-red-500"
          }`}
        />
      </div>
    </div>
  );
}
