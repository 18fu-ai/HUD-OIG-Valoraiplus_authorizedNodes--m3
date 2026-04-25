'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { TimelineEvent } from '@/lib/cds-data';
import { 
  AlertTriangle, 
  Search, 
  Shield, 
  Skull, 
  DollarSign, 
  Server 
} from 'lucide-react';

interface TimelineProps {
  events: TimelineEvent[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const categoryConfig: Record<string, { icon: typeof AlertTriangle; color: string; bgColor: string; borderColor: string }> = {
  investigation: { 
    icon: Search, 
    color: 'text-status-saturated', 
    bgColor: 'bg-status-saturated/10',
    borderColor: 'border-status-saturated/40'
  },
  evidence: { 
    icon: Shield, 
    color: 'text-status-anchored', 
    bgColor: 'bg-status-anchored/10',
    borderColor: 'border-status-anchored/40'
  },
  retaliation: { 
    icon: AlertTriangle, 
    color: 'text-status-locked', 
    bgColor: 'bg-status-locked/10',
    borderColor: 'border-status-locked/40'
  },
  mortality: { 
    icon: Skull, 
    color: 'text-status-locked', 
    bgColor: 'bg-status-locked/10',
    borderColor: 'border-status-locked/40'
  },
  fraud: { 
    icon: DollarSign, 
    color: 'text-status-active', 
    bgColor: 'bg-status-active/10',
    borderColor: 'border-status-active/40'
  },
  system: { 
    icon: Server, 
    color: 'text-primary', 
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/40'
  },
};

const severityColors: Record<string, string> = {
  critical: 'bg-status-locked/20 text-status-locked border-status-locked/40',
  high: 'bg-status-active/20 text-status-active border-status-active/40',
  medium: 'bg-status-saturated/20 text-status-saturated border-status-saturated/40',
  low: 'bg-muted text-muted-foreground border-border',
};

export function Timeline({ events, selectedCategory, onSelectCategory }: TimelineProps) {
  const filteredEvents = selectedCategory 
    ? events.filter(e => e.category === selectedCategory)
    : events;

  const categories = Array.from(new Set(events.map(e => e.category)));

  return (
    <div className="space-y-6">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={cn(
            'px-3 py-1.5 rounded-md font-mono text-xs border transition-colors',
            selectedCategory === null
              ? 'bg-primary/20 text-primary border-primary/40'
              : 'bg-secondary text-muted-foreground border-border hover:text-foreground'
          )}
        >
          ALL
        </button>
        {categories.map((category) => {
          const config = categoryConfig[category];
          const Icon = config.icon;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs border transition-colors',
                selectedCategory === category
                  ? `${config.bgColor} ${config.color} ${config.borderColor}`
                  : 'bg-secondary text-muted-foreground border-border hover:text-foreground'
              )}
            >
              <Icon className="w-3 h-3" />
              {category.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border" />

        {/* Events */}
        <div className="space-y-4">
          {filteredEvents.map((event, index) => {
            const config = categoryConfig[event.category];
            const Icon = config.icon;
            
            return (
              <div 
                key={event.id}
                className="relative pl-12 md:pl-20 animate-in fade-in slide-in-from-left-2"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Timeline Node */}
                <div 
                  className={cn(
                    'absolute left-2 md:left-6 w-5 h-5 rounded-full border-2 flex items-center justify-center',
                    config.bgColor,
                    config.borderColor
                  )}
                >
                  <Icon className={cn('w-2.5 h-2.5', config.color)} />
                </div>

                {/* Event Card */}
                <Card className={cn('border', config.borderColor, 'hover:shadow-lg transition-shadow')}>
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-muted-foreground">
                          {event.date}
                        </span>
                        <Badge 
                          variant="outline" 
                          className={cn('font-mono text-xs', severityColors[event.severity])}
                        >
                          {event.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">
                        Section {event.section}
                      </span>
                    </div>
                    
                    <h3 className="font-mono text-sm font-bold text-foreground mb-1">
                      {event.title}
                    </h3>
                    <p className="font-mono text-xs text-muted-foreground">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
