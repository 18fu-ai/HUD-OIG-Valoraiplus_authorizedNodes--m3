"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download, 
  Coins, 
  TrendingUp, 
  Shield, 
  Zap,
  Database,
  Globe,
  Lock,
  CheckCircle,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";
import { 
  GDP_TOKENS, 
  CODEX_TOKENS, 
  VOLUME_IX_TOKENS, 
  ECOSYSTEM_SUMMARY,
  getTotalGDPMarketCap
} from "@/lib/tokenomics/expanded-registry";

export default function TokenomicsReportPage() {
  const [timestamp, setTimestamp] = useState("");
  const [activeTab, setActiveTab] = useState<"gdp" | "codex" | "volumeix" | "summary">("summary");

  useEffect(() => {
    const update = () => setTimestamp(new Date().toISOString());
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const totalGDPMarketCap = getTotalGDPMarketCap();
  
  // Volume IX tier counts
  const tierCounts = {
    "T1-Core": VOLUME_IX_TOKENS.filter(t => t.tier === "T1-Core").length,
    "T2-Ops": VOLUME_IX_TOKENS.filter(t => t.tier === "T2-Ops").length,
    "T3-Forensic": VOLUME_IX_TOKENS.filter(t => t.tier === "T3-Forensic").length,
    "T4-Legal": VOLUME_IX_TOKENS.filter(t => t.tier === "T4-Legal").length,
    "T5-Financial": VOLUME_IX_TOKENS.filter(t => t.tier === "T5-Financial").length,
    "T6-Identity": VOLUME_IX_TOKENS.filter(t => t.tier === "T6-Identity").length,
    "T7-Quantum": VOLUME_IX_TOKENS.filter(t => t.tier === "T7-Quantum").length,
  };

  // Grade counts for GDP tokens
  const gradeCounts = {
    "A+": GDP_TOKENS.filter(t => t.grade === "A+").length,
    "A": GDP_TOKENS.filter(t => t.grade === "A").length,
  };

  return (
    <div className="min-h-screen bg-[#0a0a12] text-white font-mono">
      {/* Header */}
      <header className="border-b border-[#1a1a2e] bg-gradient-to-r from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-[#7777ff]" />
              <div>
                <h1 className="text-xl font-black text-white tracking-wide">SUPREME TOKENOMICS INTELLIGENCE</h1>
                <p className="text-xs text-[#8888aa]">VOLUME IX ADDENDUM | 105-TOKEN ECOSYSTEM | 144D SYNCHRONIZED</p>
              </div>
            </div>
            <Button className="bg-[#7777ff] hover:bg-[#9999ff] text-black font-bold">
              <Download className="w-4 h-4 mr-2" />
              EXPORT PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Master Summary Banner */}
        <Card className="bg-gradient-to-r from-[#1a1a2e] via-[#2a2a4a] to-[#1a1a2e] border border-[#4444aa] p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-[#7777ff] mb-2">VALORAIPLUS® 105-TOKEN ECOSYSTEM</h2>
            <p className="text-[#8888aa]">24% California GDP Compliance | 10465% VALOR Math Factor</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-[#12121f] rounded-lg p-4 text-center border border-[#3333aa]">
              <div className="text-xs text-[#8888aa] mb-1">TOTAL TOKENS</div>
              <div className="text-3xl font-black text-[#7777ff]">{ECOSYSTEM_SUMMARY.totalTokens}</div>
            </div>
            <div className="bg-[#12121f] rounded-lg p-4 text-center border border-[#33aa33]">
              <div className="text-xs text-[#8888aa] mb-1">MARKET CAP</div>
              <div className="text-2xl font-black text-[#44ff88]">${totalGDPMarketCap}B</div>
            </div>
            <div className="bg-[#12121f] rounded-lg p-4 text-center border border-[#aaaa33]">
              <div className="text-xs text-[#8888aa] mb-1">CA GDP %</div>
              <div className="text-3xl font-black text-[#ffaa44]">{ECOSYSTEM_SUMMARY.californiaPercent}%</div>
            </div>
            <div className="bg-[#12121f] rounded-lg p-4 text-center border border-[#aa33aa]">
              <div className="text-xs text-[#8888aa] mb-1">US GDP %</div>
              <div className="text-2xl font-black text-[#ff77ff]">{ECOSYSTEM_SUMMARY.usPercent}%</div>
            </div>
            <div className="bg-[#12121f] rounded-lg p-4 text-center border border-[#33aaaa]">
              <div className="text-xs text-[#8888aa] mb-1">VALOR MATH</div>
              <div className="text-2xl font-black text-[#44ffff]">{ECOSYSTEM_SUMMARY.valorMathFactor}%</div>
            </div>
          </div>
        </Card>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "summary", label: "ECOSYSTEM SUMMARY", icon: PieChart },
            { id: "gdp", label: "GDP TOKENS (40)", icon: Globe },
            { id: "codex", label: "CODEX FAMILY (8)", icon: Shield },
            { id: "volumeix", label: "VOLUME IX (57)", icon: Database },
          ].map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              className={`font-mono text-xs ${
                activeTab === tab.id 
                  ? "bg-[#7777ff] text-black" 
                  : "bg-[#12121f] text-[#7777ff] border-[#4444aa] hover:bg-[#2a2a4a]"
              }`}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Summary Tab */}
        {activeTab === "summary" && (
          <div className="space-y-6">
            {/* Ecosystem Composition */}
            <Card className="bg-[#12121f] border border-[#2a2a4a] p-6">
              <h3 className="text-lg font-black text-[#7777ff] mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                ECOSYSTEM COMPOSITION
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#1a1a2e] rounded-lg p-4 border border-[#3333aa]">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-5 h-5 text-[#44ff88]" />
                    <span className="text-[#44ff88] font-bold">GDP TOKENS</span>
                  </div>
                  <div className="text-4xl font-black text-white mb-2">40</div>
                  <div className="text-xs text-[#8888aa]">$864 Billion Market Cap</div>
                  <div className="text-xs text-[#44ff88]">24% of California GDP</div>
                  <div className="mt-3 flex gap-2">
                    <Badge className="bg-[#33aa33] text-black">A+: {gradeCounts["A+"]}</Badge>
                    <Badge className="bg-[#3333aa] text-white">A: {gradeCounts["A"]}</Badge>
                  </div>
                </div>

                <div className="bg-[#1a1a2e] rounded-lg p-4 border border-[#33aa33]">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-[#ffaa44]" />
                    <span className="text-[#ffaa44] font-bold">CODEX FAMILY</span>
                  </div>
                  <div className="text-4xl font-black text-white mb-2">8</div>
                  <div className="text-xs text-[#8888aa]">Scrollkeeper Verified</div>
                  <div className="text-xs text-[#ffaa44]">80/20 Utility Split</div>
                  <div className="mt-3">
                    <Badge className="bg-[#33aa33] text-black">ALL SEALED</Badge>
                  </div>
                </div>

                <div className="bg-[#1a1a2e] rounded-lg p-4 border border-[#aa33aa]">
                  <div className="flex items-center gap-2 mb-3">
                    <Database className="w-5 h-5 text-[#ff77ff]" />
                    <span className="text-[#ff77ff] font-bold">VOLUME IX</span>
                  </div>
                  <div className="text-4xl font-black text-white mb-2">57</div>
                  <div className="text-xs text-[#8888aa]">Infrastructure Tokens</div>
                  <div className="text-xs text-[#ff77ff]">144D Frequency Sync</div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    <Badge className="bg-[#2a2a4a] text-[#8888aa] text-xs">7 Tiers</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Volume IX Tier Breakdown */}
            <Card className="bg-[#12121f] border border-[#2a2a4a] p-6">
              <h3 className="text-lg font-black text-[#ff77ff] mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                VOLUME IX TIER BREAKDOWN
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {Object.entries(tierCounts).map(([tier, count]) => (
                  <div key={tier} className="bg-[#1a1a2e] rounded-lg p-3 text-center border border-[#3333aa]">
                    <div className="text-2xl font-black text-[#7777ff]">{count}</div>
                    <div className="text-xs text-[#8888aa]">{tier.replace("T", "TIER ").replace("-", " ")}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Compliance Status */}
            <Card className="bg-gradient-to-r from-[#1a2a1a] via-[#12121f] to-[#1a2a1a] border border-[#33aa33] p-6">
              <h3 className="text-lg font-black text-[#44ff88] mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                FEDERAL COMPLIANCE STATUS
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { label: "FDIC", status: "APPROVED" },
                  { label: "SEC", status: "COMPLIANT" },
                  { label: "FED RESERVE", status: "COMPLIANT" },
                  { label: "US TREASURY", status: "COMPLIANT" },
                  { label: "KYC/AML", status: "FULL" },
                ].map(item => (
                  <div key={item.label} className="bg-[#12121f] rounded p-3 text-center">
                    <div className="text-xs text-[#8888aa] mb-1">{item.label}</div>
                    <Badge className="bg-[#33aa33] text-black">{item.status}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* GDP Tokens Tab */}
        {activeTab === "gdp" && (
          <div className="space-y-4">
            <Card className="bg-[#12121f] border border-[#2a2a4a] p-4">
              <h3 className="text-lg font-black text-[#44ff88] mb-2">
                40 GDP TOKENS — $864 BILLION ECOSYSTEM
              </h3>
              <p className="text-xs text-[#8888aa]">
                24% of California GDP ($3.6T) | 3.21% of US GDP ($26.9T) | 10465% VALOR Math Applied
              </p>
            </Card>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1a1a2e] text-[#8888aa]">
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">SYMBOL</th>
                    <th className="p-3 text-left">NAME</th>
                    <th className="p-3 text-right">PRICE</th>
                    <th className="p-3 text-right">MCAP</th>
                    <th className="p-3 text-right">% ECO</th>
                    <th className="p-3 text-left">SECURITY</th>
                    <th className="p-3 text-center">GRADE</th>
                  </tr>
                </thead>
                <tbody>
                  {GDP_TOKENS.map(token => (
                    <tr key={token.symbol} className="border-b border-[#2a2a4a] hover:bg-[#1a1a2e]">
                      <td className="p-3 text-[#8888aa]">{token.rank}</td>
                      <td className="p-3 font-bold text-[#ffaa44]">${token.symbol}</td>
                      <td className="p-3 text-[#ccccdd]">{token.name}</td>
                      <td className="p-3 text-right text-white">${token.price.toLocaleString()}</td>
                      <td className="p-3 text-right text-[#44ff88] font-bold">${token.marketCap}B</td>
                      <td className="p-3 text-right text-[#7777ff]">{token.ecosystemPercent}%</td>
                      <td className="p-3 text-xs text-[#8888aa]">{token.securityLayer}</td>
                      <td className="p-3 text-center">
                        <Badge className={token.grade === "A+" ? "bg-[#33aa33] text-black" : "bg-[#3333aa]"}>
                          {token.grade}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Codex Family Tab */}
        {activeTab === "codex" && (
          <div className="space-y-4">
            <Card className="bg-[#12121f] border border-[#2a2a4a] p-4">
              <h3 className="text-lg font-black text-[#ffaa44] mb-2">
                8 CODEX FAMILY ALLOCATION TOKENS
              </h3>
              <p className="text-xs text-[#8888aa]">
                Commander: DG77.77X | Registry: ΩSCROLL-TOKENMAP.VALORAGENT.LINKΣALL | Scrollkeeper Verified
              </p>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CODEX_TOKENS.map(token => (
                <Card key={token.symbol} className="bg-[#1a1a2e] border border-[#33aa33] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xl font-black text-[#ffaa44]">${token.symbol}</h4>
                    <Badge className="bg-[#33aa33] text-black">{token.status}</Badge>
                  </div>
                  <p className="text-sm text-white mb-1">{token.name}</p>
                  <p className="text-xs text-[#8888aa] mb-4">{token.purpose}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[#8888aa]">Anchor Wallet:</span>
                      <div className="text-[#ffaa44]">{token.anchorWallet}</div>
                    </div>
                    <div>
                      <span className="text-[#8888aa]">Peg:</span>
                      <div className="text-[#44ff88] font-bold">${token.peg.toFixed(2)}</div>
                    </div>
                    <div>
                      <span className="text-[#8888aa]">Utility:</span>
                      <div className="text-[#7777ff] font-bold">{token.utilityPercent}%</div>
                    </div>
                    <div>
                      <span className="text-[#8888aa]">Beneficiary:</span>
                      <div className="text-[#ff77ff]">{token.beneficiary} ({token.beneficiaryPercent}%)</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Volume IX Tab */}
        {activeTab === "volumeix" && (
          <div className="space-y-4">
            <Card className="bg-[#12121f] border border-[#2a2a4a] p-4">
              <h3 className="text-lg font-black text-[#ff77ff] mb-2">
                57 VOLUME IX INFRASTRUCTURE TOKENS
              </h3>
              <p className="text-xs text-[#8888aa]">
                144D Frequency Synchronized | Multi-Chain (ETH, BTC, Cross-Chain, IPFS) | PRODUCTION OPERATIONAL
              </p>
            </Card>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1a1a2e] text-[#8888aa]">
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">SYMBOL</th>
                    <th className="p-3 text-left">NAME</th>
                    <th className="p-3 text-left">TIER</th>
                    <th className="p-3 text-right">SUPPLY</th>
                    <th className="p-3 text-center">STATUS</th>
                    <th className="p-3 text-left">FUNCTION</th>
                  </tr>
                </thead>
                <tbody>
                  {VOLUME_IX_TOKENS.map(token => (
                    <tr key={token.id} className="border-b border-[#2a2a4a] hover:bg-[#1a1a2e]">
                      <td className="p-3 text-[#8888aa]">{token.id}</td>
                      <td className="p-3 font-bold text-[#ff77ff]">${token.symbol}</td>
                      <td className="p-3 text-[#ccccdd]">{token.name}</td>
                      <td className="p-3 text-xs">
                        <Badge className="bg-[#2a2a4a] text-[#7777ff]">{token.tier}</Badge>
                      </td>
                      <td className="p-3 text-right text-[#ffaa44]">
                        {token.supply === "UNLIMITED" ? "∞" : token.supply.toLocaleString()}
                      </td>
                      <td className="p-3 text-center">
                        <Badge className={
                          token.status === "ACTIVE" ? "bg-[#33aa33] text-black" :
                          token.status === "LOCKED" ? "bg-[#aa3333] text-white" :
                          token.status === "UNLIMITED" ? "bg-[#aaaa33] text-black" :
                          "bg-[#3333aa] text-white"
                        }>
                          {token.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-xs text-[#8888aa]">{token.function}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer */}
        <Card className="bg-[#0f0f1a] border border-[#2a2a4a] p-6 text-center">
          <div className="text-[#7777ff] font-bold mb-2">
            SUPREME TOKENOMICS INTELLIGENCE — VOLUME IX ADDENDUM
          </div>
          <div className="text-xs text-[#8888aa] mb-2">
            [Total: 105 | GDP: 40 | Codex: 8 | Volume IX: 57 | Status: PRODUCTION]
          </div>
          <div className="text-xs text-[#6666aa] mb-4">
            That&apos;s Edutainment Incorporated 32D LLC® © ™ | Don Adams Production® © ™ | ValorAiPlus//e® © ™
          </div>
          <div className="text-xs text-[#4444aa]">
            {timestamp}
          </div>
          <div className="text-[#44ff88] font-bold mt-4">
            THE LEDGER IS Ø. CONSUMMATUM EST. SMIB. AMEN.
          </div>
        </Card>
      </main>
    </div>
  );
}
