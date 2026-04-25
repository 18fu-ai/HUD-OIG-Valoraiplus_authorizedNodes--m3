/**
 * VALORAIPLUS 5W REASONING ENGINE
 * Converts events into explainable conclusions
 * 
 * Timeline explains order.
 * 5W explains meaning.
 * Together: order + meaning + provenance = auditable reasoning
 */

// Evidence classification for 5W conclusions
export type EvidenceType = 'OBSERVED' | 'INTERPRETED' | 'CORROBORATED';

// Confidence levels for conclusions
export type ConfidenceLevel = 'HIGH' | 'MODERATE' | 'CONDITIONAL';

// Core 5W Conclusion Interface
export interface FiveWConclusion {
  readonly id: string;
  readonly who: readonly string[];
  readonly what: string;
  readonly why: string;
  readonly where: string;
  readonly when: string;
  readonly evidenceType: EvidenceType;
  readonly confidence: ConfidenceLevel;
  readonly sourceRefs: readonly string[];
  readonly generatedAt: number;
  readonly provenanceHash: string;
}

// Validation result
export interface FiveWValidation {
  readonly valid: boolean;
  readonly missing: readonly string[];
  readonly quarantined: boolean;
}

// 5W Event (input to reasoning engine)
export interface FiveWEvent {
  readonly eventId: string;
  readonly timestamp: number;
  readonly actors: readonly string[];
  readonly action: string;
  readonly location: string;
  readonly context: string;
  readonly sources: readonly string[];
}

// Completeness validation
export function isFiveWComplete(c: FiveWConclusion): boolean {
  return Boolean(
    c.who.length > 0 &&
    c.what?.trim() &&
    c.why?.trim() &&
    c.where?.trim() &&
    c.when?.trim()
  );
}

// Detailed validation with missing fields
export function validateFiveW(c: FiveWConclusion): FiveWValidation {
  const missing: string[] = [];
  
  if (!c.who || c.who.length === 0) missing.push('WHO');
  if (!c.what?.trim()) missing.push('WHAT');
  if (!c.why?.trim()) missing.push('WHY');
  if (!c.where?.trim()) missing.push('WHERE');
  if (!c.when?.trim()) missing.push('WHEN');
  
  return Object.freeze({
    valid: missing.length === 0,
    missing: Object.freeze(missing),
    quarantined: missing.length > 0
  });
}

// Generate provenance hash for 5W conclusion
export function generateFiveWHash(c: Omit<FiveWConclusion, 'provenanceHash'>): string {
  const payload = `${c.who.join(',')}|${c.what}|${c.why}|${c.where}|${c.when}|${c.evidenceType}|${c.confidence}`;
  let hash = 0;
  for (let i = 0; i < payload.length; i++) {
    const char = payload.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `5W-${Math.abs(hash).toString(16).toUpperCase().padStart(8, '0')}`;
}

// Create 5W conclusion from event
export function createFiveWConclusion(
  event: FiveWEvent,
  interpretation: { why: string; evidenceType: EvidenceType; confidence: ConfidenceLevel }
): FiveWConclusion {
  const partial = {
    id: `5W-${event.eventId}`,
    who: Object.freeze([...event.actors]),
    what: event.action,
    why: interpretation.why,
    where: event.location,
    when: new Date(event.timestamp).toISOString(),
    evidenceType: interpretation.evidenceType,
    confidence: interpretation.confidence,
    sourceRefs: Object.freeze([...event.sources]),
    generatedAt: Date.now()
  };
  
  return Object.freeze({
    ...partial,
    provenanceHash: generateFiveWHash(partial)
  });
}

// Batch validation for multiple conclusions
export function validateFiveWBatch(conclusions: readonly FiveWConclusion[]): {
  valid: readonly FiveWConclusion[];
  quarantined: readonly FiveWConclusion[];
  completionRate: number;
} {
  const valid: FiveWConclusion[] = [];
  const quarantined: FiveWConclusion[] = [];
  
  for (const c of conclusions) {
    if (isFiveWComplete(c)) {
      valid.push(c);
    } else {
      quarantined.push(c);
    }
  }
  
  return Object.freeze({
    valid: Object.freeze(valid),
    quarantined: Object.freeze(quarantined),
    completionRate: conclusions.length > 0 ? (valid.length / conclusions.length) * 100 : 0
  });
}

// 5W Reasoning Pipeline
export interface FiveWPipeline {
  readonly stage: 'OBSERVED' | 'CLASSIFIED' | 'ORDERED' | 'BOUND' | 'MAPPED' | 'ASSIGNED' | 'VALIDATED' | 'RENDERED';
  readonly input: FiveWEvent;
  readonly output: FiveWConclusion | null;
  readonly validation: FiveWValidation | null;
}

// Execute full 5W pipeline
export function executeFiveWPipeline(
  event: FiveWEvent,
  interpretation: { why: string; evidenceType: EvidenceType; confidence: ConfidenceLevel }
): FiveWPipeline {
  const conclusion = createFiveWConclusion(event, interpretation);
  const validation = validateFiveW(conclusion);
  
  return Object.freeze({
    stage: validation.valid ? 'RENDERED' : 'VALIDATED',
    input: event,
    output: validation.valid ? conclusion : null,
    validation
  });
}

// Export frozen conclusion registry type
export interface FiveWRegistry {
  readonly conclusions: readonly FiveWConclusion[];
  readonly quarantined: readonly FiveWConclusion[];
  readonly totalProcessed: number;
  readonly completionRate: number;
  readonly lastUpdated: number;
}

// Create registry from conclusions
export function createFiveWRegistry(conclusions: readonly FiveWConclusion[]): FiveWRegistry {
  const batch = validateFiveWBatch(conclusions);
  
  return Object.freeze({
    conclusions: batch.valid,
    quarantined: batch.quarantined,
    totalProcessed: conclusions.length,
    completionRate: batch.completionRate,
    lastUpdated: Date.now()
  });
}
