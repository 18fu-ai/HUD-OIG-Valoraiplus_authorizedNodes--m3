/**
 * VALORAIPLUS Case Dashboard Type System
 * Fully typed schema for case management, documents, deadlines, and forensics
 */

export type AppRole = 'admin' | 'editor' | 'viewer' | 'agency_view' | 'court_readonly';
export type DocStatus = 'DRAFT' | 'STAGED' | 'FILED' | 'PENDING' | 'LODGED' | 'ACTIVE' | 'EXECUTED' | 'SUPERSEDED' | 'WITHHELD_PRIVATE';
export type DocVisibility = 'public_redacted' | 'court_restricted' | 'agency_restricted' | 'private_evidence' | 'sealed_requested' | 'sealed_by_order';
export type DocPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type EventType = 'created' | 'uploaded' | 'staged' | 'filed' | 'served' | 'lodged' | 'emailed' | 'agency_submitted' | 'superseded' | 'redacted' | 'sealed_requested' | 'sealed' | 'reviewed' | 'deadline_added' | 'status_changed' | 'note_added';
export type DeadlineStatus = 'open' | 'completed' | 'continued' | 'missed' | 'cancelled';
export type AgencyStatus = 'pending' | 'submitted' | 'acknowledged' | 'rejected' | 'under_review' | 'closed';
export type AuditAction = 'INSERT' | 'UPDATE' | 'DELETE';

/**
 * Case Record
 */
export interface Case {
  id: string;
  case_number: string;
  related_case?: string;
  court: string;
  department?: string;
  judge?: string;
  plaintiff?: string;
  defendant?: string;
  defendant_status?: string;
  master_repository?: string;
  filing_date?: string;
  notes?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

/**
 * User Role Assignment
 */
export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  case_id?: string;
  created_at: string;
}

/**
 * Document (full record with all metadata)
 */
export interface Document {
  id: string;
  case_id: string;
  doc_number: string;
  sort_order?: number;
  upload_order?: number;
  title: string;
  short_description?: string;
  doc_type?: string;
  stack?: string;
  status: DocStatus;
  visibility: DocVisibility;
  priority?: DocPriority;
  filing_date?: string;
  filed_at?: string;
  served_at?: string;
  staged_at?: string;
  file_url?: string;
  redacted_file_url?: string;
  private_file_url?: string;
  repository_url?: string;
  clerk_note?: string;
  court_note?: string;
  agency_note?: string;
  internal_note?: string;
  sha256_hash?: string;
  redacted_sha256_hash?: string;
  page_count?: number;
  is_redacted: boolean;
  contains_private_contact_info: boolean;
  contains_medical_info: boolean;
  contains_witness_info: boolean;
  contains_minor_info: boolean;
  contains_financial_info: boolean;
  is_operational: boolean;
  is_reference_only: boolean;
  is_duplicate: boolean;
  supersedes_document_id?: string;
  superseded_by_document_id?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Public Court Document (filtered/safe view)
 */
export interface PublicCourtDocument {
  id: string;
  case_id: string;
  doc_number: string;
  upload_order?: number;
  title: string;
  short_description?: string;
  doc_type?: string;
  stack?: string;
  status: DocStatus;
  priority?: DocPriority;
  filing_date?: string;
  filed_at?: string;
  page_count?: number;
  clerk_note?: string;
  court_note?: string;
  redacted_file_url?: string;
  repository_url?: string;
  redacted_sha256_hash?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Document Relationship (linking related documents)
 */
export interface DocumentRelationship {
  id: string;
  case_id: string;
  source_document_id: string;
  target_document_id: string;
  relationship_type: string;
  note?: string;
  created_by?: string;
  created_at: string;
}

/**
 * Document Event (audit trail of document actions)
 */
export interface DocumentEvent {
  id: string;
  case_id: string;
  document_id?: string;
  event_type: EventType;
  event_title: string;
  event_note?: string;
  event_time: string;
  actor_user_id?: string;
  actor_label?: string;
  source_system?: string;
  external_reference?: string;
  created_at: string;
}

/**
 * Deadline (case-related deadline tracking)
 */
export interface Deadline {
  id: string;
  case_id: string;
  document_id?: string;
  title: string;
  deadline_at: string;
  deadline_type?: string;
  status: DeadlineStatus;
  alert_24h: boolean;
  alert_72h: boolean;
  alert_7d: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Agency Submission (tracking submissions to agencies)
 */
export interface AgencySubmission {
  id: string;
  case_id: string;
  document_id?: string;
  agency_name: string;
  agency_identifier?: string;
  submitted_at?: string;
  submission_method?: string;
  confirmation_number?: string;
  status: AgencyStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Audit Log Entry (immutable record of all changes)
 */
export interface AuditLogEntry {
  id: string;
  table_name: string;
  record_id?: string;
  action: AuditAction;
  changed_by?: string;
  changed_at: string;
  old_values?: Record<string, any>;
  new_values?: Record<string, any>;
}

/**
 * Dashboard Statistics
 */
export interface CaseDashboardStats {
  total_cases: number;
  active_cases: number;
  total_documents: number;
  filed_documents: number;
  pending_documents: number;
  upcoming_deadlines: number;
  overdue_deadlines: number;
  agency_submissions_pending: number;
  recent_events_count: number;
}

/**
 * Dashboard Summary for a Single Case
 */
export interface CaseSummary {
  case: Case;
  documents: Document[];
  deadlines: Deadline[];
  agency_submissions: AgencySubmission[];
  recent_events: DocumentEvent[];
  stats: {
    document_count: number;
    filed_count: number;
    pending_count: number;
    sealed_count: number;
    deadline_count: number;
    urgent_deadline_count: number;
  };
}

/**
 * Telemetry Access Log (Phase 2)
 */
export interface AccessLog {
  id: string;
  visitor_hash: string;
  user_agent_hash?: string;
  session_hash?: string;
  request_path: string;
  request_method: string;
  request_category: string;
  ua_family?: string;
  referrer_origin?: string;
  country_code?: string;
  region_code?: string;
  city_name?: string;
  is_anomaly: boolean;
  anomaly_type?: string;
  anomaly_score: number;
  created_at: string;
}

/**
 * Session Rollup (aggregated visitor sessions)
 */
export interface SessionRollup {
  id: string;
  visitor_hash: string;
  total_requests: number;
  first_seen: string;
  last_seen: string;
}

/**
 * Network Fingerprint (computed visitor signature)
 */
export interface NetworkFingerprint {
  id: string;
  visitor_hash: string;
  fingerprint_hash: string;
  last_updated: string;
}

/**
 * Combined Dashboard Data
 */
export interface CombinedDashboardData {
  case_summary: CaseSummary;
  telemetry_stats: {
    unique_visitors_24h: number;
    unique_visitors_14d: number;
    sessions_24h: number;
    total_pageviews_24h: number;
    anomalies_24h: number;
  };
  forensic_metrics: {
    document_integrity_score: number;
    seal_compliance: number;
    redaction_coverage: number;
  };
}
