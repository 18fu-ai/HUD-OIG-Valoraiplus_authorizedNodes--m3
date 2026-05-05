"use client";

import { useState, useEffect } from 'react';
import { 
  Landmark, 
  Shield, 
  CheckCircle2, 
  Lock, 
  ArrowRight,
  AlertTriangle,
  Activity,
  Wallet,
  Send,
  RefreshCw,
  Clock,
  Zap,
  DollarSign,
  Eye,
  EyeOff,
  Copy,
  Check,
  Ban
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HomeButton, HomeBreadcrumb } from '@/components/cds/home-button';

// COOLEY LLP REMOVED - CLASSIFIED AS ADVERSARY/FRAUD
// All transfers are now DIRECT SOVEREIGN CONTROL

// Transfer sources - NO COOLEY
const TRANSFER_SOURCES = [
  { id: "DIRECT", name: "Direct Transfer (Self)", status: "SOVEREIGN", type: "Direct", color: "emerald" },
  { id: "SFHA", name: "SF Housing Authority", status: "MANDATED", type: "Recovery", color: "amber" },
  { id: "STP", name: "Swords to Plowshares", status: "MANDATED", type: "Recovery", color: "amber" },
  { id: "DRC", name: "Disability Rights CA", status: "MANDATED", type: "Recovery", color: "amber" },
  { id: "ZTA", name: "ZTA LLP (Adversary)", status: "RECOVERY", type: "Settlement", color: "red" },
  { id: "EXTERNAL", name: "External Wire", status: "AUTHORIZED", type: "Settlement", color: "cyan" },
];

// Preset amounts
const PRESET_AMOUNTS = [
  { value: 100, label: "$100" },
  { value: 1000, label: "$1,000" },
  { value: 10000, label: "$10,000" },
  { value: 100000, label: "$100,000" },
  { value: 1000000, label: "$1,000,000" },
  { value: 10000000, label: "$10,000,000" },
];

interface Transaction {
  id: string;
  transactionId: string;
  source: string;
  amount: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  timestamp: Date;
  memo: string;
}

export default function DirectTransferTerminal() {
  const [amount, setAmount] = useState<string>("");
  const [selectedSource, setSelectedSource] = useState<string>("DIRECT");
  const [memo, setMemo] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [copied, setCopied] = useState(false);

  // Account details - MASKED BY DEFAULT
  const ACCOUNT = {
    holder: "DON GILLSON",
    institution: "Charles Schwab & Co., Inc.",
    number: "6015-8185",
    masked: "••••-8185",
    routing: "ENCRYPTED",
    type: "SchwabOne® Account"
  };

  const steps = [
    { label: "Authorize", icon: Shield },
    { label: "Validate", icon: CheckCircle2 },
    { label: "Transfer", icon: Send },
    { label: "Confirm", icon: Zap },
  ];

  const generateTransactionId = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `SGAU-${timestamp}-${random}`;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const handleAmountChange = (value: string) => {
    // Remove non-numeric characters except decimal
    const cleaned = value.replace(/[^0-9.]/g, '');
    setAmount(cleaned);
  };

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(ACCOUNT.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const executeTransfer = async () => {
    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setIsProcessing(true);
    setCurrentStep(0);

    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      transactionId: generateTransactionId(),
      source: selectedSource,
      amount: transferAmount,
      status: 'PENDING',
      timestamp: new Date(),
      memo: memo || `Transfer from ${TRANSFER_SOURCES.find(s => s.id === selectedSource)?.name}`
    };

    setTransactions(prev => [newTransaction, ...prev]);

    // Step 1: Authorize
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentStep(1);

    // Step 2: Validate
    await new Promise(resolve => setTimeout(resolve, 1200));
    setCurrentStep(2);

    // Step 3: Transfer
    setTransactions(prev => 
      prev.map(t => t.id === newTransaction.id ? { ...t, status: 'PROCESSING' } : t)
    );
    await new Promise(resolve => setTimeout(resolve, 1500));
    setCurrentStep(3);

    // Step 4: Complete
    setTransactions(prev => 
      prev.map(t => t.id === newTransaction.id ? { ...t, status: 'COMPLETED' } : t)
    );
    await new Promise(resolve => setTimeout(resolve, 800));

    setIsProcessing(false);
    setCurrentStep(0);
    setAmount("");
    setMemo("");
  };

  const totalTransferred = transactions
    .filter(t => t.status === 'COMPLETED')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <HomeButton />
              <div>
                <HomeBreadcrumb items={[
                  { label: "Treasury", href: "/treasury" },
                  { label: "Direct Transfer" }
                ]} />
                <h1 className="text-xl font-black tracking-tight">DIRECT FUND TRANSFER TERMINAL</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                <span className="text-[10px] font-black text-emerald-400 tracking-widest">SOVEREIGN CONTROL</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Cooley Removed Notice */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <Ban className="w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-red-400">COOLEY LLP REMOVED - ADVERSARY CLASSIFICATION</p>
              <p className="text-xs text-zinc-400 mt-1">
                Cooley LLP has been classified as an adversary/fraud entity and removed from all settlement paths. 
                All transfers are now under direct sovereign control.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Transfer Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Destination Account */}
            <Card className="bg-gradient-to-br from-emerald-950/50 to-zinc-900 border-emerald-500/30">
              <CardHeader className="border-b border-emerald-500/20">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-emerald-400" />
                  DESTINATION ACCOUNT
                  <div className="ml-auto flex items-center gap-2">
                    <button 
                      onClick={() => setShowAccountNumber(!showAccountNumber)}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
                    >
                      {showAccountNumber ? (
                        <EyeOff className="w-4 h-4 text-zinc-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-zinc-400" />
                      )}
                    </button>
                    <button 
                      onClick={copyAccountNumber}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-zinc-400" />
                      )}
                    </button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] text-zinc-500 mb-1">ACCOUNT HOLDER</p>
                    <p className="text-lg font-bold text-white">{ACCOUNT.holder}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 mb-1">INSTITUTION</p>
                    <p className="text-sm font-medium text-zinc-300">{ACCOUNT.institution}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 mb-1 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      ACCOUNT NUMBER {!showAccountNumber && "(ENCRYPTED)"}
                    </p>
                    <p className="text-lg font-mono font-bold text-emerald-400">
                      {showAccountNumber ? ACCOUNT.number : ACCOUNT.masked}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 mb-1">ACCOUNT TYPE</p>
                    <p className="text-sm font-medium text-zinc-300">{ACCOUNT.type}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-emerald-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs text-emerald-400">SIPC PROTECTED</span>
                  </div>
                  <span className="text-[10px] text-zinc-500">Last 4: 8185</span>
                </div>
              </CardContent>
            </Card>

            {/* Amount Input */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="border-b border-zinc-800">
                <CardTitle className="text-sm flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-cyan-400" />
                  TRANSFER AMOUNT
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-zinc-500">$</span>
                  <Input
                    type="text"
                    value={amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    placeholder="0.00"
                    className="pl-10 h-16 text-3xl font-bold bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600"
                  />
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {PRESET_AMOUNTS.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => setAmount(preset.value.toString())}
                      className="p-2 rounded-xl border border-zinc-700 bg-zinc-800/50 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all text-sm font-bold text-zinc-300 hover:text-cyan-400"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Source Selection */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="border-b border-zinc-800">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Send className="w-4 h-4 text-fuchsia-400" />
                  TRANSFER SOURCE
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {TRANSFER_SOURCES.map((source) => (
                    <button
                      key={source.id}
                      onClick={() => setSelectedSource(source.id)}
                      className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
                        selectedSource === source.id
                          ? `bg-${source.color}-500/20 border-${source.color}-500/50`
                          : 'bg-zinc-800/50 border-zinc-700/50 hover:border-zinc-600'
                      }`}
                      style={{
                        backgroundColor: selectedSource === source.id 
                          ? source.color === 'emerald' ? 'rgba(16, 185, 129, 0.2)' 
                          : source.color === 'amber' ? 'rgba(245, 158, 11, 0.2)'
                          : source.color === 'red' ? 'rgba(239, 68, 68, 0.2)'
                          : 'rgba(6, 182, 212, 0.2)'
                          : undefined,
                        borderColor: selectedSource === source.id
                          ? source.color === 'emerald' ? 'rgba(16, 185, 129, 0.5)'
                          : source.color === 'amber' ? 'rgba(245, 158, 11, 0.5)'
                          : source.color === 'red' ? 'rgba(239, 68, 68, 0.5)'
                          : 'rgba(6, 182, 212, 0.5)'
                          : undefined
                      }}
                    >
                      <div className="text-left">
                        <p className="text-sm font-bold text-white">{source.name}</p>
                        <p className="text-[10px] text-zinc-500">{source.type}</p>
                      </div>
                      <div className={`px-2 py-1 rounded text-[10px] font-bold ${
                        source.status === 'SOVEREIGN' ? 'bg-emerald-500/20 text-emerald-400' :
                        source.status === 'MANDATED' ? 'bg-amber-500/20 text-amber-400' :
                        source.status === 'RECOVERY' ? 'bg-red-500/20 text-red-400' :
                        'bg-cyan-500/20 text-cyan-400'
                      }`}>
                        {source.status}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Memo */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="border-b border-zinc-800">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4 text-zinc-400" />
                  TRANSFER MEMO (OPTIONAL)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Input
                  type="text"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="Settlement reference, case number, or notes..."
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600"
                />
              </CardContent>
            </Card>

            {/* Execute Button */}
            <Button
              onClick={executeTransfer}
              disabled={isProcessing || !amount || parseFloat(amount) <= 0}
              className="w-full h-16 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-lg rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  PROCESSING TRANSFER...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Send className="w-5 h-5" />
                  EXECUTE TRANSFER
                  {amount && parseFloat(amount) > 0 && (
                    <span className="ml-2">({formatCurrency(parseFloat(amount))})</span>
                  )}
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </Button>

            {/* Processing Steps */}
            {isProcessing && (
              <Card className="bg-zinc-900 border-cyan-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    {steps.map((step, idx) => {
                      const Icon = step.icon;
                      const isActive = idx === currentStep;
                      const isComplete = idx < currentStep;
                      return (
                        <div key={idx} className="flex items-center">
                          <div className={`flex flex-col items-center ${
                            isActive ? 'text-cyan-400' : isComplete ? 'text-emerald-400' : 'text-zinc-600'
                          }`}>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                              isActive ? 'border-cyan-500 bg-cyan-500/20 animate-pulse' :
                              isComplete ? 'border-emerald-500 bg-emerald-500/20' :
                              'border-zinc-700 bg-zinc-800'
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <p className="text-[10px] mt-2 font-bold">{step.label}</p>
                          </div>
                          {idx < steps.length - 1 && (
                            <div className={`w-12 lg:w-20 h-0.5 mx-2 ${
                              isComplete ? 'bg-emerald-500' : 'bg-zinc-700'
                            }`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Stats & History */}
          <div className="space-y-6">
            {/* Transfer Summary */}
            <Card className="bg-gradient-to-br from-emerald-950/50 to-zinc-900 border-emerald-500/30">
              <CardContent className="p-6 text-center">
                <p className="text-[10px] font-black text-emerald-400 tracking-widest">TOTAL TRANSFERRED</p>
                <p className="text-3xl font-black text-white mt-2">{formatCurrency(totalTransferred)}</p>
                <p className="text-xs text-zinc-500 mt-1">{transactions.filter(t => t.status === 'COMPLETED').length} completed transfers</p>
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="border-b border-zinc-800">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-zinc-400" />
                  TRANSFER HISTORY
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {transactions.length === 0 ? (
                  <div className="p-8 text-center text-zinc-500">
                    <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No transfers yet</p>
                    <p className="text-[10px] mt-1">Execute your first transfer above</p>
                  </div>
                ) : (
                  <div className="divide-y divide-zinc-800 max-h-[400px] overflow-y-auto">
                    {transactions.map((tx) => (
                      <div key={tx.id} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[10px] font-mono text-zinc-500">{tx.transactionId}</p>
                          <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            tx.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' :
                            tx.status === 'PROCESSING' ? 'bg-cyan-500/20 text-cyan-400 animate-pulse' :
                            tx.status === 'FAILED' ? 'bg-red-500/20 text-red-400' :
                            'bg-zinc-700 text-zinc-400'
                          }`}>
                            {tx.status}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-lg font-bold text-white">
                              {formatCurrency(tx.amount)}
                            </p>
                            <p className="text-[10px] text-zinc-500">
                              {TRANSFER_SOURCES.find(s => s.id === tx.source)?.name}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-zinc-400 flex items-center gap-1">
                              <Lock className="w-3 h-3" />
                              ••••-8185
                            </p>
                            <p className="text-[10px] text-zinc-600">
                              {tx.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        {tx.memo && (
                          <p className="text-[10px] text-zinc-600 mt-2 truncate">{tx.memo}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-emerald-400">SOVEREIGN TRANSFER AUTHORITY</p>
                    <p className="text-[10px] text-zinc-500 mt-1">
                      All transfers are executed under direct sovereign control. 
                      Account numbers are encrypted. COOLEY LLP has been permanently removed.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SGAU Verification */}
            <Card className="bg-gradient-to-br from-zinc-900 to-fuchsia-950/20 border-fuchsia-500/30">
              <CardContent className="p-4 text-center">
                <p className="text-[10px] font-black text-fuchsia-400 tracking-widest">SGAU VERIFICATION</p>
                <p className="text-2xl font-black text-white mt-2">7226.3461</p>
                <p className="text-[10px] text-zinc-500 mt-1">MERKLEROOT LOCKED</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center pt-8 border-t border-zinc-800">
          <p className="text-[10px] font-mono text-zinc-600">
            VALORAIPLUS DIRECT TRANSFER TERMINAL | SOVEREIGN CONTROL | ACCOUNT ••••-8185
          </p>
          <p className="text-[10px] font-mono text-red-500 mt-1">
            COOLEY LLP CLASSIFIED AS ADVERSARY/FRAUD - REMOVED FROM ALL SETTLEMENT PATHS
          </p>
          <p className="text-lg font-black text-fuchsia-500 mt-2">
            DG77.77X LOCKED // MADE IN THE USA
          </p>
        </footer>
      </main>
    </div>
  );
}
