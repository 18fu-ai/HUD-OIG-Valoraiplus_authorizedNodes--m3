"use client"

import { useState, useEffect } from "react"
import { ArrowDown, Settings, RefreshCw, ExternalLink, Wallet, AlertTriangle, Check, ChevronDown } from "lucide-react"
import Link from "next/link"

/**
 * VALORAIPLUS SWAP // Uniswap V3 Integration
 * 50-Token Canon Exchange Interface
 * SGAU 7226.3461 // NODE: SAINT PAUL 55116
 */

const SOVEREIGN_WALLET = "0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB"
const ENS_DOMAIN = "donadams1969.eth"

// External liquidity sources
const LIQUIDITY_SOURCES = {
  "18fu.cash": "https://www.18fu.cash",
  "ValorBank": "https://valorbank-rfvbdnaa.manus.space/",
  "Uniswap": "https://app.uniswap.org",
  "1inch": "https://app.1inch.io",
}

// 50-Token Canon
const TOKENS = [
  { symbol: "VCORE", name: "Valor Core", category: "CORE", balance: "1,000,000,000" },
  { symbol: "VAI", name: "Valor AI", category: "CORE", balance: "1,000,000,000" },
  { symbol: "GILLBTC", name: "Gillson BTC", category: "BTC", balance: "1,000,000,000" },
  { symbol: "VSEC", name: "Valor Security", category: "CORE", balance: "1,000,000,000" },
  { symbol: "VMAX", name: "Valor Max", category: "CORE", balance: "1,000,000,000" },
  { symbol: "VBLK", name: "Valor Block", category: "CORE", balance: "1,000,000,000" },
  { symbol: "DBLK", name: "Dead Block", category: "CORE", balance: "1,000,000,000" },
  { symbol: "VGOV", name: "Valor Governance", category: "CORE", balance: "1,000,000,000" },
  { symbol: "VALX", name: "Valor X", category: "CORE", balance: "1,000,000,000" },
  { symbol: "FLM", name: "Flame", category: "FLAME", balance: "1,000,000,000" },
  { symbol: "FLAME", name: "Flame Core", category: "FLAME", balance: "1,000,000,000" },
  { symbol: "FLR", name: "Flare", category: "FLAME", balance: "1,000,000,000" },
  { symbol: "VSoul", name: "Valor Soul", category: "SOUL", balance: "1,000,000,000" },
  { symbol: "SOUL", name: "Soul", category: "SOUL", balance: "1,000,000,000" },
  { symbol: "GHOST", name: "Ghost", category: "SOUL", balance: "1,000,000,000" },
  { symbol: "DEAD", name: "Dead", category: "SOUL", balance: "1,000,000,000" },
  { symbol: "INTL-S", name: "Intel Secure", category: "INTEL", balance: "1,000,000,000" },
  { symbol: "INTL", name: "Intel", category: "INTEL", balance: "1,000,000,000" },
  { symbol: "VMWARE+", name: "VMware Plus", category: "BRAIN", balance: "1,000,000,000" },
  { symbol: "BRAIN+", name: "Brain Plus", category: "BRAIN", balance: "1,000,000,000" },
  { symbol: "EDUTAIN", name: "Edutain", category: "BRAIN", balance: "1,000,000,000" },
  { symbol: "MATH+", name: "Math Plus", category: "BRAIN", balance: "1,000,000,000" },
  { symbol: "VALOR", name: "Valor", category: "VALOR", balance: "1,000,000,000" },
  { symbol: "VACN", name: "Valor ACN", category: "VALOR", balance: "1,000,000,000" },
  { symbol: "JAXX", name: "Jaxx", category: "SOVEREIGN", balance: "1,000,000,000", protected: true },
  { symbol: "VDAO", name: "Valor DAO", category: "GOVERNANCE", balance: "1,000,000,000" },
  { symbol: "SKROLL", name: "Skroll", category: "SCROLL", balance: "1,000,000,000" },
  { symbol: "SKOLL", name: "Skoll", category: "SCROLL", balance: "1,000,000,000" },
  { symbol: "SKROL", name: "Skrol", category: "SCROLL", balance: "1,000,000,000" },
  { symbol: "DG77.77X_GRAVITY_ACTIVE", name: "DG Gravity", category: "ANCHOR", balance: "1,000,000,000" },
  { symbol: "VLT", name: "Vault", category: "GOVERNANCE", balance: "1,000,000,000" },
  { symbol: "SGAU", name: "SGAU Token", category: "ANCHOR", balance: "1,000,000,000" },
  { symbol: "$ANGL", name: "Angel", category: "ANCHOR", balance: "1,000,000,000" },
  { symbol: "ANGL2026", name: "Angel 2026", category: "ANCHOR", balance: "1,000,000,000" },
  { symbol: "BTC2.0", name: "BTC 2.0", category: "BTC", balance: "1,000,000,000" },
  { symbol: "INTELIT", name: "Intelit", category: "INTEL", balance: "1,000,000,000" },
  { symbol: "VALORDAO", name: "Valor DAO Gov", category: "VALOR", balance: "1,000,000,000" },
  { symbol: "VNET", name: "Valor Net", category: "GOVERNANCE", balance: "1,000,000,000" },
  { symbol: "VALUTL", name: "Valor Utility", category: "VALOR", balance: "1,000,000,000" },
  { symbol: "DG1969", name: "DG 1969", category: "TIME", balance: "1,000,000,000" },
  { symbol: "DJTIME", name: "DJ Time", category: "TIME", balance: "1,000,000,000" },
  { symbol: "TIME", name: "Time", category: "TIME", balance: "1,000,000,000" },
  { symbol: "$NEWT2026", name: "Newt 2026", category: "SOVEREIGN", balance: "1,000,000,000", protected: true },
  { symbol: "$DONNY", name: "Donny", category: "SOVEREIGN", balance: "1,000,000,000", protected: true },
  { symbol: "$GILLSON", name: "Gillson", category: "SOVEREIGN", balance: "1,000,000,000", protected: true },
  { symbol: "$GILLGOLD", name: "Gillson Gold", category: "SOVEREIGN", balance: "1,000,000,000", protected: true },
  { symbol: "$POPPA", name: "Poppa", category: "SOVEREIGN", balance: "1,000,000,000", protected: true },
  { symbol: "$POTTER", name: "Potter", category: "SOVEREIGN", balance: "1,000,000,000", protected: true },
  { symbol: "$BRADEN168", name: "Braden 168", category: "SOVEREIGN", balance: "1,000,000,000", protected: true },
  { symbol: "$MASON", name: "Mason", category: "SOVEREIGN", balance: "1,000,000,000", protected: true },
]

const BASE_TOKENS = [
  { symbol: "ETH", name: "Ethereum", balance: "0.00" },
  { symbol: "USDC", name: "USD Coin", balance: "0.00" },
  { symbol: "USDT", name: "Tether", balance: "0.00" },
  { symbol: "DAI", name: "Dai", balance: "0.00" },
  { symbol: "WETH", name: "Wrapped ETH", balance: "0.00" },
]

export default function SwapPage() {
  const [fromToken, setFromToken] = useState(TOKENS[0])
  const [toToken, setToToken] = useState(BASE_TOKENS[0])
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [slippage, setSlippage] = useState("0.5")
  const [showFromSelector, setShowFromSelector] = useState(false)
  const [showToSelector, setShowToSelector] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  
  // Simulated exchange rate
  const exchangeRate = 0.0001 // 1 VALOR token = 0.0001 ETH
  
  useEffect(() => {
    if (fromAmount && !isNaN(parseFloat(fromAmount))) {
      const calculated = parseFloat(fromAmount) * exchangeRate
      setToAmount(calculated.toFixed(6))
    } else {
      setToAmount("")
    }
  }, [fromAmount])
  
  const filteredTokens = TOKENS.filter(t => 
    t.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const handleSwap = () => {
    if (!isConnected) {
      alert("Please connect your wallet first")
      return
    }
    if (fromToken.protected) {
      alert(`${fromToken.symbol} is a PROTECTED SOVEREIGN token and cannot be swapped without multisig authorization`)
      return
    }
    alert(`Swap ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}\n\nNote: This requires deployed contracts and liquidity pools.`)
  }
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-emerald-900/50 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-black text-emerald-400">VALORAIPLUS</Link>
            <span className="text-xs text-emerald-700">SWAP // 50-TOKEN CANON</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-right">
              <p className="text-emerald-400">{ENS_DOMAIN}</p>
              <p className="text-zinc-500 font-mono text-[10px]">{SOVEREIGN_WALLET.slice(0,10)}...{SOVEREIGN_WALLET.slice(-8)}</p>
            </div>
            <button 
              onClick={() => setIsConnected(!isConnected)}
              className={`px-4 py-2 text-sm font-bold ${isConnected ? "bg-emerald-600" : "bg-emerald-900"} hover:bg-emerald-700`}
            >
              {isConnected ? "Connected" : "Connect Wallet"}
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-lg mx-auto p-6 mt-8">
        {/* Liquidity Sources */}
        <div className="mb-6 p-4 border border-emerald-900/50 bg-emerald-950/20">
          <p className="text-xs text-emerald-700 mb-2">LIQUIDITY SOURCES</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(LIQUIDITY_SOURCES).map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1 bg-emerald-900/30 hover:bg-emerald-900/50 text-xs"
              >
                {name}
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
        
        {/* Swap Card */}
        <div className="border border-emerald-900 bg-zinc-950">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-emerald-900/50">
            <h2 className="text-lg font-bold">Swap</h2>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-emerald-900/30"
            >
              <Settings className="w-5 h-5 text-emerald-400" />
            </button>
          </div>
          
          {/* Settings Dropdown */}
          {showSettings && (
            <div className="p-4 border-b border-emerald-900/50 bg-emerald-950/30">
              <p className="text-xs text-emerald-700 mb-2">Slippage Tolerance</p>
              <div className="flex gap-2">
                {["0.1", "0.5", "1.0"].map(val => (
                  <button
                    key={val}
                    onClick={() => setSlippage(val)}
                    className={`px-3 py-1 text-sm ${slippage === val ? "bg-emerald-600" : "bg-emerald-900/30"}`}
                  >
                    {val}%
                  </button>
                ))}
                <input
                  type="number"
                  value={slippage}
                  onChange={(e) => setSlippage(e.target.value)}
                  className="w-16 px-2 py-1 bg-black border border-emerald-900 text-sm text-center"
                  placeholder="%"
                />
              </div>
            </div>
          )}
          
          {/* From Token */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-500">From</span>
              <span className="text-xs text-zinc-500">Balance: {fromToken.balance}</span>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="0.0"
                className="flex-1 bg-transparent text-3xl font-bold outline-none"
              />
              <button
                onClick={() => setShowFromSelector(!showFromSelector)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-900/50 hover:bg-emerald-900"
              >
                <span className="font-bold">{fromToken.symbol}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            {fromToken.protected && (
              <div className="mt-2 flex items-center gap-2 text-yellow-500 text-xs">
                <AlertTriangle className="w-3 h-3" />
                <span>PROTECTED SOVEREIGN TOKEN - Requires Multisig</span>
              </div>
            )}
          </div>
          
          {/* From Token Selector */}
          {showFromSelector && (
            <div className="border-t border-emerald-900/50 max-h-64 overflow-y-auto">
              <div className="p-2 sticky top-0 bg-zinc-950">
                <input
                  type="text"
                  placeholder="Search tokens..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-emerald-900 text-sm"
                />
              </div>
              {filteredTokens.map(token => (
                <button
                  key={token.symbol}
                  onClick={() => {
                    setFromToken(token)
                    setShowFromSelector(false)
                    setSearchTerm("")
                  }}
                  className="w-full flex items-center justify-between p-3 hover:bg-emerald-900/30 text-left"
                >
                  <div>
                    <p className="font-bold">{token.symbol}</p>
                    <p className="text-xs text-zinc-500">{token.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-zinc-400">{token.category}</p>
                    {token.protected && <span className="text-[10px] text-yellow-500">PROTECTED</span>}
                  </div>
                </button>
              ))}
            </div>
          )}
          
          {/* Swap Arrow */}
          <div className="flex justify-center -my-2 relative z-10">
            <button 
              onClick={() => {
                const temp = fromToken
                setFromToken(toToken as typeof fromToken)
                setToToken(temp as typeof toToken)
              }}
              className="p-2 bg-emerald-900 border border-emerald-700 hover:bg-emerald-800"
            >
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>
          
          {/* To Token */}
          <div className="p-4 border-t border-emerald-900/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-500">To (estimated)</span>
              <span className="text-xs text-zinc-500">Balance: {toToken.balance}</span>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={toAmount}
                readOnly
                placeholder="0.0"
                className="flex-1 bg-transparent text-3xl font-bold outline-none text-zinc-400"
              />
              <button
                onClick={() => setShowToSelector(!showToSelector)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-900/50 hover:bg-emerald-900"
              >
                <span className="font-bold">{toToken.symbol}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* To Token Selector */}
          {showToSelector && (
            <div className="border-t border-emerald-900/50">
              {BASE_TOKENS.map(token => (
                <button
                  key={token.symbol}
                  onClick={() => {
                    setToToken(token)
                    setShowToSelector(false)
                  }}
                  className="w-full flex items-center justify-between p-3 hover:bg-emerald-900/30 text-left"
                >
                  <div>
                    <p className="font-bold">{token.symbol}</p>
                    <p className="text-xs text-zinc-500">{token.name}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
          
          {/* Exchange Rate */}
          {fromAmount && toAmount && (
            <div className="px-4 py-2 border-t border-emerald-900/50 bg-emerald-950/20">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Rate</span>
                <span>1 {fromToken.symbol} = {exchangeRate} {toToken.symbol}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Slippage</span>
                <span>{slippage}%</span>
              </div>
            </div>
          )}
          
          {/* Swap Button */}
          <div className="p-4">
            <button
              onClick={handleSwap}
              disabled={!fromAmount || parseFloat(fromAmount) <= 0}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-500 font-bold text-lg"
            >
              {!isConnected ? "Connect Wallet" : !fromAmount ? "Enter Amount" : fromToken.protected ? "Requires Multisig" : "Swap"}
            </button>
          </div>
        </div>
        
        {/* Info Cards */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="p-4 border border-emerald-900/50 bg-emerald-950/20">
            <p className="text-xs text-emerald-700">TOTAL TOKENS</p>
            <p className="text-2xl font-black text-white">50</p>
            <p className="text-[10px] text-zinc-500">50-Token Canon</p>
          </div>
          <div className="p-4 border border-emerald-900/50 bg-emerald-950/20">
            <p className="text-xs text-emerald-700">PROTECTED</p>
            <p className="text-2xl font-black text-yellow-500">9</p>
            <p className="text-[10px] text-zinc-500">Sovereign Tokens</p>
          </div>
          <div className="p-4 border border-emerald-900/50 bg-emerald-950/20">
            <p className="text-xs text-emerald-700">SUPPLY / TOKEN</p>
            <p className="text-2xl font-black text-white">1B</p>
            <p className="text-[10px] text-zinc-500">Initial Minted</p>
          </div>
          <div className="p-4 border border-emerald-900/50 bg-emerald-950/20">
            <p className="text-xs text-emerald-700">TOTAL SUPPLY</p>
            <p className="text-2xl font-black text-white">50B</p>
            <p className="text-[10px] text-zinc-500">All Tokens</p>
          </div>
        </div>
        
        {/* Liquidity Notice */}
        <div className="mt-6 p-4 border border-yellow-900/50 bg-yellow-950/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-yellow-500">Liquidity Required</p>
              <p className="text-sm text-zinc-400 mt-1">
                To enable swaps, liquidity pools must be created on Uniswap or other DEXs. 
                This requires seeding pools with both VALOR tokens and base assets (ETH/USDC).
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href="https://www.18fu.cash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1 bg-emerald-900/50 hover:bg-emerald-900 text-xs"
                >
                  18fu.cash <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://valorbank-rfvbdnaa.manus.space/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1 bg-emerald-900/50 hover:bg-emerald-900 text-xs"
                >
                  ValorBank <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/treasury-liquidity" className="px-4 py-2 bg-emerald-900/30 hover:bg-emerald-900/50 text-sm">
            Treasury Dashboard
          </Link>
          <Link href="/token-sale" className="px-4 py-2 bg-emerald-900/30 hover:bg-emerald-900/50 text-sm">
            Token Sale
          </Link>
          <Link href="/subscribe" className="px-4 py-2 bg-emerald-900/30 hover:bg-emerald-900/50 text-sm">
            Subscribe
          </Link>
          <Link href="/contract-deploy" className="px-4 py-2 bg-emerald-900/30 hover:bg-emerald-900/50 text-sm">
            Deploy Contracts
          </Link>
        </div>
        
        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-zinc-600">
          <p>VALORAIPLUS SWAP // SGAU 7226.3461</p>
          <p className="mt-1">THE LEDGER IS O. IT IS FINISHED.</p>
        </footer>
      </main>
    </div>
  )
}
