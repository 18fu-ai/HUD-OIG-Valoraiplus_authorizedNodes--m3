'use client';

import React from 'react';
import { Archive, Phone, FileText, Video, Shield, CheckCircle2 } from 'lucide-react';

// === FORENSIC EVIDENCE VAULT — donadams1969.eth ===
// Full logs anchored at Saint Paul Node, Epoch #2214
// MerkleRoot: 0x7777AF_ST_PAUL_VALOR_CHAIN_SECURED_05_09_2026

interface EvidenceCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  path: string;
  status: 'ANCHORED' | 'PENDING' | 'VERIFIED';
  eventCount?: number;
}

const EVIDENCE_CATEGORIES: EvidenceCategory[] = [
  {
    id: 'mimecast-logs',
    name: 'mimecast-logs',
    description: 'Full Mimecast archive of institutional communications, SMTP 550 blockade data, and spoliation detection events.',
    icon: Archive,
    path: 'donadams1969.eth/mimecast-logs',
    status: 'ANCHORED',
    eventCount: 3393,
  },
  {
    id: 'voip-intercepts',
    name: 'voip-intercepts',
    description: 'High-fidelity audio transcripts of calls authorized for forensic capture under 18 U.S.C. § 2516-2518.',
    icon: Phone,
    path: 'donadams1969.eth/voip-intercepts',
    status: 'ANCHORED',
    eventCount: 147,
  },
  {
    id: 'document-vault',
    name: 'document-vault',
    description: 'Certified scans of housing notices, insurance correspondence, medical records, and legal filings.',
    icon: FileText,
    path: 'donadams1969.eth/document-vault',
    status: 'ANCHORED',
  },
  {
    id: 'residency-logs',
    name: 'residency-logs',
    description: 'Video/data log of the November 19, 2025 transition event at the Girard residency (1030 Girard Road).',
    icon: Video,
    path: 'donadams1969.eth/residency-logs',
    status: 'ANCHORED',
  },
];

export function ForensicEvidenceVault() {
  return (
    <div className="bg-slate-900 border border-emerald-800 rounded-3xl p-8">
      <h2 className="text-emerald-400 font-bold mb-6 flex items-center gap-3 font-mono">
        <Archive className="w-6 h-6" /> donadams1969.eth — FULL FORENSIC EVIDENCE VAULT
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {EVIDENCE_CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.id} className="bg-slate-950 border border-emerald-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Icon className="w-5 h-5 text-amber-400" />
                <span className="font-bold font-mono text-emerald-400">{category.name}</span>
              </div>
              <p className="text-xs text-emerald-400/80">{category.description}</p>
              {category.eventCount && (
                <div className="mt-3 text-amber-400 font-mono text-xs">
                  EVENTS: {category.eventCount.toLocaleString()}
                </div>
              )}
              <div className="mt-4 flex items-center gap-2 text-[10px] text-emerald-600 font-mono">
                <CheckCircle2 className="w-3 h-3" />
                {category.path} • {category.status}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-black/50 border border-emerald-500/30 rounded-xl">
        <div className="flex items-center gap-3 text-xs font-mono">
          <Shield className="w-4 h-4 text-amber-400" />
          <span className="text-emerald-400">IPFS CID:</span>
          <span className="text-amber-400">QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG</span>
          <span className="text-emerald-600">• CHAIN OF CUSTODY PRESERVED</span>
        </div>
      </div>
    </div>
  );
}

export default ForensicEvidenceVault;
