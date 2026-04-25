import { CDSHeader } from '@/components/cds/header';
import { ContractSpec } from '@/components/cds/contract-spec';
import { GovernancePanel } from '@/components/cds/governance-panel';
import { FinalityMatrix } from '@/components/cds/finality-matrix';
import { RecoveryLogic } from '@/components/cds/recovery-logic';
import { CodePreview } from '@/components/cds/code-preview';
import { CinemaPanel } from '@/components/cds/cinema-panel';
import { Badge } from '@/components/ui/badge';
import { FileCode, Lock, Database, Zap, Shield } from 'lucide-react';

export default function ContractPage() {
  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
              <FileCode className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="font-mono text-2xl font-bold text-foreground">
                SMART CONTRACT ARCHITECTURE
              </h1>
              <p className="font-mono text-sm text-muted-foreground">
                SGAU-VALUEGUARD-77.77X-FINALDEG | On-Chain Enforcement Layer
              </p>
            </div>
          </div>
          
          {/* Contract Status Badges */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Badge variant="outline" className="border-primary/50 text-primary font-mono text-xs flex items-center gap-1">
              <Lock className="w-3 h-3" />
              AES-256-GCM-TRINITY
            </Badge>
            <Badge variant="outline" className="border-accent/50 text-accent font-mono text-xs flex items-center gap-1">
              <Zap className="w-3 h-3" />
              VALORCHAIN // OMEGA
            </Badge>
            <Badge variant="outline" className="border-chart-3/50 text-chart-3 font-mono text-xs flex items-center gap-1">
              <Database className="w-3 h-3" />
              50B SHARDS
            </Badge>
            <Badge variant="outline" className="border-chart-4/50 text-chart-4 font-mono text-xs flex items-center gap-1">
              <Shield className="w-3 h-3" />
              SOVEREIGN AUDITOR CLASS
            </Badge>
          </div>
        </div>

        {/* Contract Overview Banner */}
        <div className="mb-8 p-4 rounded-lg bg-secondary/50 border border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-muted-foreground mb-1">CONTRACT BRAND</div>
              <div className="font-mono text-lg text-foreground">Valor Ai+</div>
            </div>
            <div className="h-px md:h-12 md:w-px bg-border" />
            <div>
              <div className="font-mono text-xs text-muted-foreground mb-1">NETWORK</div>
              <div className="font-mono text-lg text-accent">VALORCHAIN // OMEGA</div>
            </div>
            <div className="h-px md:h-12 md:w-px bg-border" />
            <div>
              <div className="font-mono text-xs text-muted-foreground mb-1">TRUTH CYCLE</div>
              <div className="font-mono text-lg text-chart-3">266ms</div>
            </div>
            <div className="h-px md:h-12 md:w-px bg-border" />
            <div>
              <div className="font-mono text-xs text-muted-foreground mb-1">STATUS</div>
              <div className="font-mono text-lg text-primary font-bold">READY FOR MINT</div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Contract Specifications */}
          <div className="lg:col-span-1">
            <ContractSpec />
          </div>
          
          {/* Governance Panel */}
          <div className="lg:col-span-1">
            <GovernancePanel />
          </div>
          
          {/* Recovery Logic */}
          <div className="lg:col-span-1">
            <RecoveryLogic />
          </div>
        </div>

        {/* Finality Matrix */}
        <div className="mb-8">
          <FinalityMatrix />
        </div>

        {/* Code Preview */}
        <div className="mb-8">
          <CodePreview />
        </div>

        {/* Project Cinema */}
        <div className="mb-8">
          <CinemaPanel />
        </div>

        {/* Footer */}
        <div className="text-center py-6 border-t border-border">
          <div className="font-mono text-xs text-muted-foreground mb-2">
            N.E.W.T. //e v2.1 | Poppa Validated | SYSTEM TERMINATED // FINALITY SEALED
          </div>
          <div className="font-mono text-xs text-primary">
            MERKLEROOT: 26856b24c50750f0c69c1eeb86a69ef777777...
          </div>
        </div>
      </main>
    </div>
  );
}
