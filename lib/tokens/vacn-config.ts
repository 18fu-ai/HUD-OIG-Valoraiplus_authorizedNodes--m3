/**
 * VACN Token Configuration
 * Vietnam Veterans Children Benefit System
 * 
 * Purpose: Provide 100 $GILLBTC tokens to children of Vietnam-era veterans
 * Eligibility: Born 9+ months after parent's active duty (1966-1972)
 * Privacy: ID.me/Government login with immediate data destruction
 */

export const VACN_TOKEN_CONFIG = {
  name: 'ValorAiPlus Vietnam Veterans Children',
  symbol: 'VACN',
  description:
    'Benefit token for children of Vietnam veterans (1966-1972 service period)',
  
  // Allocation: 0.01% of total VALORAIPLUS system
  allocation: {
    percentOfSystem: 0.0001,
    dedicated: true,
    purpose: 'Vietnam Veterans Children Benefit Program',
  },

  // Wallet Configuration
  treasury: {
    name: 'VACN Treasury',
    oxNumber: '0x7777VACN', // Unique identifier
    percentageOfAllocation: 100,
    purpose: 'Fund direct distributions to eligible beneficiaries',
  },

  // Benefit Configuration
  benefits: {
    amountPerBeneficiary: 100, // 100 $GILLBTC per eligible child
    currency: 'GILLBTC',
    distributionMethod: 'automatic_upon_verification',
    verificationRecurrance: 'one_time',
  },

  // Eligibility Criteria
  eligibility: {
    parentServiceStart: 1966,
    parentServiceEnd: 1972,
    serviceType: 'active_duty',
    birthRequirement:
      'born_9_months_or_more_after_parent_active_duty_end',
    eligibleBranches: [
      'Army',
      'Navy',
      'Marine Corps',
      'Air Force',
      'Coast Guard',
      'National Guard',
    ],
    agentOrangeExposure: {
      required: true,
      source: 'parent_service_jacket',
      verification: 'documented',
    },
  },

  // Authentication & Privacy
  authentication: {
    methods: ['ID.me', 'Government Single Sign-On'],
    providers: [
      'Veterans Affairs (VA.gov)',
      'Social Security Administration',
      'Department of Defense',
    ],
    mfa: true,
  },

  privacy: {
    dataRetention: 'immediate_destruction',
    retention_period_seconds: 0,
    policyLevel: 'WCAG 2.1 AAA Compliant',
    dataUsage: 'verification_only',
    thirdPartySharing: false,
    encryption: 'end_to_end',
    privacyUrl: '/privacy/vacn-benefit',
  },

  // Accessibility Requirements
  accessibility: {
    wcagLevel: 'AAA',
    screenReaderSupport: true,
    keyboardNavigation: true,
    highContrast: true,
    targetAudience: [
      'dependent_adults',
      'primary_caregivers',
      'children_of_veterans',
    ],
  },

  // Verification Fields
  verificationFields: [
    {
      field: 'veteran_name',
      required: true,
      source: 'id_me',
      validation: 'exact_match',
    },
    {
      field: 'service_start_date',
      required: true,
      source: 'dod_records',
      validation: 'date_range_1966_1972',
    },
    {
      field: 'service_end_date',
      required: true,
      source: 'dod_records',
      validation: 'discharge_date',
    },
    {
      field: 'agent_orange_exposure',
      required: true,
      source: 'va_service_jacket',
      validation: 'documented_flag',
    },
    {
      field: 'child_birth_date',
      required: true,
      source: 'birth_certificate',
      validation: 'born_after_service_plus_9_months',
    },
    {
      field: 'relationship_to_veteran',
      required: true,
      source: 'birth_certificate_or_legal_document',
      validation: 'biological_or_legal_child',
    },
  ],

  // Dispersal Configuration (Future Enhancement)
  dispersal: {
    phase1: {
      status: 'active',
      implementation: 'single_wallet_funding',
      description: 'All benefits initially funded to single VACN Treasury wallet',
    },
    phase2: {
      status: 'planned',
      implementation: 'individual_wallet_creation',
      description:
        'Create individual wallets for each verified beneficiary with custodial oversight',
      timeline: 'Q3 2026',
    },
    phase3: {
      status: 'planned',
      implementation: 'autonomous_distribution',
      description:
        'Automated monthly or quarterly distributions to beneficiary wallets based on age gating',
      timeline: 'Q4 2026',
    },
  },

  // Fraud Prevention
  antifraud: {
    duplicateDetection: true,
    biometricVerification: false, // Privacy first - no biometric storage
    documentVerification: true,
    manualReviewThreshold: 0.05, // 5% of applications
    appealProcess: true,
  },

  // Compliance
  compliance: {
    regulatory: [
      'FERPA (Family Educational Rights and Privacy Act)',
      'COPPA (Children\'s Online Privacy Protection Act)',
      'HIPAA (Health Insurance Portability and Accountability Act)',
      'VA Privacy Requirements',
      'California Privacy Laws (CCPA)',
    ],
    auditFrequency: 'quarterly',
    externalAudit: true,
    transparencyReporting: true,
  },

  // Distribution Timeline
  timeline: {
    phase1Start: '2026-05-15',
    applicationsOpen: '2026-05-20',
    phase2Estimated: '2026-09-01',
    phase3Estimated: '2026-12-01',
  },
};

/**
 * VACN Benefit Eligibility Checker
 */
export function checkVACNEligibility(beneficiaryData: {
  parentServiceStart: number;
  parentServiceEnd: number;
  birthDate: string;
  agentOrangeExposed: boolean;
}): {
  eligible: boolean;
  reasons: string[];
  warnings?: string[];
} {
  const reasons: string[] = [];
  const warnings: string[] = [];

  // Check service dates
  if (
    beneficiaryData.parentServiceStart < VACN_TOKEN_CONFIG.eligibility.parentServiceStart ||
    beneficiaryData.parentServiceEnd > VACN_TOKEN_CONFIG.eligibility.parentServiceEnd
  ) {
    return {
      eligible: false,
      reasons: [
        'Parent service dates outside eligible window (1966-1972)',
      ],
    };
  }

  // Check birth date (9 months after service end)
  const serviceEndDate = new Date(beneficiaryData.parentServiceEnd, 0, 1);
  const nineMonthsAfter = new Date(serviceEndDate);
  nineMonthsAfter.setMonth(nineMonthsAfter.getMonth() + 9);

  const birthDateObj = new Date(beneficiaryData.birthDate);
  if (birthDateObj < nineMonthsAfter) {
    return {
      eligible: false,
      reasons: ['Birth date must be 9 months or more after parent active duty end'],
    };
  }

  // Check Agent Orange exposure
  if (!beneficiaryData.agentOrangeExposed) {
    warnings.push('Agent Orange exposure not documented in service records');
  }

  reasons.push('Meets all VACN eligibility criteria');

  return {
    eligible: true,
    reasons,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}

/**
 * Benefit Distribution Record
 */
export interface VACNBenefitRecord {
  beneficiaryId: string;
  parentName: string;
  parentServiceBranch: string;
  serviceStart: number;
  serviceEnd: number;
  childName: string;
  childBirthDate: string;
  childAge: number;
  agentOrangeExposed: boolean;
  eligibilityVerified: boolean;
  verificationDate: string;
  benefitAmount: number;
  benefitToken: string;
  walletAddress: string;
  distributionStatus: 'pending' | 'distributed' | 'held_in_escrow';
  distributionDate?: string;
  blockchainTxHash?: string;
  lastUpdated: string;
}
