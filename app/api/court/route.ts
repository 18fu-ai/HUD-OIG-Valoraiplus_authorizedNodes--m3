import { NextResponse } from 'next/server';
import {
  CCS_CONFIG,
  ACTIVE_CASE,
  CASE_DOCUMENTS,
  CCS_UPLOAD_LOG,
  COURT_COMMUNICATION,
  SCHEDULED_HEARINGS,
  getCaseStatus,
  getCCSCaseUrl,
  getEFilingUrl,
} from '@/lib/court/ccs-portal';

export const dynamic = 'force-dynamic';

/**
 * GET /api/court
 * 
 * Returns court case information and communication methods.
 * Query params:
 *   - section: 'all' | 'status' | 'documents' | 'uploads' | 'communication' | 'hearings'
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section') || 'all';

  const timestamp = new Date().toISOString();
  const status = getCaseStatus();

  let data: Record<string, unknown> = {};

  if (section === 'all' || section === 'status') {
    data.status = {
      ...status,
      config: CCS_CONFIG,
      activeCase: ACTIVE_CASE,
    };
  }

  if (section === 'all' || section === 'documents') {
    data.documents = {
      items: CASE_DOCUMENTS,
      count: CASE_DOCUMENTS.length,
      ccsPortalUrl: getCCSCaseUrl(ACTIVE_CASE.caseNumber, ACTIVE_CASE.accessCode),
    };
  }

  if (section === 'all' || section === 'uploads') {
    data.uploads = {
      items: CCS_UPLOAD_LOG,
      count: CCS_UPLOAD_LOG.length,
      note: 'Documents uploaded to CCS portal as forensic evidence',
    };
  }

  if (section === 'all' || section === 'communication') {
    data.communication = {
      methods: COURT_COMMUNICATION.methods,
      selfHelp: COURT_COMMUNICATION.selfHelp,
      evictionDefense: COURT_COMMUNICATION.evictionDefense,
      eFilingUrl: getEFilingUrl(),
    };
  }

  if (section === 'all' || section === 'hearings') {
    data.hearings = {
      scheduled: SCHEDULED_HEARINGS,
      count: SCHEDULED_HEARINGS.length,
      department: CCS_CONFIG.department,
      division: CCS_CONFIG.division,
    };
  }

  return NextResponse.json({
    success: true,
    timestamp,
    section,
    data,
    _meta: {
      caseNumber: ACTIVE_CASE.caseNumber,
      department: CCS_CONFIG.department,
      court: 'SF Superior Court',
    },
  });
}

/**
 * POST /api/court
 * 
 * Log a new document upload to the CCS portal.
 * Body: { documentType, fileName, uploadMethod, confirmationNumber, notes }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { documentType, fileName, uploadMethod, confirmationNumber, notes } = body;

    if (!documentType || !fileName || !uploadMethod) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: documentType, fileName, uploadMethod' },
        { status: 400 }
      );
    }

    // In production, this would write to Supabase
    const newUpload = {
      timestamp: new Date().toISOString(),
      documentType,
      fileName,
      uploadMethod,
      confirmationNumber: confirmationNumber || `EF-${Date.now()}`,
      status: 'PENDING_REVIEW' as const,
      notes: notes || '',
    };

    // Add to in-memory log (in production: write to database)
    CCS_UPLOAD_LOG.push(newUpload);

    return NextResponse.json({
      success: true,
      message: 'Upload logged successfully',
      upload: newUpload,
      totalUploads: CCS_UPLOAD_LOG.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
