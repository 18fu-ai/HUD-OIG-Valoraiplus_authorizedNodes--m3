'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ShieldCheck, AlertTriangle, Info } from 'lucide-react';
import type { TelemetryTier, ProvenanceTag } from '@/lib/runtime-metrics';

interface TrustBoundaryProps {
  className?: string;
}

const TIERS: { tier: TelemetryTier; label: string; description: string; color: string; count: number }[] = [
  {
    tier: 'RUNTIME_VERIFIED',
    label: 'Runtime Verified',
    description: 'Deterministic, machine-provable. System behavior proven by code execution.',
    color: 'text-status-anchored',
    count: 12,
  },
  {
    tier: 'PENDING_CORROBORATION',
    label: 'Pending Corroboration',
    description: 'Awaiting external validation. Evidence proves external reality.',
    color: 'text-status-active',
    count: 4,
  },
  {
    tier: 'EXTERNALLY_CORROBORATED',
    label: 'Externally Corroborated',
    description: 'Third-party confirmed. Backed by receipts, agency documents, or court records.',
    color: 'text-status-saturated',
    count: 0,
  },
];

/**
 * TrustBoundary — Visualizes the 3-tier telemetry boundary.
 * Makes it immediately clear which data is machine-proven vs. pending external validation.
 * This is the reviewer-safe framing layer.
 */
export function TrustBoundary({ className }: TrustBoundaryProps) {
  return (
    <Card className={cn('border-border bg-card/50', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="font-mono text-sm flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary" />
          TRUST BOUNDARY
          <Badge variant="outline" className="font-mono text-[10px] bg-primary/10 text-primary border-primary/40 ml-auto">
            REVIEWER-SAFE
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {TIERS.map((t) => {
          const Icon = t.tier === 'RUNTIME_VERIFIED' ? ShieldCheck 
            : t.tier === 'PENDING_CORROBORATION' ? AlertTriangle 
            : Info;
          
          return (
            <div 
              key={t.tier}
              className="flex items-start gap-3 p-3 rounded-md bg-secondary/30 border border-border"
              role="listitem"
            >
              <div className={cn('mt-0.5', t.color)}>
                <Icon className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn('font-mono text-xs font-medium', t.color)}>
                    {t.label}
                  </span>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    {t.count} metrics
                  </Badge>
                </div>
                <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                  {t.description}
                </p>
              </div>
            </div>
          );
        })}
        
        <div className="pt-2 border-t border-border">
          <p className="font-mono text-[10px] text-muted-foreground text-center leading-relaxed">
            CORE INVARIANT: execution proves system behavior | evidence proves external reality
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * ProvenanceBadge — Inline provenance tag for individual data points.
 * Shows the telemetry tier, source, and schema rev of any displayed value.
 */
export function ProvenanceBadge({ provenance }: { provenance: ProvenanceTag }) {
  const tierColors: Record<TelemetryTier, string> = {
    RUNTIME_VERIFIED: 'bg-status-anchored/10 text-status-anchored border-status-anchored/30',
    PENDING_CORROBORATION: 'bg-status-active/10 text-status-active border-status-active/30',
    EXTERNALLY_CORROBORATED: 'bg-status-saturated/10 text-status-saturated border-status-saturated/30',
  };
  
  const tierLabels: Record<TelemetryTier, string> = {
    RUNTIME_VERIFIED: 'RV',
    PENDING_CORROBORATION: 'PC',
    EXTERNALLY_CORROBORATED: 'EC',
  };
  
  return (
    <Badge 
      variant="outline" 
      className={cn('font-mono text-[9px] gap-1', tierColors[provenance.tier])}
      title={`Source: ${provenance.source} | Schema: ${provenance.schemaRev} | Tier: ${provenance.tier}`}
    >
      <span aria-hidden="true">{tierLabels[provenance.tier]}</span>
      <span className="sr-only">{provenance.tier}</span>
      <span className="opacity-60">|</span>
      <span>{provenance.schemaRev}</span>
    </Badge>
  );
}
