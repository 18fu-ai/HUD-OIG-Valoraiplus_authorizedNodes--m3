'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart } from 'lucide-react';

const liabilityData = [
  { name: 'TA-SECONDARY-ORG', value: 152589301.66, percentage: 30.0, color: '#f87171' },
  { name: 'TA-PRIMARY-ENTITY', value: 127157751.38, percentage: 25.0, color: '#fb923c' },
  { name: 'J.P. Morgan Chase', value: 76294650.83, percentage: 15.0, color: '#60a5fa' },
  { name: 'Charles Schwab', value: 50863100.55, percentage: 10.0, color: '#34d399' },
  { name: 'Remaining Distribution', value: 101726201.10, percentage: 20.0, color: '#a78bfa' },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
};

export function LiabilityBreakdown() {
  const total = liabilityData.reduce((acc, item) => acc + item.value, 0);

  return (
    <Card className="border-border bg-card/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-mono text-lg flex items-center gap-2">
            <PieChart className="w-5 h-5 text-purple-400" />
            Liability Breakdown
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {/* Visual Bar Chart */}
        <div className="mb-6">
          <div className="h-8 rounded-md overflow-hidden flex">
            {liabilityData.map((item, index) => (
              <div
                key={item.name}
                className="h-full transition-all hover:opacity-80"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.color,
                }}
                title={`${item.name}: ${formatCurrency(item.value)}`}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          {liabilityData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between p-3 rounded-md bg-secondary/30 border border-border"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-mono text-sm text-foreground">{item.name}</span>
              </div>
              <div className="text-right">
                <span className="font-mono text-sm font-bold text-foreground">
                  {formatCurrency(item.value)}
                </span>
                <span className="font-mono text-xs text-muted-foreground ml-2">
                  ({item.percentage}%)
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-4 p-4 rounded-md bg-red-400/10 border border-red-400/30">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm text-muted-foreground">TOTAL COORDINATED LIABILITY</span>
            <span className="font-mono text-xl font-bold text-red-400">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
