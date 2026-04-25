'use client';

import { useState, useCallback, useMemo } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CDSErrorBoundary } from '@/components/cds/error-boundary';
import { ExportTools } from '@/components/cds/export-tools';
import {
  Shield,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  FileCode,
  Zap,
  Database,
  Lock,
  Key,
  Fingerprint,
  Server,
  ArrowRight,
  RefreshCw,
  AlertTriangle,
  Activity,
  Layers,
  Hash,
  FileText,
  Copy,
  Check,
  Play,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Types
interface PipelineStage {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'success' | 'error' | 'skipped';
  duration?: number;
  message?: string;
}

interface VerificationReceipt {
  receiptId: string;
  intentHash: string;
  signer: string;
  action: string;
  timestamp: string;
  status: 'VERIFIED' | 'REJECTED' | 'PENDING';
  gasEstimate?: string;
  blockNumber?: number;
  stages: PipelineStage[];
}

interface IntentPayload {
  action: string;
  nodeId: string;
  data: string;
  nonce: number;
  deadline: number;
  signer: string;
  signature: string;
}

// Mock data for demonstration
const MOCK_RECEIPTS: VerificationReceipt[] = [
  {
    receiptId: 'RCP-2025-0424-001',
    intentHash: '0x7a3f...8b2c',
    signer: '0x508B...Recovery',
    action: 'LATCH_NODE',
    timestamp: new Date().toISOString(),
    status: 'VERIFIED',
    gasEstimate: '0.0024 ETH',
    blockNumber: 19847823,
    stages: [
      { id: 'parse', name: 'Parse Intent', status: 'success', duration: 12 },
      { id: 'validate', name: 'Schema Validation', status: 'success', duration: 8 },
      { id: 'nonce', name: 'Nonce Check', status: 'success', duration: 15 },
      { id: 'deadline', name: 'Deadline Check', status: 'success', duration: 3 },
      { id: 'signature', name: 'Signature Recovery', status: 'success', duration: 45 },
      { id: 'authorize', name: 'Authorization', status: 'success', duration: 22 },
      { id: 'relay', name: 'Contract Relay', status: 'success', duration: 1250 },
    ]
  },
  {
    receiptId: 'RCP-2025-0424-002',
    intentHash: '0x9c4e...1d7a',
    signer: '0x742d...Auditor',
    action: 'CREATE_REVISION',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    status: 'VERIFIED',
    gasEstimate: '0.0018 ETH',
    blockNumber: 19847819,
    stages: [
      { id: 'parse', name: 'Parse Intent', status: 'success', duration: 11 },
      { id: 'validate', name: 'Schema Validation', status: 'success', duration: 9 },
      { id: 'nonce', name: 'Nonce Check', status: 'success', duration: 14 },
      { id: 'deadline', name: 'Deadline Check', status: 'success', duration: 2 },
      { id: 'signature', name: 'Signature Recovery', status: 'success', duration: 42 },
      { id: 'authorize', name: 'Authorization', status: 'success', duration: 19 },
      { id: 'relay', name: 'Contract Relay', status: 'success', duration: 980 },
    ]
  },
  {
    receiptId: 'RCP-2025-0424-003',
    intentHash: '0x3b8f...5e9c',
    signer: '0x1234...Unknown',
    action: 'NULLIFY_NODE',
    timestamp: new Date(Date.now() - 600000).toISOString(),
    status: 'REJECTED',
    stages: [
      { id: 'parse', name: 'Parse Intent', status: 'success', duration: 10 },
      { id: 'validate', name: 'Schema Validation', status: 'success', duration: 7 },
      { id: 'nonce', name: 'Nonce Check', status: 'success', duration: 12 },
      { id: 'deadline', name: 'Deadline Check', status: 'success', duration: 2 },
      { id: 'signature', name: 'Signature Recovery', status: 'success', duration: 38 },
      { id: 'authorize', name: 'Authorization', status: 'error', duration: 5, message: 'Signer not in approved verifiers list' },
      { id: 'relay', name: 'Contract Relay', status: 'skipped' },
    ]
  },
];

const PIPELINE_STAGES_TEMPLATE: PipelineStage[] = [
  { id: 'parse', name: 'Parse Intent', status: 'pending' },
  { id: 'validate', name: 'Schema Validation', status: 'pending' },
  { id: 'nonce', name: 'Nonce Check', status: 'pending' },
  { id: 'deadline', name: 'Deadline Check', status: 'pending' },
  { id: 'signature', name: 'Signature Recovery', status: 'pending' },
  { id: 'authorize', name: 'Authorization', status: 'pending' },
  { id: 'relay', name: 'Contract Relay', status: 'pending' },
];

const SAMPLE_INTENT: IntentPayload = {
  action: 'LATCH_NODE',
  nodeId: 'NODE-508B-RECOVERY-2025',
  data: '0x7b226d65726b6c65526f6f74223a22307839633465...truncated',
  nonce: 1,
  deadline: Math.floor(Date.now() / 1000) + 3600,
  signer: '0x508B7423Cf628BaE93fF51939E2A8B7E8F9F5d4c',
  signature: '0x4a7c8f2e...placeholder',
};

function ProtocolConsoleContent() {
  const [activeTab, setActiveTab] = useState('relay');
  const [intent, setIntent] = useState<IntentPayload>(SAMPLE_INTENT);
  const [pipelineStages, setPipelineStages] = useState<PipelineStage[]>(PIPELINE_STAGES_TEMPLATE);
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipts, setReceipts] = useState<VerificationReceipt[]>(MOCK_RECEIPTS);
  const [selectedReceipt, setSelectedReceipt] = useState<VerificationReceipt | null>(null);
  const [verifyOnlyMode, setVerifyOnlyMode] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  }, []);

  const simulatePipeline = useCallback(async () => {
    setIsProcessing(true);
    const stages = [...PIPELINE_STAGES_TEMPLATE];
    setPipelineStages(stages);

    for (let i = 0; i < stages.length; i++) {
      stages[i] = { ...stages[i], status: 'processing' };
      setPipelineStages([...stages]);
      
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200));
      
      // Simulate potential failure on authorization for demo
      if (stages[i].id === 'authorize' && Math.random() < 0.2) {
        stages[i] = { 
          ...stages[i], 
          status: 'error', 
          duration: Math.floor(Math.random() * 20) + 5,
          message: 'Signer not authorized for this action'
        };
        for (let j = i + 1; j < stages.length; j++) {
          stages[j] = { ...stages[j], status: 'skipped' };
        }
        setPipelineStages([...stages]);
        setIsProcessing(false);
        return;
      }
      
      stages[i] = { 
        ...stages[i], 
        status: 'success', 
        duration: Math.floor(Math.random() * 50) + 5 
      };
      
      if (verifyOnlyMode && stages[i].id === 'authorize') {
        for (let j = i + 1; j < stages.length; j++) {
          stages[j] = { ...stages[j], status: 'skipped', message: 'Verify-only mode' };
        }
        setPipelineStages([...stages]);
        break;
      }
      
      setPipelineStages([...stages]);
    }

    // Add new receipt
    const newReceipt: VerificationReceipt = {
      receiptId: `RCP-2025-0424-${String(receipts.length + 1).padStart(3, '0')}`,
      intentHash: `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`,
      signer: intent.signer.slice(0, 6) + '...' + intent.signer.slice(-8),
      action: intent.action,
      timestamp: new Date().toISOString(),
      status: 'VERIFIED',
      gasEstimate: `${(Math.random() * 0.003 + 0.001).toFixed(4)} ETH`,
      blockNumber: 19847823 + receipts.length,
      stages: [...stages],
    };
    setReceipts(prev => [newReceipt, ...prev]);
    setIsProcessing(false);
  }, [intent, receipts.length, verifyOnlyMode]);

  const getStageIcon = (stage: PipelineStage) => {
    switch (stage.id) {
      case 'parse': return FileCode;
      case 'validate': return Shield;
      case 'nonce': return Hash;
      case 'deadline': return Clock;
      case 'signature': return Fingerprint;
      case 'authorize': return Key;
      case 'relay': return Send;
      default: return Activity;
    }
  };

  const getStatusColor = (status: PipelineStage['status']) => {
    switch (status) {
      case 'success': return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
      case 'error': return 'text-red-400 border-red-500/40 bg-red-500/10';
      case 'processing': return 'text-amber-400 border-amber-500/40 bg-amber-500/10 animate-pulse';
      case 'skipped': return 'text-muted-foreground border-muted/40 bg-muted/10';
      default: return 'text-muted-foreground border-border bg-card';
    }
  };

  const stats = useMemo(() => ({
    total: receipts.length,
    verified: receipts.filter(r => r.status === 'VERIFIED').length,
    rejected: receipts.filter(r => r.status === 'REJECTED').length,
    pending: receipts.filter(r => r.status === 'PENDING').length,
  }), [receipts]);

  const exportData = useMemo(() => ({
    type: 'protocol' as const,
    title: 'Protocol Execution Console Export',
    timestamp: new Date().toISOString(),
    content: {
      receipts,
      currentIntent: intent,
      pipelineStages,
      stats,
    },
    metadata: {
      mode: verifyOnlyMode ? 'VERIFY_ONLY' : 'FULL_RELAY',
      totalReceipts: receipts.length,
    }
  }), [receipts, intent, pipelineStages, stats, verifyOnlyMode]);

  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />
      
      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-mono text-2xl font-bold text-foreground flex items-center gap-3">
              <Server className="w-7 h-7 text-primary" />
              PROTOCOL EXECUTION CONSOLE
            </h1>
            <p className="font-mono text-sm text-muted-foreground mt-1">
              Signed Intent Relay + Verification Receipt Engine
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="font-mono bg-primary/10 text-primary border-primary/40">
              EIP-712 COMPLIANT
            </Badge>
            <Badge variant="outline" className="font-mono bg-emerald-500/10 text-emerald-400 border-emerald-500/40">
              {stats.verified} VERIFIED
            </Badge>
            <ExportTools data={exportData} variant="outline" size="sm" />
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-mono text-xs text-muted-foreground">Total Receipts</p>
                  <p className="font-mono text-xl font-bold text-primary">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-emerald-500/30 bg-emerald-500/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="font-mono text-xs text-muted-foreground">Verified</p>
                  <p className="font-mono text-xl font-bold text-emerald-400">{stats.verified}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-red-500/30 bg-red-500/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <XCircle className="w-5 h-5 text-red-400" />
                <div>
                  <p className="font-mono text-xs text-muted-foreground">Rejected</p>
                  <p className="font-mono text-xl font-bold text-red-400">{stats.rejected}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-400" />
                <div>
                  <p className="font-mono text-xs text-muted-foreground">Pending</p>
                  <p className="font-mono text-xl font-bold text-amber-400">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-secondary/50 border border-border p-1">
            <TabsTrigger 
              value="relay" 
              className="font-mono data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              aria-pressed={activeTab === 'relay'}
            >
              <Send className="w-4 h-4 mr-2" />
              Intent Relay
            </TabsTrigger>
            <TabsTrigger 
              value="pipeline" 
              className="font-mono data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              aria-pressed={activeTab === 'pipeline'}
            >
              <Layers className="w-4 h-4 mr-2" />
              Pipeline
            </TabsTrigger>
            <TabsTrigger 
              value="receipts" 
              className="font-mono data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              aria-pressed={activeTab === 'receipts'}
            >
              <FileText className="w-4 h-4 mr-2" />
              Receipts
            </TabsTrigger>
            <TabsTrigger 
              value="signature" 
              className="font-mono data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              aria-pressed={activeTab === 'signature'}
            >
              <Fingerprint className="w-4 h-4 mr-2" />
              Signature
            </TabsTrigger>
          </TabsList>

          {/* Intent Relay Tab */}
          <TabsContent value="relay" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Intent Builder */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-primary" />
                    INTENT PAYLOAD BUILDER
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-xs text-muted-foreground mb-1 block">Action</label>
                      <select 
                        className="w-full bg-background border border-border rounded-md px-3 py-2 font-mono text-sm"
                        value={intent.action}
                        onChange={(e) => setIntent(prev => ({ ...prev, action: e.target.value }))}
                      >
                        <option value="LATCH_NODE">LATCH_NODE</option>
                        <option value="CREATE_REVISION">CREATE_REVISION</option>
                        <option value="NULLIFY_NODE">NULLIFY_NODE</option>
                        <option value="UPDATE_ANCHOR">UPDATE_ANCHOR</option>
                        <option value="APPROVE_VERIFIER">APPROVE_VERIFIER</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-mono text-xs text-muted-foreground mb-1 block">Nonce</label>
                      <Input 
                        type="number"
                        className="font-mono"
                        value={intent.nonce}
                        onChange={(e) => setIntent(prev => ({ ...prev, nonce: parseInt(e.target.value) || 0 }))}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-mono text-xs text-muted-foreground mb-1 block">Node ID</label>
                    <Input 
                      className="font-mono"
                      value={intent.nodeId}
                      onChange={(e) => setIntent(prev => ({ ...prev, nodeId: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-muted-foreground mb-1 block">Signer Address</label>
                    <Input 
                      className="font-mono text-xs"
                      value={intent.signer}
                      onChange={(e) => setIntent(prev => ({ ...prev, signer: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-muted-foreground mb-1 block">Data Payload (hex)</label>
                    <Textarea 
                      className="font-mono text-xs h-20"
                      value={intent.data}
                      onChange={(e) => setIntent(prev => ({ ...prev, data: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-muted-foreground mb-1 block">Signature</label>
                    <Textarea 
                      className="font-mono text-xs h-16"
                      value={intent.signature}
                      onChange={(e) => setIntent(prev => ({ ...prev, signature: e.target.value }))}
                      placeholder="0x... (65 bytes)"
                    />
                  </div>
                  <div className="flex items-center gap-4 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={verifyOnlyMode}
                        onChange={(e) => setVerifyOnlyMode(e.target.checked)}
                        className="rounded border-border"
                      />
                      <span className="font-mono text-xs text-muted-foreground">Verify Only (no contract mutation)</span>
                    </label>
                  </div>
                  <Button 
                    onClick={simulatePipeline}
                    disabled={isProcessing}
                    className="w-full font-mono"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        PROCESSING...
                      </>
                    ) : verifyOnlyMode ? (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        VERIFY INTENT
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        EXECUTE RELAY
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Live Pipeline */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary" />
                    EXECUTION PIPELINE
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pipelineStages.map((stage, index) => {
                      const Icon = getStageIcon(stage);
                      return (
                        <div key={stage.id} className="flex items-center gap-3">
                          <div className={cn(
                            'w-8 h-8 rounded-lg flex items-center justify-center border',
                            getStatusColor(stage.status)
                          )}>
                            {stage.status === 'processing' ? (
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : stage.status === 'success' ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : stage.status === 'error' ? (
                              <XCircle className="w-4 h-4" />
                            ) : (
                              <Icon className="w-4 h-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-mono text-sm">{stage.name}</p>
                            {stage.message && (
                              <p className="font-mono text-xs text-red-400">{stage.message}</p>
                            )}
                          </div>
                          {stage.duration !== undefined && (
                            <Badge variant="outline" className="font-mono text-xs">
                              {stage.duration}ms
                            </Badge>
                          )}
                          {index < pipelineStages.length - 1 && (
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Pipeline Tab */}
          <TabsContent value="pipeline" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  VERIFICATION FIREWALL STAGES
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-7 gap-4">
                  {PIPELINE_STAGES_TEMPLATE.map((stage, index) => {
                    const Icon = getStageIcon(stage);
                    return (
                      <div key={stage.id} className="relative">
                        <Card className="border-primary/20 bg-primary/5 text-center p-4">
                          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-2">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <p className="font-mono text-xs font-medium">{stage.name}</p>
                          <p className="font-mono text-[10px] text-muted-foreground mt-1">Stage {index + 1}</p>
                        </Card>
                        {index < PIPELINE_STAGES_TEMPLATE.length - 1 && (
                          <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                            <ArrowRight className="w-4 h-4 text-primary/50" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 p-4 bg-secondary/50 rounded-lg border border-border">
                  <h4 className="font-mono text-sm font-medium mb-3">Pipeline Rules</h4>
                  <ul className="space-y-2 font-mono text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      All stages must pass for contract relay to execute
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      Signature recovery uses EIP-712 typed data verification
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      Nonces are tracked per-signer to prevent replay attacks
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      Deadlines enforce time-bounded intent validity
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      Failed authorization halts pipeline and skips relay
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Receipts Tab */}
          <TabsContent value="receipts" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Receipt List */}
              <div className="lg:col-span-2 space-y-4">
                {receipts.map((receipt) => (
                  <Card 
                    key={receipt.receiptId}
                    className={cn(
                      'border cursor-pointer transition-all hover:border-primary/50',
                      selectedReceipt?.receiptId === receipt.receiptId && 'border-primary'
                    )}
                    onClick={() => setSelectedReceipt(receipt)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            'w-10 h-10 rounded-lg flex items-center justify-center',
                            receipt.status === 'VERIFIED' 
                              ? 'bg-emerald-500/10 border border-emerald-500/40' 
                              : receipt.status === 'REJECTED'
                              ? 'bg-red-500/10 border border-red-500/40'
                              : 'bg-amber-500/10 border border-amber-500/40'
                          )}>
                            {receipt.status === 'VERIFIED' ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            ) : receipt.status === 'REJECTED' ? (
                              <XCircle className="w-5 h-5 text-red-400" />
                            ) : (
                              <Clock className="w-5 h-5 text-amber-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-mono text-sm font-medium">{receipt.receiptId}</p>
                            <p className="font-mono text-xs text-muted-foreground">
                              {receipt.action} | {receipt.signer}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant="outline" 
                            className={cn(
                              'font-mono text-xs',
                              receipt.status === 'VERIFIED' 
                                ? 'text-emerald-400 border-emerald-500/40' 
                                : receipt.status === 'REJECTED'
                                ? 'text-red-400 border-red-500/40'
                                : 'text-amber-400 border-amber-500/40'
                            )}
                          >
                            {receipt.status}
                          </Badge>
                          <p className="font-mono text-xs text-muted-foreground mt-1">
                            {new Date(receipt.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Receipt Detail */}
              <Card className="border-border h-fit sticky top-6">
                <CardHeader>
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    RECEIPT DETAIL
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedReceipt ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                        <div>
                          <p className="text-muted-foreground">Receipt ID</p>
                          <p className="text-foreground">{selectedReceipt.receiptId}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Status</p>
                          <Badge 
                            variant="outline" 
                            className={cn(
                              selectedReceipt.status === 'VERIFIED' 
                                ? 'text-emerald-400 border-emerald-500/40' 
                                : 'text-red-400 border-red-500/40'
                            )}
                          >
                            {selectedReceipt.status}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Intent Hash</p>
                          <div className="flex items-center gap-1">
                            <p className="text-foreground">{selectedReceipt.intentHash}</p>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-5 w-5 p-0"
                              onClick={() => copyToClipboard(selectedReceipt.intentHash, 'hash')}
                            >
                              {copiedField === 'hash' ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Action</p>
                          <p className="text-foreground">{selectedReceipt.action}</p>
                        </div>
                        {selectedReceipt.gasEstimate && (
                          <div>
                            <p className="text-muted-foreground">Gas Estimate</p>
                            <p className="text-foreground">{selectedReceipt.gasEstimate}</p>
                          </div>
                        )}
                        {selectedReceipt.blockNumber && (
                          <div>
                            <p className="text-muted-foreground">Block</p>
                            <p className="text-foreground">#{selectedReceipt.blockNumber}</p>
                          </div>
                        )}
                      </div>
                      <div className="pt-2 border-t border-border">
                        <p className="font-mono text-xs text-muted-foreground mb-2">Pipeline Stages</p>
                        <div className="space-y-2">
                          {selectedReceipt.stages.map(stage => (
                            <div key={stage.id} className="flex items-center justify-between text-xs font-mono">
                              <span className={cn(
                                stage.status === 'success' ? 'text-emerald-400' :
                                stage.status === 'error' ? 'text-red-400' :
                                'text-muted-foreground'
                              )}>
                                {stage.name}
                              </span>
                              <span className="text-muted-foreground">
                                {stage.duration !== undefined ? `${stage.duration}ms` : '-'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="font-mono text-xs text-muted-foreground text-center py-8">
                      Select a receipt to view details
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Signature Tab */}
          <TabsContent value="signature" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* EIP-712 Domain */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    EIP-712 DOMAIN
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="font-mono text-xs bg-secondary/50 rounded-lg p-4 overflow-x-auto border border-border">
{`{
  "name": "SGAU-ValueGuard",
  "version": "1.0.0",
  "chainId": 1,
  "verifyingContract": "0x508B7423..."
}`}
                  </pre>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-muted-foreground">Domain Separator</span>
                      <code className="bg-background px-2 py-1 rounded border border-border">
                        0x7a3f8c...
                      </code>
                    </div>
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-muted-foreground">Type Hash</span>
                      <code className="bg-background px-2 py-1 rounded border border-border">
                        0x9b4e2d...
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Typed Data Preview */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="font-mono text-sm flex items-center gap-2">
                    <Fingerprint className="w-4 h-4 text-primary" />
                    TYPED DATA PREVIEW
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="font-mono text-xs bg-secondary/50 rounded-lg p-4 overflow-x-auto border border-border max-h-[300px]">
{`// Primary Type: Intent
{
  "types": {
    "EIP712Domain": [...],
    "Intent": [
      { "name": "action", "type": "string" },
      { "name": "nodeId", "type": "bytes32" },
      { "name": "data", "type": "bytes" },
      { "name": "nonce", "type": "uint256" },
      { "name": "deadline", "type": "uint256" }
    ]
  },
  "primaryType": "Intent",
  "message": {
    "action": "${intent.action}",
    "nodeId": "${intent.nodeId}",
    "nonce": ${intent.nonce},
    "deadline": ${intent.deadline}
  }
}`}
                  </pre>
                </CardContent>
              </Card>
            </div>

            {/* Signature Verification */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Key className="w-4 h-4 text-primary" />
                  SIGNATURE VERIFICATION
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                    <p className="font-mono text-xs text-muted-foreground mb-2">Recovery (v)</p>
                    <p className="font-mono text-lg font-bold text-primary">27</p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                    <p className="font-mono text-xs text-muted-foreground mb-2">R Component</p>
                    <p className="font-mono text-sm text-foreground break-all">0x4a7c8f2e...</p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                    <p className="font-mono text-xs text-muted-foreground mb-2">S Component</p>
                    <p className="font-mono text-sm text-foreground break-all">0x9b3d1e5c...</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <p className="font-mono text-sm text-emerald-400">
                      Recovered signer matches authorized verifier
                    </p>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground mt-2">
                    Signer: {intent.signer}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-xs text-muted-foreground">
              PROTOCOL EXECUTION LAYER | SIGNED INTENT RELAY ENGINE
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-xs">
                CHAIN: MAINNET
              </Badge>
              <Badge variant="outline" className="font-mono text-xs text-emerald-400 border-emerald-500/40">
                OPERATIONAL
              </Badge>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default function ProtocolConsolePage() {
  return (
    <CDSErrorBoundary module="Protocol Execution Console" showDetails>
      <ProtocolConsoleContent />
    </CDSErrorBoundary>
  );
}
