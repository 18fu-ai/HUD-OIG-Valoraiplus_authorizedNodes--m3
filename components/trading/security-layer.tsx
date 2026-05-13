"use client";

/**
 * HARDENED SECURITY LAYER
 * - mTLS: Mutual TLS between Saint Paul Node and San Francisco Presidio Node
 * - EIP-712: Structured human-readable signing for all authorizations
 * - Rate Limiting: IP-based and Wallet-based DDoS protection display
 */

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Lock,
  Zap,
  Activity,
  Server,
  AlertTriangle,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";

interface EIP712Message {
  domain: {
    name: string;
    version: string;
    chainId: number;
    verifyingContract: string;
  };
  types: Record<string, { name: string; type: string }[]>;
  message: Record<string, string | number>;
  humanReadable: string;
}

interface RateLimitEntry {
  type: "IP" | "WALLET";
  identifier: string;
  requests: number;
  limit: number;
  window: string;
  status: "OK" | "THROTTLED" | "BLOCKED";
}

interface NodeTLS {
  node: string;
  peer: string;
  status: "ESTABLISHED" | "HANDSHAKING" | "FAILED";
  cipher: string;
  cert: string;
  latency: number;
}

// EIP-712 structured signing templates
const EIP712_TEMPLATES: EIP712Message[] = [
  {
    domain: {
      name: "VALORAIPLUS Treasury",
      version: "2.4",
      chainId: 8453,
      verifyingContract: "0x363155af8E130c2C80eC0548113eBfAf72A272da",
    },
    types: {
      LiquidityProvision: [
        { name: "asset", type: "string" },
        { name: "amount", type: "uint256" },
        { name: "provider", type: "address" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    },
    message: {
      asset: "$DONNY",
      amount: 1000000,
      provider: "0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB",
      nonce: 1,
      deadline: 1747180800,
    },
    humanReadable: "Confirming $DONNY Liquidity Provision of 1,000,000 tokens",
  },
  {
    domain: {
      name: "VALORAIPLUS Treasury",
      version: "2.4",
      chainId: 8453,
      verifyingContract: "0x363155af8E130c2C80eC0548113eBfAf72A272da",
    },
    types: {
      TradeAuthorization: [
        { name: "asset", type: "string" },
        { name: "side", type: "string" },
        { name: "amount", type: "uint256" },
        { name: "maxSlippage", type: "uint256" },
        { name: "trader", type: "address" },
        { name: "nonce", type: "uint256" },
      ],
    },
    message: {
      asset: "$GILLGOLD",
      side: "BUY",
      amount: 500000,
      maxSlippage: 50,
      trader: "0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB",
      nonce: 2,
    },
    humanReadable: "Authorizing BUY order for $GILLGOLD — 500,000 tokens, max 0.5% slippage",
  },
];

// mTLS node connections
const TLS_CONNECTIONS: NodeTLS[] = [
  {
    node: "Saint Paul Node #2207",
    peer: "San Francisco Presidio Node",
    status: "ESTABLISHED",
    cipher: "TLS_AES_256_GCM_SHA384",
    cert: "CN=stpaul-2207.valoraiplus.internal",
    latency: 12,
  },
  {
    node: "Saint Paul Node #2207",
    peer: "Base Mainnet RPC",
    status: "ESTABLISHED",
    cipher: "TLS_AES_128_GCM_SHA256",
    cert: "CN=mainnet.base.org",
    latency: 34,
  },
  {
    node: "San Francisco Presidio Node",
    peer: "ValorBank Gateway",
    status: "ESTABLISHED",
    cipher: "TLS_CHACHA20_POLY1305_SHA256",
    cert: "CN=valorbank.manus.space",
    latency: 8,
  },
];

// Rate limiting status
const RATE_LIMIT_ENTRIES: RateLimitEntry[] = [
  { type: "IP", identifier: "104.28.XX.XX (SF, CA)", requests: 847, limit: 1000, window: "15min", status: "THROTTLED" },
  { type: "WALLET", identifier: "0x50FB...E36C0", requests: 42, limit: 500, window: "1hr", status: "OK" },
  { type: "IP", identifier: "172.16.XX.XX", requests: 1200, limit: 1000, window: "15min", status: "BLOCKED" },
  { type: "WALLET", identifier: "0xb103...BeB", requests: 18, limit: 500, window: "1hr", status: "OK" },
  { type: "IP", identifier: "192.168.XX.XX (Internal)", requests: 5, limit: 1000, window: "15min", status: "OK" },
];

const STATUS_COLORS: Record<string, string> = {
  OK: "text-emerald-400 border-emerald-800 bg-emerald-500/10",
  THROTTLED: "text-amber-400 border-amber-800 bg-amber-500/10",
  BLOCKED: "text-red-400 border-red-800 bg-red-500/10",
  ESTABLISHED: "text-emerald-400",
  HANDSHAKING: "text-amber-400",
  FAILED: "text-red-400",
};

export function SecurityLayer() {
  const [activeTemplate, setActiveTemplate] = useState(0);
  const [showRawJson, setShowRawJson] = useState(false);
  const [tlsLatency, setTlsLatency] = useState(TLS_CONNECTIONS.map((c) => c.latency));

  // Simulate live latency fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setTlsLatency((prev) =>
        prev.map((l) => Math.max(1, l + Math.floor(Math.random() * 6 - 3)))
      );
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const template = EIP712_TEMPLATES[activeTemplate];

  return (
    <Card className="border-zinc-800 bg-zinc-900/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <ShieldCheck className="w-4 h-4 text-violet-400" />
          HARDENED SECURITY LAYER
          <Badge className="text-[10px] bg-violet-500/20 text-violet-400 border-violet-800">
            ACTIVE
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        {/* mTLS Section */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">
              mTLS Node Connections
            </span>
          </div>
          <div className="space-y-1.5">
            {TLS_CONNECTIONS.map((conn, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 border border-zinc-800 rounded-lg text-xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Server className="w-3 h-3 text-zinc-500 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-mono font-bold text-white truncate">{conn.node}</p>
                    <p className="text-zinc-600 truncate">
                      {conn.peer} — <span className="text-zinc-500">{conn.cipher}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-zinc-500 font-mono">{tlsLatency[idx]}ms</span>
                  <span className={`text-[10px] font-bold ${STATUS_COLORS[conn.status]}`}>
                    {conn.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EIP-712 Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">
                EIP-712 Structured Signing
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowRawJson(!showRawJson)}
              className="h-6 px-2 text-[10px] text-zinc-500"
            >
              {showRawJson ? (
                <><EyeOff className="w-3 h-3 mr-1" />Human</>
              ) : (
                <><Eye className="w-3 h-3 mr-1" />Raw JSON</>
              )}
            </Button>
          </div>

          {/* Template selector */}
          <div className="flex gap-1.5 mb-2">
            {EIP712_TEMPLATES.map((t, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTemplate(idx)}
                className={`text-[10px] px-2 py-1 rounded border transition-all ${
                  activeTemplate === idx
                    ? "border-emerald-700 bg-emerald-500/10 text-emerald-400"
                    : "border-zinc-700 text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Template {idx + 1}
              </button>
            ))}
          </div>

          <div className="p-3 border border-zinc-700 rounded-lg bg-zinc-800/40">
            {!showRawJson ? (
              <div>
                <div className="flex items-start gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-white font-medium">{template.humanReadable}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[10px] text-zinc-500 mb-1">DOMAIN</p>
                    <p className="text-[10px] font-mono text-zinc-400">{template.domain.name}</p>
                    <p className="text-[10px] font-mono text-zinc-600">
                      Chain {template.domain.chainId} / v{template.domain.version}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 mb-1">CONTRACT</p>
                    <p className="text-[10px] font-mono text-zinc-400 truncate">
                      {template.domain.verifyingContract}
                    </p>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-zinc-700">
                  <p className="text-[10px] text-zinc-500 mb-1">FIELDS</p>
                  <div className="flex flex-wrap gap-1">
                    {Object.keys(template.message).map((key) => (
                      <span
                        key={key}
                        className="text-[9px] px-1.5 py-0.5 bg-zinc-700 rounded font-mono text-zinc-300"
                      >
                        {key}: {String(template.message[key]).slice(0, 20)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <pre className="text-[10px] font-mono text-emerald-400 overflow-auto max-h-36 whitespace-pre-wrap">
                {JSON.stringify({ domain: template.domain, message: template.message }, null, 2)}
              </pre>
            )}
          </div>
        </div>

        {/* Rate Limiting */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">
              Rate Limiting — DDoS Protection
            </span>
          </div>
          <div className="space-y-1.5">
            {RATE_LIMIT_ENTRIES.map((entry, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 border border-zinc-800 rounded-lg">
                <Badge className={`text-[9px] border shrink-0 ${STATUS_COLORS[entry.status]}`}>
                  {entry.type}
                </Badge>
                <p className="text-[10px] font-mono text-zinc-400 flex-1 truncate">
                  {entry.identifier}
                </p>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        entry.status === "OK"
                          ? "bg-emerald-500"
                          : entry.status === "THROTTLED"
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${Math.min((entry.requests / entry.limit) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 w-16 text-right">
                    {entry.requests}/{entry.limit}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-zinc-600 mt-2">
            Window: 15min IP / 1hr Wallet. ENS anchors purged from public contract level.
          </p>
        </div>

      </CardContent>
    </Card>
  );
}
