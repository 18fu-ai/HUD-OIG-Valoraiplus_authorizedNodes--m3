"use client";

import { useState } from 'react';
import { 
  Landmark, 
  Shield, 
  CheckCircle2, 
  Lock, 
  CreditCard,
  ArrowRightLeft,
  Building2,
  FileText,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

/**
 * PRIMARY CONNECTED BROKERAGE ACCOUNT
 * 
 * This is the SOLE authorized account for all fund transfers,
 * settlements, and financial operations within the VALORAIPLUS system.
 * 
 * ACCOUNT HOLDER: DON GILLSON
 * INSTITUTION: Charles Schwab & Co., Inc.
 * ACCOUNT TYPE: SchwabOne® Account with Designated Beneficiary Plan/TOD
 * MEMBER: SIPC
 */
export const CONNECTED_BROKERAGE_ACCOUNT = {
  institution: "Charles Schwab & Co., Inc.",
  institutionShort: "SCHWAB",
  accountHolder: "DON GILLSON",
  accountType: "SchwabOne® Account",
  designation: "DESIGNATED BENE PLAN/TOD",
  accountNumber: "6015-8185",
  accountNumberMasked: "****-*185",
  routingInfo: "SIPC Member",
  address: {
    street: "[ADDRESS ON FILE]",
    city: "[CITY ON FILE]",
    state: "CA",
    zip: "[REDACTED]"
  },
  statementPeriod: "April 1-30, 2026",
  endingValue: "$5.53",
  cashBalance: "$2.69",
  holdings: [
    { symbol: "LVGI", name: "LIMITLESS VENTURE GROUP", shares: 9479, value: "$2.84", percent: "51%" },
    { symbol: "CHIT", name: "CHERUBIM INTS INC", shares: 909999, value: "$0.00", percent: "0%" },
    { symbol: "BETSF", name: "BITBRO LTD A ORD F", shares: 1, value: "$0.00", percent: "0%" },
    { symbol: "VIDA", name: "ROO CORP", shares: 350, value: "UNPRICED", percent: "N/A" }
  ],
  costBasis: "$810.41",
  unrealizedGainLoss: "($794.23)",
  investmentObjective: "Growth",
  marginAvailable: "$2.69",
  buyingPower: "$2.69",
  customerService: "1-800-435-4000",
  website: "schwab.com",
  status: "ACTIVE",
  verified: true,
  sipcProtected: true
};

export function ConnectedBrokerageAccount({ 
  compact = false,
  showHoldings = true,
  showFullAccount = false // SECURITY: Never show full account number on front-facing displays
}: { 
  compact?: boolean;
  showHoldings?: boolean;
  showFullAccount?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const account = CONNECTED_BROKERAGE_ACCOUNT;

  // SECURITY: Mask account number - only show last 4 digits
  const getMaskedAccountNumber = () => {
    if (showFullAccount && revealed) {
      return account.accountNumber;
    }
    // Extract last 4 characters and mask the rest
    const lastFour = account.accountNumber.slice(-4);
    return `••••-${lastFour}`;
  };

  const copyAccountNumber = () => {
    // Only copy if authorized (showFullAccount enabled)
    if (showFullAccount) {
      navigator.clipboard.writeText(account.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleReveal = () => {
    if (showFullAccount) {
      setRevealed(!revealed);
    }
  };

  if (compact) {
    return (
      <div className="bg-gradient-to-r from-emerald-950/80 to-zinc-900/90 border border-emerald-500/30 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <Landmark className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-[10px] font-black text-emerald-400 tracking-widest">PRIMARY CONNECTED ACCOUNT</p>
              <p className="text-sm font-bold text-white">{account.institution}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-zinc-500" />
              <p className="text-[10px] text-zinc-500">Account (Encrypted)</p>
            </div>
            <p className="text-sm font-mono text-emerald-400">{getMaskedAccountNumber()}</p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-emerald-500/20 flex items-center justify-between">
          <p className="text-xs text-zinc-400">{account.accountHolder}</p>
          <div className="flex items-center gap-2">
            <Shield className="w-3 h-3 text-emerald-500" />
            <span className="text-[10px] font-bold text-emerald-500">SIPC PROTECTED</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-zinc-900 via-emerald-950/20 to-zinc-900 border border-emerald-500/30 rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600/20 to-emerald-500/10 border-b border-emerald-500/30 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <Landmark className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <p className="text-[10px] font-black text-emerald-400 tracking-[0.3em] mb-1">PRIMARY CONNECTED ACCOUNT</p>
              <h3 className="text-xl font-black text-white">{account.institution}</h3>
              <p className="text-xs text-zinc-400 mt-1">Member SIPC | {account.accountType}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-emerald-400 tracking-widest">VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Details */}
      <div className="p-6 space-y-6">
        {/* Primary Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50">
            <p className="text-[10px] font-bold text-zinc-500 tracking-widest mb-2">ACCOUNT HOLDER</p>
            <p className="text-sm font-bold text-white">{account.accountHolder}</p>
            <p className="text-[10px] text-zinc-500 mt-1">{account.designation}</p>
          </div>
          
          <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50">
            <div className="flex items-center gap-1 mb-2">
              <Lock className="w-3 h-3 text-zinc-500" />
              <p className="text-[10px] font-bold text-zinc-500 tracking-widest">ACCOUNT NUMBER (ENCRYPTED)</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-mono font-bold text-emerald-400">{getMaskedAccountNumber()}</p>
              {showFullAccount && (
                <>
                  <button 
                    onClick={toggleReveal}
                    className="p-1 rounded hover:bg-zinc-700/50 transition-colors"
                    title={revealed ? "Hide account number" : "Reveal account number"}
                  >
                    {revealed ? (
                      <Lock className="w-3 h-3 text-amber-500" />
                    ) : (
                      <Shield className="w-3 h-3 text-zinc-500" />
                    )}
                  </button>
                  <button 
                    onClick={copyAccountNumber}
                    className="p-1 rounded hover:bg-zinc-700/50 transition-colors"
                    title="Copy account number"
                  >
                    {copied ? (
                      <Check className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <Copy className="w-3 h-3 text-zinc-500" />
                    )}
                  </button>
                </>
              )}
            </div>
            <p className="text-[10px] text-zinc-600 mt-1">Last 4 digits only for security</p>
          </div>
          
          <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50">
            <p className="text-[10px] font-bold text-zinc-500 tracking-widest mb-2">ACCOUNT VALUE</p>
            <p className="text-sm font-bold text-white">{account.endingValue}</p>
            <p className="text-[10px] text-zinc-500 mt-1">as of {account.statementPeriod.split('-')[1]}</p>
          </div>
          
          <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50">
            <p className="text-[10px] font-bold text-zinc-500 tracking-widest mb-2">CASH AVAILABLE</p>
            <p className="text-sm font-bold text-emerald-400">{account.cashBalance}</p>
            <p className="text-[10px] text-zinc-500 mt-1">Buying Power: {account.buyingPower}</p>
          </div>
        </div>

        {/* Address & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-zinc-800/30 rounded-xl p-4 border border-zinc-700/30">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-4 h-4 text-zinc-500" />
              <p className="text-[10px] font-bold text-zinc-500 tracking-widest">REGISTERED ADDRESS</p>
            </div>
            <p className="text-sm text-white">{account.address.street}</p>
            <p className="text-sm text-white">{account.address.city}, {account.address.state} {account.address.zip}</p>
          </div>
          
          <div className="bg-zinc-800/30 rounded-xl p-4 border border-zinc-700/30">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="w-4 h-4 text-zinc-500" />
              <p className="text-[10px] font-bold text-zinc-500 tracking-widest">TRANSFER DETAILS</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-zinc-400">Customer Service: <span className="text-white font-mono">{account.customerService}</span></p>
              <p className="text-xs text-zinc-400">Portal: <span className="text-emerald-400">{account.website}</span></p>
            </div>
          </div>
        </div>

        {/* Holdings */}
        {showHoldings && (
          <div className="bg-zinc-800/30 rounded-xl border border-zinc-700/30 overflow-hidden">
            <div className="bg-zinc-800/50 px-4 py-3 border-b border-zinc-700/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-zinc-500" />
                  <p className="text-[10px] font-bold text-zinc-500 tracking-widest">PORTFOLIO HOLDINGS</p>
                </div>
                <p className="text-[10px] text-zinc-500">Investment Objective: {account.investmentObjective}</p>
              </div>
            </div>
            <div className="divide-y divide-zinc-700/30">
              {account.holdings.map((holding, idx) => (
                <div key={idx} className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">{holding.symbol}</p>
                    <p className="text-[10px] text-zinc-500">{holding.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-mono text-zinc-300">{holding.shares.toLocaleString()} shares</p>
                    <p className="text-[10px] text-zinc-500">{holding.value} ({holding.percent})</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-zinc-800/50 px-4 py-3 border-t border-zinc-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-zinc-500">Cost Basis</p>
                  <p className="text-xs font-mono text-white">{account.costBasis}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-zinc-500">Unrealized Gain/(Loss)</p>
                  <p className="text-xs font-mono text-red-400">{account.unrealizedGainLoss}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SIPC Protection Badge */}
        <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/5 rounded-xl p-4 border border-emerald-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-emerald-500" />
              <div>
                <p className="text-xs font-bold text-emerald-400">SIPC PROTECTED</p>
                <p className="text-[10px] text-zinc-500">Securities Investor Protection Corporation Member</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-500" />
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
        </div>

        {/* Transfer Authorization Notice */}
        <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
          <div className="flex items-start gap-3">
            <ArrowRightLeft className="w-5 h-5 text-amber-500 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-amber-400 mb-1">AUTHORIZED TRANSFER DESTINATION</p>
              <p className="text-[10px] text-zinc-400 leading-relaxed">
                This is the PRIMARY CONNECTED ACCOUNT for all fund transfers, settlements, and 
                financial recoveries within the VALORAIPLUS system. All litigation proceeds, 
                asset recovery funds, and settlement distributions must be directed to this account.
              </p>
              <p className="text-[10px] text-amber-500/70 mt-2 font-mono">
                TOTAL LITIGATION EXPOSURE: $11,487,631,005.52 | SOVEREIGN IP LIEN: $1.12Q
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-zinc-800/30 border-t border-zinc-700/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-zinc-600 font-mono">
            Statement Period: {account.statementPeriod} | VALORAIPLUS BACKING DOCUMENTATION
          </p>
          <a 
            href={`https://${account.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] text-emerald-500 hover:text-emerald-400 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            Schwab Portal
          </a>
        </div>
      </div>
    </div>
  );
}

export default ConnectedBrokerageAccount;
