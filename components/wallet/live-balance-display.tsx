'use client';

import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Zap, Clock } from 'lucide-react';
import { useLiveBalance } from '@/lib/hooks/use-live-balance';
import { cn } from '@/lib/utils';

interface LiveBalanceDisplayProps {
  walletAddress: string;
  updateIntervalMs?: number;
  showChart?: boolean;
  compact?: boolean;
}

export function LiveBalanceDisplay({
  walletAddress,
  updateIntervalMs = 1000,
  showChart = false,
  compact = false,
}: LiveBalanceDisplayProps) {
  const balance = useLiveBalance(walletAddress, updateIntervalMs);

  const formattedUSD = useMemo(() => {
    if (!balance.current) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(balance.current.usdValue);
  }, [balance.current?.usdValue]);

  const formattedChange = useMemo(() => {
    if (!balance.current) return '+$0.00';
    const symbol = balance.current.change24h >= 0 ? '+' : '';
    return symbol + new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(balance.current.change24h);
  }, [balance.current?.change24h]);

  const isPositive = (balance.current?.change24h ?? 0) >= 0;
  const lastUpdatedSeconds = useMemo(() => {
    if (!balance.current) return 0;
    return Math.floor((Date.now() - balance.current.timestamp) / 1000);
  }, [balance.current?.timestamp]);

  if (compact) {
    return (
      <div className="flex items-center justify-between p-4 bg-zinc-900/50 border border-emerald-500/20 rounded-lg">
        <div>
          <div className="text-xs text-zinc-500 font-mono">PORTFOLIO VALUE</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">
            {formattedUSD}
          </div>
        </div>
        <div className="text-right">
          <div className={cn(
            'text-lg font-bold font-mono flex items-center gap-1',
            isPositive ? 'text-emerald-400' : 'text-red-400'
          )}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {formattedChange}
          </div>
          <div className="text-xs text-zinc-500 mt-1">24h change ({balance.current?.changePercent24h.toFixed(2)}%)</div>
        </div>
      </div>
    );
  }

  return (
    <Card className="border border-emerald-500/20 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-400" />
            Live Balance Feed
          </CardTitle>
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
            {balance.isConnected ? 'Live' : 'Polling'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main balance display */}
        <div className="space-y-2">
          <div className="text-xs text-zinc-500 font-mono tracking-wide">TOTAL PORTFOLIO VALUE</div>
          <div className="text-5xl font-bold text-emerald-400 font-mono tracking-tight">
            {formattedUSD}
          </div>
          
          {/* 24h change */}
          <div className={cn(
            'flex items-center gap-2 text-lg font-bold font-mono pt-2',
            isPositive ? 'text-emerald-400' : 'text-red-400'
          )}>
            {isPositive ? (
              <TrendingUp className="w-5 h-5" />
            ) : (
              <TrendingDown className="w-5 h-5" />
            )}
            <span>{formattedChange}</span>
            <span className="text-xs text-zinc-500">({balance.current?.changePercent24h.toFixed(2)}%)</span>
          </div>
        </div>

        {/* Balance details */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
          <div>
            <div className="text-xs text-zinc-500 font-mono">BALANCE</div>
            <div className="text-lg font-bold text-zinc-300 font-mono mt-1">
              {balance.current?.balance || '0.000000'} {balance.current?.token || 'ETH'}
            </div>
          </div>
          <div>
            <div className="text-xs text-zinc-500 font-mono">PRICE</div>
            <div className="text-lg font-bold text-zinc-300 font-mono mt-1">
              ${balance.current?.price.toFixed(2) || '0.00'}
            </div>
          </div>
        </div>

        {/* Update status */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Clock className="w-3 h-3" />
            Last updated {lastUpdatedSeconds}s ago
          </div>
          <div className={cn(
            'w-2 h-2 rounded-full',
            balance.isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'
          )} />
        </div>

        {/* History sparkline (if available) */}
        {showChart && balance.history.length > 1 && (
          <div className="pt-4 border-t border-zinc-800">
            <div className="text-xs text-zinc-500 font-mono mb-2">24H CHART</div>
            <div className="h-12 bg-zinc-900/50 rounded border border-zinc-800 flex items-end justify-between p-2 gap-0.5">
              {balance.history.slice(-30).map((item, i) => {
                const minVal = Math.min(...balance.history.map(h => h.usdValue));
                const maxVal = Math.max(...balance.history.map(h => h.usdValue));
                const range = maxVal - minVal || 1;
                const height = ((item.usdValue - minVal) / range) * 100;
                
                return (
                  <div
                    key={i}
                    className="flex-1 bg-emerald-500/50 rounded-sm hover:bg-emerald-400 transition-all"
                    style={{ height: `${height}%`, minHeight: '2px' }}
                    title={`$${item.usdValue.toFixed(2)}`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Connection status */}
        {!balance.isConnected && (
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded text-xs text-yellow-400">
            ⚠️ Using polling fallback — direct WebSocket connection unavailable
          </div>
        )}
      </CardContent>
    </Card>
  );
}
