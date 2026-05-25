export type AppRole =
  | "admin"
  | "editor"
  | "viewer"
  | "agency_view"
  | "court_readonly";

export type DocStatus =
  | "DRAFT"
  | "STAGED"
  | "FILED"
  | "PENDING"
  | "LODGED"
  | "ACTIVE"
  | "EXECUTED"
  | "SUPERSEDED"
  | "WITHHELD_PRIVATE";

export type DocVisibility =
  | "public_redacted"
  | "court_restricted"
  | "agency_restricted"
  | "private_evidence"
  | "sealed_requested"
  | "sealed_by_order";

export type DocPriority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export interface CaseRecord {
  id: string;
  case_number: string;
  related_case: string | null;
  court: string;
  department: string | null;
  judge: string | null;
  plaintiff: string | null;
  defendant: string | null;
  defendant_status: string | null;
  master_repository: string | null;
  filing_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CaseDocument {
  id: string;
  case_id: string;
  doc_number: string;
  upload_order: number | null;
  sort_order?: number | null;
  title: string;
  short_description: string | null;
  doc_type: string | null;
  stack: string | null;
  status: DocStatus;
  visibility?: DocVisibility | null;
  priority: DocPriority | null;
  filing_date: string | null;
  filed_at?: string | null;
  page_count?: number | null;
  clerk_note: string | null;
  court_note?: string | null;
  redacted_file_url?: string | null;
  repository_url: string | null;
  redacted_sha256_hash?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CaseDashboardPayload {
  caseRecord: CaseRecord | null;
  documents: CaseDocument[];
  summary: {
    total: number;
    filed: number;
    pending: number;
    lodged: number;
    active: number;
    critical: number;
    high: number;
  };
}

export type RequestCategory =
  | "page"
  | "pdf"
  | "api"
  | "asset"
  | "document"
  | "search"
  | "unknown";

export type UserAgentFamily =
  | "bot"
  | "mobile_browser"
  | "desktop_browser"
  | "unknown";

export interface AccessSummaryRow {
  hour_bucket: string;
  request_category: RequestCategory;
  country_code: string | null;
  total_hits: number;
  pdf_hits: number;
  bot_like_hits: number;
  anomaly_hits: number;
}

export interface CategoryBreakdownRow {
  request_category: RequestCategory;
  total_hits: number;
  anomaly_hits: number;
  bot_like_hits: number;
  first_seen: string | null;
  last_seen: string | null;
}

export function isPublicCourtSafe(doc: CaseDocument): boolean {
  return (
    doc.visibility === "public_redacted" ||
    doc.visibility === null ||
    typeof doc.visibility === "undefined"
  );
}

export function rapidLegalSort(a: CaseDocument, b: CaseDocument): number {
  const aOrder = a.upload_order ?? 9999;
  const bOrder = b.upload_order ?? 9999;
  if (aOrder !== bOrder) return aOrder - bOrder;
  return a.doc_number.localeCompare(b.doc_number, undefined, { numeric: true });
}
