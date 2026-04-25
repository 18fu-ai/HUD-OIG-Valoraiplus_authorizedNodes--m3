'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { CDSLayer, CDSSection } from '@/lib/cds-data';

interface LayerCardProps {
  layer: CDSLayer;
  sections: CDSSection[];
  isExpanded?: boolean;
  onToggle?: () => void;
}

const statusColors: Record<string, string> = {
  ANCHORED: 'bg-status-anchored/20 text-status-anchored border-status-anchored/40',
  SATURATED: 'bg-status-saturated/20 text-status-saturated border-status-saturated/40',
  ACTIVE: 'bg-status-active/20 text-status-active border-status-active/40',
  LOCKED: 'bg-status-locked/20 text-status-locked border-status-locked/40',
};

const borderColors: Record<string, string> = {
  ANCHORED: 'border-status-anchored/30 hover:border-status-anchored/60',
  SATURATED: 'border-status-saturated/30 hover:border-status-saturated/60',
  ACTIVE: 'border-status-active/30 hover:border-status-active/60',
  LOCKED: 'border-status-locked/30 hover:border-status-locked/60',
};

const glowColors: Record<string, string> = {
  ANCHORED: 'shadow-status-anchored/10',
  SATURATED: 'shadow-status-saturated/10',
  ACTIVE: 'shadow-status-active/10',
  LOCKED: 'shadow-status-locked/10',
};

export function LayerCard({ layer, sections, isExpanded, onToggle }: LayerCardProps) {
  return (
    <Card 
      className={cn(
        'cursor-pointer transition-all duration-300 border',
        borderColors[layer.status],
        isExpanded && `shadow-lg ${glowColors[layer.status]}`
      )}
      onClick={onToggle}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="font-mono text-lg flex items-center gap-3">
            <span className="text-muted-foreground">LAYER {layer.id}:</span>
            <span className="text-foreground">{layer.name}</span>
          </CardTitle>
          <Badge 
            variant="outline" 
            className={cn('font-mono text-xs', statusColors[layer.status])}
          >
            {layer.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground font-mono">
          {layer.sovereignEffect}
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-3">
          <span>SECTIONS {layer.sections[0]}-{layer.sections[layer.sections.length - 1]}</span>
          <span className="text-border">|</span>
          <span>{sections.length} items</span>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            {sections.map((section) => (
              <div 
                key={section.id}
                className="p-3 rounded-md bg-secondary/50 border border-border"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs text-muted-foreground">
                    S{section.id.toString().padStart(2, '0')}
                  </span>
                  <span className="font-mono text-sm text-foreground font-medium">
                    {section.title}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {section.subtitle}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {section.details.map((detail, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 rounded text-xs font-mono bg-card border border-border text-foreground"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
