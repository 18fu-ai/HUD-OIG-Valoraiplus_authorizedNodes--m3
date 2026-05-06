'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, CheckCircle2, Circle } from 'lucide-react';

const actionItems = [
  {
    id: 'ACT-001',
    title: 'California DOJ Follow-up',
    description: 'Await state attorney general response',
    priority: 'HIGH',
    dueDate: '2026-05-10',
    status: 'PENDING',
  },
  {
    id: 'ACT-002',
    title: 'DSS Documentation Request',
    description: 'Compile additional evidence package',
    priority: 'MEDIUM',
    dueDate: '2026-05-12',
    status: 'IN_PROGRESS',
  },
  {
    id: 'ACT-003',
    title: 'Verification Export Test',
    description: 'End-to-end verification flow validation',
    priority: 'LOW',
    dueDate: '2026-05-15',
    status: 'PENDING',
  },
];

const priorityStyles: Record<string, { bg: string; text: string }> = {
  HIGH: { bg: 'bg-red-400/10', text: 'text-red-400' },
  MEDIUM: { bg: 'bg-amber-400/10', text: 'text-amber-400' },
  LOW: { bg: 'bg-blue-400/10', text: 'text-blue-400' },
};

const statusIcons: Record<string, typeof Circle> = {
  PENDING: Clock,
  IN_PROGRESS: AlertTriangle,
  COMPLETE: CheckCircle2,
};

export function ActionItems() {
  return (
    <Card className="border-border bg-card/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-mono text-lg flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            Action Items
          </CardTitle>
          <Badge variant="outline" className="font-mono text-xs bg-orange-400/20 text-orange-400 border-orange-400/40">
            3 PENDING
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {actionItems.map((item) => {
          const priority = priorityStyles[item.priority];
          const StatusIcon = statusIcons[item.status];
          return (
            <div
              key={item.id}
              className={`p-4 rounded-md border ${priority.bg} border-${priority.text.replace('text-', '')}/30`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <StatusIcon className={`w-4 h-4 ${item.status === 'COMPLETE' ? 'text-green-400' : priority.text}`} />
                  <span className="font-mono text-sm font-bold text-foreground">{item.title}</span>
                </div>
                <Badge variant="outline" className={`font-mono text-xs ${priority.bg} ${priority.text}`}>
                  {item.priority}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-muted-foreground">{item.id}</span>
                <span className="font-mono text-muted-foreground">Due: {item.dueDate}</span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
