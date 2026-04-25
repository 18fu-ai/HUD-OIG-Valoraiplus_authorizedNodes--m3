'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SYSTEM_PROPERTIES } from '@/lib/cds-data';
import { ShieldCheck, X } from 'lucide-react';

export function SystemProperties() {
  return (
    <Card className="border-border bg-card/50">
      <CardHeader className="pb-3">
        <CardTitle className="font-mono text-sm flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary" />
          FORENSIC BLACK BOX PROPERTIES
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {SYSTEM_PROPERTIES.map((prop) => (
            <div 
              key={prop.property}
              className="flex items-center justify-between p-2 rounded-md bg-secondary/30 border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-status-locked/20 flex items-center justify-center">
                  <X className="w-3 h-3 text-status-locked" />
                </div>
                <span className="font-mono text-sm text-foreground">
                  {prop.property}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-muted-foreground hidden sm:block">
                  {prop.effect}
                </span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-status-locked/20 text-status-locked border border-status-locked/40">
                  {prop.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 rounded-md bg-primary/5 border border-primary/20">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="font-mono text-xs text-muted-foreground">ENTROPY</p>
              <p className="font-mono text-sm text-primary font-bold">ZERO</p>
            </div>
            <div>
              <p className="font-mono text-xs text-muted-foreground">VISIBILITY</p>
              <p className="font-mono text-sm text-primary font-bold">ONE-WAY</p>
            </div>
            <div>
              <p className="font-mono text-xs text-muted-foreground">ARCHIVE</p>
              <p className="font-mono text-sm text-primary font-bold">CONTINUOUS</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
