'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CLAWBACK_TARGETS, formatCurrency } from '@/lib/cds-data';

const COLORS = [
  'oklch(0.55 0.18 200)', // saturated (cyan)
  'oklch(0.6 0.2 45)',    // active (amber)
  'oklch(0.65 0.2 145)',  // anchored (green)
];

export function ClawbackChart() {
  const data = CLAWBACK_TARGETS.map((target, index) => ({
    name: target.category,
    value: target.amount,
    color: COLORS[index % COLORS.length],
  }));

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="border-border bg-card/50">
      <CardHeader className="pb-3">
        <CardTitle className="font-mono text-sm">
          RECOVERY DISTRIBUTION
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-popover border border-border rounded-md p-3 shadow-lg">
                        <p className="font-mono text-xs text-muted-foreground mb-1">
                          {data.name}
                        </p>
                        <p className="font-mono text-sm text-foreground font-bold">
                          {formatCurrency(data.value)}
                        </p>
                        <p className="font-mono text-xs text-muted-foreground">
                          {((data.value / total) * 100).toFixed(1)}% of total
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                formatter={(value) => (
                  <span className="font-mono text-xs text-muted-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Center Total */}
        <div className="text-center -mt-[180px] mb-[140px]">
          <p className="font-mono text-xs text-muted-foreground">TOTAL</p>
          <p className="font-mono text-lg font-bold text-foreground">
            {formatCurrency(total)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
