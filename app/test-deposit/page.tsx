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
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HomeButton, HomeBreadcrumb } from '@/components/cds/home-button';
import { ConnectedBrokerageAccount } from '@/components/connected-brokerage-account';

// Test deposit amounts
const TEST_AMOUNTS = [
  { value: 0.01, label: "$0.01", description: "Micro verification" },
  { value: 1.00, label: "$1.00", description: "Standard test" },
  { value: 10.00, label: "$10.00", description: "Enhanced test" },
  { value: 100.00, label: "$100.00", description: "Full verification" },
];

// Settlement sources
const SETTLEMENT_SOURCES = [
  { id: "COOLEY", name: "Cooley LLP", status: "AUTHORIZED", type: "Settlement" },
  { id: "SFHA", name: "SF Housing Authority", status: "MANDATED", type: "Recovery" },
  { id: "STP", name: "Swords to Plowshares", status: "AUTHORIZED", type: "Recovery" },
  { id: "DRC", name: "Disability Rights CA", status: "AUTHORIZED", type: "Recovery" },
  { id: "TEST", name: "Test Deposit", status: "SIMULATION", type: "Test" },
];

interface DepositTransaction {
  id: string;
  transactionId: string;
  source: string;
  amount: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  timestamp: Date;
  destinationMasked: string;
}

export default function TestDepositPage() {
  const [selectedAmount, setSelectedAmount] = useState<number>(1.00);
  const [selectedSource, setSelectedSource] = useState<string>("TEST");
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactions, setTransactions] = useState<DepositTransaction[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: "Initialize", icon: Zap },
    { label: "Validate", icon: Shield },
    { label: "Process", icon: Activity },
    { label: "Confirm", icon: CheckCircle2 },
  ];

  const generateTransactionId = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `VAL-${timestamp}-${random}`;
  };

  const simulateDeposit = async () => {
    setIsProcessing(true);
    setCurrentStep(0);

    const newTransaction: DepositTransaction = {
      id: crypto.randomUUID(),
      transactionId: generateTransactionId(),
      source: selectedSource,
      amount: selectedAmount,
      status: 'PENDING',
      timestamp: new Date(),
      destinationMasked: "••••-8185"
    };

    setTransactions(prev => [newTransaction, ...prev]);

    // Step 1: Initialize
    await new Promise(resolve => setTimeout(resolve, 800));
    setCurrentStep(1);

    // Step 2: Validate
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentStep(2);

    // Step 3: Process
    setTransactions(prev => 
      prev.map(t => t.id === newTransaction.id ? { ...t, status: 'PROCESSING' } : t)
    );
    await new Promise(resolve => setTimeout(resolve, 1500));
    setCurrentStep(3);

    // Step 4: Complete
    setTransactions(prev => 
      prev.map(t => t.id === newTransaction.id ? { ...t, status: 'COMPLETED' } : t)
    );
    await new Promise(resolve => setTimeout(resolve, 500));

    setIsProcessing(false);
    setCurrentStep(0);
  };

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
                  { label: "Test Deposit" }
                ]} />
                <h1 className="text-xl font-black tracking-tight">TEST DEPOSIT TERMINAL</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30">
                <span className="text-[10px] font-black text-amber-400 tracking-widest">SIMULATION MODE</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Warning Banner */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-amber-400">SIMULATION ENVIRONMENT</p>
              <p className="text-xs text-zinc-400 mt-1">
                This is a test deposit simulation. No actual funds will be transferred. 
                For real transfers, contact the settlement parties directly with account details.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Deposit Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Connected Account (Masked) */}
            <Card className="bg-zinc-900 border-emerald-500/30">
              <CardHeader className="border-b border-zinc-800">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-emerald-400" />
                  DESTINATION ACCOUNT
                  <Lock className="w-3 h-3 text-zinc-500 ml-auto" />
                  <span className="text-[10px] text-zinc-500 font-normal">ENCRYPTED</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ConnectedBrokerageAccount compact showFullAccount={false} />
              </CardContent>
            </Card>

            {/* Amount Selection */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="border-b border-zinc-800">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-cyan-400" />
                  SELECT TEST AMOUNT
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {TEST_AMOUNTS.map((amount) => (
                    <button
                      key={amount.value}
                      onClick={() => setSelectedAmount(amount.value)}
                      className={`p-4 rounded-xl border transition-all ${
                        selectedAmount === amount.value
                          ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                          : 'bg-zinc-800/50 border-zinc-700/50 text-zinc-400 hover:border-zinc-600'
                      }`}
                    >
                      <p className="text-lg font-bold">{amount.label}</p>
                      <p className="text-[10px] mt-1">{amount.description}</p>
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
                  SELECT SOURCE
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {SETTLEMENT_SOURCES.map((source) => (
                    <button
                      key={source.id}
                      onClick={() => setSelectedSource(source.id)}
                      className={`w-full p-4 rounded-xl border transition-all flex items-center justify-between ${
                        selectedSource === source.id
                          ? 'bg-fuchsia-500/20 border-fuchsia-500/50'
                          : 'bg-zinc-800/50 border-zinc-700/50 hover:border-zinc-600'
                      }`}
                    >
                      <div className="text-left">
                        <p className="text-sm font-bold text-white">{source.name}</p>
                        <p className="text-[10px] text-zinc-500">{source.type}</p>
                      </div>
                      <div className={`px-2 py-1 rounded text-[10px] font-bold ${
                        source.status === 'AUTHORIZED' ? 'bg-emerald-500/20 text-emerald-400' :
                        source.status === 'MANDATED' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-zinc-700 text-zinc-400'
                      }`}>
                        {source.status}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Process Button */}
            <Button
              onClick={simulateDeposit}
              disabled={isProcessing}
              className="w-full h-16 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-bold text-lg rounded-2xl"
            >
              {isProcessing ? (
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  PROCESSING...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Send className="w-5 h-5" />
                  SIMULATE TEST DEPOSIT
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
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                              isActive ? 'border-cyan-500 bg-cyan-500/20 animate-pulse' :
                              isComplete ? 'border-emerald-500 bg-emerald-500/20' :
                              'border-zinc-700 bg-zinc-800'
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <p className="text-[10px] mt-2 font-bold">{step.label}</p>
                          </div>
                          {idx < steps.length - 1 && (
                            <div className={`w-16 h-0.5 mx-2 ${
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

          {/* Right Column - Transaction History */}
          <div className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="border-b border-zinc-800">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-zinc-400" />
                  TRANSACTION HISTORY
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {transactions.length === 0 ? (
                  <div className="p-8 text-center text-zinc-500">
                    <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No test transactions yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-zinc-800 max-h-[600px] overflow-y-auto">
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
                            <p className="text-sm font-bold text-white">
                              ${tx.amount.toFixed(2)}
                            </p>
                            <p className="text-[10px] text-zinc-500">
                              {SETTLEMENT_SOURCES.find(s => s.id === tx.source)?.name}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-zinc-400 flex items-center gap-1">
                              <Lock className="w-3 h-3" />
                              {tx.destinationMasked}
                            </p>
                            <p className="text-[10px] text-zinc-600">
                              {tx.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
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
                    <p className="text-xs font-bold text-emerald-400">SECURITY NOTICE</p>
                    <p className="text-[10px] text-zinc-500 mt-1">
                      Account numbers are encrypted and masked for security. 
                      Only the last 4 digits (8185) are displayed on front-facing interfaces.
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
            VALORAIPLUS TEST DEPOSIT TERMINAL | SIMULATION MODE | ACCOUNT ••••-8185
          </p>
          <p className="text-lg font-black text-fuchsia-500 mt-2">
            DG77.77X LOCKED // MADE IN THE USA
          </p>
        </footer>
      </main>
    </div>
  );
}
