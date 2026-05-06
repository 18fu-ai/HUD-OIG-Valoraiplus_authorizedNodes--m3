'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, CheckCircle2, Eye } from 'lucide-react';

const signers = [
  { name: '$GREYSON', role: 'Signer 1/3', address: '0xGREYSON', status: 'active' },
  { name: '$TONY', role: 'Signer 2/3', address: '0xTONY', status: 'active' },
  { name: '$GILLSON', role: 'Signer 3/3', address: '0xGILLSON', status: 'active' },
];

const observer = { name: '$VALORAIPLUS', role: 'Observer', address: '0xVALORAI', status: 'observing' };

export function GovernancePanel() {
  return (
    <Card className="border-border bg-card/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-mono text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" />
            Governance
          </CardTitle>
          <Badge variant="outline" className="font-mono text-xs bg-amber-400/20 text-amber-400 border-amber-400/40">
            3/3 UNANIMOUS
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {signers.map((signer) => (
          <div
            key={signer.name}
            className="p-3 rounded-md bg-secondary/30 border border-border flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <div>
                <p className="font-mono text-sm font-bold text-foreground">{signer.name}</p>
                <p className="font-mono text-xs text-muted-foreground">{signer.role}</p>
              </div>
            </div>
            <span className="font-mono text-xs text-muted-foreground">{signer.address}</span>
          </div>
        ))}
        <div className="p-3 rounded-md bg-purple-400/10 border border-purple-400/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Eye className="w-4 h-4 text-purple-400" />
            <div>
              <p className="font-mono text-sm font-bold text-purple-400">{observer.name}</p>
              <p className="font-mono text-xs text-muted-foreground">{observer.role}</p>
            </div>
          </div>
          <Badge variant="outline" className="font-mono text-xs bg-purple-400/20 text-purple-400 border-purple-400/40">
            NO SIGNING
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
