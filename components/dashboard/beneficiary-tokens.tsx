'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coins, Shield, CheckCircle2 } from 'lucide-react';

const beneficiaryTokens = [
  { id: 'TOKEN_001', symbol: '$POTTER', name: 'Potter Token', status: 'ENCAPSULATED' },
  { id: 'TOKEN_002', symbol: '$NEWT2207', name: 'NEWT 2207 Token', status: 'ENCAPSULATED' },
  { id: 'TOKEN_003', symbol: '$BRADEN168', name: 'Braden 168 Token', status: 'ENCAPSULATED' },
  { id: 'TOKEN_004', symbol: '$MASON', name: 'Mason Token', status: 'ENCAPSULATED' },
  { id: 'TOKEN_005', symbol: '$DONNY2207', name: 'Donny 2207 Token', status: 'ENCAPSULATED' },
  { id: 'TOKEN_006', symbol: '$JAXX2207', name: 'JAXX 2207 Token', status: 'ENCAPSULATED' },
];

export function BeneficiaryTokens() {
  return (
    <Card className="border-border bg-card/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-mono text-lg flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-400" />
            Beneficiary Tokens
          </CardTitle>
          <Badge variant="outline" className="font-mono text-xs bg-amber-400/20 text-amber-400 border-amber-400/40">
            6 PROTECTED
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {beneficiaryTokens.map((token) => (
            <div
              key={token.id}
              className="p-3 rounded-md bg-secondary/30 border border-border hover:border-amber-400/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span className="font-mono text-sm font-bold text-amber-400">{token.symbol}</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              </div>
              <p className="font-mono text-xs text-muted-foreground mb-1">{token.name}</p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground/60">{token.id}</span>
                <Badge variant="outline" className="font-mono text-xs bg-green-400/10 text-green-400 border-green-400/30">
                  {token.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-md bg-amber-400/10 border border-amber-400/30">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-xs text-amber-400 uppercase">Protection Level</span>
          </div>
          <p className="font-mono text-sm text-foreground">
            Sovereign Auditor Anchor
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            All tokens protected under 3/3 multisig governance structure
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
