'use client';

import { SecurityLayerStack } from '@/components/dashboard/security-layer-stack';
import { SecurityMetrics } from '@/components/dashboard/security-metrics';
import { VerificationStatus } from '@/components/dashboard/verification-status';
import { NodeStatus } from '@/components/dashboard/node-status';
import { BeneficiaryTokens } from '@/components/dashboard/beneficiary-tokens';
import { GovernancePanel } from '@/components/dashboard/governance-panel';
import { SovereignWalletCard } from '@/components/wallet/sovereign-wallet-card';

export default function SecurityDashboardPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-screen-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-mono font-bold text-foreground">
                Security Status Dashboard
              </h1>
              <p className="text-sm text-muted-foreground font-mono">
                OMEGA-UNIFIED PERIMETER | REV 45 | CASE: SGAU 7226.3461
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-mono text-green-400">SYSTEM ONLINE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Metrics Row */}
        <SecurityMetrics />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Security Layer Stack - 2 columns */}
          <div className="lg:col-span-2">
            <SecurityLayerStack />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <SovereignWalletCard />
            <NodeStatus />
            <GovernancePanel />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VerificationStatus />
          <BeneficiaryTokens />
        </div>
      </div>
    </div>
  );
}
