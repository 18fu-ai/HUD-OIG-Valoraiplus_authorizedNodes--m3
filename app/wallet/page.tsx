'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { SOVEREIGN_WALLET, getShortAddress } from '@/lib/wallet-config';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  Wallet, 
  Shield, 
  Clock, 
  ArrowUpRight, 
  ArrowDownLeft,
  QrCode,
  History,
  Coins
} from 'lucide-react';
import Image from 'next/image';

export default function WalletPage() {
  const [copied, setCopied] = useState(false);
  const [copiedFull, setCopiedFull] = useState(false);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(SOVEREIGN_WALLET.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyFullAddress = async () => {
    await navigator.clipboard.writeText(SOVEREIGN_WALLET.address);
    setCopiedFull(true);
    setTimeout(() => setCopiedFull(false), 2000);
  };

  const daysUntilExpiry = Math.ceil(
    (new Date(SOVEREIGN_WALLET.expiry).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-screen-xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-mono font-bold text-foreground flex items-center gap-3">
                <Wallet className="h-7 w-7 text-amber-400" />
                Sovereign Wallet
              </h1>
              <p className="text-sm text-muted-foreground font-mono">
                ROOT AUTHORITY | VALOR AI+ ECOSYSTEM
              </p>
            </div>
            <Badge variant="outline" className="border-green-500/50 text-green-400 px-4 py-2">
              <Shield className="mr-2 h-4 w-4" />
              SOVEREIGN PROTECTED
            </Badge>
          </div>
        </div>

        {/* Main Wallet Card */}
        <Card className="border-amber-500/30 bg-gradient-to-br from-amber-950/30 via-background to-cyan-950/20">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Wallet Info */}
              <div className="space-y-6">
                {/* ENS Domain Display */}
                <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-cyan-400/70 uppercase tracking-wider mb-1">ENS Domain</p>
                      <p className="font-mono text-3xl font-bold text-cyan-400">
                        {SOVEREIGN_WALLET.ens}
                      </p>
                    </div>
                    <a
                      href={SOVEREIGN_WALLET.ensUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 p-2 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/10 transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Expires: {SOVEREIGN_WALLET.expiry}</span>
                    <Badge variant="outline" className="ml-2 border-amber-500/50 text-amber-400">
                      {daysUntilExpiry} days remaining
                    </Badge>
                  </div>
                </div>

                {/* Wallet Address */}
                <div className="rounded-xl border border-border bg-muted/30 p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Wallet Address</p>
                  <div className="flex items-center gap-3 mb-3">
                    <code className="flex-1 font-mono text-xl font-semibold text-foreground">
                      {getShortAddress(SOVEREIGN_WALLET.address)}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyAddress}
                      className="gap-2"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 text-green-500" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>
                    <a
                      href={SOVEREIGN_WALLET.etherscanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm" className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Etherscan
                      </Button>
                    </a>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50 border border-border/50">
                    <code className="flex-1 font-mono text-xs text-muted-foreground break-all">
                      {SOVEREIGN_WALLET.address}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyFullAddress}
                      className="h-6 w-6 p-0 shrink-0"
                    >
                      {copiedFull ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Owner Subdomain */}
                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Owner Subdomain</p>
                  <code className="font-mono text-xs text-foreground break-all leading-relaxed">
                    {SOVEREIGN_WALLET.ownerSubdomain}
                  </code>
                </div>
              </div>

              {/* Right Side - QR & Actions */}
              <div className="space-y-6">
                {/* QR Code Placeholder */}
                <div className="rounded-xl border border-border bg-white p-6 flex flex-col items-center justify-center">
                  <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center mb-4">
                    <QrCode className="h-32 w-32 text-muted-foreground/30" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Scan to send funds to this wallet
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-14 gap-2 border-green-500/30 text-green-400 hover:bg-green-500/10">
                    <ArrowDownLeft className="h-5 w-5" />
                    Receive
                  </Button>
                  <Button variant="outline" className="h-14 gap-2 border-amber-500/30 text-amber-400 hover:bg-amber-500/10">
                    <ArrowUpRight className="h-5 w-5" />
                    Send
                  </Button>
                </div>

                {/* Network Info */}
                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Network</p>
                      <p className="font-semibold">{SOVEREIGN_WALLET.network}</p>
                    </div>
                    <Badge variant="outline" className="border-green-500/50 text-green-400">
                      Chain ID: {SOVEREIGN_WALLET.chainId}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Token Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Supported Tokens */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Coins className="h-5 w-5 text-blue-400" />
                Supported Tokens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {SOVEREIGN_WALLET.supportedTokens.map((token) => (
                  <div
                    key={token.symbol}
                    className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30"
                  >
                    <div>
                      <p className="font-semibold">{token.symbol}</p>
                      <p className="text-xs text-muted-foreground">{token.name}</p>
                    </div>
                    <Badge variant="secondary">{token.decimals} decimals</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ecosystem Tokens */}
          <Card className="border-amber-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-amber-400">
                <Shield className="h-5 w-5" />
                Ecosystem Tokens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {SOVEREIGN_WALLET.ecosystemTokens.map((token) => (
                  <div
                    key={token}
                    className="flex items-center justify-between p-3 rounded-lg border border-amber-500/20 bg-amber-950/20"
                  >
                    <p className="font-mono font-semibold text-amber-400">{token}</p>
                    <Badge variant="outline" className="border-amber-500/50 text-amber-400">
                      VALOR AI+
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Beneficiary Tokens */}
          <Card className="border-cyan-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-cyan-400">
                <Shield className="h-5 w-5" />
                Beneficiary Tokens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {SOVEREIGN_WALLET.beneficiaryTokens.map((token) => (
                  <div
                    key={token}
                    className="flex items-center justify-between p-3 rounded-lg border border-cyan-500/20 bg-cyan-950/20"
                  >
                    <p className="font-mono font-semibold text-cyan-400">{token}</p>
                    <Badge variant="outline" className="border-green-500/50 text-green-400">
                      ENCAPSULATED
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <History className="h-12 w-12 mb-4 opacity-30" />
              <p>Connect to view transaction history</p>
              <a
                href={SOVEREIGN_WALLET.etherscanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4"
              >
                <Button variant="outline" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View on Etherscan
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
