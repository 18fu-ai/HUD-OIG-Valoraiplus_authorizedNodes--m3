// VALORAIPLUS — SF Superior Court CCS Portal Integration
// Court Case System (CCS) for Department 12 Unlawful Detainer
// https://webapps.sftc.org/ci/CaseInfo.dll

export const CCS_CONFIG = {
  baseUrl: 'https://webapps.sftc.org/ci/CaseInfo.dll',
  publicPortal: 'https://sfsuperiorcourt.org',
  eFilingPortal: 'https://www.odysseyefileca.com',
  clerkAddress: '400 McAllister St, Room 103, San Francisco, CA 94102',
  clerkPhone: '(415) 551-4000',
  department: 12,
  division: 'Unlawful Detainer',
};

export const ACTIVE_CASE = {
  caseNumber: 'CUD-26-682107',
  accessCode: '16535884',
  department: 12,
  division: 'Unlawful Detainer',
  filingDate: '2026-05-05',
  plaintiff: 'Swords to Plowshares',
  defendant: 'Donald Gillson et al.',
  plaintiffCounsel: {
    firm: 'Zanghi Torres Adams LLP',
    attorney: 'Bradford C. White',
    barNumber: 'CA-PENDING',
    email: 'bwhite@stp-sf.org',
    phone: '(415) 555-0000',
  },
  defendantCounsel: {
    firm: 'Pro Se / Self-Represented',
    attorney: 'Donald Gillson',
    assistingCounsel: 'John P. Zanghi (served)',
  },
  status: 'PENDING_ANSWER',
  nextDeadline: '2026-05-15',
  nextDeadlineType: 'Answer Due (5 days from service)',
};

// CCS Portal Document Types
export type CCSDocumentType =
  | 'COMPLAINT'
  | 'SUMMONS'
  | 'ANSWER'
  | 'DEMURRER'
  | 'MOTION'
  | 'DECLARATION'
  | 'PROOF_OF_SERVICE'
  | 'NOTICE'
  | 'ORDER'
  | 'JUDGMENT';

export interface CCSDocument {
  id: string;
  type: CCSDocumentType;
  title: string;
  filedDate: string;
  filedBy: 'PLAINTIFF' | 'DEFENDANT' | 'COURT';
  description: string;
  pages: number;
  status: 'FILED' | 'PENDING' | 'REJECTED';
}

// Known documents from CUD-26-682107
export const CASE_DOCUMENTS: CCSDocument[] = [
  {
    id: 'DOC-001',
    type: 'COMPLAINT',
    title: 'Complaint - Unlawful Detainer',
    filedDate: '2026-05-05',
    filedBy: 'PLAINTIFF',
    description: 'Initial UD complaint filed by Swords to Plowshares',
    pages: 8,
    status: 'FILED',
  },
  {
    id: 'DOC-002',
    type: 'SUMMONS',
    title: 'Summons - Unlawful Detainer',
    filedDate: '2026-05-05',
    filedBy: 'PLAINTIFF',
    description: '5-day summons for UD action',
    pages: 2,
    status: 'FILED',
  },
  {
    id: 'DOC-003',
    type: 'PROOF_OF_SERVICE',
    title: 'Proof of Service by Mail',
    filedDate: '2026-05-05',
    filedBy: 'PLAINTIFF',
    description: 'Service by Angelica Sunga (Court Employee)',
    pages: 1,
    status: 'FILED',
  },
];

// Generate CCS Portal URL for case lookup
export function getCCSCaseUrl(caseNumber: string, accessCode: string): string {
  return `${CCS_CONFIG.baseUrl}?CaseNum=${encodeURIComponent(caseNumber)}&AccessCode=${accessCode}`;
}

// Generate eFiling URL
export function getEFilingUrl(): string {
  return `${CCS_CONFIG.eFilingPortal}/portal/home`;
}

// Court calendar / hearing lookup
export interface CourtHearing {
  date: string;
  time: string;
  department: number;
  room: string;
  type: string;
  judge: string;
  status: 'SCHEDULED' | 'CONTINUED' | 'VACATED' | 'COMPLETED';
}

export const SCHEDULED_HEARINGS: CourtHearing[] = [
  // No hearings scheduled yet - case is in answer period
];

// CCS Upload Simulation (for forensic documentation)
export interface CCSUploadRecord {
  timestamp: string;
  documentType: string;
  fileName: string;
  uploadMethod: 'EFILING' | 'COUNTER' | 'MAIL';
  confirmationNumber: string;
  status: 'ACCEPTED' | 'PENDING_REVIEW' | 'REJECTED';
  notes: string;
}

// Track documents uploaded to CCS portal
export const CCS_UPLOAD_LOG: CCSUploadRecord[] = [
  {
    timestamp: '2026-05-15T09:00:00Z',
    documentType: 'MIMECAST_BOUNCE_RECEIPTS',
    fileName: 'SMTP-550-Evidence-Package.pdf',
    uploadMethod: 'EFILING',
    confirmationNumber: 'EF-2026-05-15-001',
    status: 'ACCEPTED',
    notes: 'Bounce-back receipts proving coordinated email blockade during UD response window',
  },
  {
    timestamp: '2026-05-15T09:15:00Z',
    documentType: 'VA_OBSTRUCTION_EVIDENCE',
    fileName: 'VA-OGC-ORM-Blockade-Evidence.pdf',
    uploadMethod: 'EFILING',
    confirmationNumber: 'EF-2026-05-15-002',
    status: 'ACCEPTED',
    notes: 'SMTP 550 5.4.1 from VA-OGC (Anfang) and VA-ORM (McCullough) federal nodes',
  },
  {
    timestamp: '2026-05-15T09:30:00Z',
    documentType: 'HHS_OCR_COMPLAINT',
    fileName: 'HHS-OCR-25-621293-Filing.pdf',
    uploadMethod: 'EFILING',
    confirmationNumber: 'EF-2026-05-15-003',
    status: 'ACCEPTED',
    notes: 'Active federal civil rights complaint demonstrating retaliation timeline',
  },
];

// Communication methods with Department 12
export const COURT_COMMUNICATION = {
  methods: [
    {
      method: 'eFiling Portal',
      url: CCS_CONFIG.eFilingPortal,
      description: 'Primary method for filing documents electronically',
      status: 'AVAILABLE',
      notes: 'Odyssey eFileCA - requires account registration',
    },
    {
      method: 'CCS Portal Upload',
      url: getCCSCaseUrl(ACTIVE_CASE.caseNumber, ACTIVE_CASE.accessCode),
      description: 'Direct case document upload via Court Case System',
      status: 'AVAILABLE',
      notes: 'Access code required: ' + ACTIVE_CASE.accessCode,
    },
    {
      method: 'Counter Filing',
      url: null,
      description: 'In-person filing at Clerk\'s Office',
      status: 'AVAILABLE',
      address: CCS_CONFIG.clerkAddress,
      hours: '8:30 AM - 4:00 PM, Monday-Friday',
    },
    {
      method: 'Mail Filing',
      url: null,
      description: 'Filing by mail with proof of service',
      status: 'AVAILABLE',
      address: CCS_CONFIG.clerkAddress,
      notes: 'Must include original + 2 copies',
    },
  ],
  selfHelp: {
    name: 'Self-Help Center',
    phone: '(415) 551-4000',
    url: 'https://sfsuperiorcourt.org/self-help',
    hours: '8:30 AM - 4:00 PM, Monday-Friday',
  },
  evictionDefense: {
    name: 'Eviction Defense Collaborative',
    phone: '(415) 659-9184',
    url: 'https://evictiondefense.org',
    description: 'Free legal assistance for SF tenants facing eviction',
  },
};

// Status check function
export function getCaseStatus() {
  const now = new Date();
  const deadline = new Date(ACTIVE_CASE.nextDeadline);
  const daysRemaining = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  return {
    caseNumber: ACTIVE_CASE.caseNumber,
    status: ACTIVE_CASE.status,
    daysUntilDeadline: daysRemaining,
    deadlineType: ACTIVE_CASE.nextDeadlineType,
    documentsOnFile: CASE_DOCUMENTS.length,
    uploadsToDate: CCS_UPLOAD_LOG.length,
    nextAction: daysRemaining <= 0 ? 'DEADLINE PASSED - FILE IMMEDIATELY' : `File Answer within ${daysRemaining} day(s)`,
    ccsPortalUrl: getCCSCaseUrl(ACTIVE_CASE.caseNumber, ACTIVE_CASE.accessCode),
    eFilingUrl: getEFilingUrl(),
  };
}
