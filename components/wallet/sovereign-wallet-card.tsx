"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SOVEREIGN_WALLET, getShortAddress } from "@/lib/wallet-config";
import { Copy, Check, ExternalLink, Wallet, Shield, Clock } from "lucide-react";

export function SovereignWalletCard() {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(SOVEREIGN_WALLET.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const daysUntilExpiry = Math.ceil(
    (new Date(SOVEREIGN_WALLET.expiry).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Card className="border-amber-500/30 bg-gradient-to-br from-amber-950/20 to-background">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-amber-400">
            <Wallet className="h-5 w-5" />
            Sovereign Wallet
          </CardTitle>
          <Badge variant="outline" className="border-amber-500/50 text-amber-400">
            <Shield className="mr-1 h-3 w-3" />
            ROOT AUTHORITY
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* ENS Domain */}
        <div className="rounded-lg border border-cyan-500/30 bg-cyan-950/20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">ENS Domain</p>
              <p className="font-mono text-lg font-bold text-cyan-400">
                {SOVEREIGN_WALLET.ens}
              </p>
            </div>
            <a
              href={SOVEREIGN_WALLET.ensUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Expires: {SOVEREIGN_WALLET.expiry} ({daysUntilExpiry} days)</span>
          </div>
        </div>

        {/* Wallet Address */}
        <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
          <p className="mb-1 text-xs text-muted-foreground">Wallet Address</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 font-mono text-sm text-foreground">
              {getShortAddress(SOVEREIGN_WALLET.address)}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyAddress}
              className="h-8 w-8 p-0"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            <a
              href={SOVEREIGN_WALLET.etherscanUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>
          <p className="mt-2 break-all font-mono text-[10px] text-muted-foreground">
            {SOVEREIGN_WALLET.address}
          </p>
        </div>

        {/* Owner Subdomain */}
        <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
          <p className="mb-1 text-xs text-muted-foreground">Owner</p>
          <p className="break-all font-mono text-[10px] text-foreground">
            {SOVEREIGN_WALLET.ownerSubdomain}
          </p>
        </div>

        {/* Supported Tokens */}
        <div>
          <p className="mb-2 text-xs text-muted-foreground">Supported Tokens</p>
          <div className="flex flex-wrap gap-1">
            {SOVEREIGN_WALLET.supportedTokens.map((token) => (
              <Badge key={token.symbol} variant="secondary" className="text-xs">
                {token.symbol}
              </Badge>
            ))}
          </div>
        </div>

        {/* Ecosystem Tokens */}
        <div>
          <p className="mb-2 text-xs text-muted-foreground">Ecosystem Tokens</p>
          <div className="flex flex-wrap gap-1">
            {SOVEREIGN_WALLET.ecosystemTokens.map((token) => (
              <Badge
                key={token}
                variant="outline"
                className="border-amber-500/50 text-xs text-amber-400"
              >
                {token}
              </Badge>
            ))}
          </div>
        </div>

        {/* Network */}
        <div className="flex items-center justify-between border-t border-border/50 pt-3">
          <span className="text-xs text-muted-foreground">Network</span>
          <Badge variant="outline" className="border-green-500/50 text-green-400">
            {SOVEREIGN_WALLET.network}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
