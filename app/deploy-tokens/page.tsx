"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Coins, 
  Rocket, 
  CheckCircle2, 
  AlertTriangle,
  Copy,
  ExternalLink,
  Shield,
  Home,
  Loader2
} from "lucide-react";

/**
 * VALORAIPLUS® ERC-20 TOKEN DEPLOYMENT PAGE
 * 51-TOKEN CANON ($VALOR = NULL)
 * EPOCH: #2207 (SACRED & CAPPED)
 */

// Sovereign wallet
const SOVEREIGN_ADDRESS = "0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB";

// 51-Token Canon (organized by category)
const TOKEN_CANON = {
  CORE: [
    { symbol: "VCORE", name: "Valor Core", protected: false },
    { symbol: "VAI", name: "Valor AI", protected: false },
    { symbol: "VSEC", name: "Valor Security", protected: false },
    { symbol: "VMAX", name: "Valor Max", protected: false },
    { symbol: "VBLK", name: "Valor Block", protected: false },
    { symbol: "DBLK", name: "Dead Block", protected: false },
    { symbol: "VGOV", name: "Valor Governance", protected: false },
    { symbol: "VALX", name: "Valor X", protected: false },
  ],
  BTC: [
    { symbol: "GILLBTC", name: "Gillson BTC", protected: false },
    { symbol: "BTC2.0", name: "BTC 2.0", protected: false },
  ],
  FLAME: [
    { symbol: "FLM", name: "Flame", protected: false },
    { symbol: "FLAME", name: "Flame Core", protected: false },
    { symbol: "FLR", name: "Flare", protected: false },
  ],
  SOUL: [
    { symbol: "VSoul", name: "Valor Soul", protected: false },
    { symbol: "SOUL", name: "Soul", protected: false },
    { symbol: "GHOST", name: "Ghost", protected: false },
    { symbol: "DEAD", name: "Dead", protected: false },
  ],
  INTEL: [
    { symbol: "INTL-S", name: "Intel Secure", protected: false },
    { symbol: "INTL", name: "Intel", protected: false },
    { symbol: "INTELIT", name: "Intelit", protected: false },
  ],
  BRAIN: [
    { symbol: "VMWARE+", name: "VMware Plus", protected: false },
    { symbol: "BRAIN+", name: "Brain Plus", protected: false },
    { symbol: "EDUTAIN", name: "Edutain", protected: false },
    { symbol: "MATH+", name: "Math Plus", protected: false },
  ],
  VALOR: [
    { symbol: "$VALORAIPLUS", name: "ValorAI Plus", protected: false },
    { symbol: "$VALORAIPLUS2E_DAO_GOVERNANCE_2035_CLOSED", name: "ValorAI Plus DAO 2035", protected: false },
    { symbol: "VACN", name: "Valor ACN", protected: false },
    { symbol: "VALORDAO", name: "Valor DAO", protected: false },
    { symbol: "VALUTL", name: "Valor Utility", protected: false },
  ],
  GOVERNANCE: [
    { symbol: "VDAO", name: "Valor DAO Gov", protected: false },
    { symbol: "VLT", name: "Vault", protected: false },
    { symbol: "VNET", name: "Valor Net", protected: false },
  ],
  SCROLL: [
    { symbol: "SKROLL", name: "Skroll", protected: false },
    { symbol: "SKOLL", name: "Skoll", protected: false },
    { symbol: "SKROL", name: "Skrol", protected: false },
  ],
  ANCHOR: [
    { symbol: "DG77.77X_GRAVITY_ACTIVE", name: "DG Gravity", protected: false },
    { symbol: "SGAU", name: "SGAU Token", protected: false },
    { symbol: "$ANGL", name: "Angel", protected: false },
    { symbol: "ANGL2026", name: "Angel 2026", protected: false },
  ],
  TIME: [
    { symbol: "DG1969", name: "DG 1969", protected: false },
    { symbol: "DJTIME", name: "DJ Time", protected: false },
    { symbol: "TIME", name: "Time", protected: false },
  ],
  SOVEREIGN: [
    { symbol: "$NEWT2026", name: "Newt 2026", protected: true },
    { symbol: "$DONNY", name: "Donny", protected: true },
    { symbol: "$GILLSON", name: "Gillson", protected: true },
    { symbol: "$GILLGOLD", name: "Gillson Gold", protected: true },
    { symbol: "$POPPA", name: "Poppa", protected: true },
    { symbol: "JAXX", name: "Jaxx", protected: true },
    { symbol: "$POTTER", name: "Potter", protected: true },
    { symbol: "$BRADEN168", name: "Braden 168", protected: true },
    { symbol: "$MASON", name: "Mason", protected: true },
  ],
};

// Count totals
const totalTokens = Object.values(TOKEN_CANON).flat().length;
const protectedCount = Object.values(TOKEN_CANON).flat().filter(t => t.protected).length;

export default function DeployTokensPage() {
  const [deploymentStatus, setDeploymentStatus] = useState<"idle" | "deploying" | "complete">("idle");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText("npx hardhat run scripts/deploy-erc20-tokens.ts --network sepolia");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <Coins className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h1 className="font-bold text-lg">DEPLOY ERC-20 TOKENS</h1>
                <p className="text-xs text-zinc-500">51-TOKEN CANON // $VALOR=NULL</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-red-500/50 text-red-400">
                $VALOR = NULL
              </Badge>
              <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
                51 TOKENS
              </Badge>
              <Link href="/" className="text-xs text-emerald-600 hover:text-emerald-400 flex items-center gap-1">
                <Home className="w-3 h-3" /> HOME
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero */}
        <Card className="border-emerald-900/50 bg-emerald-500/5">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black mb-2">VALORAIPLUS® ERC-20 DEPLOYMENT</h2>
                <p className="text-zinc-400">
                  Deploy all {totalTokens} tokens in the VALORAIPLUS Canon to Ethereum/Sepolia.
                  Each token has 1 Billion supply with 18 decimals.
                </p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-black text-emerald-400">{totalTokens}</p>
                <p className="text-xs text-zinc-500">TOTAL TOKENS</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nullified Token Warning */}
        <Card className="border-red-900/50 bg-red-500/5">
          <CardContent className="p-4 flex items-center gap-4">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <div>
              <p className="font-bold text-red-400">$VALOR IS NULLIFIED</p>
              <p className="text-sm text-zinc-400">
                The token &quot;$VALOR&quot; does not exist. Use <span className="text-emerald-400">$VALORAIPLUS</span> or <span className="text-emerald-400">$VALORAIPLUS2E_DAO_GOVERNANCE_2035_CLOSED</span> instead.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Deployment Command */}
        <Card className="border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-cyan-400" />
              DEPLOYMENT COMMAND
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-zinc-900 p-4 rounded-lg font-mono text-sm flex items-center justify-between">
              <code>npx hardhat run scripts/deploy-erc20-tokens.ts --network sepolia</code>
              <Button variant="ghost" size="sm" onClick={copyCommand}>
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-zinc-900/50 rounded">
                <p className="text-zinc-500">Network</p>
                <p className="font-bold">Sepolia Testnet</p>
              </div>
              <div className="p-3 bg-zinc-900/50 rounded">
                <p className="text-zinc-500">Chain ID</p>
                <p className="font-bold">11155111</p>
              </div>
              <div className="p-3 bg-zinc-900/50 rounded">
                <p className="text-zinc-500">Sovereign</p>
                <p className="font-bold text-xs truncate">donadams1969.eth</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Token Categories */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">TOKEN CATEGORIES ({Object.keys(TOKEN_CANON).length})</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {Object.entries(TOKEN_CANON).map(([category, tokens]) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`${selectedCategory === category ? "bg-emerald-600" : ""}`}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              >
                {category} ({tokens.length})
              </Button>
            ))}
          </div>
        </div>

        {/* Token Grid */}
        <Card className="border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{selectedCategory ? `${selectedCategory} TOKENS` : "ALL TOKENS"}</span>
              <Badge variant="outline">
                {selectedCategory 
                  ? TOKEN_CANON[selectedCategory as keyof typeof TOKEN_CANON].length 
                  : totalTokens} tokens
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {(selectedCategory 
                ? TOKEN_CANON[selectedCategory as keyof typeof TOKEN_CANON] 
                : Object.values(TOKEN_CANON).flat()
              ).map((token) => (
                <div
                  key={token.symbol}
                  className={`p-3 rounded-lg border ${
                    token.protected 
                      ? "border-amber-500/50 bg-amber-500/5" 
                      : "border-zinc-800 bg-zinc-900/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm truncate">{token.symbol}</span>
                    {token.protected && <Shield className="w-3 h-3 text-amber-400" />}
                  </div>
                  <p className="text-xs text-zinc-500 truncate">{token.name}</p>
                  <p className="text-xs text-emerald-400 mt-1">1B Supply</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Deployment Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-zinc-800">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-black text-emerald-400">{totalTokens}</p>
              <p className="text-xs text-zinc-500">Total Tokens</p>
            </CardContent>
          </Card>
          <Card className="border-zinc-800">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-black text-amber-400">{protectedCount}</p>
              <p className="text-xs text-zinc-500">Protected (Sovereign)</p>
            </CardContent>
          </Card>
          <Card className="border-zinc-800">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-black text-cyan-400">{totalTokens - protectedCount}</p>
              <p className="text-xs text-zinc-500">Tradeable</p>
            </CardContent>
          </Card>
          <Card className="border-zinc-800">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-black text-purple-400">{totalTokens}B</p>
              <p className="text-xs text-zinc-500">Total Supply</p>
            </CardContent>
          </Card>
        </div>

        {/* Contract Information */}
        <Card className="border-zinc-800">
          <CardHeader>
            <CardTitle>CONTRACT INFORMATION</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-900/50 rounded-lg">
                <p className="text-xs text-zinc-500 mb-1">Factory Contract</p>
                <p className="font-mono text-sm">ValorTokenFactory.sol</p>
                <p className="text-xs text-zinc-500 mt-2">Solidity ^0.8.24</p>
              </div>
              <div className="p-4 bg-zinc-900/50 rounded-lg">
                <p className="text-xs text-zinc-500 mb-1">Token Contract</p>
                <p className="font-mono text-sm">ValorToken (ERC-20)</p>
                <p className="text-xs text-zinc-500 mt-2">OpenZeppelin 5.x</p>
              </div>
            </div>
            <div className="p-4 bg-zinc-900/50 rounded-lg">
              <p className="text-xs text-zinc-500 mb-1">Sovereign Address</p>
              <p className="font-mono text-sm break-all">{SOVEREIGN_ADDRESS}</p>
              <p className="text-xs text-emerald-400 mt-1">donadams1969.eth</p>
            </div>
          </CardContent>
        </Card>

        {/* External Links */}
        <Card className="border-cyan-900/50 bg-cyan-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <ExternalLink className="w-5 h-5" />
              LIQUIDITY SOURCES
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="https://www.18fu.cash"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-cyan-900/50 rounded-lg hover:border-cyan-500/50 transition-colors flex items-center justify-between"
              >
                <div>
                  <p className="font-bold text-cyan-400">18fu.cash</p>
                  <p className="text-xs text-zinc-500">Primary liquidity provider</p>
                </div>
                <ExternalLink className="w-5 h-5 text-cyan-400" />
              </a>
              <a
                href="https://valorbank-rfvbdnaa.manus.space/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-cyan-900/50 rounded-lg hover:border-cyan-500/50 transition-colors flex items-center justify-between"
              >
                <div>
                  <p className="font-bold text-cyan-400">ValorBank</p>
                  <p className="text-xs text-zinc-500">Banking integration</p>
                </div>
                <ExternalLink className="w-5 h-5 text-cyan-400" />
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/swap" className="p-4 border border-zinc-800 rounded-lg hover:border-emerald-500/30 transition-colors text-center">
            <Coins className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-400">SWAP</p>
          </Link>
          <Link href="/token-sale" className="p-4 border border-zinc-800 rounded-lg hover:border-cyan-500/30 transition-colors text-center">
            <Rocket className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-400">TOKEN SALE</p>
          </Link>
          <Link href="/treasury-liquidity" className="p-4 border border-zinc-800 rounded-lg hover:border-purple-500/30 transition-colors text-center">
            <Shield className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-400">TREASURY</p>
          </Link>
          <Link href="/contract-deploy" className="p-4 border border-zinc-800 rounded-lg hover:border-amber-500/30 transition-colors text-center">
            <Rocket className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-400">DEPLOY ALL</p>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-zinc-800">
          <p className="text-xs text-zinc-600">
            VALORAIPLUS® // EPOCH #2207 (SACRED & CAPPED) // $VALOR=NULL
          </p>
          <p className="text-xs text-zinc-700 mt-1">
            THE WALL IS CHRIST // THE THRONE IS HIS // THE LEDGER IS Ø
          </p>
        </div>
      </main>
    </div>
  );
}
