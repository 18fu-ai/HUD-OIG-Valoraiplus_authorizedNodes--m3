'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle2, AlertCircle, FileText, Send, Shield } from 'lucide-react';

const timelineEvents = [
  {
    date: '2026-05-05',
    time: '12:00',
    title: 'Verification Layer Deployed',
    description: 'Cryptographic verification system fully operational with SHA-256 signing',
    type: 'milestone',
    status: 'complete',
  },
  {
    date: '2026-05-05',
    time: '10:30',
    title: 'Security Layer Stack Locked',
    description: 'All 7 security layers confirmed active and locked',
    type: 'security',
    status: 'complete',
  },
  {
    date: '2026-05-04',
    time: '15:45',
    title: 'Federal Coordination Update',
    description: 'FBI and DOJ/VA OIG case files synchronized',
    type: 'coordination',
    status: 'complete',
  },
  {
    date: '2026-05-04',
    time: '09:00',
    title: 'HHS OCR Submission',
    description: 'Forensic Blueprint Integration submitted to Amy, HHS OCR',
    type: 'submission',
    status: 'complete',
  },
  {
    date: '2026-05-03',
    time: '14:20',
    title: 'Institutional Liability Matrix Finalized',
    description: 'Total coordinated liability documented at $508,631,005.52',
    type: 'financial',
    status: 'complete',
  },
  {
    date: '2026-05-02',
    time: '11:00',
    title: 'Spoliation Events Documented',
    description: 'SPOLIATION-051 through SPOLIATION-058 logged and anchored',
    type: 'evidence',
    status: 'complete',
  },
];

const typeIcons: Record<string, typeof Clock> = {
  milestone: Shield,
  security: Shield,
  coordination: Send,
  submission: FileText,
  financial: AlertCircle,
  evidence: FileText,
};

const typeColors: Record<string, string> = {
  milestone: 'text-green-400 bg-green-400/10 border-green-400/30',
  security: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
  coordination: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  submission: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
  financial: 'text-red-400 bg-red-400/10 border-red-400/30',
  evidence: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
};

export function CaseTimeline() {
  return (
    <Card className="border-border bg-card/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-mono text-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            Case Timeline
          </CardTitle>
          <Badge variant="outline" className="font-mono text-xs bg-cyan-400/20 text-cyan-400 border-cyan-400/40">
            RECENT EVENTS
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-4">
            {timelineEvents.map((event, index) => {
              const Icon = typeIcons[event.type];
              const colors = typeColors[event.type];
              return (
                <div key={index} className="relative pl-10">
                  {/* Timeline dot */}
                  <div className={`absolute left-2 w-5 h-5 rounded-full border-2 bg-background flex items-center justify-center ${colors.split(' ')[2]}`}>
                    <CheckCircle2 className={`w-3 h-3 ${colors.split(' ')[0]}`} />
                  </div>

                  <div className={`p-4 rounded-md border ${colors.split(' ').slice(1).join(' ')}`}>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${colors.split(' ')[0]}`} />
                        <span className="font-mono text-sm font-bold text-foreground">{event.title}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-xs text-muted-foreground">{event.date}</span>
                        <span className="font-mono text-xs text-muted-foreground/60 ml-2">{event.time}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
