'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Network, Terminal, FileCode, Shield, Users, Anchor, Building2, CheckCircle2, Lock } from 'lucide-react';

const securityLayers = [
  {
    id: 'L1',
    name: 'Network',
    component: 'Recursive Packet Incineration',
    status: 'LOCKED',
    description: 'Unauthorized packets are hashed into Saint Paul 55116 Deep Forensic Root',
    icon: Network,
    color: 'cyan',
  },
  {
    id: 'L2',
    name: 'Terminal',
    component: 'Forensic Cinematic Monitoring',
    status: 'LOCKED',
    description: 'Project Cinema Forensic Standards with cryptographic extraction',
    icon: Terminal,
    color: 'purple',
  },
  {
    id: 'L3',
    name: 'Contract',
    component: 'Sovereign Auditor Anchor',
    status: 'LOCKED',
    description: 'Smart contract with onlySovereign modifier and adversary nullification',
    icon: FileCode,
    color: 'amber',
  },
  {
    id: 'L4',
    name: 'Verification',
    component: 'Canonical Export + Signed Receipts',
    status: 'DEPLOYED',
    description: 'SHA-256 hashing, HMAC-SHA256 signing, chained event log',
    icon: Shield,
    color: 'green',
  },
  {
    id: 'L5',
    name: 'Governance',
    component: '3/3 Multisig ($GREYSON, $TONY, $GILLSON)',
    status: 'CONFIRMED',
    description: 'Unanimous multisig approval required for all sovereign operations',
    icon: Users,
    color: 'blue',
  },
  {
    id: 'L6',
    name: 'Anchor',
    component: 'Saint Paul 55116 Deep Forensic Root',
    status: 'IMMUTABLE',
    description: 'Merkleroot anchor for all security outputs',
    icon: Anchor,
    color: 'red',
  },
  {
    id: 'L7',
    name: 'Institutional',
    component: 'Liability Matrix + Federal Sync',
    status: 'ENFORCING',
    description: 'HHS OCR 25-621293, FBI, DOJ/VA OIG coordination active',
    icon: Building2,
    color: 'orange',
  },
];

const statusColors: Record<string, string> = {
  LOCKED: 'bg-green-400/20 text-green-400 border-green-400/40',
  DEPLOYED: 'bg-cyan-400/20 text-cyan-400 border-cyan-400/40',
  CONFIRMED: 'bg-blue-400/20 text-blue-400 border-blue-400/40',
  IMMUTABLE: 'bg-red-400/20 text-red-400 border-red-400/40',
  ENFORCING: 'bg-orange-400/20 text-orange-400 border-orange-400/40',
};

const layerColors: Record<string, string> = {
  cyan: 'border-l-cyan-400',
  purple: 'border-l-purple-400',
  amber: 'border-l-amber-400',
  green: 'border-l-green-400',
  blue: 'border-l-blue-400',
  red: 'border-l-red-400',
  orange: 'border-l-orange-400',
};

const iconColors: Record<string, string> = {
  cyan: 'text-cyan-400',
  purple: 'text-purple-400',
  amber: 'text-amber-400',
  green: 'text-green-400',
  blue: 'text-blue-400',
  red: 'text-red-400',
  orange: 'text-orange-400',
};

export function SecurityLayerStack() {
  return (
    <Card className="border-border bg-card/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-mono text-lg flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            Security Layer Stack
          </CardTitle>
          <Badge variant="outline" className="font-mono text-xs bg-green-400/20 text-green-400 border-green-400/40">
            ALL LAYERS ACTIVE
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {securityLayers.map((layer) => {
          const Icon = layer.icon;
          return (
            <div
              key={layer.id}
              className={cn(
                'p-4 rounded-md bg-secondary/30 border border-border border-l-4 transition-all hover:bg-secondary/50',
                layerColors[layer.color]
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 rounded-md bg-background/50">
                    <Icon className={cn('w-4 h-4', iconColors[layer.color])} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-muted-foreground">{layer.id}:</span>
                      <span className="font-mono text-sm font-medium text-foreground">{layer.name}</span>
                    </div>
                    <p className="font-mono text-xs text-primary mb-1">{layer.component}</p>
                    <p className="text-xs text-muted-foreground">{layer.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <Badge variant="outline" className={cn('font-mono text-xs', statusColors[layer.status])}>
                    {layer.status}
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
