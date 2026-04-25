'use client';

import { useState } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { Timeline } from '@/components/cds/timeline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TIMELINE_EVENTS, CDS_SECTIONS } from '@/lib/cds-data';
import { Clock, AlertTriangle, FileText, Activity } from 'lucide-react';
import { HomeButton, HomeBreadcrumb } from '@/components/cds/home-button';

export default function TimelinePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Calculate stats
  const criticalEvents = TIMELINE_EVENTS.filter(e => e.severity === 'critical').length;
  const highEvents = TIMELINE_EVENTS.filter(e => e.severity === 'high').length;
  const uniqueSections = new Set(TIMELINE_EVENTS.map(e => e.section)).size;

  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="font-mono text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                <Clock className="w-8 h-8 text-primary" />
                EVIDENCE TIMELINE
              </h1>
              <p className="font-mono text-sm text-muted-foreground">
                Chronological view of forensic events and artifacts across all 16 sections
              </p>
            </div>
            <Badge variant="outline" className="font-mono bg-primary/10 text-primary border-primary/40 w-fit">
              {TIMELINE_EVENTS.length} EVENTS LOGGED
            </Badge>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-border bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-status-locked/10">
                    <AlertTriangle className="w-4 h-4 text-status-locked" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">Critical</p>
                    <p className="font-mono text-lg font-bold text-status-locked">{criticalEvents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-border bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-status-active/10">
                    <Activity className="w-4 h-4 text-status-active" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">High Priority</p>
                    <p className="font-mono text-lg font-bold text-status-active">{highEvents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-border bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-primary/10">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">Sections Affected</p>
                    <p className="font-mono text-lg font-bold text-primary">{uniqueSections}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-border bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-status-anchored/10">
                    <Clock className="w-4 h-4 text-status-anchored" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">Time Span</p>
                    <p className="font-mono text-lg font-bold text-status-anchored">90 Days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Timeline */}
          <div className="lg:col-span-3">
            <Timeline 
              events={TIMELINE_EVENTS}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Affected Sections */}
            <Card className="border-border bg-card/50">
              <CardHeader className="pb-3">
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  AFFECTED SECTIONS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from(new Set(TIMELINE_EVENTS.map(e => e.section))).sort((a, b) => a - b).map((sectionId) => {
                    const section = CDS_SECTIONS.find(s => s.id === sectionId);
                    const eventCount = TIMELINE_EVENTS.filter(e => e.section === sectionId).length;
                    return (
                      <div 
                        key={sectionId}
                        className="flex items-center justify-between p-2 rounded-md bg-secondary/30 border border-border"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-muted-foreground">
                            S{sectionId.toString().padStart(2, '0')}
                          </span>
                          <span className="font-mono text-xs text-foreground truncate max-w-[120px]">
                            {section?.title || 'Unknown'}
                          </span>
                        </div>
                        <Badge variant="outline" className="font-mono text-xs">
                          {eventCount}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card className="border-border bg-card/50">
              <CardHeader className="pb-3">
                <CardTitle className="font-mono text-sm">
                  SEVERITY LEGEND
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted-foreground">Critical</span>
                    <Badge variant="outline" className="font-mono text-xs bg-status-locked/20 text-status-locked border-status-locked/40">
                      CRITICAL
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted-foreground">High</span>
                    <Badge variant="outline" className="font-mono text-xs bg-status-active/20 text-status-active border-status-active/40">
                      HIGH
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted-foreground">Medium</span>
                    <Badge variant="outline" className="font-mono text-xs bg-status-saturated/20 text-status-saturated border-status-saturated/40">
                      MEDIUM
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted-foreground">Low</span>
                    <Badge variant="outline" className="font-mono text-xs bg-muted text-muted-foreground border-border">
                      LOW
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
