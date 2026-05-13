import { NextRequest, NextResponse } from 'next/server';

interface BalanceUpdate {
  address: string;
  balance: string;
  usdValue: number;
  timestamp: number;
  change24h: number;
  changePercent24h: number;
  token: string;
  price: number;
}

// Mock historical data store (in production, use Redis or database)
const balanceHistory: Map<string, BalanceUpdate[]> = new Map();

// Mock token prices (in production, fetch from CoinGecko or similar)
const TOKEN_PRICES: Record<string, number> = {
  VALOR: 2.47,
  FORENSIC: 0.89,
  STPAUL: 1.05,
  GILLBTC: 0.56,
  DBG1943: 1.943,
  VACN: 0.34,
};

async function fetchEthereumBalance(address: string): Promise<string> {
  try {
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://eth.publicnode.com';
    
    const response = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [address, 'latest'],
        id: 1,
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    // Convert hex to decimal (wei to ETH)
    const balanceWei = BigInt(data.result);
    const balanceEth = Number(balanceWei) / 1e18;
    
    return balanceEth.toFixed(6);
  } catch (error) {
    console.error('[API] Ethereum balance fetch error:', error);
    return '0';
  }
}

async function fetchTokenBalance(address: string, token: string): Promise<{ balance: string; price: number }> {
  // Simulate token balance fetch from blockchain
  // In production, use ethers.js or web3.js with contract ABI
  
  const mockBalances: Record<string, string> = {
    VALOR: '1000000',
    FORENSIC: '4654',
    STPAUL: '2207',
    GILLBTC: '1500',
    DBG1943: '943000',
    VACN: '500',
  };

  const token_key = Object.keys(mockBalances)[Math.floor(Math.random() * Object.keys(mockBalances).length)];
  const balance = mockBalances[token_key];
  const price = TOKEN_PRICES[token_key] || 1.0;

  return { balance, price };
}

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json();

    if (!address || !address.startsWith('0x')) {
      return NextResponse.json({ error: 'Invalid address' }, { status: 400 });
    }

    // Fetch current balances
    const ethBalance = await fetchEthereumBalance(address);
    const ethPrice = 2847.50; // Mock ETH price
    const ethUsdValue = parseFloat(ethBalance) * ethPrice;

    // Fetch token balance (simulated)
    const { balance: tokenBalance, price: tokenPrice } = await fetchTokenBalance(address, 'VALOR');
    const totalUsdValue = ethUsdValue + (parseFloat(tokenBalance) * tokenPrice);

    // Calculate 24h change (simulated)
    const previousHistory = balanceHistory.get(address) || [];
    let change24h = 0;
    let changePercent24h = 0;

    if (previousHistory.length > 0) {
      const previous = previousHistory[0];
      change24h = totalUsdValue - previous.usdValue;
      changePercent24h = (change24h / previous.usdValue) * 100;
    }

    const update: BalanceUpdate = {
      address,
      balance: ethBalance,
      usdValue: totalUsdValue,
      timestamp: Date.now(),
      change24h,
      changePercent24h,
      token: 'ETH',
      price: ethPrice,
    };

    // Store in history (keep last 1440 = 24 hours at 1-minute intervals)
    const history = previousHistory || [];
    history.unshift(update);
    if (history.length > 1440) {
      history.pop();
    }
    balanceHistory.set(address, history);

    return NextResponse.json(update);
  } catch (error) {
    console.error('[API] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
