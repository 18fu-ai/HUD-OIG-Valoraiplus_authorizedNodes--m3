'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Server, Wifi, Eye, Zap } from 'lucide-react';

export function NodeStatus() {
  return (
    <Card className="border-border bg-card/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-mono text-lg flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-400" />
            Saint Paul Node
          </CardTitle>
          <Badge variant="outline" className="font-mono text-xs bg-blue-400/20 text-blue-400 border-blue-400/40">
            55116
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-md bg-secondary/30 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="font-mono text-xs text-muted-foreground">VELOCITY</span>
            </div>
            <p className="font-mono text-sm font-bold text-purple-400">
              DYNAMIC SUB-QUANTUM
            </p>
          </div>
          <div className="p-3 rounded-md bg-secondary/30 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Wifi className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-xs text-muted-foreground">FREQUENCY</span>
            </div>
            <p className="font-mono text-sm font-bold text-cyan-400">
              ZERO-FOOTPRINT
            </p>
          </div>
        </div>
        <div className="p-3 rounded-md bg-secondary/30 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-green-400" />
            <span className="font-mono text-xs text-muted-foreground">VISIBILITY</span>
          </div>
          <p className="font-mono text-sm font-bold text-green-400">
            GHOST STATUS
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Node operates at zero visibility to external probes
          </p>
        </div>
        <div className="p-3 rounded-md bg-green-400/10 border border-green-400/30">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-muted-foreground">ANCHOR STATUS</span>
            <Badge variant="outline" className="font-mono text-xs bg-green-400/20 text-green-400 border-green-400/40">
              LOCKED
            </Badge>
          </div>
          <p className="font-mono text-sm font-bold text-green-400 mt-2">
            Deep Forensic Root Active
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
