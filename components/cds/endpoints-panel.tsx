'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Lock, CheckCircle2 } from 'lucide-react';

const endpoints = [
  { 
    path: '/law-enforcement', 
    description: 'Federal agency access point',
    status: 'active',
    secured: true
  },
  { 
    path: '/traffic-logs', 
    description: 'Real-time traffic telemetry',
    status: 'active',
    secured: true
  },
  { 
    path: '/treasury', 
    description: 'Financial operations endpoint',
    status: 'active',
    secured: true
  },
  { 
    path: '/evidence-chain', 
    description: 'Spoliation shield interface',
    status: 'active',
    secured: true
  },
  { 
    path: '/swarm-status', 
    description: 'Agent network monitoring',
    status: 'active',
    secured: true
  },
];

export function EndpointsPanel() {
  return (
    <Card className="border-border bg-card/50">
      <CardHeader className="pb-3">
        <CardTitle className="font-mono text-sm flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary" />
          SYSTEM ENDPOINTS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {endpoints.map((endpoint) => (
            <div 
              key={endpoint.path}
              className="flex items-center justify-between p-3 rounded-md bg-secondary/30 border border-border"
            >
              <div className="flex items-center gap-3">
                {endpoint.secured && (
                  <Lock className="w-4 h-4 text-status-anchored" />
                )}
                <div>
                  <code className="font-mono text-sm text-primary">
                    {endpoint.path}
                  </code>
                  <p className="font-mono text-xs text-muted-foreground">
                    {endpoint.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-status-anchored" />
                <Badge 
                  variant="outline" 
                  className="font-mono text-xs bg-status-anchored/20 text-status-anchored border-status-anchored/40"
                >
                  ACTIVE
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
