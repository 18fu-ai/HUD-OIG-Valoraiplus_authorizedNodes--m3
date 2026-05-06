'use client';

import { CaseOverview } from '@/components/cases/case-overview';
import { CaseTimeline } from '@/components/cases/case-timeline';
import { EvidenceRegistry } from '@/components/cases/evidence-registry';
import { AgencyCoordination } from '@/components/cases/agency-coordination';
import { CaseDocuments } from '@/components/cases/case-documents';
import { ActionItems } from '@/components/cases/action-items';

export default function CaseManagementPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-screen-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-mono font-bold text-foreground">
                Case Management System
              </h1>
              <p className="text-sm text-muted-foreground font-mono">
                Federal Coordination & Evidence Tracking | SGAU 7226.3461
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
                <span className="text-sm font-mono text-amber-400">CASE ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Case Overview */}
        <CaseOverview />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timeline - 2 columns */}
          <div className="lg:col-span-2">
            <CaseTimeline />
          </div>

          {/* Action Items */}
          <div>
            <ActionItems />
          </div>
        </div>

        {/* Evidence and Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EvidenceRegistry />
          <CaseDocuments />
        </div>

        {/* Agency Coordination */}
        <AgencyCoordination />
      </div>
    </div>
  );
}
