import { CDSHeader } from '@/components/cds/header';
import { ContractChat } from '@/components/cds/contract-chat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquarePlus, 
  Shield, 
  Zap, 
  Database, 
  FileCode,
  Terminal,
  Lock
} from 'lucide-react';
import { HomeButton, HomeBreadcrumb } from '@/components/cds/home-button';

const CONTRACT_TEMPLATES = [
  { 
    name: 'Recovery Contract', 
    icon: Database, 
    description: 'Full SGAU-VALUEGUARD implementation',
    status: 'READY'
  },
  { 
    name: 'Guardian Module', 
    icon: Shield, 
    description: 'Multi-sig authorization layer',
    status: 'READY'
  },
  { 
    name: 'Settlement Latch', 
    icon: Zap, 
    description: 'Alpha wire transfer mechanism',
    status: 'READY'
  },
  { 
    name: 'Forensic Logger', 
    icon: FileCode, 
    description: 'Spoliation recorder module',
    status: 'READY'
  },
];

export default function ContractChatPage() {
  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
              <MessageSquarePlus className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="font-mono text-2xl font-bold text-foreground">
                CONTRACT BUILDER
              </h1>
              <p className="font-mono text-sm text-muted-foreground">
                OMEGA Contract Builder v2.1 | Interactive Smart Contract Generation
              </p>
            </div>
          </div>
          
          {/* Builder Status Badges */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Badge variant="outline" className="border-primary/50 text-primary font-mono text-xs flex items-center gap-1">
              <Terminal className="w-3 h-3" />
              SOLIDITY ^0.8.26
            </Badge>
            <Badge variant="outline" className="border-accent/50 text-accent font-mono text-xs flex items-center gap-1">
              <Lock className="w-3 h-3" />
              AES-256-GCM ENCRYPTED
            </Badge>
            <Badge variant="outline" className="border-chart-3/50 text-chart-3 font-mono text-xs flex items-center gap-1">
              <Zap className="w-3 h-3" />
              VALORCHAIN COMPATIBLE
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Contract Templates */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="font-mono text-sm text-foreground flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-primary" />
                  CONTRACT TEMPLATES
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {CONTRACT_TEMPLATES.map((template) => {
                  const Icon = template.icon;
                  return (
                    <div
                      key={template.name}
                      className="p-3 rounded-lg bg-secondary/50 border border-border hover:border-primary/40 hover:bg-secondary transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="font-mono text-xs font-medium text-foreground">
                          {template.name}
                        </span>
                      </div>
                      <p className="font-mono text-xs text-muted-foreground">
                        {template.description}
                      </p>
                      <Badge 
                        variant="outline" 
                        className="mt-2 border-primary/30 text-primary font-mono text-xs"
                      >
                        {template.status}
                      </Badge>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Build Stats */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="font-mono text-sm text-foreground">
                  BUILD STATISTICS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-muted-foreground">Contracts Generated</span>
                  <span className="font-mono text-sm text-primary font-bold">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-muted-foreground">Functions Deployed</span>
                  <span className="font-mono text-sm text-accent font-bold">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-muted-foreground">Gas Optimized</span>
                  <span className="font-mono text-sm text-chart-3 font-bold">98.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-muted-foreground">Audit Score</span>
                  <span className="font-mono text-sm text-primary font-bold">A+</span>
                </div>
              </CardContent>
            </Card>

            {/* Network Status */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="font-mono text-sm text-foreground flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  NETWORK STATUS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="font-mono text-xs text-muted-foreground mb-1">Active Network</div>
                  <div className="font-mono text-sm text-accent">VALORCHAIN // OMEGA</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-muted-foreground mb-1">Block Height</div>
                  <div className="font-mono text-sm text-foreground">19,847,231</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-muted-foreground mb-1">Gas Price</div>
                  <div className="font-mono text-sm text-chart-3">12 GWEI</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="bg-card border-border h-full">
              <CardHeader className="border-b border-border">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-mono text-sm text-foreground flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-primary" />
                    OMEGA CONTRACT BUILDER
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-primary/30 text-primary font-mono text-xs">
                      SESSION ACTIVE
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <ContractChat />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-6 mt-8 border-t border-border">
          <div className="font-mono text-xs text-muted-foreground mb-2">
            OMEGA CONTRACT BUILDER v2.1 | Sovereign-Class Generation | SYSTEM ACTIVE
          </div>
          <div className="font-mono text-xs text-primary">
            All contracts generated are SGAU-VALUEGUARD-77.77X-FINALDEG compliant
          </div>
        </div>
      </main>
    </div>
  );
}
