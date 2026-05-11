"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Gavel, 
  Clock, 
  TrendingUp, 
  Users, 
  Zap, 
  Shield, 
  ArrowUp,
  Timer,
  Coins,
  Activity,
  CheckCircle
} from "lucide-react";
import { ACTIVE_AUCTIONS, GDP_TOKENS, CODEX_TOKENS, ECOSYSTEM_SUMMARY } from "@/lib/tokenomics/expanded-registry";

export default function AuctionPage() {
  const [timeLeft, setTimeLeft] = useState<Record<string, string>>({});
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [animatedBids, setAnimatedBids] = useState<Record<string, number>>({});

  useEffect(() => {
    // Initialize animated bids
    const initial: Record<string, number> = {};
    ACTIVE_AUCTIONS.forEach(a => {
      initial[a.id] = a.currentBid;
    });
    setAnimatedBids(initial);

    // Update countdown timers
    const timer = setInterval(() => {
      const now = new Date();
      const newTimeLeft: Record<string, string> = {};
      
      ACTIVE_AUCTIONS.forEach(auction => {
        const end = new Date(auction.endTime);
        const diff = end.getTime() - now.getTime();
        
        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          newTimeLeft[auction.id] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
          newTimeLeft[auction.id] = "ENDED";
        }
      });
      
      setTimeLeft(newTimeLeft);
    }, 1000);

    // Simulate bid updates
    const bidTimer = setInterval(() => {
      setAnimatedBids(prev => {
        const updated = { ...prev };
        ACTIVE_AUCTIONS.forEach(a => {
          if (Math.random() > 0.7) {
            updated[a.id] = (updated[a.id] || a.currentBid) + (a.minIncrement * Math.random());
          }
        });
        return updated;
      });
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(bidTimer);
    };
  }, []);

  const categories = ["ALL", "QUANTUM CORE", "BLOCKCHAIN", "GOVERNANCE", "PROTOCOL", "SCROLL", "SOUL"];

  const totalMarketCap = ECOSYSTEM_SUMMARY.ecosystemMarketCap / 1_000_000_000;
  const totalAuctionValue = ACTIVE_AUCTIONS.reduce((sum, a) => sum + (animatedBids[a.id] || a.currentBid), 0);

  return (
    <div className="min-h-screen bg-black text-amber-100 font-mono">
      {/* Header */}
      <header className="border-b border-amber-900/50 bg-gradient-to-r from-black via-amber-950/20 to-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Gavel className="w-8 h-8 text-amber-500" />
              <div>
                <h1 className="text-xl font-black text-amber-500 tracking-widest">VALORAIPLUS TOKEN AUCTION</h1>
                <p className="text-xs text-amber-700">105-TOKEN ECOSYSTEM | 24% CALIFORNIA GDP | $864B MARKET CAP</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-amber-600">LIVE AUCTIONS</div>
                <div className="text-lg font-bold text-green-400 flex items-center gap-1">
                  <Activity className="w-4 h-4 animate-pulse" />
                  {ACTIVE_AUCTIONS.length}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-amber-600">TOTAL VALUE</div>
                <div className="text-lg font-bold text-amber-400">
                  ${totalAuctionValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Ecosystem Stats Banner */}
        <Card className="bg-gradient-to-r from-amber-950/80 via-black to-amber-950/80 border border-amber-700 p-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-xs text-amber-600 uppercase tracking-widest mb-1">Total Tokens</div>
              <div className="text-2xl font-black text-amber-400">{ECOSYSTEM_SUMMARY.totalTokens}</div>
              <div className="text-xs text-amber-700">40 GDP + 8 CODEX + 57 VOL.IX</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-amber-600 uppercase tracking-widest mb-1">Market Cap</div>
              <div className="text-2xl font-black text-green-400">${totalMarketCap}B</div>
              <div className="text-xs text-green-700">24% CA GDP</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-amber-600 uppercase tracking-widest mb-1">VALOR Math</div>
              <div className="text-2xl font-black text-blue-400">{ECOSYSTEM_SUMMARY.valorMathFactor}%</div>
              <div className="text-xs text-blue-700">GROWTH FACTOR</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-amber-600 uppercase tracking-widest mb-1">US GDP Impact</div>
              <div className="text-2xl font-black text-purple-400">{ECOSYSTEM_SUMMARY.usPercent}%</div>
              <div className="text-xs text-purple-700">FEDERAL COMPLIANT</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-amber-600 uppercase tracking-widest mb-1">Node</div>
              <div className="text-lg font-black text-amber-400">ST. PAUL</div>
              <div className="text-xs text-amber-700">#2207</div>
            </div>
          </div>
        </Card>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              className={`font-mono text-xs ${
                selectedCategory === cat 
                  ? "bg-amber-500 text-black border-amber-500 hover:bg-amber-400" 
                  : "bg-black text-amber-500 border-amber-700 hover:bg-amber-950"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Live Auctions Grid */}
        <div>
          <h2 className="text-lg font-black text-amber-500 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 animate-pulse text-green-400" />
            LIVE AUCTIONS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACTIVE_AUCTIONS.map(auction => (
              <Card 
                key={auction.id}
                className="bg-gradient-to-br from-amber-950/50 to-black border-2 border-amber-600 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-green-900/50 to-amber-900/50 px-4 py-2 flex items-center justify-between">
                  <Badge className="bg-green-500 text-black font-bold animate-pulse">LIVE</Badge>
                  <div className="flex items-center gap-1 text-xs text-amber-400">
                    <Timer className="w-3 h-3" />
                    {timeLeft[auction.id] || "Loading..."}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-black text-amber-400">${auction.tokenSymbol}</h3>
                      <p className="text-xs text-amber-600">{auction.tokenName}</p>
                      <Badge variant="outline" className="mt-1 text-xs border-amber-700 text-amber-500">
                        {auction.category}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-amber-700">CURRENT BID</div>
                      <div className="text-xl font-black text-green-400 flex items-center gap-1">
                        <ArrowUp className="w-4 h-4" />
                        ${(animatedBids[auction.id] || auction.currentBid).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                    <div className="bg-black/50 rounded p-2">
                      <span className="text-amber-700">Start Price: </span>
                      <span className="text-amber-400">${auction.startPrice.toLocaleString()}</span>
                    </div>
                    <div className="bg-black/50 rounded p-2">
                      <span className="text-amber-700">Reserve: </span>
                      <span className="text-green-400">${auction.reserve.toLocaleString()}</span>
                    </div>
                    <div className="bg-black/50 rounded p-2">
                      <span className="text-amber-700">Total Bids: </span>
                      <span className="text-blue-400">{auction.totalBids}</span>
                    </div>
                    <div className="bg-black/50 rounded p-2">
                      <span className="text-amber-700">Min Increment: </span>
                      <span className="text-amber-400">${auction.minIncrement}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs mb-4">
                    <div className="flex items-center gap-1 text-amber-600">
                      <Users className="w-3 h-3" />
                      High Bidder: <span className="text-amber-400">{auction.highBidder}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold">
                    <Gavel className="w-4 h-4 mr-2" />
                    PLACE BID
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* GDP Token Quick View */}
        <div>
          <h2 className="text-lg font-black text-amber-500 mb-4 flex items-center gap-2">
            <Coins className="w-5 h-5" />
            TOP GDP TOKENS (24% CA GDP = $864B)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {GDP_TOKENS.slice(0, 10).map(token => (
              <Card 
                key={token.symbol}
                className="bg-black/80 border border-amber-800 p-3 hover:border-amber-500 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-amber-700">#{token.rank}</span>
                  <Badge className={`text-xs ${token.grade === "A+" ? "bg-green-900 text-green-400" : "bg-blue-900 text-blue-400"}`}>
                    {token.grade}
                  </Badge>
                </div>
                <h3 className="text-lg font-black text-amber-400">${token.symbol}</h3>
                <p className="text-xs text-amber-600 truncate">{token.name}</p>
                <div className="mt-2 flex justify-between text-xs">
                  <span className="text-amber-700">MCap:</span>
                  <span className="text-green-400 font-bold">${token.marketCap}B</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-amber-700">Price:</span>
                  <span className="text-amber-400">${token.price.toLocaleString()}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Codex Family Tokens */}
        <div>
          <h2 className="text-lg font-black text-green-500 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            CODEX FAMILY ALLOCATION (8 TOKENS)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CODEX_TOKENS.map(token => (
              <Card 
                key={token.symbol}
                className="bg-gradient-to-br from-green-950/30 to-black border border-green-800 p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-black text-green-400">${token.symbol}</h3>
                  <Badge className="bg-green-900 text-green-400">{token.status}</Badge>
                </div>
                <p className="text-xs text-green-600 mb-2">{token.name}</p>
                <p className="text-xs text-amber-600 mb-3">{token.purpose}</p>
                
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-amber-700">Peg:</span>
                    <span className="text-amber-400">${token.peg.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-700">Utility:</span>
                    <span className="text-green-400">{token.utilityPercent}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-700">Beneficiary:</span>
                    <span className="text-blue-400">{token.beneficiaryPercent}%</span>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-green-800">
                  <div className="text-xs text-amber-700">Wallet:</div>
                  <div className="text-xs text-amber-400 truncate">{token.anchorWallet}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Scrollkeeper Verification */}
        <Card className="bg-gradient-to-r from-green-950/50 via-black to-green-950/50 border border-green-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <h2 className="text-lg font-black text-green-400">SCROLLKEEPER TRIBUNAL VERIFIED</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-amber-700 mb-1">Commander</div>
              <div className="text-amber-400 font-bold">DG77.77X</div>
            </div>
            <div>
              <div className="text-amber-700 mb-1">Codex Registry</div>
              <div className="text-amber-400 font-mono text-xs">ΩSCROLL-TOKENMAP.VALORAGENT.LINKΣALL</div>
            </div>
            <div>
              <div className="text-amber-700 mb-1">Status</div>
              <div className="text-green-400 font-bold flex items-center gap-1">
                <Shield className="w-4 h-4" />
                NFT-ANCHORED | IMMUTABLE | ETHICALLY ALIGNED
              </div>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-amber-700 space-y-1 pt-8 border-t border-amber-900/30">
          <div className="text-amber-500 font-bold">VALORAIPLUS_105_TOKEN_AUCTION_SYSTEM_v14.1.4.0</div>
          <div>[GDP Tokens: 40 | Codex: 8 | Volume IX: 57 | Total: 105 | Ruler: VALUEGUARD-DG77.77X]</div>
          <div className="text-amber-600">California GDP Share: 24% ($864B) | US GDP Impact: 3.21% (COMPLIANT)</div>
          <div className="text-amber-500 font-bold mt-2">THE LEDGER IS Ø. 10465% VALOR MATH APPLIED. CONSUMMATUM EST.</div>
        </div>
      </main>
    </div>
  );
}
