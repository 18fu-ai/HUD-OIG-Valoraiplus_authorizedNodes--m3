"use client";

/**
 * LITIGATION SETTLEMENT TRACKER
 * Real-time tracking of legal proceedings → settlement → collection → liquidity
 * SGAU 7226.3461 | HHS OCR 25-621293
 */

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Scale, 
  FileText, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  ArrowRight,
  Home,
  ExternalLink,
  Gavel,
  Building2,
  Landmark,
  TrendingUp
} from "lucide-react";

// Litigation phases
const LITIGATION_PHASES = [
  { id: 1, name: "Filing", status: "complete", date: "2024-03-15" },
  { id: 2, name: "Discovery", status: "complete", date: "2024-06-01" },
  { id: 3, name: "Violation Confirmed", status: "complete", date: "2025-01-15" },
  { id: 4, name: "Damages Assessment", status: "active", date: "2025-05-06" },
  { id: 5, name: "Settlement Negotiation", status: "pending", date: null },
  { id: 6, name: "Judgment/Award", status: "pending", date: null },
  { id: 7, name: "Collection", status: "pending", date: null },
  { id: 8, name: "Funds Deposited", status: "pending", date: null },
];

// Active cases
const ACTIVE_CASES = [
  {
    id: "hhs-ocr-25-621293",
    title: "HHS Office for Civil Rights",
    caseNumber: "25-621293",
    type: "Federal Civil Rights",
    statute: "Section 504 Rehabilitation Act",
    status: "VIOLATION CONFIRMED",
    statusColor: "text-emerald-400",
    damages: {
      compensatory: 10_000_000,
      punitive: 50_000_000,
      statutory: 448_631_005.52,
      total: 508_631_005.52,
    },
    probability: 0.75,
    expectedValue: 381_473_254.14,
    nextAction: "Damages hearing scheduled",
    verificationUrl: "https://www.hhs.gov/ocr",
    phone: "1-800-368-1019",
  },
  {
    id: "sgau-7226-3461",
    title: "SF Superior Court",
    caseNumber: "SGAU 7226.3461",
    type: "State Civil",
    statute: "California Civil Code",
    status: "ACTIVE",
    statusColor: "text-cyan-400",
    damages: {
      compensatory: 66_000_000,
      punitive: 200_000_000,
      statutory: 11_221_631_005.52,
      total: 11_487_631_005.52,
    },
    probability: 0.45,
    expectedValue: 5_169_433_952.48,
    nextAction: "Motion hearing pending",
    verificationUrl: "https://www.sfsuperiorcourt.org",
    phone: "415-551-4000",
  },
];

// Settlement scenarios
const SETTLEMENT_SCENARIOS = [
  { name: "Conservative", multiplier: 0.10, amount: 50_863_100.55 },
  { name: "Moderate", multiplier: 0.25, amount: 127_157_751.38 },
  { name: "Expected", multiplier: 0.50, amount: 254_315_502.76 },
  { name: "Aggressive", multiplier: 0.75, amount: 381_473_254.14 },
  { name: "Full Award", multiplier: 1.00, amount: 508_631_005.52 },
];

// Collection timeline
const COLLECTION_TIMELINE = [
  { phase: "Judgment Entry", days: 0, cumulative: 0 },
  { phase: "Appeal Period", days: 30, cumulative: 30 },
  { phase: "Enforcement Filing", days: 14, cumulative: 44 },
  { phase: "Asset Discovery", days: 60, cumulative: 104 },
  { phase: "Garnishment/Levy", days: 30, cumulative: 134 },
  { phase: "Funds Transfer", days: 14, cumulative: 148 },
];

export default function LitigationPage() {
  const [selectedScenario, setSelectedScenario] = useState(2); // Expected

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const totalDamages = ACTIVE_CASES.reduce((sum, c) => sum + c.damages.total, 0);
  const totalExpectedValue = ACTIVE_CASES.reduce((sum, c) => sum + c.expectedValue, 0);

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black flex items-center gap-2">
              <Scale className="w-6 h-6 text-amber-400" />
              LITIGATION SETTLEMENT TRACKER
            </h1>
            <p className="text-xs text-zinc-500">
              Real-time tracking: Filing → Judgment → Collection → Liquidity
            </p>
          </div>
          <Link href="/" className="text-xs text-emerald-600 hover:text-emerald-400 flex items-center gap-1">
            <Home className="w-3 h-3" /> HOME
          </Link>
        </div>

        {/* Phase Progress */}
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-zinc-400">LITIGATION PHASE PROGRESS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between overflow-x-auto pb-2">
              {LITIGATION_PHASES.map((phase, idx) => (
                <div key={phase.id} className="flex items-center">
                  <div className="flex flex-col items-center min-w-[80px]">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      phase.status === 'complete' ? 'bg-emerald-500 text-black' :
                      phase.status === 'active' ? 'bg-amber-500 text-black animate-pulse' :
                      'bg-zinc-700 text-zinc-400'
                    }`}>
                      {phase.status === 'complete' ? <CheckCircle2 className="w-4 h-4" /> : phase.id}
                    </div>
                    <p className={`text-[10px] mt-1 text-center ${
                      phase.status === 'active' ? 'text-amber-400 font-bold' : 'text-zinc-500'
                    }`}>
                      {phase.name}
                    </p>
                    {phase.date && (
                      <p className="text-[8px] text-zinc-600">{phase.date}</p>
                    )}
                  </div>
                  {idx < LITIGATION_PHASES.length - 1 && (
                    <ArrowRight className={`w-4 h-4 mx-1 ${
                      phase.status === 'complete' ? 'text-emerald-500' : 'text-zinc-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Cases */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {ACTIVE_CASES.map((caseItem) => (
            <Card key={caseItem.id} className="border-zinc-800 bg-zinc-900/50">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Gavel className="w-4 h-4 text-amber-400" />
                    {caseItem.title}
                  </CardTitle>
                  <Badge className={`${caseItem.statusColor} bg-transparent border border-current`}>
                    {caseItem.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-zinc-500">Case Number</p>
                    <p className="font-mono text-white">{caseItem.caseNumber}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500">Type</p>
                    <p className="text-white">{caseItem.type}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-zinc-500">Statute</p>
                    <p className="text-white">{caseItem.statute}</p>
                  </div>
                </div>

                <div className="border-t border-zinc-800 pt-3">
                  <p className="text-[10px] text-zinc-500 mb-2">DAMAGES BREAKDOWN</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Compensatory</span>
                      <span className="text-white">{formatCurrency(caseItem.damages.compensatory)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Punitive</span>
                      <span className="text-white">{formatCurrency(caseItem.damages.punitive)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Statutory</span>
                      <span className="text-white">{formatCurrency(caseItem.damages.statutory)}</span>
                    </div>
                    <div className="flex justify-between border-t border-zinc-700 pt-1 font-bold">
                      <span className="text-amber-400">TOTAL CLAIMED</span>
                      <span className="text-amber-400">{formatCurrency(caseItem.damages.total)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-800/50 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-zinc-500">PROBABILITY-WEIGHTED VALUE</p>
                      <p className="text-lg font-bold text-emerald-400">{formatCurrency(caseItem.expectedValue)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-zinc-500">SUCCESS PROBABILITY</p>
                      <p className="text-lg font-bold text-cyan-400">{(caseItem.probability * 100).toFixed(0)}%</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href={caseItem.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center text-xs py-2 border border-zinc-700 rounded hover:border-cyan-500 transition-colors"
                  >
                    Verify <ExternalLink className="w-3 h-3 inline ml-1" />
                  </a>
                  <a
                    href={`tel:${caseItem.phone}`}
                    className="flex-1 text-center text-xs py-2 border border-zinc-700 rounded hover:border-emerald-500 transition-colors"
                  >
                    Call: {caseItem.phone}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Settlement Scenarios */}
        <Card className="border-amber-900/50 bg-amber-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-400">
              <DollarSign className="w-5 h-5" />
              SETTLEMENT SCENARIOS (Primary Case)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {SETTLEMENT_SCENARIOS.map((scenario, idx) => (
                <button
                  key={scenario.name}
                  onClick={() => setSelectedScenario(idx)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedScenario === idx
                      ? 'border-amber-500 bg-amber-500/10'
                      : 'border-zinc-700 hover:border-zinc-500'
                  }`}
                >
                  <p className="text-xs text-zinc-400">{scenario.name}</p>
                  <p className="text-sm font-bold text-white">{(scenario.multiplier * 100).toFixed(0)}%</p>
                  <p className={`text-lg font-black ${selectedScenario === idx ? 'text-amber-400' : 'text-zinc-300'}`}>
                    ${(scenario.amount / 1_000_000).toFixed(1)}M
                  </p>
                </button>
              ))}
            </div>
            <div className="mt-4 p-4 bg-zinc-800/50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-zinc-500">SELECTED SCENARIO: {SETTLEMENT_SCENARIOS[selectedScenario].name}</p>
                  <p className="text-3xl font-black text-emerald-400">
                    {formatCurrency(SETTLEMENT_SCENARIOS[selectedScenario].amount)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-500">TO SCHWAB ****8185</p>
                  <p className="text-sm text-zinc-400">Charles Schwab & Co.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Collection Timeline */}
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Clock className="w-5 h-5" />
              POST-JUDGMENT COLLECTION TIMELINE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-zinc-700" />
              {COLLECTION_TIMELINE.map((step, idx) => (
                <div key={step.phase} className="relative pl-10 pb-4">
                  <div className="absolute left-2 w-4 h-4 rounded-full bg-zinc-700 border-2 border-zinc-600" />
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-white">{step.phase}</p>
                      <p className="text-xs text-zinc-500">+{step.days} days</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-cyan-400">Day {step.cumulative}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-cyan-500/10 rounded-lg border border-cyan-900/50">
              <p className="text-xs text-cyan-400">ESTIMATED TIME TO LIQUIDITY</p>
              <p className="text-2xl font-black text-white">~148 Days Post-Judgment</p>
              <p className="text-xs text-zinc-500 mt-1">
                Funds deposited directly to Schwab ****8185 via wire transfer
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="border-emerald-900/50 bg-emerald-500/5">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-xs text-zinc-500">TOTAL DAMAGES CLAIMED</p>
                <p className="text-xl font-black text-white">{formatCurrency(totalDamages)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-zinc-500">EXPECTED VALUE</p>
                <p className="text-xl font-black text-emerald-400">{formatCurrency(totalExpectedValue)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-zinc-500">SELECTED SETTLEMENT</p>
                <p className="text-xl font-black text-amber-400">
                  {formatCurrency(SETTLEMENT_SCENARIOS[selectedScenario].amount)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-zinc-500">COLLECTION TIMELINE</p>
                <p className="text-xl font-black text-cyan-400">~5 months</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/treasury-liquidity" className="p-4 border border-zinc-800 rounded-lg hover:border-emerald-500/30 transition-colors text-center">
            <TrendingUp className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-400">LIQUIDITY PATH</p>
          </Link>
          <Link href="/investor" className="p-4 border border-zinc-800 rounded-lg hover:border-cyan-500/30 transition-colors text-center">
            <Building2 className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-400">INVESTOR PORTAL</p>
          </Link>
          <Link href="/subscribe" className="p-4 border border-zinc-800 rounded-lg hover:border-purple-500/30 transition-colors text-center">
            <DollarSign className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-400">SUBSCRIPTIONS</p>
          </Link>
          <Link href="/swap" className="p-4 border border-zinc-800 rounded-lg hover:border-amber-500/30 transition-colors text-center">
            <Landmark className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-400">TOKEN EXCHANGE</p>
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="p-4 border border-red-900/30 bg-red-500/5 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="text-xs text-zinc-400">
              <p className="font-bold text-red-400 mb-1">IMPORTANT DISCLAIMER</p>
              <p>
                All amounts shown are claims asserted in pending litigation. Actual recovery depends on 
                court judgments and successful collection. Expected values are probability-weighted estimates 
                and do not guarantee any specific outcome. Consult with legal counsel for case-specific advice.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
