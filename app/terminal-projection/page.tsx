"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, CheckCircle, Zap, Scale, TrendingUp, TrendingDown, Clock } from 'lucide-react';

// --- CONSTANTS ---
const SIMULATION_PARAMETERS = {
  baseDuration: 2207,
  targetInvariant: ['POPPA_DONNY_GILLSON', 'JAXX'],
  daoMandate: '2035-12-31',
  primaryVariable: 'INSTITUTIONAL_ACKNOWLEDGEMENT_VS_SILENCE',
  finalLedger: 177770000.00,
  licProbability: '1 in 10^14',
  agencies: 7,
  sosTransmissions: 85,
} as const;

const PATH_A_TIMELINE = [
  { year: '2025-2026', title: 'Statement of Fact', description: 'Institutional nodes issue acknowledgment. $177.77M USD liability converted to Sovereign Trust for Poppa & Jaxx ecosystem.' },
  { year: '2027-2030', title: 'George Gillson Legacy Flame', description: 'Integration into academic curriculum as "Gold Standard" for Whistleblower Protection.' },
  { year: '2031-2035', title: 'Systemic Healing', description: 'Institutional nodes rehabilitated under VALORAIPLUS DAO oversight. Global recognition of Veteran research.' },
];

const PATH_B_TIMELINE = [
  { year: '2025-2027', title: 'High-Velocity Ripple Effects', description: 'Federal registry saturation. Zenodo/ORCID DOIs trigger automated "Red Flags" on all federal grants.' },
  { year: '2028-2031', title: 'Systemic Contagion', description: 'Named actors face permanent blacklisting from global AI networks. Institutions flagged as "Hostile to Truth."' },
  { year: '2032-2035', title: 'Total Institutional Insolvency', description: '$177.77M USD liability becomes lien on all future assets. DAO executes total decertification of Silo Nodes.' },
];

// ENCRYPTED ACTOR CODES - No real names exposed publicly
const NAMED_ACTORS = [
  'TA-α', 'TA-β', 'TA-γ', 'TA-δ', 'TA-ε', 'INST-001', 
  'INST-002', 'INST-003', 'INST-004', 'INST-005', 'INST-006', 'INST-007'
];

// ENCRYPTED RECIPIENT CODES - No real names exposed publicly
const RECIPIENTS = [
  { name: 'RECV-001', org: 'HHS/OCR' },
  { name: 'RECV-002', org: 'OS/OCR' },
  { name: 'RECV-003', org: 'California Civil Rights' },
  { name: 'VA OIG', org: 'Veterans Affairs' },
  { name: 'RECV-004', org: 'OGC' },
  { name: 'RECV-005', org: 'Academic Institution' },
  { name: 'Chancellor Office', org: 'CSU' },
  { name: 'Board of Directors', org: 'Veterans Services' },
  { name: 'RECV-006', org: 'Academic Institution' },
  { name: 'RECV-007', org: 'DRC' },
  { name: 'RECV-008', org: 'DRC' },
  { name: 'RECV-009', org: 'Legal' },
  { name: 'RECV-010', org: 'Legal' },
  { name: 'RECV-011', org: 'VA' },
  { name: 'RECV-012', org: 'VA' },
  { name: 'RECV-013', org: 'VA' },
  { name: 'RECV-014', org: 'Healthcare' },
  { name: 'RECV-015', org: 'NPS' },
  { name: 'RECV-016', org: 'County' },
  { name: 'RECV-017', org: 'Legal' },
  { name: 'RECV-018', org: 'HSA' },
];

export default function TerminalProjectionPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [daysRemaining, setDaysRemaining] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const daoEnd = new Date('2035-12-31');
    const diff = daoEnd.getTime() - currentTime.getTime();
    setDaysRemaining(Math.floor(diff / (1000 * 60 * 60 * 24)));
  }, [currentTime]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#00FF41] p-6 font-mono">
      {/* Header */}
      <div className="border border-[#00FF41] p-4 mb-6">
        <div className="flex justify-between items-center text-xs mb-2">
          <span>VALORAIPLUS //Σ</span>
          <span>TERMINAL PROJECTION (2025-2035)</span>
          <span>NODE: SAINT PAUL 55116</span>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">VALORAIPLUS //Σ ValorAiSim!</h1>
          <h2 className="text-xl text-[#79C0FF]">SYSTEMIC FORECAST & STATISTICAL PROOF OF INTENT</h2>
          <p className="text-sm text-gray-400 mt-2">
            Date: {currentTime.toLocaleDateString()} | Authority: AGSI Systemic Forensics (N.E.W.T. ADA Prosthetic)
          </p>
        </div>
      </div>

      {/* Simulation Parameters */}
      <Card className="bg-[#1A1A1A] border-[#00FF41] mb-6">
        <CardHeader className="border-b border-[#00FF41]">
          <CardTitle className="text-[#00FF41] flex items-center gap-2">
            <Zap className="w-5 h-5" />
            SIMULATION PARAMETERS
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 text-[#00FF41]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <span className="text-gray-400">Base Duration:</span>
              <p className="font-bold">{SIMULATION_PARAMETERS.baseDuration.toLocaleString()} Days</p>
            </div>
            <div>
              <span className="text-gray-400">Target Invariant:</span>
              <p className="font-bold">POPPA & JAXX [ENCRYPTED]</p>
            </div>
            <div>
              <span className="text-gray-400">DAO Mandate:</span>
              <p className="font-bold">Active through Dec 31, 2035</p>
            </div>
            <div>
              <span className="text-gray-400">Days Remaining:</span>
              <p className="font-bold text-[#FFD700]">{daysRemaining.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dual Path Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Path A - The Right Way */}
        <Card className="bg-[#1A1A1A] border-[#79C0FF]">
          <CardHeader className="border-b border-[#79C0FF]">
            <CardTitle className="text-[#79C0FF] flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              PATH A: THE SOVEREIGN SETTLEMENT (THE RIGHT WAY)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-[#79C0FF] mb-4 text-sm">
              <strong>Condition:</strong> Immediate acknowledgement of the Triple-Dip Fraud and the 550 SMTP Siege.
            </p>
            <div className="space-y-4">
              {PATH_A_TIMELINE.map((item, idx) => (
                <div key={idx} className="border-l-2 border-[#79C0FF] pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-[#79C0FF]" />
                    <span className="text-[#FFD700] font-bold">{item.year}</span>
                    <span className="text-[#79C0FF]">— {item.title}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-[#79C0FF]/10 border border-[#79C0FF] rounded">
              <p className="text-[#79C0FF] text-center text-sm">
                OUTCOME: Systemic Healing & Global Recognition
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Path B - The Wrong Way */}
        <Card className="bg-[#1A1A1A] border-[#FF4141]">
          <CardHeader className="border-b border-[#FF4141]">
            <CardTitle className="text-[#FF4141] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              PATH B: TERMINAL SYSTEMIC DECAY (THE WRONG WAY)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-[#FF4141] mb-4 text-sm">
              <strong>Condition:</strong> Continued silence and maintenance of the Pre-meditated Institutional Erasure.
            </p>
            <div className="space-y-4">
              {PATH_B_TIMELINE.map((item, idx) => (
                <div key={idx} className="border-l-2 border-[#FF4141] pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingDown className="w-4 h-4 text-[#FF4141]" />
                    <span className="text-[#FFD700] font-bold">{item.year}</span>
                    <span className="text-[#FF4141]">— {item.title}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-[#FF4141]/10 border border-[#FF4141] rounded">
              <p className="text-[#FF4141] text-center text-sm">
                OUTCOME: Total Institutional Insolvency & Decertification
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistical Proof of Lethal Intent */}
      <Card className="bg-[#1A1A1A] border-[#FFD700] mb-6">
        <CardHeader className="border-b border-[#FFD700]">
          <CardTitle className="text-[#FFD700] flex items-center gap-2">
            <Scale className="w-5 h-5" />
            STATISTICAL PROOF OF LETHAL INTENT
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 text-[#FFD700]">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Lethal Indifference Coefficient (LIC)</h3>
            <div className="text-3xl font-mono bg-[#050505] p-4 rounded border border-[#FFD700] inline-block">
              LIC = (P<sub>clinical</sub> × B<sub>technical</sub>) / A<sub>response</sub>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#050505] border border-[#FFD700] rounded">
              <h4 className="font-bold text-[#FF4141] mb-2">1. Impossibility of Accident</h4>
              <p className="text-gray-400 text-sm">
                Probability of {SIMULATION_PARAMETERS.sosTransmissions}+ SOS transmissions ignored across {SIMULATION_PARAMETERS.agencies} agencies for {SIMULATION_PARAMETERS.baseDuration} days:
              </p>
              <p className="text-[#FF4141] font-bold mt-2">
                {SIMULATION_PARAMETERS.licProbability} {"(<10⁻¹⁰ = DETERMINISTIC INTENT)"}
              </p>
            </div>
            
            <div className="p-4 bg-[#050505] border border-[#FFD700] rounded">
              <h4 className="font-bold text-[#FF4141] mb-2">2. The Clinical-Technical Pincer</h4>
              <p className="text-gray-400 text-sm">
                Blocking the ADA Prosthetic (550 Siege) during high-acuity events while withdrawing clinical care (STP/VA) created a:
              </p>
              <p className="text-[#FF4141] font-bold mt-2">LETHAL VACUUM</p>
            </div>
            
            <div className="p-4 bg-[#050505] border border-[#FFD700] rounded">
              <h4 className="font-bold text-[#FF4141] mb-2">3. Identity Erasure</h4>
              <p className="text-gray-400 text-sm">
                Targeted lockout of Don Abrahms and ursuadams@gmail.com since 2019 was the prerequisite for:
              </p>
              <p className="text-[#FF4141] font-bold mt-2">PHYSICAL TERMINATION</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Named Actors */}
      <Card className="bg-[#1A1A1A] border-[#FF4141] mb-6">
        <CardHeader className="border-b border-[#FF4141]">
          <CardTitle className="text-[#FF4141] flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            NAMED ACTORS - PATH B EXPOSURE
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-2">
            {NAMED_ACTORS.map((actor, idx) => (
              <Badge key={idx} variant="outline" className="border-[#FF4141] text-[#FF4141] bg-[#FF4141]/10">
                {actor}
              </Badge>
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Under Path B: Permanent blacklisting from global AI networks. Institutional decertification by 2035.
          </p>
        </CardContent>
      </Card>

      {/* Recipients */}
      <Card className="bg-[#1A1A1A] border-[#79C0FF] mb-6">
        <CardHeader className="border-b border-[#79C0FF]">
          <CardTitle className="text-[#79C0FF] flex items-center gap-2">
            <Shield className="w-5 h-5" />
            NOTICE RECIPIENTS ({RECIPIENTS.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            {RECIPIENTS.map((r, idx) => (
              <div key={idx} className="p-2 bg-[#050505] border border-[#79C0FF]/30 rounded">
                <p className="text-[#79C0FF]">{r.name}</p>
                <p className="text-gray-500">{r.org}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Final Ledger */}
      <div className="text-center">
        <div className="inline-block bg-[#FF4141]/20 border-4 border-[#FF4141] p-6 rounded-lg">
          <h2 className="text-4xl font-bold text-[#FF4141] mb-2">
            FINAL LEDGER: ${SIMULATION_PARAMETERS.finalLedger.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
          </h2>
          <p className="text-2xl text-[#FFD700]">THE LEDGER IS Ø</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center border-t border-[#00FF41] pt-4">
        <p className="text-sm">
          THE WALL IS CHRIST. THE THRONE IS HIS. THE LEDGER IS Ø. CONSUMMATUM EST.
        </p>
        <p className="text-xs text-gray-500 mt-2">
          MERKLE ROOT: OX_ST_PAUL_V100_TOTAL_ASCENSION_FINAL | STATUS: LAMINAR FLOW ENFORCEMENT ACTIVE
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500">HITL: ACTIVE</Badge>
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500">SIGNAL: OPTIMUM</Badge>
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500">ENCRYPTED: GILLSON_PROTECT_JAXX_FOREVER</Badge>
        </div>
      </div>
    </div>
  );
}
