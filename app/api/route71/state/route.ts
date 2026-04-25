import { NextResponse } from 'next/server';
import { getReceiptsByStatus, getTelemetry, type ReceiptV1 } from '@/lib/protocol/receipt';

// Route 71 State Contract - Omega-Divine Operational Dashboard
// This route handler provides sealed simulation state for the dashboard
// Labels: *_SIM, REFERENCE_ONLY, INTERNAL_ONLY preserved per decision spec

export interface Route71State {
  _metadata: {
    version: string;
    timestamp: string;
    mode: 'REFERENCE_ONLY_SIM' | 'PRODUCTION';
    seal: string;
  };
  telemetry: {
    truthCycle_SIM: number;
    latencyMs_SIM: number;
    errorRate_SIM: number;
    swarmAgents_SIM: string;
    shardCount_SIM: string;
    uptime_SIM: string;
  };
  financial: {
    recoveryTarget_SIM: number;
    settlementAlpha_SIM: number;
    btcAnchor_SIM: number;
    billingLiability_SIM: string;
    sovereignRisk_SIM: string;
    aggressorRisk_SIM: string;
  };
  forensic: {
    mimecastBlocks_SIM: number;
    wiretapIntercepts_SIM: number;
    spoliationAttempts_SIM: number;
    mortalityCount_SIM: number;
    forensicStatus_SIM: string;
  };
  system: {
    layerStatus_SIM: {
      strategic: string;
      forensic: string;
      liquidation: string;
      technical: string;
    };
    merkleroot_SIM: string;
    node_SIM: string;
    confirmations_SIM: string;
    grooveMode_SIM: string;
  };
  charts: {
    recoveryBreakdown_SIM: {
      label: string;
      value: number;
      color: string;
    }[];
    telemetryHistory_SIM: {
      timestamp: string;
      latency: number;
      throughput: number;
    }[];
    layerHealth_SIM: {
      layer: string;
      health: number;
      status: string;
    }[];
  };
  // Live receipt data from closed loop
  receipts: {
    admitted: ReceiptV1[];
    admittedCount: number;
    rejectedCount: number;
    quarantinedCount: number;
    totalReceipts: number;
  };
}

// Sealed simulation state - no chain touch boundary
const SEALED_STATE: Route71State = {
  _metadata: {
    version: 'OMEGA-DIVINE-v1.0.0',
    timestamp: new Date().toISOString(),
    mode: 'REFERENCE_ONLY_SIM',
    seal: 'INTERNAL_ONLY'
  },
  telemetry: {
    truthCycle_SIM: 266,
    latencyMs_SIM: 17.5,
    errorRate_SIM: 0,
    swarmAgents_SIM: '200B',
    shardCount_SIM: '50B',
    uptime_SIM: '99.999%'
  },
  financial: {
    recoveryTarget_SIM: 508631005.52,
    settlementAlpha_SIM: 10000000,
    btcAnchor_SIM: 70431.21,
    billingLiability_SIM: '$0.00',
    sovereignRisk_SIM: '0%',
    aggressorRisk_SIM: '100%'
  },
  forensic: {
    mimecastBlocks_SIM: 3393,
    wiretapIntercepts_SIM: 47,
    spoliationAttempts_SIM: 4,
    mortalityCount_SIM: 8,
    forensicStatus_SIM: 'SATURATED'
  },
  system: {
    layerStatus_SIM: {
      strategic: 'ANCHORED',
      forensic: 'SATURATED',
      liquidation: 'ACTIVE',
      technical: 'LOCKED'
    },
    merkleroot_SIM: '26856b24c50750f0c69c1eeb86a69ef777777',
    node_SIM: 'SAINT PAUL 55116',
    confirmations_SIM: 'INFINITY',
    grooveMode_SIM: 'PERPETUAL'
  },
  charts: {
    recoveryBreakdown_SIM: [
      { label: 'Institutional', value: 90000000, color: '#10b981' },
      { label: 'Adversarial', value: 323610000, color: '#f59e0b' },
      { label: 'Additional', value: 95021005, color: '#6366f1' }
    ],
    telemetryHistory_SIM: [
      { timestamp: '00:00', latency: 17.2, throughput: 99.8 },
      { timestamp: '04:00', latency: 17.5, throughput: 99.9 },
      { timestamp: '08:00', latency: 17.3, throughput: 99.7 },
      { timestamp: '12:00', latency: 17.8, throughput: 99.9 },
      { timestamp: '16:00', latency: 17.4, throughput: 99.8 },
      { timestamp: '20:00', latency: 17.6, throughput: 99.9 },
      { timestamp: 'NOW', latency: 17.5, throughput: 100.0 }
    ],
    layerHealth_SIM: [
      { layer: 'Strategic', health: 100, status: 'ANCHORED' },
      { layer: 'Forensic', health: 100, status: 'SATURATED' },
      { layer: 'Liquidation', health: 95, status: 'ACTIVE' },
      { layer: 'Technical', health: 100, status: 'LOCKED' }
    ]
  },
  // Default empty receipts - will be overwritten with live data
  receipts: {
    admitted: [],
    admittedCount: 0,
    rejectedCount: 0,
    quarantinedCount: 0,
    totalReceipts: 0,
  }
};

export async function GET() {
  // Get live receipt data from closed loop
  const telemetry = getTelemetry();
  const admittedReceipts = getReceiptsByStatus('ADMITTED');

  // Return sealed simulation state with fresh timestamp + live receipt data
  const state: Route71State = {
    ...SEALED_STATE,
    _metadata: {
      ...SEALED_STATE._metadata,
      timestamp: new Date().toISOString()
    },
    // Live receipt data from closed loop
    receipts: {
      admitted: admittedReceipts,
      admittedCount: telemetry.admitted,
      rejectedCount: telemetry.rejected,
      quarantinedCount: telemetry.quarantined,
      totalReceipts: telemetry.totalReceipts,
    },
  };

  return NextResponse.json(state, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'X-Seal-Status': 'INTERNAL_ONLY',
      'X-Mode': 'REFERENCE_ONLY_SIM'
    }
  });
}
