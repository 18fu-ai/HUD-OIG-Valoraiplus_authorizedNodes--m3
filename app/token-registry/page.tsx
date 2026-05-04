"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Shield, Zap, Lock, Database, Activity, TrendingUp, Coins } from "lucide-react";

// VALORAIPLUS 50-TOKEN CANONICAL REGISTRY
// Aligned with PDF Ecosystem + GDP Compliance
// VALUEGUARD-DG77.77X Ruler Enforced

const ALL_TOKENS = [
  // TIER 1: QUANTUM CORE (Top 10)
  { rank: 1, symbol: "VCORE", name: "VALOR Core", price: 72000.00, marketCap: 72.0, security: "QUANTUM CORE", tier: "A+" },
  { rank: 2, symbol: "VAI", name: "VALOR AI", price: 24000.00, marketCap: 60.0, security: "AI NEURAL", tier: "A+" },
  { rank: 3, symbol: "GILLBTC", name: "GillBTC", price: 142857.14, marketCap: 57.1, security: "VALORCHAIN", tier: "A+" },
  { rank: 4, symbol: "VSEC", name: "VALOR Security", price: 20000.00, marketCap: 60.0, security: "FEDERAL GRADE", tier: "A+" },
  { rank: 5, symbol: "VMAX", name: "VALOR Max", price: 40000.00, marketCap: 40.0, security: "MAXIMUM SECURITY", tier: "A+" },
  { rank: 6, symbol: "VBLK", name: "VALOR Block", price: 18500.00, marketCap: 37.0, security: "BLOCKCHAIN", tier: "A+" },
  { rank: 7, symbol: "DBLK", name: "DARK BLOCK", price: 17250.00, marketCap: 34.5, security: "DARK OPERATIONS", tier: "A+" },
  { rank: 8, symbol: "VGOV", name: "VALOR Gov", price: 13600.00, marketCap: 40.8, security: "GOVERNANCE", tier: "A+" },
  { rank: 9, symbol: "VALX", name: "VALOR X", price: 15000.00, marketCap: 30.0, security: "VALOR EXTENDED", tier: "A+" },
  { rank: 10, symbol: "FLM", name: "FIRE FLAME", price: 14400.00, marketCap: 28.8, security: "FIRE PROTOCOL", tier: "A+" },
  
  // TIER 2: QUANTUM VAULT (11-20)
  { rank: 11, symbol: "SGAU", name: "SGAU Quantum Vault", price: 7700.00, marketCap: 23.1, security: "QUANTUM VAULT", tier: "A+" },
  { rank: 12, symbol: "SKROLL", name: "Scroll Protocol", price: 4800.00, marketCap: 24.0, security: "SCROLL", tier: "A" },
  { rank: 13, symbol: "SKOLL", name: "Skoll Protocol", price: 4600.00, marketCap: 23.0, security: "SKOLL", tier: "A" },
  { rank: 14, symbol: "VSoul", name: "Soul Binding", price: 4000.00, marketCap: 20.0, security: "SOULBOUND", tier: "A" },
  { rank: 15, symbol: "SOUL", name: "Soul Matrix", price: 3800.00, marketCap: 19.0, security: "SOULBOUND", tier: "A" },
  { rank: 16, symbol: "VDAO", name: "DAO Protocol", price: 6660.00, marketCap: 33.3, security: "DAO", tier: "A+" },
  { rank: 17, symbol: "FLR", name: "Flare Protocol", price: 3120.00, marketCap: 15.6, security: "FLARE", tier: "A" },
  { rank: 18, symbol: "SKROL", name: "Immutable Ledger", price: 3120.00, marketCap: 15.6, security: "IMMUTABLE", tier: "A" },
  { rank: 19, symbol: "VALOR", name: "VALOR", price: 250.00, marketCap: 15.0, security: "OPERATION DAVID", tier: "A+" },
  { rank: 20, symbol: "VACN", name: "VALOR ACTION", price: 1440.00, marketCap: 14.4, security: "ACTION LAYER", tier: "A" },
  
  // TIER 3: INTELLITREES (21-30)
  { rank: 21, symbol: "INTL-S", name: "IntelliTrees-S", price: 714.29, marketCap: 14.3, security: "GARY VOSS ©", tier: "A+" },
  { rank: 22, symbol: "INTL", name: "IntelliTrees", price: 536.84, marketCap: 13.4, security: "INTELLITREES™", tier: "A+" },
  { rank: 23, symbol: "VMWARE+", name: "VMWARE+", price: 553.85, marketCap: 11.1, security: "ENTERPRISE", tier: "A" },
  { rank: 24, symbol: "BRAIN+", name: "BRAIN+", price: 447.37, marketCap: 8.9, security: "NEURAL NETWORK", tier: "A" },
  { rank: 25, symbol: "EDUTAIN", name: "EDUTAIN", price: 107.89, marketCap: 8.6, security: "FEDERAL READY", tier: "A" },
  { rank: 26, symbol: "MATH+", name: "MATH+", price: 197.78, marketCap: 7.9, security: "COMPUTATIONAL", tier: "A" },
  { rank: 27, symbol: "GHOST", name: "GHOST", price: 673.08, marketCap: 6.7, security: "GHOST LAYER", tier: "A" },
  { rank: 28, symbol: "DEAD", name: "DEAD", price: 600.00, marketCap: 6.0, security: "DEAD PROTOCOL", tier: "A" },
  { rank: 29, symbol: "TIME", name: "TIME", price: 593.10, marketCap: 5.9, security: "TIME MATRIX", tier: "A" },
  { rank: 30, symbol: "DJTIME", name: "DJ TIME", price: 528.95, marketCap: 5.3, security: "DJ PROTOCOL", tier: "A" },
  
  // TIER 4: SOVEREIGN PROTECTED (31-40)
  { rank: 31, symbol: "JAXX", name: "JAXX Security", price: 264.00, marketCap: 13.2, security: "JAXX", tier: "A+" },
  { rank: 32, symbol: "NEWT", name: "NEWT Core", price: 120.00, marketCap: 6.0, security: "FORTRAN", tier: "A+" },
  { rank: 33, symbol: "DONNY", name: "DONNY", price: 80.00, marketCap: 4.0, security: "SOVEREIGN", tier: "A+" },
  { rank: 34, symbol: "INTELIT", name: "IntelliTree Registry", price: 50.00, marketCap: 2.5, security: "ENVIRONMENTAL", tier: "A" },
  { rank: 35, symbol: "FLAME", name: "Flame Validator", price: 30.00, marketCap: 1.5, security: "STAKING", tier: "A" },
  { rank: 36, symbol: "GILLGOLD", name: "Gill Gold Tracker", price: 1.00, marketCap: 5.0, security: "TRACKER", tier: "A" },
  { rank: 37, symbol: "POTTER", name: "POTTER Sovereign", price: 1.00, marketCap: 0.5, security: "SOVEREIGN", tier: "A+" },
  { rank: 38, symbol: "BRADEN168", name: "BRADEN168 Sovereign", price: 1.00, marketCap: 0.5, security: "SOVEREIGN", tier: "A+" },
  { rank: 39, symbol: "MASON", name: "MASON Sovereign", price: 1.00, marketCap: 0.5, security: "SOVEREIGN", tier: "A+" },
  { rank: 40, symbol: "POPPA", name: "POPPA Legacy", price: 1.00, marketCap: 1.0, security: "LEGACY", tier: "A+" },
  
  // TIER 5: INFRASTRUCTURE (41-50)
  { rank: 41, symbol: "AHFIR", name: "AHFIR Protocol", price: 25.00, marketCap: 1.25, security: "PROTOCOL", tier: "A" },
  { rank: 42, symbol: "APY", name: "APY Yield", price: 15.00, marketCap: 0.75, security: "YIELD", tier: "A" },
  { rank: 43, symbol: "BTC2.0", name: "BTC 2.0 Bridge", price: 500.00, marketCap: 5.0, security: "BRIDGE", tier: "A" },
  { rank: 44, symbol: "DEFCON", name: "DEFCON Security", price: 100.00, marketCap: 2.0, security: "DEFENSE", tier: "A+" },
  { rank: 45, symbol: "DID", name: "DID Identity", price: 50.00, marketCap: 1.0, security: "IDENTITY", tier: "A" },
  { rank: 46, symbol: "ENS", name: "ENS Registry", price: 75.00, marketCap: 1.5, security: "NAMING", tier: "A" },
  { rank: 47, symbol: "ERC", name: "ERC Standard", price: 40.00, marketCap: 0.8, security: "STANDARD", tier: "A" },
  { rank: 48, symbol: "KYC", name: "KYC Compliance", price: 30.00, marketCap: 0.6, security: "COMPLIANCE", tier: "A" },
  { rank: 49, symbol: "NFT", name: "NFT Provenance", price: 20.00, marketCap: 0.4, security: "PROVENANCE", tier: "A" },
  { rank: 50, symbol: "WIT777", name: "WIT777 Witness", price: 77.77, marketCap: 1.55, security: "WITNESS", tier: "A+" },
];

// Calculate totals
const TOTAL_MARKET_CAP = ALL_TOKENS.reduce((sum, t) => sum + t.marketCap, 0);
const CA_GDP = 3600; // $3.6 Trillion
const US_GDP = 27000; // $27 Trillion
const CA_GDP_PERCENT = ((TOTAL_MARKET_CAP / CA_GDP) * 100).toFixed(2);
const US_GDP_PERCENT = ((TOTAL_MARKET_CAP / US_GDP) * 100).toFixed(2);

export default function TokenRegistryPage() {
  const [selectedTier, setSelectedTier] = useState<string>("all");
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
    const matchesTier = selectedTier === "all" || token.tier === selectedTier;
    const matchesSearch = token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          token.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
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
                <p className="text-xs text-amber-700">VALUEGUARD-DG77.77X | 50 SOVEREIGN ASSETS | GDP COMPLIANT</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-amber-600">REGISTRY VERSION</div>
              <div className="text-sm font-bold text-amber-400">v14.1.1.22</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* GDP Compliance Banner */}
        <Card className="bg-gradient-to-r from-amber-950/80 via-black to-amber-950/80 border border-amber-700 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              <div className="text-xs text-amber-600 uppercase tracking-widest mb-1">Active Tokens</div>
              <div className="text-3xl font-black text-amber-500">
                50
              </div>
              <div className="text-xs text-amber-700">PURGED: 0</div>
            </div>
          </div>
        </Card>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedTier("all")}
              className={`px-4 py-2 text-sm font-bold rounded border ${
                selectedTier === "all" 
                  ? "bg-amber-500 text-black border-amber-500" 
                  : "bg-black text-amber-500 border-amber-700 hover:bg-amber-950"
              }`}
            >
              ALL ({ALL_TOKENS.length})
            </button>
            <button
              onClick={() => setSelectedTier("A+")}
              className={`px-4 py-2 text-sm font-bold rounded border ${
                selectedTier === "A+" 
                  ? "bg-green-500 text-black border-green-500" 
                  : "bg-black text-green-500 border-green-700 hover:bg-green-950"
              }`}
            >
              A+ TIER ({tierCounts["A+"]})
            </button>
            <button
              onClick={() => setSelectedTier("A")}
              className={`px-4 py-2 text-sm font-bold rounded border ${
                selectedTier === "A" 
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

        {/* Protected Assets Highlight */}
        <Card className="bg-gradient-to-r from-green-950/50 via-black to-green-950/50 border border-green-700 p-6">
          <h2 className="text-lg font-black text-green-400 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            SOVEREIGN PROTECTED ASSETS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["JAXX", "POPPA", "DONNY", "POTTER", "BRADEN168", "MASON", "GILLGOLD", "GILLBTC", "NEWT", "FLAME"].map((symbol) => {
              const token = ALL_TOKENS.find(t => t.symbol === symbol);
              return token ? (
                <div key={symbol} className="bg-black/50 border border-green-800 rounded p-3 text-center">
                  <div className="text-lg font-black text-green-400">${token.symbol}</div>
                  <div className="text-xs text-green-600">{token.security}</div>
                  <div className="text-xs text-green-700 mt-1">IMMUTABLE</div>
                </div>
              ) : null;
            })}
          </div>
        </Card>

        {/* Registry Metadata */}
        <Card className="bg-black border border-amber-900/50 p-6">
          <h2 className="text-lg font-black text-amber-500 mb-4 flex items-center gap-2">
            <Database className="w-5 h-5" />
            REGISTRY METADATA
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="text-amber-700 mb-2">BLOCKCHAIN ANCHORS</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-amber-600">BTC Block:</span>
                  <span className="text-amber-400 font-mono">#847,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-600">ETH Block:</span>
                  <span className="text-amber-400 font-mono">#19,847,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-600">Sepolia:</span>
                  <span className="text-amber-400 font-mono">DEG1969</span>
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
                  <span className="text-amber-600">Validators:</span>
                  <span className="text-green-400">144,000 / 144,000</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-amber-700 mb-2">COMPLIANCE</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-amber-600">UBI Escrow:</span>
                  <span className="text-green-400">ACTIVE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-600">TAC Status:</span>
                  <span className="text-green-400">OPERATIONAL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-600">Post-Quantum:</span>
                  <span className="text-green-400">ENABLED</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Timestamp Footer */}
        <div className="text-center text-xs text-amber-700 space-y-1">
          <div>VALORAIPLUS_50_TOKEN_REGISTRY_CONFIRMED_v14.1.1.22</div>
          <div>[Total: 50 | Active: 50 | Purged: 0 | Ruler: VALUEGUARD-DG77.77X]</div>
          <div className="text-amber-600">{timestamp}</div>
          <div className="text-amber-500 font-bold mt-2">THE LEDGER IS 0. THE PURGE IS ABSOLUTE.</div>
        </div>
      </main>
    </div>
  );
}
