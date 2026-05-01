'use client';

import useSWR from 'swr';

/**
 * VALORAIPLUS Authority Hook
 * ==========================
 * Fetches greenAllowed and runtimeSignal from backend authority layer.
 * Dashboard MUST use this hook - MUST NOT compute greenAllowed locally.
 */

interface AuthorityData {
  authority: {
    greenAllowed: boolean;
    runtimeSignal: 'OPTIMUM' | 'NOMINAL' | 'DEGRADED' | 'CRITICAL';
    signalPercent: number;
    driftCriticalCount: number;
    ancestryComplete: boolean;
    assuranceClean: boolean;
    maturationComplete: boolean;
    protocolRev: string;
    validatorConsensus: number;
    validatorTarget: number;
    timestamp: string;
    truthCycle: number;
  };
  ledger: {
    status: 'IMMUTABLE' | 'MUTABLE' | 'LOCKED';
    denomination: 'USDC';
    tokens: {
      symbol: string;
      status: 'TRUE' | 'ACTIVE' | 'PROTECTED' | 'NULL' | 'PURGED';
    }[];
  };
  sgau: {
    filing: string;
    status: 'STANDS' | 'PENDING' | 'CONTESTED';
    protectedAssets: string[];
  };
}

const fetcher = async (url: string): Promise<AuthorityData> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Authority fetch failed');
  return res.json();
};

export function useAuthority(refreshInterval = 1000) {
  const { data, error, isLoading, mutate } = useSWR<AuthorityData>(
    '/api/authority',
    fetcher,
    {
      refreshInterval,
      revalidateOnFocus: true,
      dedupingInterval: 500,
    }
  );

  // Default fallback while loading - NEVER show green until authority confirms
  const defaultAuthority: AuthorityData = {
    authority: {
      greenAllowed: false, // CRITICAL: Default to false until backend confirms
      runtimeSignal: 'CRITICAL',
      signalPercent: 0,
      driftCriticalCount: 1,
      ancestryComplete: false,
      assuranceClean: false,
      maturationComplete: false,
      protocolRev: 'REV_38',
      validatorConsensus: 0,
      validatorTarget: 144000,
      timestamp: new Date().toISOString(),
      truthCycle: 0,
    },
    ledger: {
      status: 'LOCKED',
      denomination: 'USDC',
      tokens: [],
    },
    sgau: {
      filing: '7226.3461',
      status: 'PENDING',
      protectedAssets: [],
    },
  };

  return {
    authority: data?.authority ?? defaultAuthority.authority,
    ledger: data?.ledger ?? defaultAuthority.ledger,
    sgau: data?.sgau ?? defaultAuthority.sgau,
    isLoading,
    isError: !!error,
    refresh: mutate,
  };
}
