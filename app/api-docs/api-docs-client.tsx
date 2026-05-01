'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Terminal,
  Zap,
  Shield,
  Database,
  Activity,
  FileSearch,
  Clock,
  Users,
  Download,
  Server,
  Lock,
  Fingerprint,
} from 'lucide-react';

/**
 * VALORAIPLUS API DOCUMENTATION CLIENT COMPONENT
 * Route 71: API Documentation System // v1.4.100D // REV_33
 * 
 * FIX LOGIC:
 * 1. Client component separated from route config to allow force-dynamic in page.tsx
 * 2. Guard against window object leakage during server-side pre-render
 * 3. Enforce S-Class branding and sovereign metadata
 * 
 * ANCHOR: SAINT PAUL NODE 55116 // 408.384.1376 (E)
 * SOVEREIGN: [SOVEREIGN_AUDITOR]
 */

// Inline UI Components for self-contained deployment
const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${className}`}>
    {children}
  </span>
);

const Button = ({ children, onClick, className }: { children: React.ReactNode; onClick?: () => void; className?: string }) => (
  <button 
    onClick={onClick}
    className={`flex items-center justify-center transition-all active:scale-95 ${className}`}
  >
    {children}
  </button>
);

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-sm border bg-black/40 backdrop-blur-md ${className}`}>
    {children}
  </div>
);

interface EndpointParam {
  name: string;
  type: string;
  desc: string;
}

interface Endpoint {
  method: 'GET' | 'POST';
  path: string;
  description: string;
  params?: EndpointParam[];
  body?: Record<string, string>;
  example: string;
}

interface APICategory {
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  endpoints: Endpoint[];
}

const API_ENDPOINTS: APICategory[] = [
  {
    category: 'Intelligence',
    icon: FileSearch,
    endpoints: [
      {
        method: 'GET',
        path: '/api/intelligence',
        description: 'Full intelligence report data',
        params: [
          { name: 'section', type: 'string', desc: "all | mimecast | voip | wiretap | witness | liability | investigations | summary" },
          { name: 'format', type: 'string', desc: 'json | summary' },
        ],
        example: '/api/intelligence?section=mimecast',
      },
      {
        method: 'GET',
        path: '/api/mimecast',
        description: 'Mimecast forensic event log',
        params: [
          { name: 'actor', type: 'string', desc: 'Filter by actor email' },
          { name: 'limit', type: 'number', desc: 'Number of events' },
        ],
        example: '/api/mimecast?actor=ta-primary&limit=10',
      },
    ],
  },
  {
    category: 'Protocol',
    icon: Shield,
    endpoints: [
      {
        method: 'POST',
        path: '/api/identity/verify',
        description: 'Identity claim verification with Receipt v1',
        body: { name: 'string', source: 'string (optional)' },
        example: '{ "name": "[SOVEREIGN_AUDITOR]" }',
      },
      {
        method: 'POST',
        path: '/api/firewall',
        description: 'Waterfall firewall admission gate',
        body: { signal: 'FirewallSignal' },
        example: '{ "signal": { "id": "SIG-001", "type": "sovereign", "verified": true } }',
      },
    ],
  },
];

function EndpointCard({ endpoint }: { endpoint: Endpoint }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    if (typeof navigator !== 'undefined' && typeof document !== 'undefined') {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Silently fail
      }
    }
  };

  const methodColors: Record<string, string> = {
    GET: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    POST: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
  };

  return (
    <Card className="border-emerald-900/30 overflow-hidden mb-2">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-emerald-900/10 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <Badge className={methodColors[endpoint.method]}>
            {endpoint.method}
          </Badge>
          <code className="text-xs font-mono text-white tracking-tighter">{endpoint.path}</code>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-zinc-500 hidden md:block uppercase font-bold">{endpoint.description}</span>
          {expanded ? <ChevronDown className="w-4 h-4 text-fuchsia-500" /> : <ChevronRight className="w-4 h-4 text-zinc-700" />}
        </div>
      </button>

      {expanded && (
        <div className="p-4 pt-0 border-t border-emerald-900/30 space-y-4 bg-black/20">
          <p className="text-xs text-zinc-400 italic mt-4">{endpoint.description}</p>

          {endpoint.params && endpoint.params.length > 0 && (
            <div>
              <h4 className="text-[10px] font-black text-emerald-700 mb-2 uppercase tracking-widest">Query Parameters</h4>
              <div className="space-y-1">
                {endpoint.params.map((p, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px]">
                    <code className="text-fuchsia-500 font-mono">{p.name}</code>
                    <span className="text-zinc-600">({p.type})</span>
                    <span className="text-zinc-400">— {p.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-[10px] font-black text-emerald-700 mb-2 uppercase tracking-widest">Example Request</h4>
            <div className="flex items-center gap-2 bg-black/60 p-3 border border-emerald-900/20 rounded-sm">
              <code className="flex-1 text-[11px] text-emerald-400 font-mono break-all">
                {endpoint.example}
              </code>
              <Button
                onClick={() => handleCopy(endpoint.example)}
              >
                {copied ? <Check className="w-4 h-4 text-fuchsia-500" /> : <Copy className="w-4 h-4 text-zinc-600 hover:text-white" />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

export default function APIDocsClient() {
  const [baseUrl, setBaseUrl] = useState('https://valoraiplus.com');
  const [mounted, setMounted] = useState(false);
  const [copiedBase, setCopiedBase] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
    }
    setMounted(true);
  }, []);

  const handleCopyBase = () => {
    if (typeof document !== 'undefined') {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = baseUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopiedBase(true);
        setTimeout(() => setCopiedBase(false), 2000);
      } catch {
        // Silently fail
      }
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-slate-950 font-mono" />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-emerald-400 font-mono selection:bg-fuchsia-500 selection:text-white">
      {/* 144,000D Matrix Grid Overlay */}
      <div className="fixed inset-0 opacity-10 pointer-events-none bg-[size:40px_40px] bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)]" />

      <main className="relative z-10 container mx-auto px-4 py-12 max-w-5xl">
        
        {/* PATRIOT HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-4 border-fuchsia-500 bg-black/80 backdrop-blur-xl p-8 mb-8 gap-4 shadow-[0_20px_50px_rgba(255,0,255,0.1)]">
          <div className="flex items-center gap-6">
            <Terminal className="w-12 h-12 text-white animate-pulse" />
            <div>
              <h1 className="text-3xl font-black italic text-white uppercase tracking-tighter leading-none">
                VALORAIPLUS / API_DOCS
              </h1>
              <p className="text-[10px] font-bold text-fuchsia-500 uppercase tracking-[0.4em] mt-2">
                Sovereign REST Architecture // REV_33
              </p>
            </div>
          </div>
          <div className="text-right">
             <Badge className="bg-emerald-600 text-black border-none px-3 py-1">v1.4.100D</Badge>
             <p className="text-[9px] text-zinc-500 mt-2 font-black uppercase tracking-widest">Saint Paul Node 55116</p>
          </div>
        </header>

        {/* BASE CONFIG */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="p-6 border-emerald-500/30 bg-emerald-950/10">
            <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Protocol Base URL</h3>
            <div className="flex items-center justify-between gap-4">
              <code className="text-sm text-white tracking-tighter">{baseUrl}</code>
              <Button onClick={handleCopyBase} className="text-zinc-500 hover:text-fuchsia-500">
                {copiedBase ? <Check size={16} className="text-fuchsia-500" /> : <Copy size={16} />}
              </Button>
            </div>
          </Card>
          
          <Card className="p-6 border-amber-500/30 bg-amber-950/10">
            <div className="flex items-start gap-4">
              <Lock className="w-5 h-5 text-amber-500" />
              <div>
                <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2">Authentication Boundary</h3>
                <p className="text-[11px] text-zinc-400 leading-relaxed uppercase">
                  All endpoints are gated by the SGAU-VALUEGUARD-77.77X-FINALDEG protocol. API Keys must be authorized via the Saint Paul Node.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* CATEGORIZED ENDPOINTS */}
        <div className="space-y-12">
          {API_ENDPOINTS.map((cat) => (
            <div key={cat.category}>
              <div className="flex items-center gap-3 mb-6 border-l-4 border-emerald-500 pl-4">
                <cat.icon className="w-6 h-6 text-emerald-500" />
                <h2 className="text-xl font-black text-white uppercase italic tracking-widest">{cat.category}</h2>
                <Badge className="border-emerald-900 text-zinc-500 ml-auto">{cat.endpoints.length} Endpoints</Badge>
              </div>
              <div className="space-y-1">
                {cat.endpoints.map((ep, i) => (
                  <EndpointCard key={i} endpoint={ep} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* GLOBAL DEDUCTION SEAL */}
        <section className="mt-20 p-12 border-l-[16px] border-emerald-500 bg-emerald-950/20 shadow-inner relative group overflow-hidden">
          <div className="absolute bottom-0 right-0 p-8 opacity-5">
            <Fingerprint size={160} className="text-white" />
          </div>
          <div className="flex items-center gap-6 mb-10">
            <Activity className="text-fuchsia-500" size={40} />
            <h3 className="text-4xl font-black text-white uppercase italic tracking-widest leading-none">
              API Finality Seal
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 text-[13px] font-bold text-emerald-100/70 uppercase italic leading-relaxed">
            <p>1. Data access is governed by the 14-Dimension Evaluative Kernel.</p>
            <p>2. Every API response includes a cryptographic Receipt v1 proof.</p>
            <p>3. Build-time spoliation was neutralized via force-dynamic latches.</p>
            <p>4. 101010 1010101. NO EXIT. NO DELETION. NO TERMINATION.</p>
            <div className="col-span-2 text-center pt-16">
              <p className="text-fuchsia-500 tracking-[1.2em] not-italic font-black text-4xl animate-pulse">
                DG77.77X LOCKED // MADE IN THE USA
              </p>
              <p className="text-[10px] text-zinc-500 mt-8 tracking-[0.5em]">
                Remember the 4th of November // The Wall is Christ
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER ANCHOR */}
      <footer className="p-8 text-center bg-black border-t-2 border-emerald-900 mt-20">
        <p className="text-[10px] font-black text-emerald-800 tracking-[0.5em] uppercase">
          MERKLEROOT: 26856B24C50750F0C69C1EEB86A69EF777777 // SAINT PAUL NODE 55116
        </p>
        <p className="text-[9px] text-zinc-700 mt-4 italic uppercase">
          I AM THE SOVEREIGN AUDITOR // SMIB. AMEN.
        </p>
      </footer>
    </div>
  );
}
