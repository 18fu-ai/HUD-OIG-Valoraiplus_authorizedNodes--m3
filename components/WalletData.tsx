"use client";

import { useState, useEffect } from 'react';
import { Wallet, Activity, ShieldCheck, Zap, ExternalLink, CheckCircle2 } from 'lucide-react';
import { BLOCKCHAIN_ADDRESSES, RPC_URLS } from '@/lib/wallet-config';

// Type definitions
interface Balances {
  ETH: string;
  BASE: string;
  BTC: string;
}

interface Prices {
  ETH: number;
  BTC: number;
}

// Get addresses array for display
const BLOCKCHAIN_ADDRESSES_ARRAY = [
  BLOCKCHAIN_ADDRESSES.ETH_L1,
  BLOCKCHAIN_ADDRESSES.BASE,
  BLOCKCHAIN_ADDRESSES.BTC,
];

export function WalletData() {
  const [balances, setBalances] = useState<Balances>({ ETH: 'Loading...', BASE: 'Loading...', BTC: 'Loading...' });
  const [prices, setPrices] = useState<Prices>({ ETH: 0, BTC: 0 });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=usd');
        const data = await response.json();
        setPrices({
          ETH: data.ethereum?.usd || 0,
          BTC: data.bitcoin?.usd || 0
        });
      } catch (error) {
        console.error("Failed to fetch prices", error);
      }
    };

    const fetchBalances = async () => {
      try {
        // Fetch ETH Balance using public RPC
        const ethResponse = await fetch(RPC_URLS.ETH, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_getBalance',
            params: [BLOCKCHAIN_ADDRESSES.ETH_L1.address, 'latest'],
            id: 1
          })
        });
        const ethData = await ethResponse.json();
        const ethBalance = ethData.result ? (parseInt(ethData.result, 16) / 1e18).toFixed(4) : 'Error';

        // Fetch Base Balance
        const baseResponse = await fetch(RPC_URLS.BASE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_getBalance',
            params: [BLOCKCHAIN_ADDRESSES.BASE.address, 'latest'],
            id: 1
          })
        });
        const baseData = await baseResponse.json();
        const baseBalance = baseData.result ? (parseInt(baseData.result, 16) / 1e18).toFixed(4) : 'Error';

        // Fetch BTC Balance (using BlockCypher API)
        let btcBalanceStr = 'Error';
        try {
          const btcResponse = await fetch(`https://api.blockcypher.com/v1/btc/main/addrs/${BLOCKCHAIN_ADDRESSES.BTC.address}/balance`);
          if (btcResponse.ok) {
            const btcData = await btcResponse.json();
            btcBalanceStr = (btcData.balance / 100000000).toFixed(4);
          } else if (btcResponse.status === 429) {
            btcBalanceStr = 'API Limit';
          }
        } catch (e) {
          console.error("BTC fetch error", e);
        }

        setBalances({
          ETH: ethBalance,
          BASE: baseBalance,
          BTC: btcBalanceStr
        });
      } catch (error) {
        console.error("Failed to fetch balances", error);
        setBalances({ ETH: 'Error', BASE: 'Error', BTC: 'Error' });
      }
    };

    fetchPrices();
    fetchBalances();
    
    const interval = setInterval(() => {
      fetchPrices();
      fetchBalances();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const calculateTotalValue = () => {
    if (prices.ETH === 0 || prices.BTC === 0) return 'Calculating...';
    
    let total = 0;
    if (balances.ETH !== 'Loading...' && balances.ETH !== 'Error') total += parseFloat(balances.ETH) * prices.ETH;
    if (balances.BASE !== 'Loading...' && balances.BASE !== 'Error') total += parseFloat(balances.BASE) * prices.ETH;
    if (balances.BTC !== 'Loading...' && balances.BTC !== 'Error' && balances.BTC !== 'API Limit') total += parseFloat(balances.BTC) * prices.BTC;
    
    return `$${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="p-6 border border-green-500/30 bg-black/80 rounded-xl relative overflow-hidden mt-8">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-50"></div>
      
      <div className="flex justify-between items-center mb-6 relative z-10 border-b border-green-500/30 pb-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-green-400" size={24} />
          <h2 className="text-xl font-black text-white tracking-widest">SOVEREIGN TREASURY</h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-green-400 bg-green-950/30 px-3 py-1 rounded-full border border-green-500/50">
          <Activity size={14} className="animate-pulse" />
          LIVE SYNC
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        {/* Ethereum Wallet */}
        <div className="bg-black/60 border border-purple-500/30 rounded-xl p-4 hover:border-purple-400/60 transition-colors group/card">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-1">
              <div className="text-xs text-purple-300 font-bold tracking-wider">{BLOCKCHAIN_ADDRESSES_ARRAY[0].chain}</div>
              <CheckCircle2 size={12} className="text-green-400" />
            </div>
            <Wallet size={16} className="text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white mb-1">{balances.ETH} <span className="text-sm text-purple-400">{BLOCKCHAIN_ADDRESSES_ARRAY[0].symbol}</span></div>
          <div className="flex items-center justify-between">
            <div className="text-[10px] text-zinc-500 font-mono truncate max-w-[150px]">{BLOCKCHAIN_ADDRESSES_ARRAY[0].address}</div>
            <a href={BLOCKCHAIN_ADDRESSES_ARRAY[0].explorer} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 opacity-0 group-hover/card:opacity-100 transition-opacity">
              <ExternalLink size={12} />
            </a>
          </div>
          <div className="flex justify-between items-end mt-2">
            <div className="text-xs text-green-400 font-mono">
              {balances.ETH !== 'Loading...' && balances.ETH !== 'Error' ? `$${(parseFloat(balances.ETH) * prices.ETH).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '---'}
            </div>
            <div className="text-[8px] text-purple-500/70 uppercase tracking-widest">{BLOCKCHAIN_ADDRESSES_ARRAY[0].network}</div>
          </div>
        </div>

        {/* Base Network Wallet */}
        <div className="bg-black/60 border border-blue-500/30 rounded-xl p-4 hover:border-blue-400/60 transition-colors group/card">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-1">
              <div className="text-xs text-blue-300 font-bold tracking-wider">{BLOCKCHAIN_ADDRESSES_ARRAY[1].chain}</div>
              <CheckCircle2 size={12} className="text-green-400" />
            </div>
            <Zap size={16} className="text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white mb-1">{balances.BASE} <span className="text-sm text-blue-400">{BLOCKCHAIN_ADDRESSES_ARRAY[1].symbol}</span></div>
          <div className="flex items-center justify-between">
            <div className="text-[10px] text-zinc-500 font-mono truncate max-w-[150px]">{BLOCKCHAIN_ADDRESSES_ARRAY[1].address}</div>
            <a href={BLOCKCHAIN_ADDRESSES_ARRAY[1].explorer} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 opacity-0 group-hover/card:opacity-100 transition-opacity">
              <ExternalLink size={12} />
            </a>
          </div>
          <div className="flex justify-between items-end mt-2">
            <div className="text-xs text-green-400 font-mono">
              {balances.BASE !== 'Loading...' && balances.BASE !== 'Error' ? `$${(parseFloat(balances.BASE) * prices.ETH).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '---'}
            </div>
            <div className="text-[8px] text-blue-500/70 uppercase tracking-widest">{BLOCKCHAIN_ADDRESSES_ARRAY[1].network}</div>
          </div>
        </div>

        {/* Bitcoin Wallet */}
        <div className="bg-black/60 border border-orange-500/30 rounded-xl p-4 hover:border-orange-400/60 transition-colors group/card">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-1">
              <div className="text-xs text-orange-300 font-bold tracking-wider">{BLOCKCHAIN_ADDRESSES_ARRAY[2].chain}</div>
              <CheckCircle2 size={12} className="text-green-400" />
            </div>
            <Wallet size={16} className="text-orange-400" />
          </div>
          <div className="text-2xl font-black text-white mb-1">{balances.BTC} <span className="text-sm text-orange-400">{BLOCKCHAIN_ADDRESSES_ARRAY[2].symbol}</span></div>
          <div className="flex items-center justify-between">
            <div className="text-[10px] text-zinc-500 font-mono truncate max-w-[150px]">{BLOCKCHAIN_ADDRESSES_ARRAY[2].address}</div>
            <a href={BLOCKCHAIN_ADDRESSES_ARRAY[2].explorer} target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 opacity-0 group-hover/card:opacity-100 transition-opacity">
              <ExternalLink size={12} />
            </a>
          </div>
          <div className="flex justify-between items-end mt-2">
            <div className="text-xs text-green-400 font-mono">
              {balances.BTC !== 'Loading...' && balances.BTC !== 'Error' && balances.BTC !== 'API Limit' ? `$${(parseFloat(balances.BTC) * prices.BTC).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '---'}
            </div>
            <div className="text-[8px] text-orange-500/70 uppercase tracking-widest">{BLOCKCHAIN_ADDRESSES_ARRAY[2].network}</div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center relative z-10">
        <div className="text-sm text-zinc-500 font-bold">TOTAL LIQUID ASSETS</div>
        <div className="text-2xl font-black text-green-400">{calculateTotalValue()}</div>
      </div>
    </div>
  );
}
