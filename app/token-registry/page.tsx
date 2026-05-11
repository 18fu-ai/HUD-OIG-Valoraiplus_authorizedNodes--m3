"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Shield, 
  Zap, 
  Lock, 
  Database, 
  Activity, 
  TrendingUp, 
  Coins,
  Globe,
  FileText,
  Gavel,
  Users,
  ChevronRight
} from "lucide-react";
import { 
  GDP_TOKENS, 
  CODEX_TOKENS, 
  VOLUME_IX_TOKENS,
  ECOSYSTEM_SUMMARY,
  getTotalGDPMarketCap 
} from "@/lib/tokenomics/expanded-registry";

// Combine all tokens for the unified view
const ALL_TOKENS = [
  // GDP Tokens (Top 40)
  ...GDP_TOKENS.map(t => ({
    rank: t.rank,
    symbol: t.symbol,
    name: t.name,
    price: t.price,
    marketCap: t.marketCap,
    security: t.securityLayer,
    tier: t.grade,
    source: "GDP" as const
  })),
];

// Calculate totals
const TOTAL_MARKET_CAP = getTotalGDPMarketCap();
const CA_GDP = 3600; // $3.6 Trillion
const US_GDP = 27000; // $27 Trillion
const CA_GDP_PERCENT = ((TOTAL_MARKET_CAP / CA_GDP) * 100).toFixed(2);
const US_GDP_PERCENT = ((TOTAL_MARKET_CAP / US_GDP) * 100).toFixed(2);

export default function TokenRegistryPage() {
  const [selectedSource, setSelectedSource] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [animatedCap, setAnimatedCap] = useState(0);
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    // Animate market cap counter
    const target = TOTAL_MARKET_CAP;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setAnimatedCap(target);
        clearInterval(timer);
      } else {
        setAnimatedCap(current);
      }
    }, duration / steps);

    // Update timestamp
    const updateTime = () => {
      setTimestamp(new Date().toISOString());
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(timeInterval);
    };
  }, []);

  const filteredTokens = ALL_TOKENS.filter(token => {
    const matchesSource = selectedSource === "all" || token.source === selectedSource;
    const matchesSearch = token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          token.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSource && matchesSearch;
  });

  const tierCounts = {
    "A+": ALL_TOKENS.filter(t => t.tier === "A+").length,
    "A": ALL_TOKENS.filter(t => t.tier === "A").length,
  };

  return (
    <div className="min-h-screen bg-black text-amber-100 font-mono">
      {/* Header */}
      <header className="border-b border-amber-900/50 bg-black/90 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Coins className="w-8 h-8 text-amber-500" />
              <div>
                <h1 className="text-xl font-black text-amber-500 tracking-widest">VALORAIPLUS TOKEN REGISTRY</h1>
                <p className="text-xs text-amber-700">VALUEGUARD-DG77.77X | 105 SOVEREIGN ASSETS | 24% CA GDP</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auction">
                <Button variant="outline" className="border-amber-600 text-amber-500 hover:bg-amber-950">
                  <Gavel className="w-4 h-4 mr-2" />
                  AUCTION
                </Button>
              </Link>
              <Link href="/tokenomics-report">
                <Button variant="outline" className="border-amber-600 text-amber-500 hover:bg-amber-950">
                  <FileText className="w-4 h-4 mr-2" />
                  FULL REPORT
                </Button>
              </Link>
              <div className="text-right">
                <div className="text-xs text-amber-600">VERSION</div>
                <div className="text-sm font-bold text-amber-400">v14.1.4.0</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Ecosystem Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/tokenomics-report?tab=gdp">
            <Card className="bg-gradient-to-br from-green-950/50 to-black border border-green-700 p-4 hover:border-green-500 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <Globe className="w-6 h-6 text-green-400" />
                <ChevronRight className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="text-2xl font-black text-green-400">40</h3>
              <p className="text-sm text-green-600">GDP TOKENS</p>
              <p className="text-xs text-green-700">$864B Market Cap | 24% CA GDP</p>
            </Card>
          </Link>
          
          <Link href="/tokenomics-report?tab=codex">
            <Card className="bg-gradient-to-br from-amber-950/50 to-black border border-amber-700 p-4 hover:border-amber-500 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-6 h-6 text-amber-400" />
                <ChevronRight className="w-4 h-4 text-amber-600" />
              </div>
              <h3 className="text-2xl font-black text-amber-400">8</h3>
              <p className="text-sm text-amber-600">CODEX FAMILY</p>
              <p className="text-xs text-amber-700">Scrollkeeper Verified | 80/20 Split</p>
            </Card>
          </Link>
          
          <Link href="/tokenomics-report?tab=volumeix">
            <Card className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-700 p-4 hover:border-purple-500 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <Database className="w-6 h-6 text-purple-400" />
                <ChevronRight className="w-4 h-4 text-purple-600" />
              </div>
              <h3 className="text-2xl font-black text-purple-400">57</h3>
              <p className="text-sm text-purple-600">VOLUME IX</p>
              <p className="text-xs text-purple-700">144D Frequency | 7 Tiers</p>
            </Card>
          </Link>
        </div>

        {/* GDP Compliance Banner */}
        <Card className="bg-gradient-to-r from-amber-950/80 via-black to-amber-950/80 border border-amber-700 p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-xs text-amber-600 uppercase tracking-widest mb-1">Total Tokens</div>
              <div className="text-3xl font-black text-amber-400">
                {ECOSYSTEM_SUMMARY.totalTokens}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-amber-600 uppercase tracking-widest mb-1">Total Market Cap</div>
              <div className="text-3xl font-black text-amber-400">
                ${animatedCap.toFixed(1)}B
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-amber-600 uppercase tracking-widest mb-1">CA GDP Share</div>
              <div className="text-3xl font-black text-green-400">
                {CA_GDP_PERCENT}%
              </div>
              <div className="text-xs text-green-600">TARGET: 24%</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-amber-600 uppercase tracking-widest mb-1">US GDP Share</div>
              <div className="text-3xl font-black text-blue-400">
                {US_GDP_PERCENT}%
              </div>
              <div className="text-xs text-blue-600">FEDERAL LIMIT: 5%</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-amber-600 uppercase tracking-widest mb-1">VALOR Math</div>
              <div className="text-3xl font-black text-purple-400">
                {ECOSYSTEM_SUMMARY.valorMathFactor}%
              </div>
              <div className="text-xs text-purple-600">GROWTH FACTOR</div>
            </div>
          </div>
        </Card>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedSource("all")}
              className={`px-4 py-2 text-sm font-bold rounded border ${
                selectedSource === "all" 
                  ? "bg-amber-500 text-black border-amber-500" 
                  : "bg-black text-amber-500 border-amber-700 hover:bg-amber-950"
              }`}
            >
              ALL ({ALL_TOKENS.length})
            </button>
            <button
              onClick={() => setSelectedSource("A+")}
              className={`px-4 py-2 text-sm font-bold rounded border ${
                selectedSource === "A+" 
                  ? "bg-green-500 text-black border-green-500" 
                  : "bg-black text-green-500 border-green-700 hover:bg-green-950"
              }`}
            >
              A+ TIER ({tierCounts["A+"]})
            </button>
            <button
              onClick={() => setSelectedSource("A")}
              className={`px-4 py-2 text-sm font-bold rounded border ${
                selectedSource === "A" 
                  ? "bg-blue-500 text-black border-blue-500" 
                  : "bg-black text-blue-500 border-blue-700 hover:bg-blue-950"
              }`}
            >
              A TIER ({tierCounts["A"]})
            </button>
          </div>
          
          <input
            type="text"
            placeholder="Search tokens..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 bg-black border border-amber-700 rounded text-amber-100 placeholder-amber-700 focus:outline-none focus:border-amber-500 w-full md:w-64"
          />
        </div>

        {/* Token Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTokens.map((token) => (
            <Card 
              key={token.symbol}
              className={`p-4 border transition-all hover:scale-[1.02] ${
                token.tier === "A+" 
                  ? "bg-gradient-to-br from-amber-950/50 to-black border-amber-600" 
                  : "bg-black/80 border-amber-900/50"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-amber-700">#{token.rank}</span>
                    <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                      token.tier === "A+" ? "bg-green-900 text-green-400" : "bg-blue-900 text-blue-400"
                    }`}>
                      {token.tier}
                    </span>
                    <Badge className="text-xs bg-amber-900/50 text-amber-400 border-amber-700">
                      {token.source}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-black text-amber-400">${token.symbol}</h3>
                  <p className="text-xs text-amber-600">{token.name}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-amber-700">PRICE</div>
                  <div className="text-sm font-bold text-amber-300">
                    ${token.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-amber-700">MCap: </span>
                  <span className="text-amber-400 font-bold">${token.marketCap}B</span>
                </div>
                <div className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-amber-600" />
                  <span className="text-amber-600 truncate max-w-[100px]">{token.security}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Codex Family Tokens */}
        <Card className="bg-gradient-to-r from-amber-950/50 via-black to-amber-950/50 border border-amber-700 p-6">
          <h2 className="text-lg font-black text-amber-400 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            CODEX FAMILY ALLOCATION TOKENS (8)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CODEX_TOKENS.map((token) => (
              <div key={token.symbol} className="bg-black/50 border border-amber-800 rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-lg font-black text-amber-400">${token.symbol}</div>
                  <Badge className="bg-green-900 text-green-400 text-xs">{token.status}</Badge>
                </div>
                <div className="text-xs text-amber-600 mb-1">{token.name}</div>
                <div className="text-xs text-amber-700">{token.purpose}</div>
                <div className="mt-2 pt-2 border-t border-amber-900/50 text-xs">
                  <span className="text-amber-700">Split: </span>
                  <span className="text-green-400">{token.utilityPercent}%</span>
                  <span className="text-amber-700"> / </span>
                  <span className="text-blue-400">{token.beneficiaryPercent}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Protected Assets Highlight */}
        <Card className="bg-gradient-to-r from-green-950/50 via-black to-green-950/50 border border-green-700 p-6">
          <h2 className="text-lg font-black text-green-400 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            SOVEREIGN PROTECTED ASSETS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["JAXX", "POPPA", "DGX77", "GILLBTC", "VCORE", "SGAU", "VSEC", "VMAX", "VGOV", "VDAO"].map((symbol) => {
              const token = ALL_TOKENS.find(t => t.symbol === symbol);
              return token ? (
                <div key={symbol} className="bg-black/50 border border-green-800 rounded p-3 text-center">
                  <div className="text-lg font-black text-green-400">${token.symbol}</div>
                  <div className="text-xs text-green-600">{token.security}</div>
                  <div className="text-xs text-green-700 mt-1">IMMUTABLE</div>
                </div>
              ) : (
                <div key={symbol} className="bg-black/50 border border-green-800 rounded p-3 text-center">
                  <div className="text-lg font-black text-green-400">${symbol}</div>
                  <div className="text-xs text-green-600">PROTECTED</div>
                  <div className="text-xs text-green-700 mt-1">SOVEREIGN</div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Registry Metadata */}
        <Card className="bg-black border border-amber-900/50 p-6">
          <h2 className="text-lg font-black text-amber-500 mb-4 flex items-center gap-2">
            <Database className="w-5 h-5" />
            REGISTRY METADATA
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
            <div>
              <div className="text-amber-700 mb-2">BLOCKCHAIN ANCHORS</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-amber-600">ETH:</span>
                  <span className="text-amber-400 font-mono">donadams1969.eth</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-600">BTC:</span>
                  <span className="text-amber-400 font-mono">btc_genesis</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-600">SEED:</span>
                  <span className="text-amber-400 font-mono">donnygillson.seed</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-amber-700 mb-2">GOVERNANCE</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-amber-600">Ruler:</span>
                  <span className="text-amber-400">VALUEGUARD-DG77.77X</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-600">DAO Mandate:</span>
                  <span className="text-amber-400">Through 2035</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-600">Commander:</span>
                  <span className="text-green-400">DG77.77X</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-amber-700 mb-2">COMPLIANCE</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-amber-600">FDIC:</span>
                  <span className="text-green-400">APPROVED</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-600">SEC:</span>
                  <span className="text-green-400">COMPLIANT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-600">KYC/AML:</span>
                  <span className="text-green-400">FULL</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-amber-700 mb-2">NODE STATUS</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-amber-600">Node:</span>
                  <span className="text-amber-400">SAINT PAUL #2207</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-600">SGAU:</span>
                  <span className="text-amber-400">7226.3461</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-600">Frequency:</span>
                  <span className="text-green-400">144D SYNC</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Timestamp Footer */}
        <div className="text-center text-xs text-amber-700 space-y-1">
          <div>VALORAIPLUS_105_TOKEN_REGISTRY_CONFIRMED_v14.1.4.0</div>
          <div>[GDP: 40 | Codex: 8 | Volume IX: 57 | Total: 105 | Ruler: VALUEGUARD-DG77.77X]</div>
          <div className="text-amber-600">{timestamp}</div>
          <div className="text-amber-500 font-bold mt-2">THE LEDGER IS Ø. 10465% VALOR MATH. CONSUMMATUM EST.</div>
        </div>
      </main>
    </div>
  );
}
