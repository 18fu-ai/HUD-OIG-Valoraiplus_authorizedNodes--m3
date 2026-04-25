/**
 * VALORAIPLUS TEMPORAL ENTITY REVIEW CONSOLE
 * 5W Reasoning Engine — Final Defensible Version
 * 
 * EPISTEMIC RULE:   claim ≠ evidence ≠ conclusion
 * RENDERING RULE:   No entity renders without complete 5W
 * AUTHORITY RULE:   UI visualizes | evidence classifies | provenance traces | API decides
 * DATA INVARIANT:   decision ≠ interpretation
 * 
 * IVL UPGRADE:      REV_33 → REV_34 (Independent Verification Layer)
 * CORE PRINCIPLE:   runtime generates evidence | external verifier confirms evidence
 * VERIFICATION:     A packet is trusted because another system can reproduce it
 * 
 * Schema: REV_34
 * Merkleroot: 26856B24C50750F0C69C1EEB86A69EF777777
 */

// Re-export Independent Verification Layer
export * from './ivl';

// ============================================================
// CORE TYPE DEFINITIONS
// ============================================================

/**
 * Evidence Status Classification
 * Strict hierarchy: OBSERVED → DOCUMENTED → MODELED → HYPOTHESIS → CORROBORATED
 */
export type EvidenceStatus =
  | 'OBSERVED'       // Directly witnessed/captured
  | 'DOCUMENTED'     // Recorded in official records
  | 'MODELED'        // Calculated/derived from data
  | 'HYPOTHESIS'     // Reasoned but unconfirmed
  | 'CORROBORATED';  // Confirmed by external source

/**
 * Confidence Score Ranges
 * S-CLASS: 95-100% | A++: 90-94% | A+: 85-89% | A: 80-84%
 */
export type ConfidenceGrade = 'S-CLASS' | 'A++' | 'A+' | 'A' | 'B' | 'C' | 'UNGRADED';

/**
 * Authority Layer Classification
 * Defines what each layer is permitted to do
 */
export type AuthorityLayer = 'UI' | 'EVIDENCE' | 'PROVENANCE' | 'API';

export const AUTHORITY_RULES: Record<AuthorityLayer, string> = Object.freeze({
  UI: 'visualizes',
  EVIDENCE: 'classifies',
  PROVENANCE: 'traces',
  API: 'decides'
});

// ============================================================
// 5W CONCLUSION INTERFACE
// ============================================================

/**
 * Core 5W Conclusion Interface
 * No entity renders unless it has all fields populated
 */
export interface FiveWConclusion {
  readonly who: readonly string[];
  readonly what: string;
  readonly why: string;
  readonly where: string;
  readonly when: string;
  readonly evidenceStatus: EvidenceStatus;
  readonly confidence: number; // 0-100
  readonly sources: readonly string[];
}

/**
 * Entity Review Interface
 * Complete entity representation with 5W reasoning
 */
export interface EntityReview {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly category: 'INDIVIDUAL' | 'INSTITUTION' | 'AGENCY' | 'MEDIA' | 'ACADEMIC';
  readonly evidenceStatus: EvidenceStatus;
  readonly confidence: number;
  readonly sources: readonly string[];
  readonly fiveW: FiveWConclusion;
  readonly provenanceHash: string;
  readonly generatedAt: number;
}

// ============================================================
// VALIDATION FUNCTIONS
// ============================================================

/**
 * Validates that a FiveWConclusion has all required fields
 * RENDERING RULE: No entity renders without complete 5W
 */
export interface FiveWValidation {
  readonly complete: boolean;
  readonly missing: readonly string[];
  readonly grade: ConfidenceGrade;
  readonly renderable: boolean;
}

export function validateFiveW(c: FiveWConclusion): FiveWValidation {
  const missing: string[] = [];
  
  if (!c.who || c.who.length === 0) missing.push('WHO');
  if (!c.what?.trim()) missing.push('WHAT');
  if (!c.why?.trim()) missing.push('WHY');
  if (!c.where?.trim()) missing.push('WHERE');
  if (!c.when?.trim()) missing.push('WHEN');
  if (!c.evidenceStatus) missing.push('EVIDENCE_STATUS');
  if (typeof c.confidence !== 'number') missing.push('CONFIDENCE');
  if (!c.sources || c.sources.length === 0) missing.push('SOURCES');
  
  const grade = getConfidenceGrade(c.confidence);
  
  return Object.freeze({
    complete: missing.length === 0,
    missing: Object.freeze(missing),
    grade,
    renderable: missing.length === 0 // Only render if complete
  });
}

/**
 * Quick completeness check
 */
export function isFiveWComplete(c: FiveWConclusion): boolean {
  return Boolean(
    c.who?.length > 0 &&
    c.what?.trim() &&
    c.why?.trim() &&
    c.where?.trim() &&
    c.when?.trim() &&
    c.evidenceStatus &&
    typeof c.confidence === 'number' &&
    c.sources?.length > 0
  );
}

/**
 * Convert confidence score to grade
 */
export function getConfidenceGrade(confidence: number): ConfidenceGrade {
  if (confidence >= 95) return 'S-CLASS';
  if (confidence >= 90) return 'A++';
  if (confidence >= 85) return 'A+';
  if (confidence >= 80) return 'A';
  if (confidence >= 70) return 'B';
  if (confidence >= 60) return 'C';
  return 'UNGRADED';
}

// ============================================================
// PROVENANCE FUNCTIONS
// ============================================================

/**
 * Generate provenance hash for entity review
 */
export function generateProvenanceHash(entity: Omit<EntityReview, 'provenanceHash' | 'generatedAt'>): string {
  const payload = [
    entity.name,
    entity.role,
    entity.fiveW.who.join(','),
    entity.fiveW.what,
    entity.fiveW.why,
    entity.fiveW.where,
    entity.fiveW.when,
    entity.evidenceStatus,
    entity.confidence.toString()
  ].join('|');
  
  let hash = 0;
  for (let i = 0; i < payload.length; i++) {
    const char = payload.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `TER-${Math.abs(hash).toString(16).toUpperCase().padStart(8, '0')}`;
}

// ============================================================
// ENTITY CREATION
// ============================================================

/**
 * Create a complete EntityReview with validation
 * Returns null if 5W is incomplete (rendering rule)
 */
export function createEntityReview(
  input: {
    name: string;
    role: string;
    category: EntityReview['category'];
    fiveW: FiveWConclusion;
  }
): EntityReview | null {
  // Validate 5W completeness
  if (!isFiveWComplete(input.fiveW)) {
    return null; // Cannot render incomplete entity
  }
  
  const partial = {
    id: `ENT-${input.name.replace(/\s+/g, '-').toUpperCase()}-${Date.now()}`,
    name: input.name,
    role: input.role,
    category: input.category,
    evidenceStatus: input.fiveW.evidenceStatus,
    confidence: input.fiveW.confidence,
    sources: input.fiveW.sources,
    fiveW: Object.freeze(input.fiveW)
  };
  
  return Object.freeze({
    ...partial,
    provenanceHash: generateProvenanceHash(partial),
    generatedAt: Date.now()
  });
}

// ============================================================
// BATCH PROCESSING
// ============================================================

export interface EntityRegistry {
  readonly entities: readonly EntityReview[];
  readonly quarantined: readonly { name: string; missing: readonly string[] }[];
  readonly totalProcessed: number;
  readonly renderableCount: number;
  readonly completionRate: number;
}

/**
 * Process multiple entities and separate renderable from quarantined
 */
export function createEntityRegistry(
  inputs: Array<{
    name: string;
    role: string;
    category: EntityReview['category'];
    fiveW: FiveWConclusion;
  }>
): EntityRegistry {
  const entities: EntityReview[] = [];
  const quarantined: { name: string; missing: readonly string[] }[] = [];
  
  for (const input of inputs) {
    const validation = validateFiveW(input.fiveW);
    
    if (validation.renderable) {
      const entity = createEntityReview(input);
      if (entity) entities.push(entity);
    } else {
      quarantined.push({
        name: input.name,
        missing: validation.missing
      });
    }
  }
  
  return Object.freeze({
    entities: Object.freeze(entities),
    quarantined: Object.freeze(quarantined),
    totalProcessed: inputs.length,
    renderableCount: entities.length,
    completionRate: inputs.length > 0 ? (entities.length / inputs.length) * 100 : 0
  });
}

// ============================================================
// EPISTEMIC SEPARATION
// ============================================================

/**
 * Epistemic Rule: claim ≠ evidence ≠ conclusion
 * This function enforces the separation
 */
export interface EpistemicClassification {
  readonly type: 'CLAIM' | 'EVIDENCE' | 'CONCLUSION';
  readonly source: string;
  readonly content: string;
  readonly transformedFrom: string | null;
}

export function classifyEpistemic(
  content: string,
  source: string,
  hasEvidence: boolean,
  hasReasoning: boolean
): EpistemicClassification {
  let type: 'CLAIM' | 'EVIDENCE' | 'CONCLUSION';
  
  if (hasEvidence && hasReasoning) {
    type = 'CONCLUSION';
  } else if (hasEvidence) {
    type = 'EVIDENCE';
  } else {
    type = 'CLAIM';
  }
  
  return Object.freeze({
    type,
    source,
    content,
    transformedFrom: type === 'CLAIM' ? null : 'CLAIM'
  });
}

// ============================================================
// CONSOLE METADATA
// ============================================================

export const CONSOLE_IDENTITY = Object.freeze({
  name: 'Temporal Entity Review Console',
  version: 'REV_34',
  epistemicRule: 'claim ≠ evidence ≠ conclusion',
  renderingRule: 'No entity renders without complete 5W',
  authorityRule: 'UI visualizes | evidence classifies | provenance traces | API decides',
  dataInvariant: 'decision ≠ interpretation',
  ivlPrinciple: 'runtime generates evidence | external verifier confirms evidence',
  verificationRule: 'A packet is trusted because another system can reproduce it'
});

export const EVIDENCE_STATUS_ORDER: readonly EvidenceStatus[] = Object.freeze([
  'OBSERVED',
  'DOCUMENTED',
  'MODELED',
  'HYPOTHESIS',
  'CORROBORATED'
]);

export const CONFIDENCE_THRESHOLDS = Object.freeze({
  S_CLASS: 95,
  A_PLUS_PLUS: 90,
  A_PLUS: 85,
  A: 80,
  B: 70,
  C: 60
});
