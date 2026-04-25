'use client';

import { useState } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CSSS_TOKEN, 
  CSSS_CONTRACT, 
  REPUTATION_NFTS, 
  CSSS_SOLIDITY,
  TOKEN_CINEMA 
} from '@/lib/cds-data';
import { Coins, Shield, Flame, Lock, Copy, Check, ExternalLink } from 'lucide-react';
import { HomeButton, HomeBreadcrumb } from '@/components/cds/home-button';

export default function TokenPage() {
  const [copied, setCopied] = useState(false);

  const copyContract = () => {
    navigator.clipboard.writeText(CSSS_SOLIDITY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-primary/20 border-2 border-primary flex items-center justify-center">
              <Coins className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-mono font-bold text-foreground">
                $CSSS TOKEN & NFT
              </h1>
              <p className="text-muted-foreground font-mono">
                Consolidated Sovereign Shard System — Soulbound Reputation Protocol
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-primary/20 text-primary border-primary/40">
              {CSSS_TOKEN.symbol}
            </Badge>
            <Badge className="bg-accent/20 text-accent border-accent/40">
              {CSSS_TOKEN.standard}
            </Badge>
            <Badge className="bg-chart-3/20 text-chart-3 border-chart-3/40">
              {CSSS_TOKEN.status}
            </Badge>
            <Badge variant="outline">
              {CSSS_CONTRACT.network}
            </Badge>
          </div>
        </div>

        {/* Token Specs */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-mono text-lg flex items-center gap-2">
                <Coins className="w-5 h-5 text-primary" />
                TOKEN SPECIFICATION
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground font-mono">TOKEN ID</p>
                  <p className="font-mono text-sm text-foreground">{CSSS_TOKEN.tokenId}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono">SYMBOL</p>
                  <p className="font-mono text-sm text-primary font-bold">{CSSS_TOKEN.symbol}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono">SUPPLY</p>
                  <p className="font-mono text-sm text-foreground">{CSSS_TOKEN.supply}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono">DECIMALS</p>
                  <p className="font-mono text-sm text-foreground">{CSSS_TOKEN.decimals}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground font-mono mb-2">STANDARD</p>
                <p className="font-mono text-sm text-accent">{CSSS_TOKEN.standard}</p>
              </div>
              
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground font-mono mb-2">MERKLEROOT</p>
                <p className="font-mono text-xs text-muted-foreground break-all">
                  {CSSS_CONTRACT.merkleroot}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-mono text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                CONTRACT FEATURES
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {CSSS_CONTRACT.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="font-mono text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* NFT Collection */}
        <Card className="bg-card border-border mb-8">
          <CardHeader>
            <CardTitle className="font-mono text-lg">REPUTATION NFT COLLECTION</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {REPUTATION_NFTS.map((nft) => (
                <div 
                  key={nft.nftId}
                  className={`p-4 rounded-lg border ${
                    nft.tier === 'SOVEREIGN' 
                      ? 'bg-primary/10 border-primary/40' 
                      : nft.tier === 'ALIGNED'
                      ? 'bg-accent/10 border-accent/40'
                      : 'bg-destructive/10 border-destructive/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={
                      nft.tier === 'SOVEREIGN' 
                        ? 'bg-primary text-primary-foreground' 
                        : nft.tier === 'ALIGNED'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-destructive text-destructive-foreground'
                    }>
                      {nft.tier}
                    </Badge>
                    {nft.tier === 'EXCLUDED' ? (
                      <Flame className="w-5 h-5 text-destructive" />
                    ) : (
                      <Lock className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  
                  <h3 className="font-mono text-sm font-bold text-foreground mb-1">
                    {nft.name}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground mb-3">
                    {nft.collection}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-muted-foreground">SCORE</span>
                    <span className={`font-mono text-sm font-bold ${
                      nft.score > 0 ? 'text-primary' : 'text-destructive'
                    }`}>
                      {nft.score}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <p className={`font-mono text-xs ${
                      nft.tier === 'EXCLUDED' ? 'text-destructive' : 'text-primary'
                    }`}>
                      {nft.status}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {nft.traits.slice(0, 3).map((trait, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {trait}
                      </Badge>
                    ))}
                    {nft.traits.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{nft.traits.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Smart Contract Code */}
        <Card className="bg-card border-border mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-mono text-lg">SOLIDITY CONTRACT</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={copyContract}
              className="font-mono"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  COPIED
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  COPY
                </>
              )}
            </Button>
          </CardHeader>
          <CardContent>
            <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto text-xs font-mono text-foreground max-h-96 overflow-y-auto">
              {CSSS_SOLIDITY}
            </pre>
          </CardContent>
        </Card>

        {/* Project Cinema */}
        <Card className="bg-primary/5 border-primary/30">
          <CardHeader>
            <CardTitle className="font-mono text-lg text-primary">
              PROJECT CINEMA: TOKEN FINALITY
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-card rounded-lg border border-border">
                <p className="text-xs text-muted-foreground font-mono mb-1">THE SHIELD</p>
                <p className="font-mono text-sm text-foreground">{TOKEN_CINEMA.theShield}</p>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border">
                <p className="text-xs text-muted-foreground font-mono mb-1">THE STAND</p>
                <p className="font-mono text-sm text-foreground">{TOKEN_CINEMA.theStand}</p>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border">
                <p className="text-xs text-muted-foreground font-mono mb-1">THE FINALITY</p>
                <p className="font-mono text-sm text-foreground">{TOKEN_CINEMA.theFinality}</p>
              </div>
            </div>
            
            <div className="p-4 bg-card rounded-lg border border-primary/40 text-center">
              <p className="font-mono text-sm text-primary font-bold">
                {TOKEN_CINEMA.lockStatus}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="font-mono text-xs text-muted-foreground">
            DG77.77X LOCKED | $CSSS SOULBOUND PROTOCOL | MADE IN THE USA
          </p>
        </div>
      </main>
    </div>
  );
}
