'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Server, Shield, Terminal, DollarSign } from 'lucide-react';
import type { HealthDomain, MetricDomain, MetricStatus } from '@/lib/runtime-metrics';
import { ProvenanceBadge } from './trust-boundary';

interface HealthDomainsProps {
  domains: HealthDomain[];
  className?: string;
}

const domainIcons: Record<MetricDomain, typeof Server> = {
  infrastructure: Server,
  forensic: Shield,
  protocol: Terminal,
  financial: DollarSign,
};

const statusStyles: Record<MetricStatus, string> = {
  nominal: 'bg-status-anchored/10 text-status-anchored border-status-anchored/30',
  degraded: 'bg-status-active/10 text-status-active border-status-active/30',
  critical: 'bg-status-locked/10 text-status-locked border-status-locked/30',
  stale: 'bg-muted/50 text-muted-foreground border-border',
};

const statusLabels: Record<MetricStatus, string> = {
  nominal: 'NOMINAL',
  degraded: 'DEGRADED',
  critical: 'CRITICAL',
  stale: 'STALE',
};

/**
 * HealthDomains — Separated health visualization per domain.
 * Each domain (infrastructure, forensic, protocol, financial) gets its own
 * score card with individual metric breakdowns and provenance tags.
 */
export function HealthDomains({ domains, className }: HealthDomainsProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-4', className)} role="list" aria-label="System health domains">
      {domains.map((domain) => {
        const Icon = domainIcons[domain.domain];
        const scoreColor = domain.score >= 90 
          ? 'text-status-anchored' 
          : domain.score >= 70 
            ? 'text-status-active' 
            : 'text-status-locked';
        
        return (
          <Card 
            key={domain.domain} 
            className="border-border bg-card/50"
            role="listitem"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="font-mono text-xs flex items-center gap-2">
                  <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                  {domain.label.toUpperCase()}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className={cn('font-mono text-sm font-bold tabular-nums', scoreColor)}>
                    {domain.score}%
                  </span>
                  <Badge 
                    variant="outline" 
                    className={cn('font-mono text-[9px]', statusStyles[domain.status])}
                  >
                    {statusLabels[domain.status]}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Score Bar */}
              <div className="h-1 bg-secondary rounded-full overflow-hidden mb-3" aria-hidden="true">
                <div 
                  className={cn(
                    'h-full rounded-full transition-all duration-700',
                    domain.score >= 90 ? 'bg-status-anchored' : domain.score >= 70 ? 'bg-status-active' : 'bg-status-locked'
                  )}
                  style={{ width: `${domain.score}%` }}
                />
              </div>
              
              {/* Metric Rows */}
              <div className="space-y-1.5">
                {domain.metrics.map((metric) => (
                  <div 
                    key={metric.id} 
                    className="flex items-center justify-between py-1 px-2 rounded bg-secondary/20"
                  >
                    <span className="font-mono text-[10px] text-muted-foreground truncate mr-2">
                      {metric.label}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={cn(
                        'font-mono text-[10px] font-medium tabular-nums',
                        metric.status === 'nominal' ? 'text-foreground' : 
                        metric.status === 'degraded' ? 'text-status-active' : 'text-status-locked'
                      )}>
                        {typeof metric.value === 'number' && metric.unit === 'USD' 
                          ? `$${metric.value.toLocaleString()}`
                          : `${metric.value}${metric.unit !== 'USD' ? metric.unit : ''}`
                        }
                      </span>
                      <ProvenanceBadge provenance={metric.provenance} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
