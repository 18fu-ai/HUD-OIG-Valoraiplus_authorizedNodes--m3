/**
 * VALORAIPLUS GOVERNANCE API
 * 
 * Endpoint: GET /api/valoraiplus/governance
 * Returns: Full governance state with telemetry
 * 
 * Schema: REV_33
 * Classification: S-CLASS
 */

import { NextResponse } from 'next/server';
import {
  valoraiplusGetGovernanceState,
  valoraiplusGetTelemetry,
  valoraiplusGetOverallGrade,
  valoraiplusGetGradeDistribution,
  VALORAIPLUS_BRANDING,
  VALORAIPLUS_INVARIANT_CHAIN,
  VALORAIPLUS_ACCEPTANCE_RULES
} from '@/lib/valoraiplus';

export async function GET() {
  const state = valoraiplusGetGovernanceState();
  const telemetry = valoraiplusGetTelemetry();
  const overallGrade = valoraiplusGetOverallGrade();
  const distribution = valoraiplusGetGradeDistribution();
  
  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    branding: VALORAIPLUS_BRANDING,
    governance: {
      overallGrade,
      schemaVersion: state.schemaVersion,
      classification: state.classification,
      totalConfidence: state.totalConfidence,
      coveragePercent: state.coveragePercent,
      valorLoopCycle: state.valorLoopCycle,
      reflexiveIntegrityHash: state.reflexiveIntegrityHash,
      dimensionCount: state.dimensions.length,
      distribution
    },
    telemetry,
    invariantChain: VALORAIPLUS_INVARIANT_CHAIN,
    acceptanceRules: VALORAIPLUS_ACCEPTANCE_RULES,
    dimensions: state.dimensions.map(d => ({
      id: d.id,
      name: d.name,
      currentGrade: d.currentGrade,
      targetGrade: d.targetGrade,
      confidence: d.confidence,
      validationCount: d.validationCount,
      challengesSurvived: d.challengesSurvived,
      status: d.validationStatus
    }))
  });
}
