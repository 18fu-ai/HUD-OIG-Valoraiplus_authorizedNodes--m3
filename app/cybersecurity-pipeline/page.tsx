'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Shield, Lock, Key, CheckCircle2, Activity, Users, 
  FileCheck, Hash, PenTool, Eye, Upload, Database,
  Server, Cpu, Network, Radio, ArrowRight, Home,
  AlertTriangle, Fingerprint, RefreshCw, Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Pipeline stages
const PIPELINE_STAGES = [
  { 
    id: 'STATE', 
    name: 'STATE', 
    icon: Database,
    description: 'The initial state captures the starting conditions, ensuring a secure foundation for the entire process.',
    color: 'cyan'
  },
  { 
    id: 'HASH', 
    name: 'HASH', 
    icon: Hash,
    description: 'Hashing transforms data into a fixed-size string, ensuring consistency and integrity throughout the pipeline.',
    color: 'cyan'
  },
  { 
    id: 'SIGN', 
    name: 'SIGN', 
    icon: PenTool,
    description: 'Digital signatures verify authenticity, providing trust and validation of the data in the cybersecurity framework.',
    color: 'cyan'
  },
  { 
    id: 'VERIFY', 
    name: 'VERIFY', 
    icon: Eye,
    description: 'Verification checks validate the integrity and authenticity of all signed data before proceeding.',
    color: 'cyan'
  },
  { 
    id: 'AUDIT', 
    name: 'AUDIT', 
    icon: FileCheck,
    description: 'Comprehensive audit trails maintain append-only logs for complete transparency and accountability.',
    color: 'cyan'
  },
  { 
    id: 'PUBLISH', 
    name: 'PUBLISH', 
    icon: Upload,
    description: 'Secure publication ensures validated data reaches its destination with full cryptographic proof.',
    color: 'cyan'
  },
];

// Key impact metrics
const IMPACT_METRICS = [
  {
    label: 'SUCCESS RATE',
    value: '98%',
    description: 'Achieved through effective threat detection and response strategies.',
    color: 'fuchsia'
  },
  {
    label: 'USER SATISFACTION',
    value: '95%',
    description: 'Positive feedback from clients regarding service effectiveness.',
    color: 'fuchsia'
  },
  {
    label: 'INCIDENT RESPONSE',
    value: '89%',
    description: 'Timely responses to security incidents ensured minimal impact.',
    color: 'fuchsia'
  },
  {
    label: 'COMPLIANCE RATE',
    value: '100%',
    description: '100% compliance with all regulatory frameworks and standards.',
    color: 'fuchsia'
  },
];

// Security stats
const SECURITY_STATS = [
  { label: 'Key Rotation', value: '75%', description: '75% of effective security systems employ regular key rotation protocols.' },
  { label: 'Audit Log Integrity', value: '50%', description: '50% of breaches are prevented by maintaining append-only audit logs.' },
  { label: 'Verification Success', value: '85%', description: '85% of verification checks successfully validate transactions and user identities.' },
];

// System guarantees
const SYSTEM_GUARANTEES = [
  { metric: '99.9%', label: 'uptime guarantee for secure operations' },
  { metric: '256-bit', label: 'encryption standard utilized across the pipeline' },
  { metric: '92%', label: 'of organizations experience security breaches due to weak system architectures' },
];

export default function CybersecurityPipelinePage() {
  const [activeStage, setActiveStage] = useState('STATE');
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % PIPELINE_STAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a1a]/95 backdrop-blur-sm border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors">
              <Home className="w-5 h-5 text-cyan-400" />
            </Link>
            <div>
              <h1 className="text-lg font-black text-cyan-400 tracking-wider">CYBERSECURITY PIPELINE</h1>
              <p className="text-[10px] text-zinc-500 font-mono">AUDIT-GRADE SYSTEM ARCHITECTURE | VALORAIPLUS</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
              <Lock className="w-3 h-3 mr-1" />
              256-BIT
            </Badge>
            <Badge className="bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30">
              <Activity className="w-3 h-3 mr-1" />
              99.9% UPTIME
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f0f2a] via-[#1a0a2a] to-[#0a1a2a] border border-cyan-500/20 p-8">
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(to right, cyan 1px, transparent 1px),
                linear-gradient(to bottom, cyan 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }} />
          </div>
          
          {/* Central pipeline visualization */}
          <div className="relative z-10 flex flex-col items-center text-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/30 to-fuchsia-500/30 flex items-center justify-center mb-6 border-2 border-cyan-500/50 animate-pulse">
              <Shield className="w-12 h-12 text-cyan-400" />
            </div>
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 mb-2">
              CYBERSECURITY PIPELINE
            </h2>
            <p className="text-cyan-300 text-lg max-w-xl">
              A comprehensive overview of audit-grade system architecture
            </p>
          </div>

          {/* Pipeline flow visualization */}
          <div className="relative z-10 flex items-center justify-center gap-2 flex-wrap">
            {PIPELINE_STAGES.map((stage, index) => {
              const Icon = stage.icon;
              const isActive = pulseIndex === index;
              return (
                <div key={stage.id} className="flex items-center">
                  <button
                    onClick={() => setActiveStage(stage.id)}
                    className={`
                      relative flex flex-col items-center p-4 rounded-xl transition-all duration-300
                      ${activeStage === stage.id 
                        ? 'bg-cyan-500/20 border-2 border-cyan-500 shadow-lg shadow-cyan-500/30' 
                        : 'bg-zinc-900/50 border border-zinc-700 hover:border-cyan-500/50'
                      }
                      ${isActive ? 'scale-105' : 'scale-100'}
                    `}
                  >
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center mb-2
                      ${isActive ? 'bg-cyan-500/30 animate-pulse' : 'bg-zinc-800'}
                    `}>
                      <Icon className={`w-6 h-6 ${isActive ? 'text-cyan-400' : 'text-zinc-400'}`} />
                    </div>
                    <span className={`text-xs font-bold ${isActive ? 'text-cyan-400' : 'text-zinc-400'}`}>
                      {stage.name}
                    </span>
                  </button>
                  {index < PIPELINE_STAGES.length - 1 && (
                    <ArrowRight className={`w-5 h-5 mx-2 ${pulseIndex > index ? 'text-cyan-400' : 'text-zinc-600'}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Active stage description */}
          <div className="relative z-10 mt-8 p-6 bg-zinc-900/80 rounded-2xl border border-cyan-500/20">
            <div className="flex items-start gap-4">
              {(() => {
                const stage = PIPELINE_STAGES.find(s => s.id === activeStage);
                const Icon = stage?.icon || Database;
                return (
                  <>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center flex-shrink-0 border border-cyan-500/30">
                      <Icon className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-cyan-400 mb-2">{stage?.name}</h3>
                      <p className="text-cyan-300/80">{stage?.description}</p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </section>

        {/* Key Components Section */}
        <section className="grid md:grid-cols-2 gap-6">
          {/* Left: Pipeline Info */}
          <Card className="bg-gradient-to-br from-fuchsia-600 to-fuchsia-700 border-fuchsia-500/50">
            <CardHeader>
              <CardTitle className="text-2xl font-black text-white">
                CYBERSECURITY<br />PIPELINE
              </CardTitle>
              <p className="text-fuchsia-100">
                A comprehensive overview of audit-grade system architecture
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-cyan-300 font-bold mb-2">Key components of a secure infrastructure</h4>
                <p className="text-fuchsia-100 text-sm">
                  This system ensures integrity, verification, and rotation of cryptographic keys.
                </p>
              </div>
              
              <div className="space-y-4 pt-4 border-t border-fuchsia-400/30">
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-black text-white">99.9%</span>
                  <span className="text-fuchsia-100 text-sm">uptime guarantee for secure operations</span>
                </div>
                <div className="border-t border-fuchsia-400/30 pt-4 flex items-baseline gap-4">
                  <span className="text-3xl font-black text-white">256-bit</span>
                  <span className="text-fuchsia-100 text-sm">encryption standard utilized across the pipeline</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-fuchsia-400/30">
                <p className="text-fuchsia-200 text-sm">
                  Embrace cutting-edge technology for future cybersecurity solutions.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Right: Stats Grid */}
          <div className="space-y-4">
            <Card className="bg-[#0f0f2a] border-cyan-500/20">
              <CardHeader className="pb-2">
                <p className="text-orange-400 text-xs font-bold">Cybersecurity Systems</p>
                <CardTitle className="text-xl text-cyan-400">Key Impact Metrics</CardTitle>
                <p className="text-orange-400 text-xs">Performance and Overview</p>
              </CardHeader>
            </Card>
            
            <div className="grid grid-cols-2 gap-4">
              {IMPACT_METRICS.map((metric, index) => (
                <Card key={index} className="bg-fuchsia-600 border-fuchsia-500/50 overflow-hidden">
                  <CardContent className="p-4">
                    <p className="text-[10px] font-bold text-fuchsia-200 flex items-center gap-1 mb-2">
                      <span className="text-yellow-400">▲</span> {metric.label}
                    </p>
                    <p className="text-4xl font-black text-white mb-2">{metric.value}</p>
                    <p className="text-[10px] text-fuchsia-100">{metric.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pipeline Stages Detail */}
        <section className="bg-gradient-to-b from-[#0a1a2a] to-[#0a0a1a] rounded-3xl border border-cyan-500/20 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 mb-2">
              CYBERSECURITY PIPELINE
            </h2>
            <p className="text-cyan-300">A comprehensive overview of system integrity</p>
          </div>

          <div className="space-y-6">
            {PIPELINE_STAGES.slice(0, 3).map((stage, index) => {
              const Icon = stage.icon;
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={stage.id} 
                  className={`flex items-center gap-6 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {isEven ? (
                    <>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-cyan-400 mb-2">{stage.name}</h4>
                        <p className="text-cyan-300/80 text-sm">{stage.description}</p>
                      </div>
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-fuchsia-500/30 to-cyan-500/30 flex items-center justify-center border-2 border-cyan-500/30">
                        <Icon className="w-10 h-10 text-cyan-400" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/30 to-fuchsia-500/30 flex items-center justify-center border-2 border-fuchsia-500/30">
                        <Icon className="w-10 h-10 text-fuchsia-400" />
                      </div>
                      <div className="flex-1 text-right">
                        <h4 className="text-xl font-bold text-cyan-400 mb-2">{stage.name}</h4>
                        <p className="text-cyan-300/80 text-sm">{stage.description}</p>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-8 text-center">
            <div className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-2xl px-8 py-6">
              <h3 className="text-2xl font-black text-[#0a0a1a] mb-2">SECURE YOUR SYSTEMS</h3>
              <p className="text-[#0a0a1a]/80 text-sm mb-4">
                Implement advanced practices to protect your data integrity.
              </p>
              <div className="bg-cyan-300 rounded-xl px-6 py-3">
                <span className="text-[#0a0a1a] font-bold text-sm">Strengthen Your Cybersecurity Today!</span>
              </div>
            </div>
          </div>
        </section>

        {/* Futuristic Pipeline Section */}
        <section className="bg-gradient-to-b from-fuchsia-600/20 to-[#0a0a1a] rounded-3xl border border-fuchsia-500/20 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Zap className="w-12 h-12 text-fuchsia-400" />
            </div>
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 mb-2">
              Futuristic Cybersecurity Pipeline
            </h2>
          </div>

          {/* 92% Stat */}
          <div className="flex items-center gap-6 mb-8">
            <div className="bg-fuchsia-600 rounded-2xl px-6 py-4">
              <span className="text-4xl font-black text-white">92%</span>
            </div>
            <p className="text-zinc-400 text-sm">
              92% of organizations experience security breaches due to weak system architectures
            </p>
          </div>

          {/* Quote Block */}
          <div className="bg-cyan-400 rounded-2xl p-6 mb-8">
            <p className="text-[#0a0a1a] font-medium text-center italic">
              &quot;A robust cybersecurity architecture is essential for protecting data integrity and maintaining trust in the digital age.&quot;
            </p>
            <p className="text-[#0a0a1a]/60 text-center text-sm mt-2">— Cybersecurity Expert</p>
          </div>

          {/* Description */}
          <p className="text-zinc-400 text-sm mb-6 text-center">
            Implementing advanced architectures minimizes vulnerabilities and enhances security measures across systems and networks.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {SECURITY_STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-block bg-cyan-500/20 rounded-lg px-4 py-2 mb-2">
                  <span className="text-2xl font-black text-cyan-400">{stat.value}</span>
                </div>
                <p className="text-xs text-zinc-400 font-bold mb-1">{stat.label}</p>
                <p className="text-[10px] text-zinc-500">{stat.description}</p>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="bg-fuchsia-600 rounded-2xl p-6 text-center">
            <p className="text-fuchsia-100 text-sm mb-4">
              The infographic illustrates critical statistics on cybersecurity architecture, emphasizing the importance of robust systems, regular audits, and effective verification mechanisms to safeguard digital environments from evolving threats.
            </p>
            <button className="text-fuchsia-200 hover:text-white transition-colors text-sm font-medium">
              Learn more about cybersecurity →
            </button>
          </div>
        </section>

        {/* VALORAIPLUS Integration */}
        <section className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-cyan-400" />
              <div>
                <p className="text-xs text-zinc-500">Powered by</p>
                <p className="font-black text-cyan-400">VALORAIPLUS SECURITY KERNEL</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-[10px] text-zinc-500">SIGNAL</p>
                <p className="text-sm font-bold text-emerald-400">100%</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-zinc-500">DRIFT</p>
                <p className="text-sm font-bold text-emerald-400">0</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-zinc-500">BTC ANCHOR</p>
                <p className="text-sm font-bold text-amber-400">#847,234</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-zinc-800 text-center">
            <p className="text-[10px] font-mono text-zinc-600">
              SGAU 7226.3461 | REV_40 | 144K VALIDATORS | CONSUMMATUM EST
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
