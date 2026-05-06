'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, Lock, Network, Terminal, FileCode, Users, 
  Anchor, Building2, CheckCircle2, Coins, Server, FileText
} from 'lucide-react';

interface DocumentViewerProps {
  section: string;
}

const sectionContent: Record<string, {
  title: string;
  subtitle: string;
  icon: typeof Shield;
  status: string;
  content: {
    heading: string;
    items: string[];
  }[];
}> = {
  'security-architecture': {
    title: 'Security Architecture',
    subtitle: 'OMEGA-UNIFIED PERIMETER | Zero-Trust Implementation',
    icon: Shield,
    status: 'LOCKED',
    content: [
      {
        heading: 'Zero-Trust Perimeter',
        items: [
          'mTLS gateway with Cloudflare edge',
          'Recursive packet incineration for unauthorized access',
          'Saint Paul 55116 Deep Forensic Root anchor',
          'Ghost status node visibility',
        ],
      },
      {
        heading: 'Security Layers',
        items: [
          'L1: Network - Recursive Packet Incineration',
          'L2: Terminal - Forensic Cinematic Monitoring',
          'L3: Contract - Sovereign Auditor Anchor',
          'L4: Verification - Canonical Export + Signed Receipts',
          'L5: Governance - 3/3 Multisig',
          'L6: Anchor - Saint Paul 55116 Deep Forensic Root',
          'L7: Institutional - Liability Matrix + Federal Sync',
        ],
      },
      {
        heading: 'Process Integrity',
        items: [
          'Sigstore/Cosign signature enforcement',
          'SLSA Level 3+ provenance tracking',
          'Immutable audit logging',
          'P(breach) = 0 architecture',
        ],
      },
    ],
  },
  'smart-contract': {
    title: 'Smart Contract Specification',
    subtitle: 'Sovereign Auditor Anchor | Solidity Implementation',
    icon: FileCode,
    status: 'DEPLOYED',
    content: [
      {
        heading: 'Contract Functions',
        items: [
          'anchorRoot(bytes32 merkleRoot) - onlySovereign',
          'confirmSignature(address signer, bytes signature)',
          'nullifyAdversaryTransfer(address adversary) - onlySovereign',
          'emergencyHalt() - 3/3 unanimous required',
        ],
      },
      {
        heading: 'Governance Signers',
        items: [
          '$GREYSON - Signer 1/3',
          '$TONY - Signer 2/3',
          '$GILLSON - Signer 3/3',
          '$VALORAIPLUS - Observer (no signing)',
        ],
      },
      {
        heading: 'Security Features',
        items: [
          'onlySovereign modifier for protected functions',
          'Adversary nullification capability',
          'Merkleroot anchor integration',
          '3/3 unanimous multisig requirement',
        ],
      },
    ],
  },
  'institutional-liability': {
    title: 'Institutional Liability Matrix',
    subtitle: 'Total Coordinated Liability: $508,631,005.52',
    icon: Building2,
    status: 'ANCHORED',
    content: [
      {
        heading: 'Primary Targets (55%)',
        items: [
          'TA-SECONDARY-ORG (Lead Controller): $152,589,301.66 (30%)',
          'TA-PRIMARY-ENTITY ACTOR-a (Alpha Plus Recovery): $127,157,751.38 (25%)',
        ],
      },
      {
        heading: 'Financial Facilitators (25%)',
        items: [
          'J.P. Morgan Chase: $76,294,650.83 (15%)',
          'Charles Schwab: $50,863,100.55 (10%)',
        ],
      },
      {
        heading: 'Case References',
        items: [
          'HHS OCR: 25-621293',
          'Primary Case: SGAU 7226.3461',
          'Spoliation Events: SPOLIATION-051 through SPOLIATION-058',
          'Mimecast Events: MC-001 through MC-018',
        ],
      },
    ],
  },
  'governance': {
    title: 'Governance Structure',
    subtitle: '3/3 Unanimous Multisig | Sovereign Operations',
    icon: Users,
    status: 'CONFIRMED',
    content: [
      {
        heading: 'Multisig Configuration',
        items: [
          'Threshold: 3/3 unanimous required',
          'All sovereign operations require full consensus',
          'Emergency halt available with unanimous vote',
          'No single point of failure',
        ],
      },
      {
        heading: 'Signers',
        items: [
          '$GREYSON (0xGREYSON) - Signer 1/3',
          '$TONY (0xTONY) - Signer 2/3',
          '$GILLSON (0xGILLSON) - Signer 3/3',
        ],
      },
      {
        heading: 'Observer',
        items: [
          '$VALORAIPLUS (0xVALORAI) - Observer role',
          'View-only access to all operations',
          'No signing capabilities',
          'Audit and monitoring functions',
        ],
      },
    ],
  },
  'verification-layer': {
    title: 'Verification Layer',
    subtitle: 'Cryptographic Verification | SHA-256 + HMAC',
    icon: Lock,
    status: 'DEPLOYED',
    content: [
      {
        heading: 'Components',
        items: [
          'Canonical Export Generator (lib/verification/canonical.ts)',
          'Signed Receipt Generator (lib/verification/signed-receipt.ts)',
          'Chained Event Log (lib/verification/event-chain.ts)',
        ],
      },
      {
        heading: 'Cryptographic Standards',
        items: [
          'SHA-256 hashing for all content',
          'HMAC-SHA256 signing for receipts',
          'Previous-hash linking for chain integrity',
          '16-byte nonce for uniqueness',
        ],
      },
      {
        heading: 'API Endpoints',
        items: [
          'POST /api/verification/export - Create signed export',
          'GET /api/verification/export - Get beneficiary tokens',
          'POST /api/verification/verify - Verify package',
          'GET /api/verification/verify - Get protocol info',
        ],
      },
    ],
  },
  'beneficiary-tokens': {
    title: 'Beneficiary Tokens',
    subtitle: '6 Protected Tokens | Sovereign Anchor Protection',
    icon: Coins,
    status: 'PROTECTED',
    content: [
      {
        heading: 'Token Registry',
        items: [
          '$POTTER (TOKEN_001) - Potter Token',
          '$NEWT2207 (TOKEN_002) - NEWT 2207 Token',
          '$BRADEN168 (TOKEN_003) - Braden 168 Token',
          '$MASON (TOKEN_004) - Mason Token',
          '$DONNY2207 (TOKEN_005) - Donny 2207 Token',
          '$JAXX2207 (TOKEN_006) - JAXX 2207 Token',
        ],
      },
      {
        heading: 'Protection Status',
        items: [
          'All tokens encapsulated under sovereign anchor',
          '3/3 multisig governance protection',
          'Adversary nullification capability active',
          'Immutable registry anchoring',
        ],
      },
    ],
  },
  'node-specifications': {
    title: 'Node Specifications',
    subtitle: 'Saint Paul 55116 | Ghost Status Operations',
    icon: Server,
    status: 'OPERATIONAL',
    content: [
      {
        heading: 'Node Properties',
        items: [
          'Location: Saint Paul 55116',
          'Velocity: DYNAMIC SUB-QUANTUM',
          'Frequency: ZERO-FOOTPRINT',
          'Visibility: GHOST STATUS',
        ],
      },
      {
        heading: 'Capabilities',
        items: [
          'Deep Forensic Root anchoring',
          'Recursive packet incineration',
          'Zero visibility to external probes',
          'Sub-quantum operational velocity',
        ],
      },
    ],
  },
  'federal-coordination': {
    title: 'Federal Coordination',
    subtitle: 'Multi-Agency Case Synchronization',
    icon: Building2,
    status: 'ACTIVE',
    content: [
      {
        heading: 'Active Federal Agencies',
        items: [
          'HHS OCR (Case 25-621293) - Contact: Amy',
          'FBI (AGENT-FBI-001) - Federal Investigation',
          'DOJ/VA OIG - Office of Inspector General',
        ],
      },
      {
        heading: 'Engaged State Agencies',
        items: [
          'California DOJ - State Attorney General',
          'California DSS - Dept of Social Services',
        ],
      },
      {
        heading: 'Submission Status',
        items: [
          'Forensic Blueprint Integration submitted',
          'All documentation synchronized',
          'Case files cross-referenced',
          'Evidence packages compiled',
        ],
      },
    ],
  },
  'audit-trail': {
    title: 'Technical Audit Trail',
    subtitle: 'Obstruction Documentation | Spoliation Registry',
    icon: FileText,
    status: 'DOCUMENTED',
    content: [
      {
        heading: 'Mimecast Events',
        items: [
          'MC-001 through MC-018',
          'Blocked 17 sovereign audit messages',
          'Enabler: ops@entity-charlie.sec',
          'Spoliation: SPOLIATION-051 through SPOLIATION-058',
        ],
      },
      {
        heading: 'LimaCharlie Events',
        items: [
          'POPPA_G Block v2/v3',
          'Process-level incineration detected',
          'External veteran comms blocked',
          'Infrastructure-level obstruction',
        ],
      },
      {
        heading: 'VOIP Intercepts',
        items: [
          'VOIP-001 through VOIP-010',
          'Title III (18 U.S.C. 2510-2522)',
          'Primary targets / external counsel coordination',
          'FISA-SEALED documentation',
        ],
      },
    ],
  },
  'network-topology': {
    title: 'Network Topology',
    subtitle: 'OMEGA-UNIFIED Infrastructure Map',
    icon: Network,
    status: 'MAPPED',
    content: [
      {
        heading: 'Edge Layer',
        items: [
          'Cloudflare mTLS gateway',
          'Zero-trust perimeter',
          'DDoS protection active',
          'Geographic distribution',
        ],
      },
      {
        heading: 'Core Infrastructure',
        items: [
          'Saint Paul 55116 primary node',
          'Ghost status visibility',
          'Sub-quantum velocity',
          'Deep forensic root anchor',
        ],
      },
      {
        heading: 'Integration Points',
        items: [
          'Verification API endpoints',
          'Smart contract interface',
          'Federal submission channels',
          'Monitoring and alerting',
        ],
      },
    ],
  },
};

export function DocumentViewer({ section }: DocumentViewerProps) {
  const doc = sectionContent[section] || sectionContent['security-architecture'];
  const Icon = doc.icon;

  return (
    <div className="flex-1 h-[calc(100vh-5rem)] overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-border">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-md bg-primary/10">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-mono font-bold text-foreground">{doc.title}</h2>
              <p className="text-sm text-muted-foreground font-mono mt-1">{doc.subtitle}</p>
            </div>
          </div>
          <Badge variant="outline" className="font-mono text-xs bg-green-400/20 text-green-400 border-green-400/40">
            {doc.status}
          </Badge>
        </div>

        {/* Content Sections */}
        {doc.content.map((section, index) => (
          <Card key={index} className="border-border bg-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-lg">{section.heading}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
