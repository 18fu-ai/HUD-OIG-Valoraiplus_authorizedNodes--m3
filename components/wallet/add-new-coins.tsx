'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  AlertCircle,
  BookOpen,
  Code2,
  Plus,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface TokenDeployment {
  contractAddress: string;
  name: string;
  symbol: string;
  supply: string;
  decimals: number;
  deployedAt: string;
  network: string;
}

interface AddNewCoinsProps {
  deployedTokens: TokenDeployment[];
  onAddToken?: (tokenAddress: string) => void;
}

export function AddNewCoins({ deployedTokens, onAddToken }: AddNewCoinsProps) {
  const [tokenAddress, setTokenAddress] = useState('');
  const [activeTab, setActiveTab] = useState('manage');
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToken = () => {
    if (tokenAddress && onAddToken) {
      onAddToken(tokenAddress);
      setTokenAddress('');
    }
  };

  return (
    <Card className="w-full border-foreground/20">
      <CardHeader>
        <CardTitle>Add New Coins & Treasury Management</CardTitle>
        <CardDescription>
          Deploy new tokens to the blockchain and manage your treasury ecosystem
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="manage">My Treasury</TabsTrigger>
            <TabsTrigger value="deploy">Deploy Token</TabsTrigger>
            <TabsTrigger value="learn">Learn</TabsTrigger>
          </TabsList>

          {/* MANAGE TREASURY TAB */}
          <TabsContent value="manage" className="space-y-4">
            {deployedTokens.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No tokens deployed yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {deployedTokens.map((token, idx) => (
                  <div
                    key={idx}
                    className="border border-foreground/10 rounded-lg p-4 space-y-2 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{token.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {token.symbol}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {token.network}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Supply: {token.supply} | Decimals: {token.decimals}
                        </p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    </div>
                    <div className="flex items-center justify-between gap-2 bg-muted/50 p-2 rounded text-xs">
                      <code className="font-mono truncate">{token.contractAddress}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyAddress(token.contractAddress)}
                      >
                        {copied ? 'Copied!' : 'Copy'}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Deployed: {new Date(token.deployedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <p className="font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Treasury Wallet Info
              </p>
              <p className="text-xs">
                Your treasury wallet holds 0.01% of the total system tokens. This dedicated wallet
                funds new token deployments and educational initiatives.
              </p>
            </div>
          </TabsContent>

          {/* DEPLOY TOKEN TAB */}
          <TabsContent value="deploy" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Token Contract Address</label>
              <Input
                placeholder="0x..."
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Enter the contract address of a token deployed on Base Mainnet
              </p>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded text-sm text-amber-700 dark:text-amber-300 space-y-2">
              <p className="font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Deployment Requirements
              </p>
              <ul className="text-xs space-y-1 ml-6 list-disc">
                <li>Token must be deployed on Base Mainnet (Chain ID: 8453)</li>
                <li>Contract must be ERC-20 compliant</li>
                <li>Treasury wallet must have sufficient gas for verification</li>
                <li>All token data becomes part of VALORAIPLUS permanent record</li>
              </ul>
            </div>

            <Button
              onClick={handleAddToken}
              disabled={!tokenAddress}
              className="w-full"
              size="lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Token to Treasury
            </Button>

            <div className="bg-green-500/10 border border-green-500/20 p-3 rounded text-sm text-green-700 dark:text-green-300">
              <p className="font-medium mb-1">Gas Cost Covered</p>
              <p className="text-xs">
                Treasury wallet covers all gas fees for token verification and management.
              </p>
            </div>
          </TabsContent>

          {/* LEARN TAB */}
          <TabsContent value="learn" className="space-y-4">
            <div className="space-y-3">
              <div className="border border-foreground/10 rounded-lg p-4">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4" />
                  How to Create Your Own Token
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Learn the fundamentals of creating, deploying, and managing ERC-20 tokens on
                  Base Mainnet.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="bg-muted p-2 rounded">
                    <p className="font-medium mb-1">Step 1: Write Your Smart Contract</p>
                    <p className="text-muted-foreground">
                      Use Solidity to create an ERC-20 compliant contract with your desired
                      parameters (name, symbol, supply, decimals).
                    </p>
                  </div>
                  <div className="bg-muted p-2 rounded">
                    <p className="font-medium mb-1">Step 2: Deploy to Base Testnet</p>
                    <p className="text-muted-foreground">
                      Use Hardhat or Foundry to deploy your contract to Base Goerli testnet for
                      testing.
                    </p>
                  </div>
                  <div className="bg-muted p-2 rounded">
                    <p className="font-medium mb-1">Step 3: Deploy to Base Mainnet</p>
                    <p className="text-muted-foreground">
                      Once verified, deploy your contract to Base Mainnet (Chain ID: 8453) with
                      sufficient gas.
                    </p>
                  </div>
                  <div className="bg-muted p-2 rounded">
                    <p className="font-medium mb-1">Step 4: Add to VALORAIPLUS</p>
                    <p className="text-muted-foreground">
                      Submit your contract address to add it to the treasury and ecosystem
                      tracking.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-foreground/10 rounded-lg p-4">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <Code2 className="w-4 h-4" />
                  Resources & Documentation
                </h4>
                <div className="space-y-2 text-sm">
                  <a
                    href="https://docs.base.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    Base Network Documentation
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://docs.openzeppelin.com/contracts/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    OpenZeppelin ERC-20 Guide
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://hardhat.org/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    Hardhat Development Framework
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded">
                <h4 className="font-semibold text-sm mb-2 text-purple-900 dark:text-purple-300">
                  VALORAIPLUS Treasury Model
                </h4>
                <p className="text-xs text-purple-900 dark:text-purple-300 leading-relaxed">
                  The VALORAIPLUS treasury operates as an offset model: 0.01% of all system
                  tokens are dedicated to a separate wallet that funds educational initiatives,
                  token deployment costs, and social benefit programs like $VACN (Vietnam
                  Veterans Children).
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
