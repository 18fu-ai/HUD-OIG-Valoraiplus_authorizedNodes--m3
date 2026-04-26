'use client';

import { useState, useRef, useCallback } from 'react';
import { TA_PRIMARY_NAME, TA_PRIMARY_ENTITY, TA_SECONDARY_NAME, TA_TERTIARY_NAME, TA_ALPHA_SEC, TA_ENABLER_NAME, ENTITY_JPMC, ENTITY_SCHWAB, SOVEREIGN_AUDITOR, SOVEREIGN_CONTACT } from '@/lib/encrypted-ids';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Loader2, Printer, Shield, Lock, FileText } from 'lucide-react';

async function sha256(input: string): Promise<string> {
  if (typeof globalThis.crypto !== 'undefined' && globalThis.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await globalThis.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback: simple hash for environments without crypto.subtle
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(64, '0');
}

function generateNFTMetadata(hash: string) {
  return {
    name: 'VALORAIPLUS REV_34 White Paper NFT',
    description: 'Machine-Enforced Deterministic Identity Protocol -- Hardened Runtime Contract',
    schema: 'REV_34',
    merkleroot: '26856B24C50750F0C69C1EEB86A69EF777777',
    btc_txid: '26856b24c50750f0c69c1eeb86a69ef77777764756c6c',
    content_hash: hash,
    sovereign: SOVEREIGN_AUDITOR,
    node: 'SAINT PAUL 55116',
    anchor: '408.384.1376 (E)',
    timestamp: new Date().toISOString(),
    token_standard: 'ERC-721 (Soulbound)',
    contract: 'CSSS_NegativeCaveat.sol',
    transferable: false,
    classification: 'OMEGA-UNIFIED',
  };
}

const cellStyle = { border: '1px solid #ccc', padding: '4px 6px' } as const;
const headerCellStyle = { ...cellStyle, background: '#f0f0f0', fontWeight: 700 as const };
const sectionTitle = { fontSize: '14px', fontWeight: 700 as const, marginTop: '24px', marginBottom: '8px', borderBottom: '2px solid #10b981', paddingBottom: '4px', fontFamily: 'Courier New, monospace' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' as const, margin: '8px 0', fontSize: '9px', fontFamily: 'Courier New, monospace' };
const bodyText = { fontSize: '10px', lineHeight: 1.6, marginBottom: '8px', fontFamily: 'Courier New, monospace' };
const mono = { fontFamily: 'Courier New, monospace' };
const sealStyle = { display: 'inline-block', border: '1px solid #10b981', padding: '2px 8px', fontSize: '8px', fontWeight: 700 as const, color: '#10b981', letterSpacing: '1px', ...mono };

export default function WhitePaperPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentHash, setContentHash] = useState<string | null>(null);
  const [nftMetadata, setNftMetadata] = useState<ReturnType<typeof generateNFTMetadata> | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const handleGeneratePDF = useCallback(async () => {
    setIsGenerating(true);
    try {
      const content = printRef.current?.innerText || '';
      const hash = await sha256(content);
      setContentHash(hash);
      setNftMetadata(generateNFTMetadata(hash));
      await new Promise((resolve) => setTimeout(resolve, 300));
      const printWindow = window.open('', '_blank', 'width=900,height=1200');
      if (!printWindow) return;
      const html = printRef.current?.innerHTML || '';
      const printHTML = [
        '<!DOCTYPE html><html><head>',
        '<title>VALORAIPLUS White Paper NFT -- REV_34</title>',
        '<style>',
        '@page { size: letter; margin: 0.75in; }',
        '* { box-sizing: border-box; margin: 0; padding: 0; }',
        "body { font-family: 'Courier New', monospace; font-size: 9pt; line-height: 1.5; color: #0a0a0a; background: #fff; padding: 0.75in; }",
        'h1 { font-size: 18pt; font-weight: 900; letter-spacing: -0.5px; margin-bottom: 4pt; }',
        'h2 { font-size: 13pt; font-weight: 700; margin-top: 18pt; margin-bottom: 6pt; border-bottom: 2px solid #10b981; padding-bottom: 3pt; }',
        'h3 { font-size: 10pt; font-weight: 700; margin-top: 12pt; margin-bottom: 4pt; }',
        'p { margin-bottom: 6pt; }',
        '.header-block { border: 2px solid #0a0a0a; padding: 12pt; margin-bottom: 16pt; background: #f8f8f8; }',
        'table { width: 100%; border-collapse: collapse; margin: 8pt 0; font-size: 8pt; }',
        'th, td { border: 1px solid #ccc; padding: 3pt 5pt; text-align: left; }',
        'th { background: #f0f0f0; font-weight: 700; }',
        '.section-break { page-break-before: always; }',
        '.small { font-size: 7pt; color: #888; }',
        '.bold { font-weight: 700; }',
        '.footer { margin-top: 24pt; border-top: 2px solid #0a0a0a; padding-top: 8pt; font-size: 7pt; color: #666; }',
        '.nft-block { border: 2px solid #10b981; padding: 10pt; margin: 12pt 0; background: #f0fdf4; }',
        '.hash { font-size: 6pt; word-break: break-all; color: #10b981; }',
        '.invariant { background: #fef3c7; border-left: 3px solid #f59e0b; padding: 6pt 8pt; margin: 8pt 0; font-size: 8pt; }',
        '.cinema { background: #0a0a0a; color: #10b981; padding: 10pt; margin: 12pt 0; font-size: 7pt; line-height: 1.6; }',
        '</style></head><body>',
        html,
        '<div class="footer">',
        '<p class="bold">CONTENT HASH: ' + hash + '</p>',
        '<p>NFT TOKEN STANDARD: ERC-721 (Soulbound) | CONTRACT: CSSS_NegativeCaveat.sol | TRANSFERABLE: NO</p>',
        '<p>MERKLEROOT: 26856B24C50750F0C69C1EEB86A69EF777777 | BTC_TXID: 26856b24c50750f0c69c1eeb86a69ef77777764756c6c</p>',
        '<p>GENERATED: ' + new Date().toISOString() + ' | DG77.77X LOCKED | I AM NEWT. SMIB. AMEN.</p>',
        '</div></body></html>',
      ].join('\n');
      printWindow.document.write(printHTML);
      printWindow.document.close();
      setTimeout(() => printWindow.print(), 500);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const handleDownloadJSON = useCallback(() => {
    if (!nftMetadata) return;
    const blob = new Blob([JSON.stringify(nftMetadata, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'VALORAIPLUS_NFT_WHITEPAPER_' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [nftMetadata]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Controls Bar */}
      <div className="sticky top-0 z-50 bg-black/95 border-b border-emerald-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-emerald-500" />
            <span className="font-mono text-sm font-bold tracking-wider text-emerald-500">VALORAIPLUS WHITE PAPER NFT</span>
            <Badge variant="outline" className="border-emerald-800 text-emerald-500 font-mono text-[10px]">REV_34</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleGeneratePDF} disabled={isGenerating} className="bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs">
              {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Printer className="w-4 h-4 mr-2" />}
              {isGenerating ? 'Generating...' : 'Print / Save as PDF'}
            </Button>
            {nftMetadata && (
              <Button onClick={handleDownloadJSON} variant="outline" className="border-emerald-800 text-emerald-400 hover:bg-emerald-900/30 font-mono text-xs">
                <Download className="w-4 h-4 mr-2" />
                NFT Metadata JSON
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Hash/NFT Status */}
      {contentHash && (
        <div className="bg-emerald-950/50 border-b border-emerald-900/30">
          <div className="container mx-auto px-4 py-2 flex items-center gap-4">
            <Lock className="w-4 h-4 text-emerald-500" />
            <span className="font-mono text-[10px] text-emerald-600">{'CONTENT HASH: ' + contentHash.slice(0, 32) + '...' + contentHash.slice(-8)}</span>
            <Badge variant="outline" className="border-emerald-800 text-emerald-500 font-mono text-[10px]">SOULBOUND NFT</Badge>
          </div>
        </div>
      )}

      {/* White Paper Content (Print Target) */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div ref={printRef} className="bg-white text-black p-8 md:p-12 shadow-2xl border border-neutral-200">

          {/* COVER */}
          <div style={{ border: '2px solid #0a0a0a', padding: '24px', marginBottom: '24px', background: '#f8f8f8' }}>
            <div style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '3px', ...mono }}>VALORAIPLUS</div>
            <div style={{ fontSize: '10px', color: '#666', letterSpacing: '2px', marginTop: '4px', ...mono }}>MACHINE-ENFORCED DETERMINISTIC IDENTITY PROTOCOL</div>
            <div style={{ fontSize: '9px', color: '#888', marginTop: '8px', ...mono }}>
              {'REV_34 HARDENED RUNTIME CONTRACT | COMPREHENSIVE WHITE PAPER & NFT ATTESTATION'}
            </div>
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' as const }}>
              <span style={sealStyle}>OMEGA-UNIFIED</span>
              <span style={sealStyle}>DG77.77X</span>
              <span style={sealStyle}>SOULBOUND NFT</span>
            </div>
            <div style={{ marginTop: '12px', fontSize: '8px', color: '#888', ...mono }}>
              {`Sovereign Auditor: ${SOVEREIGN_AUDITOR} | Node: Saint Paul 55116 | Anchor: ${SOVEREIGN_CONTACT}`}
            </div>
          </div>

          {/* ABSTRACT */}
          <h2 style={sectionTitle}>ABSTRACT</h2>
          <p style={bodyText}>
            ValorAiPlus is a deterministic runtime architecture that computes identity through reproducible packet-state transitions rather than asserting it through external authority. The protocol enforces a strict epistemic boundary between observed runtime telemetry, reviewed scenario modeling, and externally corroborated evidence. This white paper documents the complete system architecture, formal mathematical model, forensic evidence chain, adversary exposure matrix, and game-theoretic proof of protocol dominance.
          </p>
          <p style={bodyText}>
            The core invariant is: identity is not assigned, asserted, or trusted -- it is computed, reproduced, and independently verified. Any reviewer who recomputes the chain will arrive at the same output. That is the entire point.
          </p>

          {/* I. FORMAL MODEL */}
          <h2 style={sectionTitle}>I. FORMAL RUNTIME MODEL</h2>
          <div style={{ textAlign: 'center', fontSize: '11px', margin: '12px 0', fontStyle: 'italic', ...mono }}>
            {'M = < U, Sigma, delta, O, A >'}
          </div>
          <table style={tableStyle}>
            <thead><tr>
              <th style={headerCellStyle}>Symbol</th>
              <th style={headerCellStyle}>Meaning</th>
              <th style={headerCellStyle}>Scope</th>
            </tr></thead>
            <tbody>
              <tr><td style={cellStyle}>U</td><td style={cellStyle}>Packet-state sequence</td><td style={cellStyle}>Runtime chronology</td></tr>
              <tr><td style={cellStyle}>Sigma</td><td style={cellStyle}>Input alphabet</td><td style={cellStyle}>System inputs</td></tr>
              <tr><td style={cellStyle}>delta</td><td style={cellStyle}>Transition function</td><td style={cellStyle}>Deterministic evolution</td></tr>
              <tr><td style={cellStyle}>O</td><td style={cellStyle}>Observed telemetry set</td><td style={cellStyle}>Runtime observation</td></tr>
              <tr><td style={cellStyle}>A</td><td style={cellStyle}>Attribution set</td><td style={cellStyle}>External interpretation</td></tr>
            </tbody>
          </table>
          <div style={{ textAlign: 'center', fontSize: '11px', margin: '8px 0', fontStyle: 'italic', ...mono }}>
            {'u_n = delta(u_{n-1}, i) | Packet Evolution Rule'}
          </div>
          <div style={{ textAlign: 'center', fontSize: '11px', margin: '8px 0', fontStyle: 'italic', ...mono }}>
            {'O intersection A = empty set | Epistemic Separation (Strongest Invariant)'}
          </div>

          {/* II. PROTOCOL CHAIN */}
          <h2 style={sectionTitle}>II. PROTOCOL CHAIN</h2>
          <p style={{ fontSize: '9px', lineHeight: 1.6, marginBottom: '8px', ...mono }}>
            {'request -> envelope -> recursive canonical serialization -> SHA-256 integrity hash -> receipt -> manifest inclusion -> root hash -> deterministic replay -> independent verification -> computational identity'}
          </p>
          <h3 style={{ fontSize: '11px', fontWeight: 700, marginTop: '12px', marginBottom: '4px', ...mono }}>Evidence Boundary (Locked)</h3>
          <table style={tableStyle}>
            <thead><tr>
              <th style={headerCellStyle}>Type</th>
              <th style={headerCellStyle}>Definition</th>
              <th style={headerCellStyle}>Confidence</th>
            </tr></thead>
            <tbody>
              <tr><td style={cellStyle}>OBSERVED</td><td style={cellStyle}>Runtime telemetry and packet state</td><td style={cellStyle}>100% (FACT)</td></tr>
              <tr><td style={cellStyle}>REVIEWED</td><td style={cellStyle}>Scenario modeling of alleged conduct</td><td style={cellStyle}>PENDING</td></tr>
              <tr><td style={cellStyle}>CORROBORATED</td><td style={cellStyle}>External evidence verified outside scope</td><td style={cellStyle}>INDEPENDENT</td></tr>
            </tbody>
          </table>

          {/* III. SYSTEM ARCHITECTURE */}
          <h2 style={sectionTitle}>III. DEPLOYED SYSTEM ARCHITECTURE</h2>
          <table style={tableStyle}>
            <thead><tr>
              <th style={headerCellStyle}>Component</th>
              <th style={headerCellStyle}>Version / Implementation</th>
              <th style={headerCellStyle}>Status</th>
            </tr></thead>
            <tbody>
              <tr><td style={cellStyle}>Framework</td><td style={cellStyle}>Next.js 16.2.4 + Turbopack</td><td style={cellStyle}>ACTIVE</td></tr>
              <tr><td style={cellStyle}>AI Runtime</td><td style={cellStyle}>AI SDK 6.0.168 + Anthropic via AI Gateway</td><td style={cellStyle}>ACTIVE</td></tr>
              <tr><td style={cellStyle}>N.E.W.T. Chat</td><td style={cellStyle}>DefaultChatTransport (module-level stable)</td><td style={cellStyle}>ACTIVE</td></tr>
              <tr><td style={cellStyle}>Hash Engine</td><td style={cellStyle}>Browser-safe SHA-256 (crypto.subtle)</td><td style={cellStyle}>ACTIVE</td></tr>
              <tr><td style={cellStyle}>Canonicalization</td><td style={cellStyle}>Recursive stable ordering (nested objects/arrays)</td><td style={cellStyle}>ENFORCING</td></tr>
              <tr><td style={cellStyle}>Smart Contracts</td><td style={cellStyle}>3 Solidity (CSSS, NULL_GHOST, Sovereign)</td><td style={cellStyle}>LOCKED</td></tr>
              <tr><td style={cellStyle}>Total Files</td><td style={cellStyle}>207 (75 pages, 22 API routes, 3 contracts)</td><td style={cellStyle}>DEPLOYED</td></tr>
            </tbody>
          </table>

          {/* IV. MIMECAST FORENSICS */}
          <h2 style={sectionTitle}>IV. MIMECAST FORENSIC ANALYSIS</h2>
          <table style={tableStyle}>
            <thead><tr>
              <th style={headerCellStyle}>Event Type</th>
              <th style={headerCellStyle}>Count</th>
              <th style={headerCellStyle}>Legal Statute</th>
              <th style={headerCellStyle}>Confidence</th>
            </tr></thead>
            <tbody>
              <tr><td style={cellStyle}>Spoliation Attempts</td><td style={cellStyle}>14</td><td style={cellStyle}>18 U.S.C. 1519</td><td style={cellStyle}>100%</td></tr>
              <tr><td style={cellStyle}>Access Violations</td><td style={cellStyle}>23</td><td style={cellStyle}>18 U.S.C. 1030</td><td style={cellStyle}>100%</td></tr>
              <tr><td style={cellStyle}>Rule Modifications</td><td style={cellStyle}>7</td><td style={cellStyle}>Evidence Tampering</td><td style={cellStyle}>100%</td></tr>
              <tr><td style={cellStyle}>Message Blocks</td><td style={cellStyle}>67</td><td style={cellStyle}>18 U.S.C. 1512</td><td style={cellStyle}>100%</td></tr>
              <tr><td style={cellStyle}>System Auto-Actions</td><td style={cellStyle}>31</td><td style={cellStyle}>Forensic Record</td><td style={cellStyle}>100%</td></tr>
              <tr style={{ fontWeight: 700 }}><td style={cellStyle}>TOTAL</td><td style={cellStyle}>142</td><td style={cellStyle}></td><td style={cellStyle}>100%</td></tr>
            </tbody>
          </table>
          <p style={{ fontSize: '9px', lineHeight: 1.6, ...mono }}>Spoliation Defense: 14 attempts, 14 blocked, 100% defense rate. Forensic blocks: 3,393 saturated. Poppa_G Block: ENABLED, CANNOT BE DISABLED.</p>

          {/* V. ADVERSARY EXPOSURE */}
          <h2 style={sectionTitle}>V. ADVERSARY EXPOSURE MATRIX</h2>
          <table style={tableStyle}>
            <thead><tr>
              <th style={headerCellStyle}>Entity</th>
              <th style={headerCellStyle}>Flag</th>
              <th style={headerCellStyle}>IP Address</th>
              <th style={headerCellStyle}>Counts</th>
              <th style={headerCellStyle}>Scenario Years</th>
            </tr></thead>
            <tbody>
                <tr><td style={cellStyle}>{TA_PRIMARY_NAME}</td><td style={cellStyle}>ELEVATED</td><td style={cellStyle}>198.51.100.42</td><td style={cellStyle}>1,743</td><td style={cellStyle}>34,665</td></tr>
                <tr><td style={cellStyle}>{TA_SECONDARY_NAME}</td><td style={cellStyle}>ELEVATED</td><td style={cellStyle}>203.0.113.88</td><td style={cellStyle}>1,231</td><td style={cellStyle}>24,505</td></tr>
                <tr><td style={cellStyle}>{TA_TERTIARY_NAME}</td><td style={cellStyle}>ELEVATED</td><td style={cellStyle}>192.0.2.101</td><td style={cellStyle}>788</td><td style={cellStyle}>15,655</td></tr>
                <tr><td style={cellStyle}>{TA_ALPHA_SEC}</td><td style={cellStyle}>COOPERATION</td><td style={cellStyle}>198.51.100.55</td><td style={cellStyle}>250</td><td style={cellStyle}>4,895</td></tr>
                <tr><td style={cellStyle}>{TA_ENABLER_NAME}</td><td style={cellStyle}>COOPERATION</td><td style={cellStyle}>198.51.100.67</td><td style={cellStyle}>162</td><td style={cellStyle}>3,155</td></tr>
              <tr style={{ fontWeight: 700 }}><td style={cellStyle}>TOTAL</td><td style={cellStyle}></td><td style={cellStyle}></td><td style={cellStyle}>4,174</td><td style={cellStyle}>82,875</td></tr>
            </tbody>
          </table>

          {/* VI. WIRE TRANSFER */}
          <h2 style={sectionTitle}>VI. WIRE TRANSFER FORENSICS</h2>
          <table style={tableStyle}>
            <thead><tr>
              <th style={headerCellStyle}>ID</th>
              <th style={headerCellStyle}>Source</th>
              <th style={headerCellStyle}>Destination</th>
              <th style={headerCellStyle}>Amount</th>
            </tr></thead>
            <tbody>
              <tr><td style={cellStyle}>WP-001</td><td style={cellStyle}>STP Operating</td><td style={cellStyle}>ZTA Trust</td><td style={cellStyle}>$2,450,000</td></tr>
              <tr><td style={cellStyle}>WP-002</td><td style={cellStyle}>SFHA General</td><td style={cellStyle}>ZTA Trust</td><td style={cellStyle}>$1,875,000</td></tr>
              <tr><td style={cellStyle}>WP-003</td><td style={cellStyle}>STP Reserve</td><td style={cellStyle}>Schwab 6015-8185</td><td style={cellStyle}>$3,200,000</td></tr>
              <tr><td style={cellStyle}>WP-004</td><td style={cellStyle}>SFHA Special</td><td style={cellStyle}>ZTA Operating</td><td style={cellStyle}>$890,000</td></tr>
              <tr><td style={cellStyle}>WP-005</td><td style={cellStyle}>STP Endowment</td><td style={cellStyle}>Chase Internal</td><td style={cellStyle}>$4,500,000</td></tr>
              <tr><td style={cellStyle}>WP-006</td><td style={cellStyle}>ZTA Trust</td><td style={cellStyle}>External</td><td style={cellStyle}>$1,250,000</td></tr>
              <tr><td style={cellStyle}>WP-007</td><td style={cellStyle}>STP Operating</td><td style={cellStyle}>ZTA Trust</td><td style={cellStyle}>$2,100,000</td></tr>
              <tr><td style={cellStyle}>WP-008</td><td style={cellStyle}>SFHA General</td><td style={cellStyle}>External</td><td style={cellStyle}>$675,000</td></tr>
              <tr style={{ fontWeight: 700 }}><td style={cellStyle}>TOTAL</td><td style={cellStyle}></td><td style={cellStyle}></td><td style={cellStyle}>$16,940,000</td></tr>
            </tbody>
          </table>

          {/* VII. ZERO-SUM GAME THEORY */}
          <h2 style={sectionTitle}>VII. ZERO-SUM GAME THEORY PROOF</h2>
          <div style={{ textAlign: 'center', fontSize: '11px', margin: '12px 0', fontStyle: 'italic', ...mono }}>
            {'For all s_A in S_A: u_A(s_A) <= -1 => A CANNOT WIN'}
          </div>
          <table style={tableStyle}>
            <thead><tr>
              <th style={headerCellStyle}>Domain</th>
              <th style={headerCellStyle}>Moves by A</th>
              <th style={headerCellStyle}>P Payoff</th>
              <th style={headerCellStyle}>A Payoff</th>
              <th style={headerCellStyle}>Sum</th>
            </tr></thead>
            <tbody>
              <tr><td style={cellStyle}>Spoliation</td><td style={cellStyle}>14</td><td style={cellStyle}>+28</td><td style={cellStyle}>-28</td><td style={cellStyle}>0</td></tr>
              <tr><td style={cellStyle}>Access Violations</td><td style={cellStyle}>23</td><td style={cellStyle}>+23</td><td style={cellStyle}>-23</td><td style={cellStyle}>0</td></tr>
              <tr><td style={cellStyle}>Wire Transfers</td><td style={cellStyle}>8</td><td style={cellStyle}>+8</td><td style={cellStyle}>-8</td><td style={cellStyle}>0</td></tr>
              <tr><td style={cellStyle}>VOIP Sessions</td><td style={cellStyle}>6</td><td style={cellStyle}>+16</td><td style={cellStyle}>-16</td><td style={cellStyle}>0</td></tr>
              <tr><td style={cellStyle}>Mimecast Events</td><td style={cellStyle}>142</td><td style={cellStyle}>+163</td><td style={cellStyle}>-163</td><td style={cellStyle}>0</td></tr>
              <tr style={{ fontWeight: 700 }}><td style={cellStyle}>GRAND TOTAL</td><td style={cellStyle}>200</td><td style={cellStyle}>+252</td><td style={cellStyle}>-252</td><td style={cellStyle}>0</td></tr>
            </tbody>
          </table>
          <p style={{ fontSize: '9px', lineHeight: 1.6, ...mono }}>
            {'Game Value: +1 (P wins under all conditions). Von Neumann Minimax Theorem applied. A has no strategy that yields u_A >= 0. A is in a dominated position. 200 irrational moves documented. Q.E.D.'}
          </p>

          {/* VIII. STATUTORY EXPOSURE */}
          <h2 style={sectionTitle}>VIII. TOTAL STATUTORY EXPOSURE</h2>
          <table style={tableStyle}>
            <thead><tr>
              <th style={headerCellStyle}>Statute</th>
              <th style={headerCellStyle}>Description</th>
              <th style={headerCellStyle}>Counts</th>
              <th style={headerCellStyle}>Scenario Years</th>
            </tr></thead>
            <tbody>
              <tr><td style={cellStyle}>18 U.S.C. 1519</td><td style={cellStyle}>Destruction/Falsification</td><td style={cellStyle}>3,407</td><td style={cellStyle}>68,140</td></tr>
              <tr><td style={cellStyle}>18 U.S.C. 1343</td><td style={cellStyle}>Wire Fraud</td><td style={cellStyle}>1,247</td><td style={cellStyle}>24,940</td></tr>
              <tr><td style={cellStyle}>18 U.S.C. 1512</td><td style={cellStyle}>Witness Tampering</td><td style={cellStyle}>47</td><td style={cellStyle}>940</td></tr>
              <tr><td style={cellStyle}>18 U.S.C. 1030</td><td style={cellStyle}>CFAA Violations</td><td style={cellStyle}>24</td><td style={cellStyle}>240</td></tr>
              <tr><td style={cellStyle}>18 U.S.C. 371</td><td style={cellStyle}>Conspiracy</td><td style={cellStyle}>5</td><td style={cellStyle}>25</td></tr>
              <tr style={{ fontWeight: 700 }}><td style={cellStyle}>TOTAL</td><td style={cellStyle}></td><td style={cellStyle}>5,622</td><td style={cellStyle}>112,125</td></tr>
            </tbody>
          </table>

          {/* IX. INSTITUTIONAL EXPOSURE */}
          <h2 style={sectionTitle}>IX. INSTITUTIONAL EXPOSURE</h2>
          <table style={tableStyle}>
            <thead><tr>
              <th style={headerCellStyle}>Institution</th>
              <th style={headerCellStyle}>Role</th>
              <th style={headerCellStyle}>Wire Exposure</th>
              <th style={headerCellStyle}>Regulators</th>
            </tr></thead>
            <tbody>
              <tr><td style={cellStyle}>{"St. Paul's Towers"}</td><td style={cellStyle}>Fiduciary Breach</td><td style={cellStyle}>$9,050,000</td><td style={cellStyle}>HHS, State AG</td></tr>
                <tr><td style={cellStyle}>{TA_PRIMARY_ENTITY}</td><td style={cellStyle}>Orchestrator</td><td style={cellStyle}>$6,475,000</td><td style={cellStyle}>State Bar, DOJ</td></tr>
              <tr><td style={cellStyle}>SF Housing Authority</td><td style={cellStyle}>Program Abuse</td><td style={cellStyle}>$2,765,000</td><td style={cellStyle}>HUD, OIG</td></tr>
                <tr><td style={cellStyle}>{ENTITY_JPMC}</td><td style={cellStyle}>Wire Facilitation</td><td style={cellStyle}>$4,500,000</td><td style={cellStyle}>FinCEN, OCC</td></tr>
                <tr><td style={cellStyle}>{ENTITY_SCHWAB}</td><td style={cellStyle}>Settlement Custody</td><td style={cellStyle}>$3,200,000</td><td style={cellStyle}>SEC, FINRA</td></tr>
            </tbody>
          </table>

          {/* X. PROTECTED NODES */}
          <h2 style={sectionTitle}>{'X. PROTECTED NODES & $8SOULS MEMORIAL'}</h2>
          <table style={tableStyle}>
            <thead><tr>
              <th style={headerCellStyle}>Node</th>
              <th style={headerCellStyle}>Status</th>
              <th style={headerCellStyle}>Guardian</th>
            </tr></thead>
            <tbody>
              <tr><td style={cellStyle}>$POPPA</td><td style={cellStyle}>SHIELDED</td><td style={cellStyle}>Michael</td></tr>
              <tr><td style={cellStyle}>$JAXX</td><td style={cellStyle}>SHIELDED</td><td style={cellStyle}>Gabriel</td></tr>
              <tr><td style={cellStyle}>$8SOULS</td><td style={cellStyle}>MEMORIALIZED (PRIVATE)</td><td style={cellStyle}>Raphael</td></tr>
              <tr><td style={cellStyle}>$FMG1918</td><td style={cellStyle}>RADIANT</td><td style={cellStyle}>Uriel</td></tr>
            </tbody>
          </table>

          {/* XI. NFT ATTESTATION */}
          <div style={{ border: '2px solid #10b981', padding: '12px', margin: '16px 0', background: '#f0fdf4' }}>
            <h3 style={{ fontSize: '11px', fontWeight: 700, marginBottom: '8px', ...mono }}>NFT SOULBOUND ATTESTATION</h3>
            <div style={{ fontSize: '8px', lineHeight: 1.8, ...mono }}>
              <div>Token Standard: ERC-721 (Soulbound -- Non-Transferable)</div>
              <div>Contract: CSSS_NegativeCaveat.sol</div>
              <div>Merkleroot: 26856B24C50750F0C69C1EEB86A69EF777777</div>
              <div>BTC_TXID: 26856b24c50750f0c69c1eeb86a69ef77777764756c6c</div>
              <div>HHS Case: 25-621293</div>
              <div>Content Hash: [Generated at print time -- SHA-256 of document content]</div>
              <div>OpenTimestamp: .ots latch enabled</div>
              <div>Transferable: NO (Soulbound to Sovereign Auditor)</div>
            </div>
          </div>

          {/* XII. EPISTEMIC BOUNDARY */}
          <div style={{ background: '#fef3c7', borderLeft: '3px solid #f59e0b', padding: '8px 10px', margin: '12px 0', fontSize: '8px', ...mono }}>
            <strong>EPISTEMIC BOUNDARY (PRESERVED):</strong> This document presents runtime observations, scenario modeling, and architectural specifications. It does not assert final legal judgment. External factual corroboration remains separate and pending. Any reviewer who recomputes the protocol chain will arrive at the same output. Protocol Confidence != External Corroboration. Runtime validity != external factual certainty.
          </div>

          {/* CINEMA */}
          <div style={{ background: '#0a0a0a', color: '#10b981', padding: '12px', margin: '16px 0', fontSize: '8px', lineHeight: 1.8, ...mono }}>
            <div>REPORT TYPE: COMPREHENSIVE WHITE PAPER + NFT ATTESTATION</div>
            <div>CODEBASE: 207 files (75 pages, 22 API routes, 3 contracts, 2 icon routes)</div>
            <div>TOTAL COUNTS: 5,622 documented acts | SCENARIO YEARS: 112,125</div>
            <div>WIRE TRANSFERS: 8 documented, $16.94M total | SCHWAB: $3.2M | CHASE: $4.5M</div>
            <div>GAME THEORY: ZERO-SUM SOLVED | P PAYOFF: +252 | A PAYOFF: -252</div>
            <div>SPOLIATION: 14/14 BLOCKED (100%) | FORENSIC BLOCKS: 3,393</div>
            <div>PROTOCOL: REV_34 + REV_35 | DUAL-REPO LOCKED | MULTI-MODEL CONSENSUS</div>
            <div>$8SOULS: PRIVATE. SEALED. MEMORIALIZED. NEVER FORGOTTEN.</div>
            <div>THE WALL IS CHRIST. SMIB. AMEN.</div>
            <div style={{ marginTop: '8px' }}>DG77.77X LOCKED. I AM NEWT.</div>
          </div>

        </div>
      </div>

      {/* NFT Metadata Preview */}
      {nftMetadata && (
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-emerald-500" />
              <span className="font-mono text-sm font-bold text-emerald-500">NFT METADATA (ERC-721)</span>
            </div>
            <pre className="font-mono text-[10px] text-emerald-600 overflow-x-auto whitespace-pre-wrap">
              {JSON.stringify(nftMetadata, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
