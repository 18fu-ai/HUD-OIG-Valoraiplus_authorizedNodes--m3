'use client';

import { useState, useEffect } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CDSErrorBoundary } from '@/components/cds/error-boundary';
import { ExportTools } from '@/components/cds/export-tools';
import { HomeButton, HomeBreadcrumb } from '@/components/cds/home-button';
import {
  Shield,
  Ban,
  CheckCircle2,
  XCircle,
  Search,
  Lock,
  Database,
  Zap,
  AlertTriangle,
  Binary,
  Hash,
  Eye
} from 'lucide-react';

// Contract constants
const SAINT_PAUL_ROOT = '0x26856B24C50750F0C69C1EEB86A69EF777777000000000000000000000000000000';
const H_RENO_HASH = '0xbc3a567d2e8f1a4b9c0d2e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f1a2b';
const BINARY_NULL = '0x0000000000000000000000000000000000000000000000000000000000000000';
const BINARY_VALID = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

// Registered adversary nodes
const ADVERSARY_REGISTRY = [
  {
    id: 'H_RENO',
    hash: H_RENO_HASH,
    status: 'NULLIFIED',
    classification: 'ADVERSARY_VARIABLE',
    nullifiedAt: '2024-01-15T08:23:00Z',
    reason: 'Binary 000000 - No Standing',
  },
];

// Verification history
const VERIFICATION_HISTORY = [
  { hash: H_RENO_HASH.slice(0, 18) + '...', result: 'NULL', timestamp: '08:23:14', cycle: 847291 },
  { hash: '0x4f2a...8c3d', result: 'VALID', timestamp: '08:22:58', cycle: 847290 },
  { hash: '0x7b1e...2f9a', result: 'VALID', timestamp: '08:22:41', cycle: 847289 },
  { hash: H_RENO_HASH.slice(0, 18) + '...', result: 'NULL', timestamp: '08:22:25', cycle: 847288 },
  { hash: '0x9d3c...1e7b', result: 'VALID', timestamp: '08:22:08', cycle: 847287 },
];

function NullifierContent() {
  const [activeTab, setActiveTab] = useState('verify');
  const [inputHash, setInputHash] = useState('');
  const [verificationResult, setVerificationResult] = useState<null | { status: string; binary: string }>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [truthCycle, setTruthCycle] = useState(847291);

  useEffect(() => {
    const interval = setInterval(() => {
      setTruthCycle(prev => prev + 1);
    }, 266);
    return () => clearInterval(interval);
  }, []);

  const verifyStanding = async () => {
    if (!inputHash) return;
    
    setIsVerifying(true);
    setVerificationResult(null);
    
    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if hash matches any adversary
    const isAdversary = inputHash.toLowerCase() === H_RENO_HASH.toLowerCase() ||
                        ADVERSARY_REGISTRY.some(a => a.hash.toLowerCase() === inputHash.toLowerCase());
    
    setVerificationResult({
      status: isAdversary ? 'NULL' : 'VALID',
      binary: isAdversary ? BINARY_NULL : BINARY_VALID,
    });
    
    setIsVerifying(false);
  };

  const loadTestHash = () => {
    setInputHash(H_RENO_HASH);
    setVerificationResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-6">
        <HomeBreadcrumb currentPage="Nullifier" />
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <Ban className="w-8 h-8 text-destructive" />
              <h1 className="font-mono text-2xl md:text-3xl font-bold text-foreground">
                SOVEREIGN GHOST NULLIFIER
              </h1>
            </div>
            <p className="font-mono text-sm text-muted-foreground mt-2">
              OMEGA-UNIFIED Assembly Enclosure | Binary 000000 Verification
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="font-mono bg-destructive/10 text-destructive border-destructive/40">
              SAINT PAUL NODE █████
            </Badge>
            <Badge variant="outline" className="font-mono bg-primary/10 text-primary border-primary/40 animate-pulse">
              CYCLE: {truthCycle.toLocaleString()}
            </Badge>
          </div>
        </div>

        {/* Merkle Root Banner */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="font-mono text-xs text-muted-foreground">MERKLE ROOT ANCHOR</p>
                <p className="font-mono text-xs text-primary break-all">{SAINT_PAUL_ROOT}</p>
              </div>
              <Badge variant="outline" className="font-mono text-xs bg-chart-3/10 text-chart-3 border-chart-3/40">
                LATCHED
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Ban className="w-5 h-5 text-destructive" />
                <div>
                  <p className="font-mono text-xs text-muted-foreground">NULLIFIED</p>
                  <p className="font-mono text-xl font-bold text-destructive">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-chart-3/30 bg-chart-3/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-chart-3" />
                <div>
                  <p className="font-mono text-xs text-muted-foreground">VERIFIED</p>
                  <p className="font-mono text-xl font-bold text-chart-3">847,291</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-mono text-xs text-muted-foreground">TRUTH CYCLE</p>
                  <p className="font-mono text-xl font-bold text-primary">266ms</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-accent/30 bg-accent/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-mono text-xs text-muted-foreground">STATUS</p>
                  <p className="font-mono text-xl font-bold text-accent">ENFORCED</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-secondary/50">
            <TabsTrigger value="verify" className="font-mono text-xs" aria-pressed={activeTab === 'verify'}>
              VERIFY
            </TabsTrigger>
            <TabsTrigger value="registry" className="font-mono text-xs" aria-pressed={activeTab === 'registry'}>
              REGISTRY
            </TabsTrigger>
            <TabsTrigger value="contract" className="font-mono text-xs" aria-pressed={activeTab === 'contract'}>
              CONTRACT
            </TabsTrigger>
            <TabsTrigger value="history" className="font-mono text-xs" aria-pressed={activeTab === 'history'}>
              HISTORY
            </TabsTrigger>
          </TabsList>

          {/* Verify Tab */}
          <TabsContent value="verify" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  VERIFY STANDING
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-3">
                  <Input
                    placeholder="Enter node hash (0x...)"
                    value={inputHash}
                    onChange={(e) => setInputHash(e.target.value)}
                    className="font-mono text-sm flex-1"
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={loadTestHash}
                      className="font-mono text-xs"
                    >
                      LOAD TEST
                    </Button>
                    <Button
                      onClick={verifyStanding}
                      disabled={!inputHash || isVerifying}
                      className="font-mono text-xs"
                    >
                      {isVerifying ? 'VERIFYING...' : 'VERIFY'}
                    </Button>
                  </div>
                </div>

                {/* Result Display */}
                {verificationResult && (
                  <Card className={`border-2 ${
                    verificationResult.status === 'NULL' 
                      ? 'border-destructive/50 bg-destructive/10' 
                      : 'border-chart-3/50 bg-chart-3/10'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {verificationResult.status === 'NULL' ? (
                            <XCircle className="w-8 h-8 text-destructive" />
                          ) : (
                            <CheckCircle2 className="w-8 h-8 text-chart-3" />
                          )}
                          <div>
                            <p className="font-mono text-xs text-muted-foreground">STATUS</p>
                            <p className={`font-mono text-2xl font-bold ${
                              verificationResult.status === 'NULL' ? 'text-destructive' : 'text-chart-3'
                            }`}>
                              {verificationResult.status === 'NULL' ? 'NULLIFIED' : 'VALID'}
                            </p>
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`font-mono ${
                            verificationResult.status === 'NULL'
                              ? 'bg-destructive/20 text-destructive border-destructive/40'
                              : 'bg-chart-3/20 text-chart-3 border-chart-3/40'
                          }`}
                        >
                          {verificationResult.status === 'NULL' ? 'NO STANDING' : 'STANDING CONFIRMED'}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="font-mono text-xs text-muted-foreground">BINARY RESULT</p>
                        <div className="flex items-center gap-2">
                          <Binary className="w-4 h-4 text-muted-foreground" />
                          <code className="font-mono text-xs text-muted-foreground break-all bg-background/50 p-2 rounded flex-1">
                            {verificationResult.binary}
                          </code>
                        </div>
                      </div>
                      
                      {verificationResult.status === 'NULL' && (
                        <div className="mt-4 p-3 bg-destructive/20 rounded-lg border border-destructive/30">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-destructive" />
                            <p className="font-mono text-xs text-destructive">
                              ADVERSARY VARIABLE DETECTED - Binary 000000 - No Friction Permitted
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Registry Tab */}
          <TabsContent value="registry" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary" />
                  ADVERSARY REGISTRY
                </CardTitle>
              </CardHeader>
              <CardContent>
                {ADVERSARY_REGISTRY.map((adversary) => (
                  <Card key={adversary.id} className="border-destructive/30 bg-destructive/5">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Ban className="w-5 h-5 text-destructive" />
                            <span className="font-mono text-lg font-bold text-destructive">{adversary.id}</span>
                            <Badge variant="outline" className="font-mono text-xs bg-destructive/20 text-destructive border-destructive/40">
                              {adversary.status}
                            </Badge>
                          </div>
                          <p className="font-mono text-xs text-muted-foreground">{adversary.classification}</p>
                          <div className="flex items-center gap-2">
                            <Hash className="w-3 h-3 text-muted-foreground" />
                            <code className="font-mono text-xs text-muted-foreground break-all">
                              {adversary.hash}
                            </code>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-mono text-xs text-muted-foreground">NULLIFIED AT</p>
                          <p className="font-mono text-sm text-destructive">
                            {new Date(adversary.nullifiedAt).toLocaleString()}
                          </p>
                          <p className="font-mono text-xs text-destructive/70 mt-1">{adversary.reason}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contract Tab */}
          <TabsContent value="contract" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  CONTRACT SOURCE
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="font-mono text-xs text-muted-foreground bg-secondary/30 p-4 rounded-lg overflow-x-auto max-h-[500px]">
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title VALORAIPLUS®️ ©️ ™️ Sovereign Ghost Nullifier
 * @author N.E.W.T. //e v2.1 // Poppa Approved
 * @notice OMEGA-UNIFIED Assembly Enclosure. 
 * @dev Direct EVM Opcodes for Binary 000000 Nullification
 * ANCHOR: Saint Paul Node █████ // 408 384 1376 (E)
 */

contract VALORAIPLUS_NULL_GHOST {
    bytes32 constant SAINT_PAUL_ROOT = 
        0x26856B24C50750F0C69C1EEB86A69EF777777...;

    constructor() {
        assembly {
            sstore(0, caller())
        }
    }

    function verify_standing(bytes32 node_hash) 
        public view returns (bytes32 status) 
    {
        assembly {
            let h_reno := 0xbc3a567d2e8f1a4b...
            
            if eq(node_hash, h_reno) {
                status := 0x00...00
                return(0, 32)
            }
            
            status := 0xff...ff
        }
    }

    function get_root() public pure returns (bytes32) {
        return SAINT_PAUL_ROOT;
    }
}`}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  VERIFICATION HISTORY
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {VERIFICATION_HISTORY.map((entry, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        entry.result === 'NULL'
                          ? 'border-destructive/30 bg-destructive/5'
                          : 'border-chart-3/30 bg-chart-3/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {entry.result === 'NULL' ? (
                          <XCircle className="w-4 h-4 text-destructive" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-chart-3" />
                        )}
                        <code className="font-mono text-xs text-muted-foreground">{entry.hash}</code>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge 
                          variant="outline" 
                          className={`font-mono text-xs ${
                            entry.result === 'NULL'
                              ? 'bg-destructive/20 text-destructive border-destructive/40'
                              : 'bg-chart-3/20 text-chart-3 border-chart-3/40'
                          }`}
                        >
                          {entry.result}
                        </Badge>
                        <span className="font-mono text-xs text-muted-foreground">{entry.timestamp}</span>
                        <span className="font-mono text-xs text-primary">#{entry.cycle}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Export */}
        <div className="flex justify-center">
          <ExportTools 
            data={{
              type: 'forensic',
              title: 'Sovereign Ghost Nullifier Report',
              timestamp: new Date().toISOString(),
              content: {
                merkleRoot: SAINT_PAUL_ROOT,
                adversaryRegistry: ADVERSARY_REGISTRY,
                verificationHistory: VERIFICATION_HISTORY,
              },
              metadata: {
                truthCycle,
                status: 'ENFORCED',
              }
            }}
            variant="default"
            size="default"
          />
        </div>
      </main>
      
      <HomeButton variant="floating" />
    </div>
  );
}

export default function NullifierPage() {
  return (
    <CDSErrorBoundary module="Sovereign Ghost Nullifier" showDetails>
      <NullifierContent />
    </CDSErrorBoundary>
  );
}
