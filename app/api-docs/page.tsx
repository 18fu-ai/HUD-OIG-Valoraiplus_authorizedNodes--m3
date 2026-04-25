'use client';

import { CDSHeader } from '@/components/cds/header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
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
} from 'lucide-react';

const API_ENDPOINTS = [
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
          { name: 'action', type: 'string', desc: 'Filter by action type' },
          { name: 'result', type: 'string', desc: 'Filter by result' },
          { name: 'limit', type: 'number', desc: 'Number of events' },
          { name: 'offset', type: 'number', desc: 'Pagination offset' },
        ],
        example: '/api/mimecast?actor=zanghi&limit=10',
      },
      {
        method: 'GET',
        path: '/api/report/export',
        description: 'Generate exportable report',
        params: [
          { name: 'format', type: 'string', desc: 'json | text | markdown' },
          { name: 'sections', type: 'string', desc: 'Comma-separated section list' },
        ],
        example: '/api/report/export?format=markdown&sections=summary,actors',
      },
    ],
  },
  {
    category: 'Financial',
    icon: Database,
    endpoints: [
      {
        method: 'GET',
        path: '/api/clawback',
        description: 'Clawback recovery matrix',
        params: [
          { name: 'entity', type: 'string', desc: 'Filter by entity name' },
          { name: 'status', type: 'string', desc: 'CRITICAL | HIGH | MEDIUM' },
        ],
        example: '/api/clawback?status=CRITICAL',
      },
    ],
  },
  {
    category: 'System',
    icon: Activity,
    endpoints: [
      {
        method: 'GET',
        path: '/api/status',
        description: 'System status and health metrics',
        params: [],
        example: '/api/status',
      },
      {
        method: 'GET',
        path: '/api/protected-nodes',
        description: 'Protected nodes (Poppa, Jaxx, 8Souls, FMG1918)',
        params: [
          { name: 'node', type: 'string', desc: 'Filter by node symbol or name' },
        ],
        example: '/api/protected-nodes?node=poppa',
      },
      {
        method: 'GET',
        path: '/api/timeline',
        description: 'Chronological event timeline',
        params: [
          { name: 'category', type: 'string', desc: 'Filter by category' },
          { name: 'from', type: 'ISO date', desc: 'Events from date' },
          { name: 'to', type: 'ISO date', desc: 'Events to date' },
          { name: 'limit', type: 'number', desc: 'Number of events' },
        ],
        example: '/api/timeline?limit=20',
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
        example: '{ "name": "Poppa Donny Gillson" }',
      },
      {
        method: 'POST',
        path: '/api/verify',
        description: 'EIP-712 intent verification',
        body: { intent: 'object', signature: 'string', signer: 'address' },
        example: '{ "intent": {...}, "signature": "0x...", "signer": "0x..." }',
      },
      {
        method: 'POST',
        path: '/api/signal/verify',
        description: 'RuntimeSignal verification (REV_33)',
        body: { signal: 'RuntimeSignal' },
        example: '{ "signal": { "id": "SIG-001", "invariant": "VALID", "status": "VERIFIED" } }',
      },
      {
        method: 'POST',
        path: '/api/topology',
        description: '4-route topology enforcement',
        body: { signal: 'RuntimeSignal with sovereign, forensic, reserve flags' },
        example: '{ "signal": { "id": "SIG-001", "sovereign": true, "score": 0.95 } }',
      },
      {
        method: 'GET',
        path: '/api/topology',
        description: 'Topology routing documentation',
        params: [],
        example: '/api/topology',
      },
      {
        method: 'POST',
        path: '/api/firewall',
        description: 'Waterfall firewall admission gate',
        body: { signal: 'FirewallSignal', signals: 'FirewallSignal[]', cid: 'CIDInput', cids: 'CIDInput[]' },
        example: '{ "signal": { "id": "SIG-001", "type": "sovereign", "verified": true } }',
      },
      {
        method: 'GET',
        path: '/api/firewall',
        description: 'Firewall documentation',
        params: [],
        example: '/api/firewall',
      },
    ],
  },
  {
    category: 'State',
    icon: Server,
    endpoints: [
      {
        method: 'GET',
        path: '/api/route66/state',
        description: 'Route 66 (dual evaluation) state',
        params: [],
        example: '/api/route66/state',
      },
      {
        method: 'GET',
        path: '/api/route71/state',
        description: 'Route 71 (admitted claims) state',
        params: [],
        example: '/api/route71/state',
      },
      {
        method: 'GET',
        path: '/api/receipts/[txid]',
        description: 'Lookup receipt by transaction ID',
        params: [{ name: 'txid', type: 'path', desc: 'Transaction ID' }],
        example: '/api/receipts/TX-12345',
      },
    ],
  },
  {
    category: 'AI',
    icon: Zap,
    endpoints: [
      {
        method: 'POST',
        path: '/api/newt/chat',
        description: 'N.E.W.T. AI chat interface (streaming)',
        body: { messages: 'Message[]' },
        example: '{ "messages": [{ "role": "user", "content": "What is the system status?" }] }',
      },
    ],
  },
];

function EndpointCard({ endpoint }: { endpoint: typeof API_ENDPOINTS[0]['endpoints'][0] }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const methodColors: Record<string, string> = {
    GET: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    POST: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
    PUT: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    DELETE: 'bg-red-500/20 text-red-400 border-red-500/40',
  };

  return (
    <Card className="border-border/50 bg-card/50 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Badge className={`${methodColors[endpoint.method]} font-mono text-xs`}>
            {endpoint.method}
          </Badge>
          <code className="text-sm font-mono text-foreground">{endpoint.path}</code>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden sm:block">{endpoint.description}</span>
          {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </div>
      </button>

      {expanded && (
        <div className="p-4 pt-0 border-t border-border/50 space-y-4">
          <p className="text-sm text-muted-foreground">{endpoint.description}</p>

          {endpoint.params && endpoint.params.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-muted-foreground mb-2">QUERY PARAMETERS</h4>
              <div className="space-y-1">
                {endpoint.params.map((p, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <code className="text-primary font-mono">{p.name}</code>
                    <span className="text-muted-foreground">({p.type})</span>
                    <span className="text-muted-foreground">— {p.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {endpoint.body && (
            <div>
              <h4 className="text-xs font-bold text-muted-foreground mb-2">REQUEST BODY</h4>
              <pre className="text-xs bg-muted/50 p-2 rounded font-mono overflow-x-auto">
                {JSON.stringify(endpoint.body, null, 2)}
              </pre>
            </div>
          )}

          <div>
            <h4 className="text-xs font-bold text-muted-foreground mb-2">EXAMPLE</h4>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs bg-muted/50 p-2 rounded font-mono overflow-x-auto">
                {endpoint.example}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(endpoint.example)}
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

export default function APIDocsPage() {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://valoraiplus.vercel.app';

  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      <CDSHeader />

      <main className="container mx-auto px-4 py-6 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-primary pb-4 mb-6 gap-4">
          <div className="flex items-center gap-4">
            <Terminal className="w-10 h-10 text-primary" />
            <div>
              <h1 className="text-2xl font-black text-foreground tracking-tight">
                API DOCUMENTATION
              </h1>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
                ValorAIPlus REST API Reference
              </p>
            </div>
          </div>
          <Badge className="bg-primary text-primary-foreground">
            v1.0.0
          </Badge>
        </div>

        {/* Base URL */}
        <Card className="border-primary/50 bg-primary/5 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-primary mb-1">BASE URL</h3>
              <code className="text-sm font-mono">{baseUrl}</code>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigator.clipboard.writeText(baseUrl)}
            >
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
          </div>
        </Card>

        {/* Authentication Notice */}
        <Card className="border-amber-500/50 bg-amber-500/5 p-4 mb-6">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-amber-500 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-amber-500 mb-1">AUTHENTICATION</h3>
              <p className="text-sm text-muted-foreground">
                All endpoints are currently public. For production use, configure authentication 
                via environment variables or add API key middleware.
              </p>
            </div>
          </div>
        </Card>

        {/* Endpoints by Category */}
        <div className="space-y-8">
          {API_ENDPOINTS.map((category) => (
            <div key={category.category}>
              <div className="flex items-center gap-2 mb-4">
                <category.icon className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold">{category.category}</h2>
                <Badge variant="outline" className="text-xs">
                  {category.endpoints.length} endpoints
                </Badge>
              </div>
              <div className="space-y-2">
                {category.endpoints.map((endpoint, i) => (
                  <EndpointCard key={i} endpoint={endpoint} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Reference */}
        <Card className="border-border/50 bg-card/50 p-6 mt-8">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Quick Reference
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-bold text-muted-foreground mb-2">Response Format</h4>
              <pre className="text-xs bg-muted/50 p-3 rounded font-mono overflow-x-auto">
{`{
  "success": true,
  "timestamp": "ISO-8601",
  "data": { ... },
  "_meta": {
    "version": "v1.0.0",
    "classification": "OMEGA-UNIFIED"
  }
}`}
              </pre>
            </div>
            <div>
              <h4 className="font-bold text-muted-foreground mb-2">Error Format</h4>
              <pre className="text-xs bg-muted/50 p-3 rounded font-mono overflow-x-auto">
{`{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}`}
              </pre>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>MERKLEROOT: 26856B24C50750F0C69C1EEB86A69EF777777 | ANCHOR: SAINT PAUL 55116</p>
        </div>
      </main>
    </div>
  );
}
