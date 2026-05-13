'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface BalanceUpdate {
  address: string;
  balance: string;
  usdValue: number;
  timestamp: number;
  change24h: number;
  changePercent24h: number;
  token: string;
  price: number;
}

interface LiveBalanceState {
  current: BalanceUpdate | null;
  history: BalanceUpdate[];
  isLoading: boolean;
  isConnected: boolean;
  lastUpdated: number;
  updateFrequency: number; // ms
}

export function useLiveBalance(walletAddress: string, updateIntervalMs = 1000) {
  const [state, setState] = useState<LiveBalanceState>({
    current: null,
    history: [],
    isLoading: true,
    isConnected: false,
    lastUpdated: 0,
    updateFrequency: updateIntervalMs,
  });

  const balanceHistoryRef = useRef<BalanceUpdate[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // Fetch balance from Ethereum RPC
  const fetchBalance = useCallback(async () => {
    try {
      const response = await fetch('/api/live-balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: walletAddress }),
      });
      
      if (!response.ok) throw new Error('Failed to fetch balance');
      
      const data: BalanceUpdate = await response.json();
      
      setState(prev => {
        const newHistory = [data, ...prev.history].slice(0, 60); // Keep last 60 updates
        return {
          ...prev,
          current: data,
          history: newHistory,
          isLoading: false,
          isConnected: true,
          lastUpdated: Date.now(),
        };
      });
      
      balanceHistoryRef.current = [...balanceHistoryRef.current, data].slice(-60);
    } catch (error) {
      console.error('[useLiveBalance] Fetch error:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [walletAddress]);

  // WebSocket subscription for real-time updates (fallback)
  const connectWebSocket = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    try {
      // Try to connect to a real-time service (e.g., Alchemy, Infura WebSocket)
      const wsUrl = `wss://eth-mainnet.ws.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || 'demo'}`;
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log('[useLiveBalance] WebSocket connected');
        
        // Subscribe to balance changes for this address
        wsRef.current?.send(JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'eth_subscribe',
          params: ['eth_blockHeaders'],
        }));
      };

      wsRef.current.onmessage = async (event) => {
        try {
          const message = JSON.parse(event.data);
          // Re-fetch balance on new block
          if (message.method === 'eth_subscription') {
            await fetchBalance();
          }
        } catch (e) {
          console.error('[useLiveBalance] WebSocket message error:', e);
        }
      };

      wsRef.current.onerror = () => {
        console.error('[useLiveBalance] WebSocket error');
        setState(prev => ({ ...prev, isConnected: false }));
      };

      wsRef.current.onclose = () => {
        console.log('[useLiveBalance] WebSocket closed');
        setState(prev => ({ ...prev, isConnected: false }));
      };
    } catch (error) {
      console.error('[useLiveBalance] WebSocket connection error:', error);
    }
  }, [fetchBalance]);

  // Poll balance at regular interval (primary)
  useEffect(() => {
    fetchBalance(); // Initial fetch
    
    intervalRef.current = setInterval(() => {
      fetchBalance();
    }, state.updateFrequency);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchBalance, state.updateFrequency]);

  // WebSocket connection (secondary)
  useEffect(() => {
    connectWebSocket();
    
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connectWebSocket]);

  return state;
}
