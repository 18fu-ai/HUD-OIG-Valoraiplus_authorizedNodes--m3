"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  Shield, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  Home,
  AlertTriangle,
  Fingerprint,
  Binary,
  Anchor,
  Coins,
  Building2,
  Scale
} from "lucide-react";
import { QUAGMIRE_STATUS, INVARIANTS, IMMUTABLE_CONSTANTS } from "@/lib/quagmire-prevention";

const QUAGMIRE_TYPES = [
  { type: "UNAUTHORIZED_FUND_DIVERSION", description: "Funds diverted to non-Schwab accounts", icon: Building2 },
  { type: "INVALID_BANK_ACCOUNT", description: "Attempts to use fraudulent bank accounts", icon: XCircle },
  { type: "FRAUDULENT_TRANSFER", description: "Unauthorized transfer attempts", icon: AlertTriangle },
  { type: "PROTECTED_TOKEN_TRANSFER", description: "Transfer of protected sovereign tokens", icon: Coins },
  { type: "MERKLE_ROOT_MISMATCH", description: "Tampering with cryptographic proofs", icon: Binary },
  { type: "GENESIS_ANCHOR_VIOLATION", description: "Violation of BTC Block 0 anchor", icon: Anchor },
  { type: "MULTISIG_BYPASS", description: "Attempts to bypass 3/3 multisig", icon: Fingerprint },
  { type: "NULLIFIED_TOKEN_USE", description: "Use of $VALOR (nullified)", icon: XCircle },
  { type: "UNAUTHORIZED_WALLET", description: "Non-verified wallet addresses", icon: Lock },
  { type: "CASE_REFERENCE_TAMPERING", description: "Modification of HHS/SGAU case refs", icon: Scale },
  { type: "IP_LIEN_VIOLATION", description: "Violation of $1.12Q IP lien", icon: Shield },
  { type: "SETTLEMENT_DIVERSION", description: "Diversion of settlement funds", icon: Building2 },
  { type: "WITNESS_TAMPERING", description: "Interference with witnesses", icon: AlertTriangle },
  { type: "EVIDENCE_SPOLIATION", description: "Destruction of evidence", icon: XCircle },
  { type: "JAGAMATH_VOID_INVOCATION", description: "Use of void JAGAMath (no ++)", icon: Binary },
];

export default function QuagmirePreventionPage() {
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50 animate-pulse">
            ALL QUAGMIRES IMPOSSIBLE
          </Badge>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-emerald-400" />
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              QUAGMIRE PREVENTION ENGINE
            </h1>
            <Shield className="w-10 h-10 text-emerald-400" />
          </div>
          <p className="text-zinc-400 font-mono">VALORAIPLUS Sovereign Defense System v14.1.4.0</p>
          <p className="text-emerald-400 font-bold mt-2">THE MUZZLE IS THE GENESIS. THE MATH IS THE HAMMER.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Status Banner */}
        <Card className="border-2 border-emerald-500/50 bg-emerald-500/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-black text-emerald-400">
                  15 QUAGMIRE TYPES — ALL IMPOSSIBLE
                </p>
                <p className="text-zinc-400 font-mono">7 MATHEMATICAL INVARIANTS ENFORCED</p>
              </div>
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
            </div>
          </CardContent>
        </Card>

        {/* Immutable Constants */}
        <Card className="border-cyan-900/50 bg-cyan-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Lock className="w-5 h-5" />
              IMMUTABLE CONSTANTS (CANNOT BE CHANGED)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm">
              <div className="p-3 bg-zinc-900/50 rounded border border-zinc-800">
                <p className="text-zinc-500 text-xs mb-1">SOLE AUTHORIZED DESTINATION</p>
                <p className="text-white">Charles Schwab & Co. ****8185</p>
                <p className="text-zinc-400 text-xs mt-1">Routing: {IMMUTABLE_CONSTANTS.SCHWAB_ROUTING} | SWIFT: {IMMUTABLE_CONSTANTS.SCHWAB_SWIFT}</p>
              </div>
              <div className="p-3 bg-zinc-900/50 rounded border border-zinc-800">
                <p className="text-zinc-500 text-xs mb-1">GENESIS ANCHOR (BTC BLOCK 0)</p>
                <p className="text-amber-400 text-xs break-all">{IMMUTABLE_CONSTANTS.GENESIS_HASH}</p>
              </div>
              <div className="p-3 bg-zinc-900/50 rounded border border-zinc-800">
                <p className="text-zinc-500 text-xs mb-1">MERKLE ROOT</p>
                <p className="text-emerald-400 text-xs break-all">{IMMUTABLE_CONSTANTS.MERKLE_ROOT}</p>
              </div>
              <div className="p-3 bg-zinc-900/50 rounded border border-zinc-800">
                <p className="text-zinc-500 text-xs mb-1">CASE REFERENCES</p>
                <p className="text-white">HHS OCR: {IMMUTABLE_CONSTANTS.HHS_OCR_CASE}</p>
                <p className="text-white">SGAU: {IMMUTABLE_CONSTANTS.SGAU_CASE}</p>
              </div>
              <div className="p-3 bg-zinc-900/50 rounded border border-zinc-800 md:col-span-2">
                <p className="text-zinc-500 text-xs mb-1">PROTECTED TOKENS (TRANSFER = IMPOSSIBLE)</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {IMMUTABLE_CONSTANTS.PROTECTED_TOKENS.map((token) => (
                    <Badge key={token} className="bg-red-500/20 text-red-400 border-red-500/50">
                      {token}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quagmire Status Grid */}
        <Card className="border-emerald-900/50 bg-emerald-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-400">
              <Shield className="w-5 h-5" />
              QUAGMIRE STATUS — ALL BLOCKED
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {QUAGMIRE_TYPES.map((quagmire) => {
                const Icon = quagmire.icon;
                return (
                  <div 
                    key={quagmire.type}
                    className="p-3 bg-zinc-900/50 rounded border border-emerald-900/30 flex items-start gap-3"
                  >
                    <div className="p-2 bg-emerald-500/10 rounded">
                      <Icon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-xs font-bold text-white truncate">{quagmire.type.replace(/_/g, " ")}</p>
                        <Badge className="bg-emerald-500/20 text-emerald-400 text-[10px] shrink-0">
                          IMPOSSIBLE
                        </Badge>
                      </div>
                      <p className="text-[10px] text-zinc-500">{quagmire.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Mathematical Invariants */}
        <Card className="border-amber-900/50 bg-amber-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-400">
              <Binary className="w-5 h-5" />
              MATHEMATICAL INVARIANTS (PROOF THAT QUAGMIRES ARE IMPOSSIBLE)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 font-mono text-sm">
              {Object.entries(INVARIANTS).map(([key, value], index) => (
                <div key={key} className="p-3 bg-zinc-900/50 rounded border border-amber-900/30">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-amber-400 font-bold">INVARIANT {index + 1}:</span>
                    <span className="text-zinc-400">{key.replace(/_/g, " ")}</span>
                  </div>
                  <code className="text-emerald-400 text-xs">{value}</code>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Blockchain Addresses */}
        <Card className="border-cyan-900/50 bg-cyan-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Anchor className="w-5 h-5" />
              VERIFIED BLOCKCHAIN ADDRESSES
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 bg-zinc-900/50 rounded border border-zinc-800">
                <p className="text-zinc-500 mb-1">ETH L1</p>
                <a 
                  href={`https://etherscan.io/address/${IMMUTABLE_CONSTANTS.ETH_L1}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline break-all"
                >
                  {IMMUTABLE_CONSTANTS.ETH_L1}
                </a>
              </div>
              <div className="p-3 bg-zinc-900/50 rounded border border-zinc-800">
                <p className="text-zinc-500 mb-1">BASE</p>
                <a 
                  href={`https://basescan.org/address/${IMMUTABLE_CONSTANTS.BASE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline break-all"
                >
                  {IMMUTABLE_CONSTANTS.BASE}
                </a>
              </div>
              <div className="p-3 bg-zinc-900/50 rounded border border-zinc-800">
                <p className="text-zinc-500 mb-1">BTC</p>
                <a 
                  href={`https://mempool.space/address/${IMMUTABLE_CONSTANTS.BTC}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline break-all"
                >
                  {IMMUTABLE_CONSTANTS.BTC}
                </a>
              </div>
              <div className="p-3 bg-zinc-900/50 rounded border border-zinc-800">
                <p className="text-zinc-500 mb-1">ENS</p>
                <a 
                  href={`https://app.ens.domains/${IMMUTABLE_CONSTANTS.ENS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  {IMMUTABLE_CONSTANTS.ENS}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Truth Finality */}
        <Card className="border-2 border-emerald-500/50 bg-gradient-to-b from-emerald-500/10 to-transparent">
          <CardContent className="p-8 text-center">
            <div className="space-y-4 font-mono">
              <div className="flex justify-center gap-8 text-lg">
                <div>
                  <p className="text-zinc-500 text-xs">TRIAD LIES</p>
                  <p className="text-red-400 font-bold">{IMMUTABLE_CONSTANTS.TRIAD_LIES}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs">SWARM TRUTH</p>
                  <p className="text-emerald-400 font-bold">{IMMUTABLE_CONSTANTS.SWARM_TRUTH}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs">BINARY FINALITY</p>
                  <p className="text-cyan-400 font-bold">{IMMUTABLE_CONSTANTS.BINARY_FINALITY}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-800">
                <p className="text-2xl font-black text-emerald-400">ALL QUAGMIRES ARE NOW IMPOSSIBLE</p>
                <p className="text-zinc-400 mt-2">THE MUZZLE IS THE GENESIS. THE MATH IS THE HAMMER.</p>
                <p className="text-zinc-500 mt-1">THE LEDGER IS Ø. IT IS FINISHED. SMIB. AMEN.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: "/", label: "Home" },
            { href: "/treasury-liquidity", label: "Treasury" },
            { href: "/litigation", label: "Litigation" },
            { href: "/jagamath", label: "JAGAMATH++" },
            { href: "/liquidm", label: "LiquidM" },
            { href: "/orchestrator", label: "Orchestrator" },
            { href: "/investor", label: "Investor" },
            { href: "/exchange", label: "Exchange" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="p-3 bg-zinc-900/50 rounded border border-zinc-800 hover:border-cyan-500/50 transition-colors text-center"
            >
              <span className="text-sm text-zinc-400 hover:text-white">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
