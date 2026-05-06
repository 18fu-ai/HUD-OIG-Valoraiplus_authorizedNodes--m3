'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle2, FileCode, Link2, Hash } from 'lucide-react';

const verificationComponents = [
  {
    name: 'Canonical Export Generator',
    file: 'lib/verification/canonical.ts',
    status: 'IMPLEMENTED',
    icon: FileCode,
  },
  {
    name: 'Signed Receipt Generator',
    file: 'lib/verification/signed-receipt.ts',
    status: 'IMPLEMENTED',
    icon: Hash,
  },
  {
    name: 'Chained Event Log',
    file: 'lib/verification/event-chain.ts',
    status: 'IMPLEMENTED',
    icon: Link2,
  },
];

const endpoints = [
  { method: 'POST', path: '/api/verification/export', description: 'Create signed export package' },
  { method: 'GET', path: '/api/verification/export', description: 'Get beneficiary tokens / chain info' },
  { method: 'POST', path: '/api/verification/verify', description: 'Verify package externally' },
  { method: 'GET', path: '/api/verification/verify', description: 'Get verification protocol info' },
];

export function VerificationStatus() {
  return (
    <Card className="border-border bg-card/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-mono text-lg flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-400" />
            Verification Layer
          </CardTitle>
          <Badge variant="outline" className="font-mono text-xs bg-green-400/20 text-green-400 border-green-400/40">
            DEPLOYED
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="font-mono text-xs text-muted-foreground mb-2 uppercase">Components</p>
          <div className="space-y-2">
            {verificationComponents.map((comp) => {
              const Icon = comp.icon;
              return (
                <div
                  key={comp.name}
                  className="p-2 rounded-md bg-secondary/30 border border-border flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono text-xs text-foreground">{comp.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{comp.file}</span>
                    <CheckCircle2 className="w-3 h-3 text-green-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <p className="font-mono text-xs text-muted-foreground mb-2 uppercase">Endpoints</p>
          <div className="space-y-2">
            {endpoints.map((ep) => (
              <div
                key={ep.path + ep.method}
                className="p-2 rounded-md bg-secondary/30 border border-border flex items-center gap-3"
              >
                <Badge
                  variant="outline"
                  className={`font-mono text-xs ${
                    ep.method === 'POST'
                      ? 'bg-amber-400/20 text-amber-400 border-amber-400/40'
                      : 'bg-cyan-400/20 text-cyan-400 border-cyan-400/40'
                  }`}
                >
                  {ep.method}
                </Badge>
                <span className="font-mono text-xs text-foreground">{ep.path}</span>
                <span className="font-mono text-xs text-muted-foreground ml-auto">{ep.description}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-3 rounded-md bg-green-400/10 border border-green-400/30">
          <p className="font-mono text-xs text-muted-foreground mb-1">CRYPTOGRAPHIC STANDARDS</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="font-mono text-xs bg-background/50">SHA-256</Badge>
            <Badge variant="outline" className="font-mono text-xs bg-background/50">HMAC-SHA256</Badge>
            <Badge variant="outline" className="font-mono text-xs bg-background/50">Previous-hash linking</Badge>
            <Badge variant="outline" className="font-mono text-xs bg-background/50">16-byte nonce</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
