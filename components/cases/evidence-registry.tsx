'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database, Mail, Phone, FileText, Shield, CheckCircle2 } from 'lucide-react';

const evidenceCategories = [
  {
    category: 'Email Records',
    source: 'Mimecast',
    count: '284,000+',
    events: 'MC-001 through MC-018',
    status: 'PRESERVED',
    icon: Mail,
    color: 'amber',
  },
  {
    category: 'VOIP Intercepts',
    source: 'Title III',
    count: '10+',
    events: 'VOIP-001 through VOIP-010',
    status: 'SEALED',
    icon: Phone,
    color: 'purple',
  },
  {
    category: 'Spoliation Records',
    source: 'Forensic Capture',
    count: '8',
    events: 'SPOLIATION-051 through SPOLIATION-058',
    status: 'ANCHORED',
    icon: FileText,
    color: 'red',
  },
  {
    category: 'Infrastructure Logs',
    source: 'LimaCharlie',
    count: 'Continuous',
    events: 'POPPA_G Block v2/v3',
    status: 'MONITORED',
    icon: Shield,
    color: 'cyan',
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  amber: { bg: 'bg-amber-400/10', text: 'text-amber-400', border: 'border-amber-400/30' },
  purple: { bg: 'bg-purple-400/10', text: 'text-purple-400', border: 'border-purple-400/30' },
  red: { bg: 'bg-red-400/10', text: 'text-red-400', border: 'border-red-400/30' },
  cyan: { bg: 'bg-cyan-400/10', text: 'text-cyan-400', border: 'border-cyan-400/30' },
};

export function EvidenceRegistry() {
  return (
    <Card className="border-border bg-card/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-mono text-lg flex items-center gap-2">
            <Database className="w-5 h-5 text-green-400" />
            Evidence Registry
          </CardTitle>
          <Badge variant="outline" className="font-mono text-xs bg-green-400/20 text-green-400 border-green-400/40">
            4 CATEGORIES
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {evidenceCategories.map((item) => {
          const Icon = item.icon;
          const colors = colorMap[item.color];
          return (
            <div
              key={item.category}
              className={`p-4 rounded-md border ${colors.bg} ${colors.border} hover:opacity-90 transition-opacity`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-md ${colors.bg}`}>
                    <Icon className={`w-4 h-4 ${colors.text}`} />
                  </div>
                  <div>
                    <p className={`font-mono text-sm font-bold ${colors.text}`}>{item.category}</p>
                    <p className="font-mono text-xs text-muted-foreground">{item.source}</p>
                    <p className="font-mono text-xs text-muted-foreground/60 mt-1">{item.events}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-lg font-bold text-foreground">{item.count}</span>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3 text-green-400" />
                    <Badge variant="outline" className="font-mono text-xs bg-green-400/10 text-green-400 border-green-400/30">
                      {item.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
