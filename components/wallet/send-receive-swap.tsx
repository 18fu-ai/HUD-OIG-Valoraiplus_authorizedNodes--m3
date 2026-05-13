'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRightLeft, Send, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WalletAddress {
  id: string;
  name: string;
  address: string;
  balance: string;
  token: string;
}

interface SendReceiveSwapProps {
  linkedWallets: WalletAddress[];
  onSend?: (from: WalletAddress, to: WalletAddress, amount: string) => void;
  onSwap?: (fromToken: string, toToken: string, amount: string) => void;
}

export function SendReceiveSwap({
  linkedWallets,
  onSend,
  onSwap,
}: SendReceiveSwapProps) {
  const [activeTab, setActiveTab] = useState('send');
  const [fromWallet, setFromWallet] = useState<WalletAddress | null>(
    linkedWallets[0] || null
  );
  const [toWallet, setToWallet] = useState<WalletAddress | null>(
    linkedWallets[1] || null
  );
  const [amount, setAmount] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwapWallets = () => {
    const temp = fromWallet;
    setFromWallet(toWallet);
    setToWallet(temp);
  };

  const handleSend = () => {
    if (fromWallet && toWallet && amount && onSend) {
      onSend(fromWallet, toWallet, amount);
      setAmount('');
    }
  };

  const handleSwap = () => {
    if (fromWallet && toWallet && amount && onSwap) {
      onSwap(fromWallet.token, toWallet.token, amount);
      setAmount('');
    }
  };

  return (
    <Card className="w-full border-foreground/20">
      <CardHeader>
        <CardTitle>Send, Receive & Swap</CardTitle>
        <CardDescription>
          Manage your connected wallets and execute transfers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="send" className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Send
            </TabsTrigger>
            <TabsTrigger value="receive" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Receive
            </TabsTrigger>
            <TabsTrigger value="swap" className="flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4" />
              Swap
            </TabsTrigger>
          </TabsList>

          {/* SEND TAB */}
          <TabsContent value="send" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">From Wallet</label>
              <Select
                value={fromWallet?.id || ''}
                onValueChange={(id) => {
                  const wallet = linkedWallets.find((w) => w.id === id);
                  setFromWallet(wallet || null);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select wallet to send from" />
                </SelectTrigger>
                <SelectContent>
                  {linkedWallets.map((wallet) => (
                    <SelectItem key={wallet.id} value={wallet.id}>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{wallet.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {wallet.balance} {wallet.token}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fromWallet && (
                <p className="text-xs text-muted-foreground">
                  Address: {fromWallet.address.slice(0, 12)}...
                  {fromWallet.address.slice(-10)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">To Wallet</label>
              <Select
                value={toWallet?.id || ''}
                onValueChange={(id) => {
                  const wallet = linkedWallets.find((w) => w.id === id);
                  setToWallet(wallet || null);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select wallet to send to" />
                </SelectTrigger>
                <SelectContent>
                  {linkedWallets
                    .filter((w) => w.id !== fromWallet?.id)
                    .map((wallet) => (
                      <SelectItem key={wallet.id} value={wallet.id}>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{wallet.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {wallet.balance} {wallet.token}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {toWallet && (
                <p className="text-xs text-muted-foreground">
                  Address: {toWallet.address.slice(0, 12)}...
                  {toWallet.address.slice(-10)}
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSwapWallets}
                disabled={!fromWallet || !toWallet}
              >
                <ArrowRightLeft className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Amount</label>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="font-mono"
              />
              {fromWallet && (
                <p className="text-xs text-muted-foreground">
                  Available: {fromWallet.balance} {fromWallet.token}
                </p>
              )}
            </div>

            <Button
              onClick={handleSend}
              disabled={!fromWallet || !toWallet || !amount}
              className="w-full"
            >
              Send {fromWallet?.token || 'Currency'}
            </Button>
          </TabsContent>

          {/* RECEIVE TAB */}
          <TabsContent value="receive" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Wallet to Receive</label>
              <Select
                value={fromWallet?.id || ''}
                onValueChange={(id) => {
                  const wallet = linkedWallets.find((w) => w.id === id);
                  setFromWallet(wallet || null);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose wallet" />
                </SelectTrigger>
                <SelectContent>
                  {linkedWallets.map((wallet) => (
                    <SelectItem key={wallet.id} value={wallet.id}>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{wallet.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {wallet.token}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {fromWallet && (
              <div className="bg-muted p-4 rounded-lg space-y-3">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Wallet Address</p>
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-sm font-mono bg-background p-2 rounded flex-1 overflow-auto">
                      {fromWallet.address}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyAddress(fromWallet.address)}
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Current Balance</p>
                  <p className="text-lg font-mono font-bold">
                    {fromWallet.balance} {fromWallet.token}
                  </p>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 p-2 rounded text-xs text-yellow-700 dark:text-yellow-300">
                  Share this address to receive {fromWallet.token} transfers
                </div>
              </div>
            )}
          </TabsContent>

          {/* SWAP TAB */}
          <TabsContent value="swap" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">From Token</label>
              <Select
                value={fromWallet?.id || ''}
                onValueChange={(id) => {
                  const wallet = linkedWallets.find((w) => w.id === id);
                  setFromWallet(wallet || null);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select token to swap from" />
                </SelectTrigger>
                <SelectContent>
                  {linkedWallets.map((wallet) => (
                    <SelectItem key={wallet.id} value={wallet.id}>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{wallet.token}</span>
                        <span className="text-xs text-muted-foreground">
                          {wallet.balance}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSwapWallets}
                disabled={!fromWallet || !toWallet}
              >
                <ArrowRightLeft className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">To Token</label>
              <Select
                value={toWallet?.id || ''}
                onValueChange={(id) => {
                  const wallet = linkedWallets.find((w) => w.id === id);
                  setToWallet(wallet || null);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select token to swap to" />
                </SelectTrigger>
                <SelectContent>
                  {linkedWallets
                    .filter((w) => w.id !== fromWallet?.id)
                    .map((wallet) => (
                      <SelectItem key={wallet.id} value={wallet.id}>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{wallet.token}</span>
                          <span className="text-xs text-muted-foreground">
                            {wallet.balance}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Amount to Swap</label>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="font-mono"
              />
              {fromWallet && (
                <p className="text-xs text-muted-foreground">
                  Available: {fromWallet.balance} {fromWallet.token}
                </p>
              )}
            </div>

            <Button
              onClick={handleSwap}
              disabled={!fromWallet || !toWallet || !amount}
              className="w-full"
            >
              Swap to {toWallet?.token || 'Token'}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
