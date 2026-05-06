"use client"

import { useState } from "react"
import { Check, Copy, ExternalLink, Lock, Shield, Wallet, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

/**
 * VALORAIPLUS TOKEN SALE // USDC Payment Gateway
 * 50-Token Canon Direct Purchase
 * SGAU 7226.3461 // NODE: SAINT PAUL 55116
 */

const SOVEREIGN_WALLET = "0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB"
const ENS_DOMAIN = "donadams1969.eth"

// External liquidity sources
const LIQUIDITY_SOURCES = {
  "18fu.cash": "https://www.18fu.cash",
  "ValorBank": "https://valorbank-rfvbdnaa.manus.space/",
}

// Sale Tiers
const SALE_TIERS = [
  {
    name: "Seed Round",
    priceUSDC: 0.001,
    minPurchase: 100,
    maxPurchase: 10000,
    bonus: 50,
    status: "ACTIVE",
    allocation: "10,000,000,000",
    sold: "0",
  },
  {
    name: "Private Round",
    priceUSDC: 0.005,
    minPurchase: 1000,
    maxPurchase: 100000,
    bonus: 25,
    status: "UPCOMING",
    allocation: "15,000,000,000",
    sold: "0",
  },
  {
    name: "Public Sale",
    priceUSDC: 0.01,
    minPurchase: 100,
    maxPurchase: 50000,
    bonus: 10,
    status: "UPCOMING",
    allocation: "25,000,000,000",
    sold: "0",
  },
]

// Available tokens for purchase (non-protected only)
const PURCHASABLE_TOKENS = [
  { symbol: "VCORE", name: "Valor Core", category: "CORE", available: "1,000,000,000" },
  { symbol: "VAI", name: "Valor AI", category: "CORE", available: "1,000,000,000" },
  { symbol: "VALOR", name: "Valor", category: "VALOR", available: "1,000,000,000" },
  { symbol: "SGAU", name: "SGAU Token", category: "ANCHOR", available: "1,000,000,000" },
  { symbol: "VGOV", name: "Valor Governance", category: "CORE", available: "1,000,000,000" },
  { symbol: "VDAO", name: "Valor DAO", category: "GOVERNANCE", available: "1,000,000,000" },
  { symbol: "VALORDAO", name: "Valor DAO Gov", category: "VALOR", available: "1,000,000,000" },
  { symbol: "BRAIN+", name: "Brain Plus", category: "BRAIN", available: "1,000,000,000" },
  { symbol: "INTELIT", name: "Intelit", category: "INTEL", available: "1,000,000,000" },
  { symbol: "GHOST", name: "Ghost", category: "SOUL", available: "1,000,000,000" },
]

export default function TokenSalePage() {
  const [selectedToken, setSelectedToken] = useState(PURCHASABLE_TOKENS[0])
  const [selectedTier, setSelectedTier] = useState(SALE_TIERS[0])
  const [usdcAmount, setUsdcAmount] = useState("")
  const [showTokenSelector, setShowTokenSelector] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  
  const tokenAmount = usdcAmount ? parseFloat(usdcAmount) / selectedTier.priceUSDC : 0
  const bonusTokens = tokenAmount * (selectedTier.bonus / 100)
  const totalTokens = tokenAmount + bonusTokens
  
  const copyAddress = () => {
    navigator.clipboard.writeText(SOVEREIGN_WALLET)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  const handlePurchase = () => {
    if (!isConnected) {
      alert("Please connect your wallet first")
      return
    }
    if (!usdcAmount || parseFloat(usdcAmount) < selectedTier.minPurchase) {
      alert(`Minimum purchase is $${selectedTier.minPurchase} USDC`)
      return
    }
    alert(`Purchase Order:\n\nToken: ${selectedToken.symbol}\nUSDC Amount: $${usdcAmount}\nTokens: ${totalTokens.toLocaleString()}\n\nSend USDC to:\n${SOVEREIGN_WALLET}\n\nNote: Tokens will be distributed after contract deployment.`)
  }
  
  const FAQ = [
    {
      q: "How do I purchase tokens?",
      a: "Connect your wallet, select a token, enter USDC amount, and complete the transaction. Tokens will be distributed after smart contract deployment."
    },
    {
      q: "What wallets are supported?",
      a: "MetaMask, WalletConnect, Coinbase Wallet, and any EVM-compatible wallet on Ethereum mainnet."
    },
    {
      q: "When will I receive my tokens?",
      a: "Tokens will be distributed within 48 hours of contract deployment on mainnet. You will receive a transaction confirmation."
    },
    {
      q: "Are there vesting periods?",
      a: "Seed round has 6-month linear vesting. Private round has 3-month cliff + 3-month linear. Public sale has no vesting."
    },
    {
      q: "What are Protected Sovereign tokens?",
      a: "Tokens like $POPPA, $JAXX, $POTTER, $BRADEN168, $MASON are protected family tokens that require multisig authorization and are not available for public sale."
    },
  ]
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-emerald-900/50 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-black text-emerald-400">VALORAIPLUS</Link>
            <span className="text-xs text-emerald-700">TOKEN SALE // USDC</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {Object.entries(LIQUIDITY_SOURCES).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2 py-1 bg-emerald-900/30 hover:bg-emerald-900/50 text-xs"
                >
                  {name}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
            <button 
              onClick={() => setIsConnected(!isConnected)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-bold ${isConnected ? "bg-emerald-600" : "bg-emerald-900"} hover:bg-emerald-700`}
            >
              <Wallet className="w-4 h-4" />
              {isConnected ? "Connected" : "Connect Wallet"}
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black mb-4">VALORAIPLUS TOKEN SALE</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Purchase tokens from the 50-Token Canon using USDC. Early supporters receive bonus allocations.
          </p>
        </div>
        
        {/* Sale Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {SALE_TIERS.map((tier, idx) => (
            <button
              key={tier.name}
              onClick={() => tier.status === "ACTIVE" && setSelectedTier(tier)}
              disabled={tier.status !== "ACTIVE"}
              className={`p-6 border text-left transition-all ${
                selectedTier.name === tier.name 
                  ? "border-emerald-500 bg-emerald-950/50" 
                  : tier.status === "ACTIVE"
                    ? "border-emerald-900/50 hover:border-emerald-700"
                    : "border-zinc-800 opacity-50"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 text-xs font-bold ${
                  tier.status === "ACTIVE" ? "bg-emerald-600" : "bg-zinc-700"
                }`}>
                  {tier.status}
                </span>
                {selectedTier.name === tier.name && <Check className="w-5 h-5 text-emerald-400" />}
              </div>
              <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
              <p className="text-3xl font-black text-emerald-400 mb-4">${tier.priceUSDC}</p>
              <div className="space-y-2 text-sm text-zinc-400">
                <p>Min: ${tier.minPurchase.toLocaleString()} USDC</p>
                <p>Max: ${tier.maxPurchase.toLocaleString()} USDC</p>
                <p className="text-emerald-400">+{tier.bonus}% Bonus Tokens</p>
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-800">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">Allocation</span>
                  <span>{tier.allocation}</span>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-zinc-500">Sold</span>
                  <span>{tier.sold}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {/* Purchase Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="border border-emerald-900 bg-zinc-950 p-6">
            <h2 className="text-xl font-bold mb-6">Purchase Tokens</h2>
            
            {/* Token Selector */}
            <div className="mb-6">
              <label className="block text-xs text-emerald-700 mb-2">SELECT TOKEN</label>
              <button
                onClick={() => setShowTokenSelector(!showTokenSelector)}
                className="w-full flex items-center justify-between p-4 border border-emerald-900 bg-black hover:border-emerald-700"
              >
                <div>
                  <p className="font-bold">{selectedToken.symbol}</p>
                  <p className="text-xs text-zinc-500">{selectedToken.name}</p>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${showTokenSelector ? "rotate-180" : ""}`} />
              </button>
              
              {showTokenSelector && (
                <div className="border border-emerald-900 border-t-0 max-h-48 overflow-y-auto">
                  {PURCHASABLE_TOKENS.map(token => (
                    <button
                      key={token.symbol}
                      onClick={() => {
                        setSelectedToken(token)
                        setShowTokenSelector(false)
                      }}
                      className="w-full flex items-center justify-between p-3 hover:bg-emerald-900/30 text-left"
                    >
                      <div>
                        <p className="font-bold">{token.symbol}</p>
                        <p className="text-xs text-zinc-500">{token.name}</p>
                      </div>
                      <span className="text-xs text-zinc-400">{token.category}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* USDC Amount */}
            <div className="mb-6">
              <label className="block text-xs text-emerald-700 mb-2">USDC AMOUNT</label>
              <div className="relative">
                <input
                  type="number"
                  value={usdcAmount}
                  onChange={(e) => setUsdcAmount(e.target.value)}
                  placeholder={`Min: $${selectedTier.minPurchase}`}
                  className="w-full p-4 bg-black border border-emerald-900 text-2xl font-bold outline-none focus:border-emerald-500"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">USDC</span>
              </div>
              <div className="flex gap-2 mt-2">
                {[100, 500, 1000, 5000].map(amt => (
                  <button
                    key={amt}
                    onClick={() => setUsdcAmount(amt.toString())}
                    className="px-3 py-1 bg-emerald-900/30 hover:bg-emerald-900/50 text-xs"
                  >
                    ${amt}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Calculation */}
            {usdcAmount && parseFloat(usdcAmount) > 0 && (
              <div className="mb-6 p-4 bg-emerald-950/30 border border-emerald-900/50">
                <div className="flex justify-between mb-2">
                  <span className="text-zinc-400">Base Tokens</span>
                  <span className="font-bold">{tokenAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2 text-emerald-400">
                  <span>Bonus (+{selectedTier.bonus}%)</span>
                  <span className="font-bold">+{bonusTokens.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-emerald-900/50 text-lg">
                  <span>Total {selectedToken.symbol}</span>
                  <span className="font-black text-emerald-400">{totalTokens.toLocaleString()}</span>
                </div>
              </div>
            )}
            
            {/* Purchase Button */}
            <button
              onClick={handlePurchase}
              disabled={!usdcAmount || parseFloat(usdcAmount) < selectedTier.minPurchase}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-500 font-bold text-lg flex items-center justify-center gap-2"
            >
              <Shield className="w-5 h-5" />
              {!isConnected ? "Connect Wallet to Purchase" : "Purchase Tokens"}
            </button>
            
            <p className="text-xs text-zinc-500 text-center mt-4">
              By purchasing, you agree to the token sale terms and conditions.
            </p>
          </div>
          
          {/* Payment Info */}
          <div className="space-y-6">
            {/* Direct Payment */}
            <div className="border border-emerald-900 bg-zinc-950 p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-400" />
                Direct USDC Payment
              </h3>
              <p className="text-sm text-zinc-400 mb-4">
                Send USDC directly to the sovereign wallet. Include your receiving address in the transaction memo.
              </p>
              
              <div className="p-4 bg-black border border-emerald-900">
                <p className="text-xs text-emerald-700 mb-2">PAYMENT ADDRESS</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-sm font-mono break-all">{SOVEREIGN_WALLET}</code>
                  <button onClick={copyAddress} className="p-2 hover:bg-emerald-900/50">
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-zinc-500 mt-2">{ENS_DOMAIN}</p>
              </div>
              
              <div className="mt-4 flex gap-2">
                <a
                  href={`https://etherscan.io/address/${SOVEREIGN_WALLET}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-2 bg-emerald-900/30 hover:bg-emerald-900/50 text-xs"
                >
                  Etherscan <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={`https://app.ens.domains/${ENS_DOMAIN}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-2 bg-emerald-900/30 hover:bg-emerald-900/50 text-xs"
                >
                  ENS <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            
            {/* External Sources */}
            <div className="border border-emerald-900 bg-zinc-950 p-6">
              <h3 className="text-lg font-bold mb-4">External Liquidity</h3>
              <p className="text-sm text-zinc-400 mb-4">
                Additional purchase options available through our partner platforms:
              </p>
              <div className="space-y-2">
                <a
                  href="https://www.18fu.cash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border border-emerald-900/50 hover:border-emerald-700"
                >
                  <div>
                    <p className="font-bold">18fu.cash</p>
                    <p className="text-xs text-zinc-500">Primary liquidity source</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-emerald-400" />
                </a>
                <a
                  href="https://valorbank-rfvbdnaa.manus.space/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border border-emerald-900/50 hover:border-emerald-700"
                >
                  <div>
                    <p className="font-bold">ValorBank</p>
                    <p className="text-xs text-zinc-500">Banking integration</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-emerald-400" />
                </a>
              </div>
            </div>
            
            {/* Protected Tokens Notice */}
            <div className="border border-yellow-900/50 bg-yellow-950/20 p-6">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-yellow-500">Protected Sovereign Tokens</p>
                  <p className="text-sm text-zinc-400 mt-1">
                    The following tokens are protected and NOT available for public sale:
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["$POPPA", "$JAXX", "$POTTER", "$BRADEN168", "$MASON", "$DONNY", "$GILLSON", "$GILLGOLD", "$NEWT2026"].map(t => (
                      <span key={t} className="px-2 py-1 bg-yellow-900/30 text-yellow-500 text-xs">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 border border-emerald-900/50 bg-emerald-950/20 text-center">
            <p className="text-xs text-emerald-700">TOTAL SUPPLY</p>
            <p className="text-3xl font-black text-white">50B</p>
            <p className="text-xs text-zinc-500">50 Tokens x 1B each</p>
          </div>
          <div className="p-6 border border-emerald-900/50 bg-emerald-950/20 text-center">
            <p className="text-xs text-emerald-700">FOR SALE</p>
            <p className="text-3xl font-black text-emerald-400">41B</p>
            <p className="text-xs text-zinc-500">41 Non-protected tokens</p>
          </div>
          <div className="p-6 border border-emerald-900/50 bg-emerald-950/20 text-center">
            <p className="text-xs text-emerald-700">PROTECTED</p>
            <p className="text-3xl font-black text-yellow-500">9B</p>
            <p className="text-xs text-zinc-500">9 Sovereign tokens</p>
          </div>
          <div className="p-6 border border-emerald-900/50 bg-emerald-950/20 text-center">
            <p className="text-xs text-emerald-700">SEED PRICE</p>
            <p className="text-3xl font-black text-white">$0.001</p>
            <p className="text-xs text-zinc-500">+50% bonus</p>
          </div>
        </div>
        
        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {FAQ.map((item, idx) => (
              <div key={idx} className="border border-emerald-900/50">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-emerald-950/30"
                >
                  <span className="font-bold">{item.q}</span>
                  {expandedFaq === idx ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {expandedFaq === idx && (
                  <div className="p-4 pt-0 text-zinc-400 text-sm">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation */}
        <div className="mt-12 flex flex-wrap gap-2 justify-center">
          <Link href="/swap" className="px-4 py-2 bg-emerald-900/30 hover:bg-emerald-900/50 text-sm">
            Swap Tokens
          </Link>
          <Link href="/treasury-liquidity" className="px-4 py-2 bg-emerald-900/30 hover:bg-emerald-900/50 text-sm">
            Treasury Dashboard
          </Link>
          <Link href="/subscribe" className="px-4 py-2 bg-emerald-900/30 hover:bg-emerald-900/50 text-sm">
            Subscribe
          </Link>
          <Link href="/pitch-deck" className="px-4 py-2 bg-emerald-900/30 hover:bg-emerald-900/50 text-sm">
            Pitch Deck
          </Link>
        </div>
        
        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-zinc-600 border-t border-zinc-900 pt-8">
          <p>VALORAIPLUS TOKEN SALE // SGAU 7226.3461</p>
          <p className="mt-1">50-TOKEN CANON // EPOCH #2207</p>
          <p className="mt-2">THE LEDGER IS O. IT IS FINISHED.</p>
        </footer>
      </main>
    </div>
  )
}
