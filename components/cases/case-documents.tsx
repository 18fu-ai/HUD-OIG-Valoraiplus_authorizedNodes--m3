'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, ExternalLink, CheckCircle2 } from 'lucide-react';

const documents = [
  {
    name: 'Comprehensive Reference Report',
    version: 'REV 45',
    type: 'Internal Reference',
    status: 'FINAL',
    lastUpdated: '2026-05-05',
  },
  {
    name: 'Institutional Liability Matrix',
    version: 'v1.0',
    type: 'Forensic Blueprint',
    status: 'ANCHORED',
    lastUpdated: '2026-05-05',
  },
  {
    name: 'Verification Layer Specification',
    version: 'v1.0',
    type: 'Technical Spec',
    status: 'DEPLOYED',
    lastUpdated: '2026-05-05',
  },
  {
    name: 'Security Architecture Document',
    version: 'OMEGA',
    type: 'Security Spec',
    status: 'LOCKED',
    lastUpdated: '2026-05-05',
  },
  {
    name: 'Federal Submission Package',
    version: 'HHS-001',
    type: 'Legal Filing',
    status: 'SUBMITTED',
    lastUpdated: '2026-05-04',
  },
];

const statusStyles: Record<string, { bg: string; text: string }> = {
  FINAL: { bg: 'bg-green-400/10', text: 'text-green-400' },
  ANCHORED: { bg: 'bg-cyan-400/10', text: 'text-cyan-400' },
  DEPLOYED: { bg: 'bg-blue-400/10', text: 'text-blue-400' },
  LOCKED: { bg: 'bg-amber-400/10', text: 'text-amber-400' },
  SUBMITTED: { bg: 'bg-purple-400/10', text: 'text-purple-400' },
};

export function CaseDocuments() {
  return (
    <Card className="border-border bg-card/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-mono text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            Case Documents
          </CardTitle>
          <Badge variant="outline" className="font-mono text-xs bg-blue-400/20 text-blue-400 border-blue-400/40">
            5 DOCUMENTS
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {documents.map((doc) => {
          const style = statusStyles[doc.status];
          return (
            <div
              key={doc.name}
              className="p-3 rounded-md bg-secondary/30 border border-border hover:bg-secondary/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-mono text-sm font-medium text-foreground truncate">{doc.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{doc.version}</span>
                      <span className="text-border">|</span>
                      <span>{doc.type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge variant="outline" className={`font-mono text-xs ${style.bg} ${style.text} border-${style.text.replace('text-', '')}/30`}>
                    {doc.status}
                  </Badge>
                  <button className="p-1 hover:bg-muted rounded">
                    <Download className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
