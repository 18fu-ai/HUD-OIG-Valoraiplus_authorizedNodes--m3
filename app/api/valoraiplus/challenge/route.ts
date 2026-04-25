/**
 * VALORAIPLUS CHALLENGE API (ValorLoop++ Falsification)
 * 
 * Endpoint: POST /api/valoraiplus/challenge
 * Body: { dimensionId?: string } - if omitted, challenges all dimensions
 * Returns: Challenge results with survival status
 * 
 * Schema: REV_33
 * Classification: S-CLASS
 */

import { NextResponse } from 'next/server';
import {
  valoraiplusChallengeDimension,
  valoraiplusRunValorLoopCycle,
  type ValorAIPlusDimensionId,
  VALORAIPLUS_DIMENSION_REGISTRY,
  VALORAIPLUS_BRANDING
} from '@/lib/valoraiplus';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { dimensionId } = body as { dimensionId?: ValorAIPlusDimensionId };
    
    if (dimensionId) {
      // Challenge single dimension
      const validDimension = VALORAIPLUS_DIMENSION_REGISTRY.find(d => d.id === dimensionId);
      
      if (!validDimension) {
        return NextResponse.json({
          success: false,
          error: 'VALORAIPLUS_INVALID_DIMENSION_ID',
          validDimensions: VALORAIPLUS_DIMENSION_REGISTRY.map(d => d.id)
        }, { status: 400 });
      }
      
      const result = valoraiplusChallengeDimension(dimensionId);
      
      return NextResponse.json({
        success: true,
        branding: VALORAIPLUS_BRANDING.name,
        challengeType: 'VALORAIPLUS_SINGLE_DIMENSION',
        result: {
          dimensionId: result.dimensionId,
          passed: result.passed,
          confidence: result.confidence,
          reason: result.reason,
          challengeId: result.challengeId,
          timestamp: result.timestamp
        }
      });
    } else {
      // Run full ValorLoop++ cycle
      const cycleResult = valoraiplusRunValorLoopCycle();
      
      return NextResponse.json({
        success: true,
        branding: VALORAIPLUS_BRANDING.name,
        challengeType: 'VALORAIPLUS_FULL_VALORLOOP_CYCLE',
        cycleNumber: cycleResult.cycleNumber,
        summary: {
          total: cycleResult.results.length,
          survived: cycleResult.survivedCount,
          failed: cycleResult.failedCount,
          survivalRate: Math.round((cycleResult.survivedCount / cycleResult.results.length) * 100)
        },
        results: cycleResult.results.map(r => ({
          dimensionId: r.dimensionId,
          passed: r.passed,
          confidence: r.confidence,
          reason: r.reason,
          challengeId: r.challengeId
        }))
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'VALORAIPLUS_CHALLENGE_ERROR',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
