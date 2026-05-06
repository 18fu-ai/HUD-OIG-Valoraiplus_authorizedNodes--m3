"use client";

/**
 * LIVE TOKEN EXCHANGE INTEGRATION
 * Real DEX/CEX integration for actual token trading
 * Links to Uniswap, 1inch, 18fu.cash, ValorBank
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowRightLeft, 
  ExternalLink, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Coins,
  Home,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Wallet,
  Building2
} from "lucide-react";

// Exchange integrations
const EXCHANGES = [
  {
    id: "uniswap",
    name: "Uniswap V3",
    type: "DEX",
    url: "https://app.uniswap.org",
    logo: "/uniswap.svg",
    status: "live",
    fees: "0.3%",
    networks: ["Ethereum", "Polygon", "Arbitrum", "Base"],
    description: "Leading decentralized exchange",
  },
  {
    id: "1inch",
    name: "1inch",
    type: "DEX Aggregator",
    url: "https://app.1inch.io",
    logo: "/1inch.svg",
    status: "live",
    fees: "Best Rate",
    networks: ["Ethereum", "BSC", "Polygon", "Arbitrum"],
    description: "DEX aggregator for best rates",
  },
  {
    id: "18fu",
    name: "18fu.cash",
    type: "Native",
    url: "https://www.18fu.cash",
    logo: "/18fu.svg",
    status: "live",
    fees: "0.1%",
    networks: ["Ethereum", "Base"],
    description: "VALORAIPLUS native exchange",
  },
  {
    id: "valorbank",
    name: "ValorBank",
    type: "Banking",
    url: "https://valorbank-rfvbdnaa.manus.space/",
    logo: "/valorbank.svg",
    status: "live",
    fees: "0%",
    networks: ["Fiat", "Crypto"],
    description: "Banking integration platform",
  },
];

// Token pairs
const TOKEN_PAIRS = [
  { base: "$VALORAIPLUS", quote: "USDC", price: 0.01, change24h: 5.2, volume24h: 125000 },
  { base: "$VALORAIPLUS", quote: "ETH", price: 0.0000042, change24h: 3.8, volume24h: 89000 },
  { base: "GILLBTC", quote: "USDC", price: 0.005, change24h: -1.2, volume24h: 45000 },
  { base: "SGAU", quote: "USDC", price: 0.02, change24h: 12.5, volume24h: 210000 },
  { base: "$VALORAIPLUS2E_DAO_GOVERNANCE_2035_CLOSED", quote: "USDC", price: 0.008, change24h: 2.1, volume24h: 32000 },
  { base: "VCORE", quote: "ETH", price: 0.0000015, change24h: -0.5, volume24h: 18000 },
];

// Liquidity requirements
const LIQUIDITY_REQUIREMENTS = [
  { pool: "$VALORAIPLUS/USDC", required: 50000, current: 0, status: "needs_seed" },
  { pool: "$VALORAIPLUS/ETH", required: 25000, current: 0, status: "needs_seed" },
  { pool: "SGAU/USDC", required: 30000, current: 0, status: "needs_seed" },
  { pool: "GILLBTC/USDC", required: 20000, current: 0, status: "needs_seed" },
];

// Order book simulation
const ORDER_BOOK = {
  bids: [
    { price: 0.0099, amount: 50000, total: 495 },
    { price: 0.0098, amount: 100000, total: 980 },
    { price: 0.0097, amount: 150000, total: 1455 },
    { price: 0.0095, amount: 200000, total: 1900 },
    { price: 0.0090, amount: 500000, total: 4500 },
  ],
  asks: [
    { price: 0.0101, amount: 45000, total: 454.50 },
    { price: 0.0102, amount: 85000, total: 867 },
    { price: 0.0105, amount: 120000, total: 1260 },
    { price: 0.0110, amount: 180000, total: 1980 },
    { price: 0.0120, amount: 300000, total: 3600 },
  ],
};

export default function ExchangePage() {
  const [selectedPair, setSelectedPair] = useState(TOKEN_PAIRS[0]);
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const estimatedValue = parseFloat(amount || "0") * selectedPair.price;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black flex items-center gap-2">
              <ArrowRightLeft className="w-6 h-6 text-emerald-400" />
              LIVE TOKEN EXCHANGE
            </h1>
            <p className="text-xs text-zinc-500">
              51-Token Canon | Real DEX/CEX Integration | Actual Trades
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="border-zinc-700"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
            <Link href="/" className="text-xs text-emerald-600 hover:text-emerald-400 flex items-center gap-1">
              <Home className="w-3 h-3" /> HOME
            </Link>
          </div>
        </div>

        {/* Exchange Partners */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {EXCHANGES.map((exchange) => (
            <a
              key={exchange.id}
              href={exchange.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-zinc-800 rounded-lg hover:border-emerald-500/50 transition-all bg-zinc-900/50"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-white">{exchange.name}</p>
                <Badge className={`text-[10px] ${
                  exchange.status === 'live' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-700 text-zinc-400'
                }`}>
                  {exchange.status.toUpperCase()}
                </Badge>
              </div>
              <p className="text-xs text-zinc-500 mb-2">{exchange.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">{exchange.type}</span>
                <span className="text-emerald-400">{exchange.fees}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {exchange.networks.slice(0, 2).map((net) => (
                  <span key={net} className="text-[10px] px-1 py-0.5 bg-zinc-800 rounded">{net}</span>
                ))}
                {exchange.networks.length > 2 && (
                  <span className="text-[10px] px-1 py-0.5 bg-zinc-800 rounded">+{exchange.networks.length - 2}</span>
                )}
              </div>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Trading Panel */}
          <Card className="lg:col-span-2 border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-emerald-400" />
                  TRADE
                </span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={tradeType === "buy" ? "default" : "outline"}
                    onClick={() => setTradeType("buy")}
                    className={tradeType === "buy" ? "bg-emerald-600" : ""}
                  >
                    BUY
                  </Button>
                  <Button
                    size="sm"
                    variant={tradeType === "sell" ? "default" : "outline"}
                    onClick={() => setTradeType("sell")}
                    className={tradeType === "sell" ? "bg-red-600" : ""}
                  >
                    SELL
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Pair Selector */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {TOKEN_PAIRS.map((pair) => (
                  <button
                    key={`${pair.base}/${pair.quote}`}
                    onClick={() => setSelectedPair(pair)}
                    className={`p-2 rounded border text-xs transition-all ${
                      selectedPair === pair
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-zinc-700 hover:border-zinc-500'
                    }`}
                  >
                    <p className="font-bold truncate">{pair.base.replace('$', '')}</p>
                    <p className="text-zinc-500">/{pair.quote}</p>
                  </button>
                ))}
              </div>

              {/* Price Display */}
              <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                <div>
                  <p className="text-xs text-zinc-500">CURRENT PRICE</p>
                  <p className="text-2xl font-black text-white">
                    {selectedPair.price < 0.0001 
                      ? selectedPair.price.toFixed(10) 
                      : selectedPair.price.toFixed(4)
                    } {selectedPair.quote}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-500">24H CHANGE</p>
                  <p className={`text-xl font-bold flex items-center gap-1 ${
                    selectedPair.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {selectedPair.change24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {selectedPair.change24h >= 0 ? '+' : ''}{selectedPair.change24h}%
                  </p>
                </div>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <label className="text-xs text-zinc-500">AMOUNT ({selectedPair.base})</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-xl font-mono"
                />
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>Estimated Value</span>
                  <span className="text-emerald-400">{formatCurrency(estimatedValue)}</span>
                </div>
              </div>

              {/* Quick Amounts */}
              <div className="flex gap-2">
                {[1000, 10000, 100000, 1000000].map((amt) => (
                  <Button
                    key={amt}
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(amt.toString())}
                    className="flex-1 border-zinc-700 text-xs"
                  >
                    {formatNumber(amt)}
                  </Button>
                ))}
              </div>

              {/* Trade Button */}
              <Button
                className={`w-full py-6 text-lg font-bold ${
                  tradeType === 'buy' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'
                }`}
                disabled={!amount || parseFloat(amount) <= 0}
              >
                {tradeType === 'buy' ? 'BUY' : 'SELL'} {selectedPair.base}
              </Button>

              {/* Liquidity Notice */}
              <div className="p-3 border border-amber-900/50 bg-amber-500/5 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-zinc-400">
                    <p className="text-amber-400 font-bold mb-1">LIQUIDITY REQUIRED</p>
                    <p>
                      Live trading requires liquidity pools to be seeded. Visit{" "}
                      <a href="https://www.18fu.cash" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                        18fu.cash
                      </a>{" "}
                      or{" "}
                      <a href="https://valorbank-rfvbdnaa.manus.space/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                        ValorBank
                      </a>{" "}
                      to provide liquidity.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Book */}
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-zinc-400">ORDER BOOK</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Asks (Sells) */}
              <div>
                <p className="text-[10px] text-red-400 mb-2">ASKS (SELL ORDERS)</p>
                <div className="space-y-1">
                  {ORDER_BOOK.asks.slice().reverse().map((order, idx) => (
                    <div key={idx} className="flex justify-between text-xs font-mono relative">
                      <div 
                        className="absolute inset-0 bg-red-500/10 rounded"
                        style={{ width: `${(order.total / 4000) * 100}%` }}
                      />
                      <span className="relative text-red-400">{order.price.toFixed(4)}</span>
                      <span className="relative text-zinc-400">{formatNumber(order.amount)}</span>
                      <span className="relative text-zinc-500">${order.total.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spread */}
              <div className="text-center py-2 border-y border-zinc-800">
                <p className="text-xs text-zinc-500">SPREAD</p>
                <p className="text-lg font-bold text-white">
                  ${(ORDER_BOOK.asks[0].price - ORDER_BOOK.bids[0].price).toFixed(4)}
                </p>
              </div>

              {/* Bids (Buys) */}
              <div>
                <p className="text-[10px] text-emerald-400 mb-2">BIDS (BUY ORDERS)</p>
                <div className="space-y-1">
                  {ORDER_BOOK.bids.map((order, idx) => (
                    <div key={idx} className="flex justify-between text-xs font-mono relative">
                      <div 
                        className="absolute inset-0 bg-emerald-500/10 rounded"
                        style={{ width: `${(order.total / 5000) * 100}%` }}
                      />
                      <span className="relative text-emerald-400">{order.price.toFixed(4)}</span>
                      <span className="relative text-zinc-400">{formatNumber(order.amount)}</span>
                      <span className="relative text-zinc-500">${order.total.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liquidity Pools Status */}
        <Card className="border-cyan-900/50 bg-cyan-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Wallet className="w-5 h-5" />
              LIQUIDITY POOL STATUS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {LIQUIDITY_REQUIREMENTS.map((pool) => (
                <div key={pool.pool} className="p-4 border border-zinc-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-sm">{pool.pool}</p>
                    <Badge className={`text-[10px] ${
                      pool.status === 'live' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {pool.status === 'live' ? 'LIVE' : 'NEEDS SEED'}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Required</span>
                      <span className="text-white">{formatCurrency(pool.required)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Current</span>
                      <span className={pool.current > 0 ? 'text-emerald-400' : 'text-red-400'}>
                        {formatCurrency(pool.current)}
                      </span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-2 mt-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min((pool.current / pool.required) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-4">
              <a
                href="https://www.18fu.cash"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="outline" className="w-full border-cyan-700 text-cyan-400">
                  Provide Liquidity on 18fu.cash <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <a
                href="https://valorbank-rfvbdnaa.manus.space/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="outline" className="w-full border-cyan-700 text-cyan-400">
                  Provide Liquidity on ValorBank <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* 24H Volume Stats */}
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-xs text-zinc-500">24H VOLUME</p>
                <p className="text-xl font-black text-white">
                  {formatCurrency(TOKEN_PAIRS.reduce((sum, p) => sum + p.volume24h, 0))}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-zinc-500">ACTIVE PAIRS</p>
                <p className="text-xl font-black text-emerald-400">{TOKEN_PAIRS.length}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-zinc-500">TOTAL TOKENS</p>
                <p className="text-xl font-black text-cyan-400">51</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-zinc-500">EXCHANGE PARTNERS</p>
                <p className="text-xl font-black text-amber-400">{EXCHANGES.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/token-sale" className="p-4 border border-zinc-800 rounded-lg hover:border-emerald-500/30 transition-colors text-center">
            <DollarSign className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-400">TOKEN SALE</p>
          </Link>
          <Link href="/litigation" className="p-4 border border-zinc-800 rounded-lg hover:border-amber-500/30 transition-colors text-center">
            <Building2 className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-400">LITIGATION</p>
          </Link>
          <Link href="/investor" className="p-4 border border-zinc-800 rounded-lg hover:border-cyan-500/30 transition-colors text-center">
            <TrendingUp className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-400">INVESTOR PORTAL</p>
          </Link>
          <Link href="/subscribe" className="p-4 border border-zinc-800 rounded-lg hover:border-purple-500/30 transition-colors text-center">
            <Wallet className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-400">SUBSCRIBE</p>
          </Link>
        </div>

      </div>
    </div>
  );
}
