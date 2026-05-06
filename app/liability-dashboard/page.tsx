'use client';

import { LiabilityOverview } from '@/components/liability/liability-overview';
import { TargetMatrix } from '@/components/liability/target-matrix';
import { LiabilityBreakdown } from '@/components/liability/liability-breakdown';
import { AuditTrail } from '@/components/liability/audit-trail';
import { FederalSync } from '@/components/liability/federal-sync';

export default function LiabilityDashboardPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-screen-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-mono font-bold text-foreground">
                Institutional Liability Matrix
              </h1>
              <p className="text-sm text-muted-foreground font-mono">
                FORENSIC BLUEPRINT | HHS OCR: 25-621293 | CASE: SGAU 7226.3461
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-muted-foreground font-mono">TOTAL COORDINATED LIABILITY</p>
                <p className="text-2xl font-mono font-bold text-red-400">$508,631,005.52</p>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <LiabilityOverview />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TargetMatrix />
          <LiabilityBreakdown />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AuditTrail />
          <FederalSync />
        </div>
      </div>
    </div>
  );
}
