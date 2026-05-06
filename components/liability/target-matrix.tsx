'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Building2, AlertCircle } from 'lucide-react';

const targets = [
  {
    id: 'TA-SECONDARY-ORG',
    designation: 'Lead Controller',
    category: 'Primary',
    liability: 152589301.66,
    percentage: 30.0,
    status: 'ENFORCING',
  },
  {
    id: 'TA-PRIMARY-ENTITY (ACTOR-a)',
    designation: 'Alpha Plus Recovery',
    category: 'Primary',
    liability: 127157751.38,
    percentage: 25.0,
    status: 'ENFORCING',
  },
  {
    id: 'J.P. Morgan Chase',
    designation: 'Financial Facilitator',
    category: 'Secondary',
    liability: 76294650.83,
    percentage: 15.0,
    status: 'DOCUMENTED',
  },
  {
    id: 'Charles Schwab',
    designation: 'Financial Facilitator',
    category: 'Secondary',
    liability: 50863100.55,
    percentage: 10.0,
    status: 'DOCUMENTED',
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
};

export function TargetMatrix() {
  return (
    <Card className="border-border bg-card/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-mono text-lg flex items-center gap-2">
            <Target className="w-5 h-5 text-red-400" />
            Target Matrix
          </CardTitle>
          <Badge variant="outline" className="font-mono text-xs bg-red-400/20 text-red-400 border-red-400/40">
            4 ENTITIES
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {targets.map((target, index) => (
          <div
            key={target.id}
            className={`p-4 rounded-md border transition-all hover:bg-secondary/50 ${
              target.category === 'Primary'
                ? 'bg-red-400/5 border-red-400/30'
                : 'bg-secondary/30 border-border'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-md ${
                  target.category === 'Primary' ? 'bg-red-400/20' : 'bg-blue-400/20'
                }`}>
                  {target.category === 'Primary' ? (
                    <AlertCircle className="w-4 h-4 text-red-400" />
                  ) : (
                    <Building2 className="w-4 h-4 text-blue-400" />
                  )}
                </div>
                <div>
                  <p className="font-mono text-sm font-bold text-foreground">{target.id}</p>
                  <p className="font-mono text-xs text-muted-foreground">{target.designation}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className={`font-mono text-xs ${
                      target.category === 'Primary'
                        ? 'bg-red-400/10 text-red-400 border-red-400/30'
                        : 'bg-blue-400/10 text-blue-400 border-blue-400/30'
                    }`}>
                      {target.category}
                    </Badge>
                    <Badge variant="outline" className="font-mono text-xs bg-amber-400/10 text-amber-400 border-amber-400/30">
                      {target.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-mono text-lg font-bold ${
                  target.category === 'Primary' ? 'text-red-400' : 'text-blue-400'
                }`}>
                  {formatCurrency(target.liability)}
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  {target.percentage.toFixed(1)}% of total
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className="p-3 rounded-md bg-muted/30 border border-border">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-muted-foreground">Remaining Distribution</span>
            <span className="font-mono text-sm font-bold text-foreground">$101,726,201.10 (20.0%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
