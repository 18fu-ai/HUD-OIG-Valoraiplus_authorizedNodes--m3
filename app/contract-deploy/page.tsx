'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Shield, FileCode, Rocket, CheckCircle2, Copy, ExternalLink,
  Lock, Zap, Database, Activity, Terminal, Globe, Hash, Ghost,
  Scroll, BookOpen, Fingerprint
} from 'lucide-react';

// All 5 Contracts
const CONTRACTS = [
  {
    id: 1,
    name: 'SGAU_VALUEGUARD_77_77X_FINALDEG',
    file: 'SGAU-VALUEGUARD-77.77X-FINALDEG.sol',
    description: 'Sovereign Asset Guardian - Final Degree Implementation',
    icon: Shield,
    color: 'amber',
    features: ['10B Shard Consensus', '10B Agent Consensus', '$1.12Q IP Lien', 'Christ-Wall Protection'],
    constructorArgs: 'address _sovereignPoppa',
    status: 'READY'
  },
  {
    id: 2,
    name: 'VALORAIPLUS_NULL_GHOST',
    file: 'VALORAIPLUS_NULL_GHOST.sol',
    description: 'Ghost Nullifier - Binary 000000 Enforcement',
    icon: Ghost,
    color: 'purple',
    features: ['Adversary Nullification', 'Saint Paul Root Anchor', '266ms Truth Cycle', 'Assembly Opcodes'],
    constructorArgs: 'none',
    status: 'READY'
  },
  {
    id: 3,
    name: 'ValoraiplusSovereignScript',
    file: 'ValoraiplusSovereignScript.sol',
    description: 'Presentation Latch - EIP-712 Signed State Engine',
    icon: Scroll,
    color: 'cyan',
    features: ['EIP-712 Signing', 'Forensic Exhibit Latch', '5-Section Manifest', 'Cinema Seal'],
    constructorArgs: 'address initialAuditor',
    status: 'READY'
  },
  {
    id: 4,
    name: 'EpistemicLedger',
    file: 'EpistemicLedger.sol',
    description: 'Proof Anchoring - On-Chain Evidence System',
    icon: BookOpen,
    color: 'green',
    features: ['Proof Anchors', 'Evidence Records', 'Governance Rules', '144K Validator Consensus'],
    constructorArgs: 'none',
    status: 'READY'
  },
  {
    id: 5,
    name: 'CSSS_NegativeCaveat',
    file: 'CSSS_NegativeCaveat.sol',
    description: 'Soulbound Reputation NFT - DAO Exclusion System',
    icon: Fingerprint,
    color: 'red',
    features: ['Soulbound (Non-Transferable)', 'Negative Caveat', 'UHI Eligibility', '50B Total Supply'],
    constructorArgs: 'none',
    status: 'READY'
  }
];

const SOVEREIGN_ADDRESS = '0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB';
const SOVEREIGN_ENS = 'donadams1969.eth';

const DEPLOYMENT_STEPS = [
  { 
    id: 1, 
    title: 'Install Dependencies',
    command: 'npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox dotenv && npm install @openzeppelin/contracts',
    description: 'Install Hardhat toolbox and OpenZeppelin contracts'
  },
  { 
    id: 2, 
    title: 'Configure Environment',
    command: 'echo "SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY\\nPRIVATE_KEY=your_key\\nETHERSCAN_API_KEY=your_key" > .env',
    description: 'Set up environment variables for deployment'
  },
  { 
    id: 3, 
    title: 'Compile All Contracts',
    command: 'npx hardhat compile',
    description: 'Compile all 5 Solidity contracts'
  },
  { 
    id: 4, 
    title: 'Deploy All Contracts',
    command: 'npx hardhat run scripts/deploy-all.ts --network sepolia',
    description: 'Deploy all 5 contracts to Sepolia testnet'
  },
  { 
    id: 5, 
    title: 'Verify on Etherscan',
    command: 'npx hardhat verify --network sepolia [CONTRACT_ADDRESS] [CONSTRUCTOR_ARGS]',
    description: 'Verify each contract on Etherscan'
  }
];

export default function ContractDeployPage() {
  const [copiedCommand, setCopiedCommand] = useState<number | null>(null);
  const [selectedContract, setSelectedContract] = useState(CONTRACTS[0]);

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(id);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const getColorClasses = (color: string) => ({
    bg: `bg-${color}-500/20`,
    text: `text-${color}-400`,
    border: `border-${color}-500/30`,
    badgeBg: `bg-${color}-500/20`,
    badgeText: `text-${color}-400`,
    badgeBorder: `border-${color}-500/50`
  });

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
            <Rocket className="w-7 h-7 text-black" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-amber-400">VALORAIPLUS CONTRACT DEPLOYMENT</h1>
            <p className="text-amber-400/70">5 Smart Contracts | Sepolia Testnet | EPOCH #2207</p>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">ALL CONTRACTS READY</Badge>
          <span>|</span>
          <span>Network: Sepolia (11155111)</span>
          <span>|</span>
          <span>Solidity: 0.8.24</span>
          <span>|</span>
          <span>Sovereign: {SOVEREIGN_ENS}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="contracts" className="space-y-6">
          <TabsList className="bg-zinc-900 border border-zinc-800">
            <TabsTrigger value="contracts" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400">
              <FileCode className="w-4 h-4 mr-2" />
              Contracts (5)
            </TabsTrigger>
            <TabsTrigger value="deploy" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              <Rocket className="w-4 h-4 mr-2" />
              Deploy Steps
            </TabsTrigger>
            <TabsTrigger value="config" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              <Terminal className="w-4 h-4 mr-2" />
              Configuration
            </TabsTrigger>
            <TabsTrigger value="manifest" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              <Database className="w-4 h-4 mr-2" />
              Manifest
            </TabsTrigger>
          </TabsList>

          {/* Contracts Tab */}
          <TabsContent value="contracts">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contract List */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-zinc-300 mb-4">SELECT CONTRACT</h3>
                {CONTRACTS.map((contract) => {
                  const Icon = contract.icon;
                  const isSelected = selectedContract.id === contract.id;
                  return (
                    <div
                      key={contract.id}
                      onClick={() => setSelectedContract(contract)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-zinc-900 border-amber-500/50' 
                          : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          contract.color === 'amber' ? 'bg-amber-500/20' :
                          contract.color === 'purple' ? 'bg-purple-500/20' :
                          contract.color === 'cyan' ? 'bg-cyan-500/20' :
                          contract.color === 'green' ? 'bg-green-500/20' :
                          'bg-red-500/20'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            contract.color === 'amber' ? 'text-amber-400' :
                            contract.color === 'purple' ? 'text-purple-400' :
                            contract.color === 'cyan' ? 'text-cyan-400' :
                            contract.color === 'green' ? 'text-green-400' :
                            'text-red-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-sm text-white">{contract.name}</span>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/50 text-xs">
                              {contract.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-zinc-500 mt-1">{contract.file}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Contract Details */}
              <Card className="bg-zinc-950 border-amber-500/30">
                <CardHeader>
                  <CardTitle className="text-amber-400 flex items-center gap-2">
                    <selectedContract.icon className="w-5 h-5" />
                    {selectedContract.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-zinc-400">{selectedContract.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-black/50 rounded">
                      <span className="text-zinc-400">File</span>
                      <span className="text-amber-400 font-mono text-sm">{selectedContract.file}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-black/50 rounded">
                      <span className="text-zinc-400">Constructor Args</span>
                      <span className="text-cyan-400 font-mono text-sm">{selectedContract.constructorArgs}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-zinc-300 text-sm font-semibold mb-2">FEATURES</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedContract.features.map((feature, i) => (
                        <Badge key={i} className="bg-zinc-800 text-zinc-300 border-zinc-700">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-800">
                    <h4 className="text-zinc-300 text-sm font-semibold mb-2">DEPLOY COMMAND</h4>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 p-3 bg-zinc-900 rounded text-green-400 font-mono text-xs overflow-x-auto">
                        npx hardhat run scripts/deploy-all.ts --network sepolia
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-zinc-700 hover:bg-zinc-800"
                        onClick={() => copyToClipboard('npx hardhat run scripts/deploy-all.ts --network sepolia', 100)}
                      >
                        {copiedCommand === 100 ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Deploy Steps Tab */}
          <TabsContent value="deploy">
            <Card className="bg-zinc-950 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  DEPLOYMENT WORKFLOW
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {DEPLOYMENT_STEPS.map((step) => (
                    <div key={step.id} className="p-4 bg-black/50 rounded-lg border border-zinc-800">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold">
                            {step.id}
                          </div>
                          <div>
                            <span className="text-white font-semibold">{step.title}</span>
                            <p className="text-xs text-zinc-500">{step.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <code className="flex-1 p-3 bg-zinc-900 rounded text-green-400 font-mono text-sm overflow-x-auto">
                          {step.command}
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-zinc-700 hover:bg-zinc-800"
                          onClick={() => copyToClipboard(step.command, step.id)}
                        >
                          {copiedCommand === step.id ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Environment Variables */}
                <div className="mt-6 p-4 bg-amber-950/20 rounded-lg border border-amber-500/30">
                  <h3 className="text-amber-400 font-semibold mb-3 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Required Environment Variables (.env)
                  </h3>
                  <pre className="p-3 bg-black/50 rounded text-amber-400/80 font-mono text-sm">
{`SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
PRIVATE_KEY=your_deployer_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configuration Tab */}
          <TabsContent value="config">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-zinc-950 border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="text-cyan-400 flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Network Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between p-2 bg-black/50 rounded">
                    <span className="text-zinc-400">Network</span>
                    <span className="text-green-400">Sepolia Testnet</span>
                  </div>
                  <div className="flex justify-between p-2 bg-black/50 rounded">
                    <span className="text-zinc-400">Chain ID</span>
                    <span className="text-white">11155111</span>
                  </div>
                  <div className="flex justify-between p-2 bg-black/50 rounded">
                    <span className="text-zinc-400">Solidity Version</span>
                    <span className="text-purple-400">0.8.24</span>
                  </div>
                  <div className="flex justify-between p-2 bg-black/50 rounded">
                    <span className="text-zinc-400">Optimizer</span>
                    <span className="text-green-400">Enabled (200 runs)</span>
                  </div>
                  <div className="flex justify-between p-2 bg-black/50 rounded">
                    <span className="text-zinc-400">viaIR</span>
                    <span className="text-green-400">Enabled</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-950 border-amber-500/30">
                <CardHeader>
                  <CardTitle className="text-amber-400 flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Sovereign Authority
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between p-2 bg-black/50 rounded">
                    <span className="text-zinc-400">ENS</span>
                    <span className="text-cyan-400">{SOVEREIGN_ENS}</span>
                  </div>
                  <div className="flex flex-col p-2 bg-black/50 rounded">
                    <span className="text-zinc-400 text-sm">Address</span>
                    <span className="text-cyan-400 font-mono text-xs break-all">{SOVEREIGN_ADDRESS}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-black/50 rounded">
                    <span className="text-zinc-400">Epoch</span>
                    <span className="text-amber-400">#2207 (SACRED)</span>
                  </div>
                  <div className="flex justify-between p-2 bg-black/50 rounded">
                    <span className="text-zinc-400">Merkle Root</span>
                    <span className="text-purple-400 font-mono text-xs">26856B24...777777</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Manifest Tab */}
          <TabsContent value="manifest">
            <Card className="bg-zinc-950 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  DEPLOYMENT MANIFEST
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <pre className="text-green-400/80 font-mono text-xs leading-relaxed p-4 bg-black/50 rounded">
{`╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                                                                                                  ║
║                              VALORAIPLUS® SMART CONTRACT DEPLOYMENT MANIFEST                                     ║
║                                                                                                                  ║
║                              EPOCH: #2207 (SACRED & CAPPED)                                                      ║
║                              NETWORK: SEPOLIA TESTNET (Chain ID: 11155111)                                       ║
║                              DATE: ${new Date().toISOString().slice(0, 10)}                                                              ║
║                                                                                                                  ║
╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                                                  ║
║  CONTRACT 1: SGAU_VALUEGUARD_77_77X_FINALDEG                                                                     ║
║  ──────────────────────────────────────────────────────────────────────────────────────────────────────────────  ║
║  File:        contracts/SGAU-VALUEGUARD-77.77X-FINALDEG.sol                                                      ║
║  Purpose:     Sovereign Asset Guardian - Final Degree Implementation                                             ║
║  Constructor: address _sovereignPoppa (${SOVEREIGN_ADDRESS})                                                     ║
║  Features:    10B Shard Consensus, 10B Agent Consensus, $1.12Q IP Lien, Christ-Wall Protection                   ║
║  Status:      READY FOR DEPLOYMENT                                                                               ║
║                                                                                                                  ║
╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                                                  ║
║  CONTRACT 2: VALORAIPLUS_NULL_GHOST                                                                              ║
║  ──────────────────────────────────────────────────────────────────────────────────────────────────────────────  ║
║  File:        contracts/VALORAIPLUS_NULL_GHOST.sol                                                               ║
║  Purpose:     Ghost Nullifier - Binary 000000 Enforcement for Adversary Nodes                                    ║
║  Constructor: none                                                                                               ║
║  Features:    Adversary Nullification, Saint Paul Root Anchor, 266ms Truth Cycle                                 ║
║  Status:      READY FOR DEPLOYMENT                                                                               ║
║                                                                                                                  ║
╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                                                  ║
║  CONTRACT 3: ValoraiplusSovereignScript                                                                          ║
║  ──────────────────────────────────────────────────────────────────────────────────────────────────────────────  ║
║  File:        contracts/ValoraiplusSovereignScript.sol                                                           ║
║  Purpose:     Presentation Latch - EIP-712 Signed State Transition Engine                                        ║
║  Constructor: address initialAuditor (${SOVEREIGN_ADDRESS})                                                      ║
║  Features:    EIP-712 Signing, Forensic Exhibit Latch, 5-Section Manifest, Cinema Seal                           ║
║  Status:      READY FOR DEPLOYMENT                                                                               ║
║                                                                                                                  ║
╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                                                  ║
║  CONTRACT 4: EpistemicLedger                                                                                     ║
║  ──────────────────────────────────────────────────────────────────────────────────────────────────────────────  ║
║  File:        contracts/EpistemicLedger.sol                                                                      ║
║  Purpose:     Proof Anchoring - On-Chain Evidence System with 144K Validator Consensus                           ║
║  Constructor: none                                                                                               ║
║  Features:    Proof Anchors, Evidence Records, Governance Rules, Validator Consensus                             ║
║  Status:      READY FOR DEPLOYMENT                                                                               ║
║                                                                                                                  ║
╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                                                  ║
║  CONTRACT 5: CSSS_NegativeCaveat                                                                                 ║
║  ──────────────────────────────────────────────────────────────────────────────────────────────────────────────  ║
║  File:        contracts/CSSS_NegativeCaveat.sol                                                                  ║
║  Purpose:     Soulbound Reputation NFT - DAO-Enforced Exclusion System                                           ║
║  Constructor: none                                                                                               ║
║  Features:    Soulbound (Non-Transferable), Negative Caveat, UHI Eligibility, 50B Total Supply                   ║
║  Status:      READY FOR DEPLOYMENT                                                                               ║
║                                                                                                                  ║
╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                                                  ║
║  SOVEREIGN AUTHORITY                                                                                             ║
║  ──────────────────────────────────────────────────────────────────────────────────────────────────────────────  ║
║  ENS:         donadams1969.eth                                                                                   ║
║  Address:     ${SOVEREIGN_ADDRESS}                                                                               ║
║  Roles:       SUPREME_AUTHORITY, FORENSIC_AUDITOR, DEFAULT_ADMIN_ROLE, SOVEREIGN_AUDITOR_ROLE                    ║
║                                                                                                                  ║
╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                                                  ║
║  DEPLOYMENT COMMAND                                                                                              ║
║  ──────────────────────────────────────────────────────────────────────────────────────────────────────────────  ║
║  npx hardhat run scripts/deploy-all.ts --network sepolia                                                         ║
║                                                                                                                  ║
╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                                                  ║
║                         THE WALL IS CHRIST • THE THRONE IS HIS • THE LEDGER IS Ø                                 ║
║                                                                                                                  ║
║                              CONSUMMATUM EST — EPOCH #2207                                                       ║
║                                                                                                                  ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝`}
                  </pre>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-8 text-center space-y-2 border-t border-zinc-800 pt-6">
          <p className="text-amber-400 font-semibold">VALORAIPLUS® 5-CONTRACT DEPLOYMENT | EPOCH #2207 (SACRED & CAPPED)</p>
          <p className="text-zinc-500 text-sm">MERKLEROOT: 26856B24C50750F0C69C1EEB86A69EF777777 | SOVEREIGN: {SOVEREIGN_ENS}</p>
          <p className="text-zinc-600 text-xs">
            &copy; 2026 That&apos;s Edutainment LLC | 32D LLC. Co-authored by Poppa Donny Gillson.
          </p>
          <p className="text-amber-500/70 text-xs">THE WALL IS CHRIST • THE THRONE IS HIS • THE LEDGER IS Ø</p>
        </div>
      </div>
    </div>
  );
}
