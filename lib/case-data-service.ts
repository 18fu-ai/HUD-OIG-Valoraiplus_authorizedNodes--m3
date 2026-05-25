/**
 * Case Data Service
 * Provides methods to fetch and manage case data from Supabase
 * All queries use service_role key for admin access
 */

import { createClient } from '@supabase/supabase-js';
import type {
  Case,
  CaseSummary,
  Document,
  Deadline,
  DocumentEvent,
  AgencySubmission,
  CaseDashboardStats,
} from './types/case-dashboard';

// Initialize service-role client (server-side only)
function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  );
}

/**
 * Fetch all cases
 */
export async function fetchAllCases(): Promise<Case[]> {
  const client = getServiceClient();
  const { data, error } = await client
    .from('cases')
    .select('*')
    .order('filing_date', { ascending: false });

  if (error) {
    console.error('[v0] Error fetching cases:', error);
    return [];
  }
  return data || [];
}

/**
 * Fetch single case by case_number
 */
export async function fetchCaseByNumber(caseNumber: string): Promise<Case | null> {
  const client = getServiceClient();
  const { data, error } = await client
    .from('cases')
    .select('*')
    .eq('case_number', caseNumber)
    .single();

  if (error) {
    console.error('[v0] Error fetching case:', error);
    return null;
  }
  return data;
}

/**
 * Fetch documents for a case
 */
export async function fetchCaseDocuments(caseId: string): Promise<Document[]> {
  const client = getServiceClient();
  const { data, error } = await client
    .from('documents')
    .select('*')
    .eq('case_id', caseId)
    .order('upload_order', { ascending: true });

  if (error) {
    console.error('[v0] Error fetching documents:', error);
    return [];
  }
  return data || [];
}

/**
 * Fetch deadlines for a case
 */
export async function fetchCaseDeadlines(caseId: string): Promise<Deadline[]> {
  const client = getServiceClient();
  const { data, error } = await client
    .from('deadlines')
    .select('*')
    .eq('case_id', caseId)
    .order('deadline_at', { ascending: true });

  if (error) {
    console.error('[v0] Error fetching deadlines:', error);
    return [];
  }
  return data || [];
}

/**
 * Fetch recent events for a case
 */
export async function fetchCaseEvents(caseId: string, limit = 20): Promise<DocumentEvent[]> {
  const client = getServiceClient();
  const { data, error } = await client
    .from('document_events')
    .select('*')
    .eq('case_id', caseId)
    .order('event_time', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[v0] Error fetching events:', error);
    return [];
  }
  return data || [];
}

/**
 * Fetch agency submissions for a case
 */
export async function fetchCaseAgencySubmissions(caseId: string): Promise<AgencySubmission[]> {
  const client = getServiceClient();
  const { data, error } = await client
    .from('agency_submissions')
    .select('*')
    .eq('case_id', caseId)
    .order('submitted_at', { ascending: false });

  if (error) {
    console.error('[v0] Error fetching agency submissions:', error);
    return [];
  }
  return data || [];
}

/**
 * Fetch complete case summary (all related data)
 */
export async function fetchCaseSummary(caseNumber: string): Promise<CaseSummary | null> {
  try {
    // Fetch case first
    const caseData = await fetchCaseByNumber(caseNumber);
    if (!caseData) return null;

    // Fetch all related data in parallel
    const [documents, deadlines, events, submissions] = await Promise.all([
      fetchCaseDocuments(caseData.id),
      fetchCaseDeadlines(caseData.id),
      fetchCaseEvents(caseData.id, 15),
      fetchCaseAgencySubmissions(caseData.id),
    ]);

    // Calculate statistics
    const stats = {
      document_count: documents.length,
      filed_count: documents.filter(d => d.status === 'FILED').length,
      pending_count: documents.filter(d => d.status === 'PENDING').length,
      sealed_count: documents.filter(d => d.visibility.includes('sealed')).length,
      deadline_count: deadlines.length,
      urgent_deadline_count: deadlines.filter(d => d.status === 'open').length,
    };

    return {
      case: caseData,
      documents,
      deadlines,
      agency_submissions: submissions,
      recent_events: events,
      stats,
    };
  } catch (error) {
    console.error('[v0] Error fetching case summary:', error);
    return null;
  }
}

/**
 * Fetch dashboard statistics
 */
export async function fetchDashboardStats(): Promise<CaseDashboardStats> {
  try {
    const client = getServiceClient();

    // Fetch all cases and documents
    const [casesRes, docsRes, deadlinesRes, submissionsRes, eventsRes] = await Promise.all([
      client.from('cases').select('id', { count: 'exact', head: true }),
      client.from('documents').select('id, status', { head: false }),
      client.from('deadlines').select('id, status, deadline_at', { head: false }),
      client.from('agency_submissions').select('id, status', { head: false }),
      client.from('document_events').select('id', { head: false }),
    ]);

    const docs = (docsRes.data || []) as any[];
    const deadlines = (deadlinesRes.data || []) as any[];
    const submissions = (submissionsRes.data || []) as any[];

    const now = new Date();
    const upcoming = deadlines.filter(d => {
      const dTime = new Date(d.deadline_at);
      return dTime > now && d.status === 'open';
    });
    const overdue = deadlines.filter(d => {
      const dTime = new Date(d.deadline_at);
      return dTime < now && d.status === 'open';
    });

    return {
      total_cases: casesRes.count || 0,
      active_cases: (casesRes.count || 0),
      total_documents: docs.length,
      filed_documents: docs.filter(d => d.status === 'FILED').length,
      pending_documents: docs.filter(d => d.status === 'PENDING').length,
      upcoming_deadlines: upcoming.length,
      overdue_deadlines: overdue.length,
      agency_submissions_pending: submissions.filter(s => s.status === 'pending').length,
      recent_events_count: eventsRes.count || 0,
    };
  } catch (error) {
    console.error('[v0] Error fetching dashboard stats:', error);
    return {
      total_cases: 0,
      active_cases: 0,
      total_documents: 0,
      filed_documents: 0,
      pending_documents: 0,
      upcoming_deadlines: 0,
      overdue_deadlines: 0,
      agency_submissions_pending: 0,
      recent_events_count: 0,
    };
  }
}

/**
 * Create document event (audit trail)
 */
export async function createDocumentEvent(
  caseId: string,
  eventTitle: string,
  eventType: string,
  documentId?: string,
  eventNote?: string
): Promise<boolean> {
  try {
    const client = getServiceClient();
    const { error } = await client.from('document_events').insert({
      case_id: caseId,
      document_id: documentId,
      event_type: eventType,
      event_title: eventTitle,
      event_note: eventNote,
      event_time: new Date().toISOString(),
    });

    if (error) {
      console.error('[v0] Error creating document event:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('[v0] Error creating document event:', error);
    return false;
  }
}

/**
 * Update document status
 */
export async function updateDocumentStatus(
  documentId: string,
  status: string,
  caseId: string
): Promise<boolean> {
  try {
    const client = getServiceClient();
    const { error } = await client
      .from('documents')
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', documentId);

    if (error) {
      console.error('[v0] Error updating document status:', error);
      return false;
    }

    // Create audit event
    await createDocumentEvent(caseId, `Document status changed to ${status}`, 'status_changed', documentId);
    return true;
  } catch (error) {
    console.error('[v0] Error updating document status:', error);
    return false;
  }
}
