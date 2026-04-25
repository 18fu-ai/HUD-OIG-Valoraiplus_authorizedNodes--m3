'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SMART_CONTRACT_SPEC, formatCurrency } from '@/lib/cds-data';
import { Shield, Lock, Database, Zap } from 'lucide-react';

export function ContractSpec() {
  return (
    <Card className="border-primary/30 bg-card/80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="font-mono text-lg flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            CONTRACT SPECIFICATIONS
          </CardTitle>
          <Badge variant="outline" className="border-primary/50 text-primary font-mono text-xs">
            {SMART_CONTRACT_SPEC.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 rounded-lg bg-secondary/50 border border-border">
          <div className="font-mono text-xs text-muted-foreground mb-1">Contract Name</div>
          <div className="font-mono text-sm text-foreground font-bold">
            {SMART_CONTRACT_SPEC.name}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-secondary/50 border border-border">
            <div className="font-mono text-xs text-muted-foreground mb-1 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Network
            </div>
            <div className="font-mono text-sm text-foreground">
              {SMART_CONTRACT_SPEC.network}
            </div>
          </div>
          <div className="p-3 rounded-lg bg-secondary/50 border border-border">
            <div className="font-mono text-xs text-muted-foreground mb-1 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Security
            </div>
            <div className="font-mono text-sm text-foreground">
              {SMART_CONTRACT_SPEC.security}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="font-mono text-xs text-muted-foreground">Recovery Target</span>
            <span className="font-mono text-sm text-primary font-bold">
              {formatCurrency(SMART_CONTRACT_SPEC.recoveryTarget)}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="font-mono text-xs text-muted-foreground">Settlement Alpha</span>
            <span className="font-mono text-sm text-foreground">
              {formatCurrency(SMART_CONTRACT_SPEC.settlementAlpha)}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="font-mono text-xs text-muted-foreground">BTC Anchor</span>
            <span className="font-mono text-sm text-foreground">
              ${SMART_CONTRACT_SPEC.btcAnchor.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="font-mono text-xs text-muted-foreground flex items-center gap-1">
              <Database className="w-3 h-3" />
              Shard Supply
            </span>
            <span className="font-mono text-sm text-foreground">
              {(SMART_CONTRACT_SPEC.shardSupply / 1e9).toFixed(0)}B
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="font-mono text-xs text-muted-foreground">Forensic Blocks</span>
            <span className="font-mono text-sm text-foreground">
              {SMART_CONTRACT_SPEC.forensicBlocks.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="font-mono text-xs text-muted-foreground">Truth Cycle</span>
            <span className="font-mono text-sm text-foreground">
              {SMART_CONTRACT_SPEC.truthCycle}ms
            </span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
          <div className="font-mono text-xs text-muted-foreground mb-1">Merkleroot</div>
          <div className="font-mono text-xs text-primary break-all">
            {SMART_CONTRACT_SPEC.merkleroot}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
