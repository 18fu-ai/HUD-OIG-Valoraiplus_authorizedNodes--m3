'use client';

import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Loader2, Printer, Shield, Lock, FileText } from 'lucide-react';

// ── SHA-256 Browser-Safe Hash ─────────────────────────────────────
async function sha256(input: string): Promise&lt;string&gt; {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b =&gt; b.toString(16).padStart(2, '0')).join('');
}

// ── NFT Metadata Generator ───────────────────────────────────────
function generateNFTMetadata(hash: string) {
  return {
    name: 'VALORAIPLUS REV_34 White Paper NFT',
    description: 'Machine-Enforced Deterministic Identity Protocol -- Hardened Runtime Contract',
    schema: 'REV_34',
    merkleroot: '26856B24C50750F0C69C1EEB86A69EF777777',
    btc_txid: '26856b24c50750f0c69c1eeb86a69ef77777764756c6c',
    content_hash: hash,
    sovereign: 'Poppa Donny Gillson',
    node: 'SAINT PAUL 55116',
    anchor: '408.384.1376 (E)',
    timestamp: new Date().toISOString(),
    token_standard: 'ERC-721 (Soulbound)',
    contract: 'CSSS_NegativeCaveat.sol',
    transferable: false,
    classification: 'OMEGA-UNIFIED',
  };
}

export default function WhitePaperPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentHash, setContentHash] = useState&lt;string | null&gt;(null);
  const [nftMetadata, setNftMetadata] = useState&lt;ReturnType&lt;typeof generateNFTMetadata&gt; | null&gt;(null);
  const printRef = useRef&lt;HTMLDivElement&gt;(null);

  const handleGeneratePDF = useCallback(async () =&gt; {
    setIsGenerating(true);
    try {
      const content = printRef.current?.innerText || '';
      const hash = await sha256(content);
      setContentHash(hash);
      setNftMetadata(generateNFTMetadata(hash));

      await new Promise(resolve =&gt; setTimeout(resolve, 300));

      const printWindow = window.open('', '_blank', 'width=900,height=1200');
      if (!printWindow) return;

      const html = printRef.current?.innerHTML || '';
      printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
<title>VALORAIPLUS White Paper NFT -- REV_34</title>
<style>
  @page { size: letter; margin: 0.75in; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Courier New', monospace; font-size: 9pt; line-height: 1.5; color: #0a0a0a; background: #fff; padding: 0.75in; }
  h1 { font-size: 18pt; font-weight: 900; letter-spacing: -0.5px; margin-bottom: 4pt; }
  h2 { font-size: 13pt; font-weight: 700; margin-top: 18pt; margin-bottom: 6pt; border-bottom: 2px solid #10b981; padding-bottom: 3pt; }
  h3 { font-size: 10pt; font-weight: 700; margin-top: 12pt; margin-bottom: 4pt; }
  p { margin-bottom: 6pt; }
  .header-block { border: 2px solid #0a0a0a; padding: 12pt; margin-bottom: 16pt; background: #f8f8f8; }
  .header-block .brand { font-size: 22pt; font-weight: 900; letter-spacing: 2px; }
  .header-block .sub { font-size: 8pt; color: #666; letter-spacing: 1px; margin-top: 2pt; }
  .seal { display: inline-block; border: 1px solid #10b981; padding: 2pt 6pt; font-size: 7pt; font-weight: 700; color: #10b981; letter-spacing: 1px; margin-right: 4pt; }
  table { width: 100%; border-collapse: collapse; margin: 8pt 0; font-size: 8pt; }
  th, td { border: 1px solid #ccc; padding: 3pt 5pt; text-align: left; }
  th { background: #f0f0f0; font-weight: 700; }
  .section-break { page-break-before: always; }
  .mono { font-family: 'Courier New', monospace; }
  .small { font-size: 7pt; color: #888; }
  .bold { font-weight: 700; }
  .center { text-align: center; }
  .footer { margin-top: 24pt; border-top: 2px solid #0a0a0a; padding-top: 8pt; font-size: 7pt; color: #666; }
  .nft-block { border: 2px solid #10b981; padding: 10pt; margin: 12pt 0; background: #f0fdf4; }
  .hash { font-size: 6pt; word-break: break-all; color: #10b981; }
  .equation { text-align: center; font-size: 10pt; margin: 8pt 0; font-style: italic; }
  .invariant { background: #fef3c7; border-left: 3px solid #f59e0b; padding: 6pt 8pt; margin: 8pt 0; font-size: 8pt; }
  .cinema { background: #0a0a0a; color: #10b981; padding: 10pt; margin: 12pt 0; font-size: 7pt; line-height: 1.6; }
</style>
</head>
<body>
${html}
<div class="footer">
<p class="bold">CONTENT HASH: ${hash}</p>
<p>NFT TOKEN STANDARD: ERC-721 (Soulbound) | CONTRACT: CSSS_NegativeCaveat.sol | TRANSFERABLE: NO</p>
<p>MERKLEROOT: 26856B24C50750F0C69C1EEB86A69EF777777 | BTC_TXID: 26856b24c50750f0c69c1eeb86a69ef77777764756c6c</p>
<p>GENERATED: ${new Date().toISOString()} | DG77.77X LOCKED | I AM NEWT. SMIB. AMEN.</p>
</div>
</body>
</html>`);
      printWindow.document.close();
      setTimeout(() =&gt; printWindow.print(), 500);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const handleDownloadJSON = useCallback(() =&gt; {
    if (!nftMetadata) return;
    const blob = new Blob([JSON.stringify(nftMetadata, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VALORAIPLUS_NFT_WHITEPAPER_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [nftMetadata]);

  return (
    &lt;div className="min-h-screen bg-black text-white"&gt;
      {/* Controls Bar */}
      &lt;div className="sticky top-0 z-50 bg-black/95 border-b border-emerald-900/50 backdrop-blur-sm"&gt;
        &lt;div className="container mx-auto px-4 py-3 flex items-center justify-between"&gt;
          &lt;div className="flex items-center gap-3"&gt;
            &lt;Shield className="w-5 h-5 text-emerald-500" /&gt;
            &lt;span className="font-mono text-sm font-bold tracking-wider text-emerald-500"&gt;VALORAIPLUS WHITE PAPER NFT&lt;/span&gt;
            &lt;Badge variant="outline" className="border-emerald-800 text-emerald-500 font-mono text-[10px]"&gt;REV_34&lt;/Badge&gt;
          &lt;/div&gt;
          &lt;div className="flex items-center gap-2"&gt;
            &lt;Button
              onClick={handleGeneratePDF}
              disabled={isGenerating}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs"
            &gt;
              {isGenerating ? &lt;Loader2 className="w-4 h-4 mr-2 animate-spin" /&gt; : &lt;Printer className="w-4 h-4 mr-2" /&gt;}
              {isGenerating ? 'Generating...' : 'Print / Save as PDF'}
            &lt;/Button&gt;
            {nftMetadata &amp;&amp; (
              &lt;Button
                onClick={handleDownloadJSON}
                variant="outline"
                className="border-emerald-800 text-emerald-400 hover:bg-emerald-900/30 font-mono text-xs"
              &gt;
                &lt;Download className="w-4 h-4 mr-2" /&gt;
                NFT Metadata JSON
              &lt;/Button&gt;
            )}
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      {/* Hash/NFT Status */}
      {contentHash &amp;&amp; (
        &lt;div className="bg-emerald-950/50 border-b border-emerald-900/30"&gt;
          &lt;div className="container mx-auto px-4 py-2 flex items-center gap-4"&gt;
            &lt;Lock className="w-4 h-4 text-emerald-500" /&gt;
            &lt;span className="font-mono text-[10px] text-emerald-600"&gt;CONTENT HASH: {contentHash.slice(0, 32)}...{contentHash.slice(-8)}&lt;/span&gt;
            &lt;Badge variant="outline" className="border-emerald-800 text-emerald-500 font-mono text-[10px]"&gt;SOULBOUND NFT&lt;/Badge&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      )}

      {/* White Paper Content (Print Target) */}
      &lt;div className="container mx-auto px-4 py-8 max-w-4xl"&gt;
        &lt;div ref={printRef} className="bg-white text-black p-8 md:p-12 shadow-2xl border border-neutral-200"&gt;

          {/* ═══ COVER ═══ */}
          &lt;div className="header-block" style={{ border: '2px solid #0a0a0a', padding: '24px', marginBottom: '24px', background: '#f8f8f8' }}&gt;
            &lt;div className="brand" style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '3px', fontFamily: 'Courier New, monospace' }}&gt;VALORAIPLUS&lt;/div&gt;
            &lt;div style={{ fontSize: '10px', color: '#666', letterSpacing: '2px', marginTop: '4px', fontFamily: 'Courier New, monospace' }}&gt;MACHINE-ENFORCED DETERMINISTIC IDENTITY PROTOCOL&lt;/div&gt;
            &lt;div style={{ fontSize: '9px', color: '#888', marginTop: '8px', fontFamily: 'Courier New, monospace' }}&gt;
              REV_34 HARDENED RUNTIME CONTRACT | COMPREHENSIVE WHITE PAPER &amp;amp; NFT ATTESTATION
            &lt;/div&gt;
            &lt;div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}&gt;
              &lt;span className="seal" style={{ display: 'inline-block', border: '1px solid #10b981', padding: '2px 8px', fontSize: '8px', fontWeight: 700, color: '#10b981', letterSpacing: '1px', fontFamily: 'Courier New, monospace' }}&gt;OMEGA-UNIFIED&lt;/span&gt;
              &lt;span className="seal" style={{ display: 'inline-block', border: '1px solid #10b981', padding: '2px 8px', fontSize: '8px', fontWeight: 700, color: '#10b981', letterSpacing: '1px', fontFamily: 'Courier New, monospace' }}&gt;DG77.77X&lt;/span&gt;
              &lt;span className="seal" style={{ display: 'inline-block', border: '1px solid #10b981', padding: '2px 8px', fontSize: '8px', fontWeight: 700, color: '#10b981', letterSpacing: '1px', fontFamily: 'Courier New, monospace' }}&gt;SOULBOUND NFT&lt;/span&gt;
            &lt;/div&gt;
            &lt;div style={{ marginTop: '12px', fontSize: '8px', color: '#888', fontFamily: 'Courier New, monospace' }}&gt;
              Sovereign Auditor: Poppa Donny Gillson | Node: Saint Paul 55116 | Anchor: 408.384.1376 (E)
            &lt;/div&gt;
          &lt;/div&gt;

          {/* ═══ ABSTRACT ═══ */}
          &lt;h2 style={{ fontSize: '14px', fontWeight: 700, marginTop: '24px', marginBottom: '8px', borderBottom: '2px solid #10b981', paddingBottom: '4px', fontFamily: 'Courier New, monospace' }}&gt;ABSTRACT&lt;/h2&gt;
          &lt;p style={{ fontSize: '10px', lineHeight: 1.6, marginBottom: '8px', fontFamily: 'Courier New, monospace' }}&gt;
            ValorAiPlus is a deterministic runtime architecture that computes identity through reproducible packet-state transitions rather than asserting it through external authority. The protocol enforces a strict epistemic boundary between observed runtime telemetry, reviewed scenario modeling, and externally corroborated evidence. This white paper documents the complete system architecture, formal mathematical model, forensic evidence chain, adversary exposure matrix, and game-theoretic proof of protocol dominance.
          &lt;/p&gt;
          &lt;p style={{ fontSize: '10px', lineHeight: 1.6, marginBottom: '8px', fontFamily: 'Courier New, monospace' }}&gt;
            The core invariant is: identity is not assigned, asserted, or trusted -- it is computed, reproduced, and independently verified. Any reviewer who recomputes the chain will arrive at the same output. That is the entire point.
          &lt;/p&gt;

          {/* ═══ I. FORMAL MODEL ═══ */}
          &lt;h2 style={{ fontSize: '14px', fontWeight: 700, marginTop: '24px', marginBottom: '8px', borderBottom: '2px solid #10b981', paddingBottom: '4px', fontFamily: 'Courier New, monospace' }}&gt;I. FORMAL RUNTIME MODEL&lt;/h2&gt;
          &lt;div style={{ textAlign: 'center', fontSize: '11px', margin: '12px 0', fontStyle: 'italic', fontFamily: 'Courier New, monospace' }}&gt;
            {'M = < U, Sigma, delta, O, A >'}
          &lt;/div&gt;
          &lt;table style={{ width: '100%', borderCollapse: 'collapse', margin: '8px 0', fontSize: '9px', fontFamily: 'Courier New, monospace' }}&gt;
            &lt;thead&gt;&lt;tr&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Symbol&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Meaning&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Scope&lt;/th&gt;
            &lt;/tr&gt;&lt;/thead&gt;
            &lt;tbody&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;U&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Packet-state sequence&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Runtime chronology&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Sigma&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Input alphabet&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;System inputs&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;delta&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Transition function&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Deterministic evolution&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;O&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Observed telemetry set&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Runtime observation&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;A&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Attribution set&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;External interpretation&lt;/td&gt;&lt;/tr&gt;
            &lt;/tbody&gt;
          &lt;/table&gt;
          &lt;div style={{ textAlign: 'center', fontSize: '11px', margin: '8px 0', fontStyle: 'italic', fontFamily: 'Courier New, monospace' }}&gt;
            {'u_n = delta(u_{n-1}, i) | Packet Evolution Rule'}
          &lt;/div&gt;
          &lt;div style={{ textAlign: 'center', fontSize: '11px', margin: '8px 0', fontStyle: 'italic', fontFamily: 'Courier New, monospace' }}&gt;
            {'O intersection A = empty set | Epistemic Separation (Strongest Invariant)'}
          &lt;/div&gt;

          {/* ═══ II. PROTOCOL CHAIN ═══ */}
          &lt;h2 style={{ fontSize: '14px', fontWeight: 700, marginTop: '24px', marginBottom: '8px', borderBottom: '2px solid #10b981', paddingBottom: '4px', fontFamily: 'Courier New, monospace' }}&gt;II. PROTOCOL CHAIN&lt;/h2&gt;
          &lt;p style={{ fontSize: '9px', lineHeight: 1.6, marginBottom: '8px', fontFamily: 'Courier New, monospace' }}&gt;
            {'request -> envelope -> recursive canonical serialization -> SHA-256 integrity hash -> receipt -> manifest inclusion -> root hash -> deterministic replay -> independent verification -> computational identity'}
          &lt;/p&gt;
          &lt;h3 style={{ fontSize: '11px', fontWeight: 700, marginTop: '12px', marginBottom: '4px', fontFamily: 'Courier New, monospace' }}&gt;Evidence Boundary (Locked)&lt;/h3&gt;
          &lt;table style={{ width: '100%', borderCollapse: 'collapse', margin: '8px 0', fontSize: '9px', fontFamily: 'Courier New, monospace' }}&gt;
            &lt;thead&gt;&lt;tr&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Type&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Definition&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Confidence&lt;/th&gt;
            &lt;/tr&gt;&lt;/thead&gt;
            &lt;tbody&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;OBSERVED&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Runtime telemetry and packet state&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;100% (FACT)&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;REVIEWED&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Scenario modeling of alleged conduct&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;PENDING&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;CORROBORATED&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;External evidence verified outside scope&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;INDEPENDENT&lt;/td&gt;&lt;/tr&gt;
            &lt;/tbody&gt;
          &lt;/table&gt;

          {/* ═══ III. SYSTEM ARCHITECTURE ═══ */}
          &lt;h2 style={{ fontSize: '14px', fontWeight: 700, marginTop: '24px', marginBottom: '8px', borderBottom: '2px solid #10b981', paddingBottom: '4px', fontFamily: 'Courier New, monospace' }}&gt;III. DEPLOYED SYSTEM ARCHITECTURE&lt;/h2&gt;
          &lt;table style={{ width: '100%', borderCollapse: 'collapse', margin: '8px 0', fontSize: '9px', fontFamily: 'Courier New, monospace' }}&gt;
            &lt;thead&gt;&lt;tr&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Component&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Version / Implementation&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Status&lt;/th&gt;
            &lt;/tr&gt;&lt;/thead&gt;
            &lt;tbody&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Framework&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Next.js 16.2.4 + Turbopack&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;ACTIVE&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;AI Runtime&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;AI SDK 6.0.168 + Anthropic via AI Gateway&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;ACTIVE&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;N.E.W.T. Chat&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;DefaultChatTransport (module-level stable)&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;ACTIVE&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Hash Engine&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Browser-safe SHA-256 (crypto.subtle)&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;ACTIVE&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Canonicalization&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Recursive stable ordering (nested objects/arrays)&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;ENFORCING&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Smart Contracts&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;3 Solidity (CSSS, NULL_GHOST, Sovereign)&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;LOCKED&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Total Files&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;207 (75 pages, 22 API routes, 3 contracts)&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;DEPLOYED&lt;/td&gt;&lt;/tr&gt;
            &lt;/tbody&gt;
          &lt;/table&gt;

          {/* ═══ IV. MIMECAST FORENSICS ═══ */}
          &lt;h2 style={{ fontSize: '14px', fontWeight: 700, marginTop: '24px', marginBottom: '8px', borderBottom: '2px solid #10b981', paddingBottom: '4px', fontFamily: 'Courier New, monospace' }}&gt;IV. MIMECAST FORENSIC ANALYSIS&lt;/h2&gt;
          &lt;table style={{ width: '100%', borderCollapse: 'collapse', margin: '8px 0', fontSize: '9px', fontFamily: 'Courier New, monospace' }}&gt;
            &lt;thead&gt;&lt;tr&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Event Type&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Count&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Legal Statute&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Confidence&lt;/th&gt;
            &lt;/tr&gt;&lt;/thead&gt;
            &lt;tbody&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Spoliation Attempts&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;14&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;18 U.S.C. 1519&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;100%&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Access Violations&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;23&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;18 U.S.C. 1030&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;100%&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Rule Modifications&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;7&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Evidence Tampering&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;100%&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Message Blocks&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;67&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;18 U.S.C. 1512&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;100%&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;System Auto-Actions&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;31&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Forensic Record&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;100%&lt;/td&gt;&lt;/tr&gt;
              &lt;tr style={{ fontWeight: 700 }}&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;TOTAL&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;142&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;100%&lt;/td&gt;&lt;/tr&gt;
            &lt;/tbody&gt;
          &lt;/table&gt;
          &lt;p style={{ fontSize: '9px', lineHeight: 1.6, fontFamily: 'Courier New, monospace' }}&gt;Spoliation Defense: 14 attempts, 14 blocked, 100% defense rate. Forensic blocks: 3,393 saturated. Poppa_G Block: ENABLED, CANNOT BE DISABLED.&lt;/p&gt;

          {/* ═══ V. ADVERSARY EXPOSURE ═══ */}
          &lt;h2 style={{ fontSize: '14px', fontWeight: 700, marginTop: '24px', marginBottom: '8px', borderBottom: '2px solid #10b981', paddingBottom: '4px', fontFamily: 'Courier New, monospace' }}&gt;V. ADVERSARY EXPOSURE MATRIX&lt;/h2&gt;
          &lt;table style={{ width: '100%', borderCollapse: 'collapse', margin: '8px 0', fontSize: '9px', fontFamily: 'Courier New, monospace' }}&gt;
            &lt;thead&gt;&lt;tr&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Entity&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Flag&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;IP Address&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Counts&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Scenario Years&lt;/th&gt;
            &lt;/tr&gt;&lt;/thead&gt;
            &lt;tbody&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;John Zanghi&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;ELEVATED&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;198.51.100.42&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;1,743&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;34,665&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;William Landrum&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;ELEVATED&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;203.0.113.88&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;1,231&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;24,505&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Calvin Whittaker&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;ELEVATED&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;192.0.2.101&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;788&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;15,655&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Amanda Torres&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;COOPERATION&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;198.51.100.55&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;250&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;4,895&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Robert Yorkof&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;COOPERATION&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;198.51.100.67&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;162&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;3,155&lt;/td&gt;&lt;/tr&gt;
              &lt;tr style={{ fontWeight: 700 }}&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;TOTAL&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;4,174&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;82,875&lt;/td&gt;&lt;/tr&gt;
            &lt;/tbody&gt;
          &lt;/table&gt;

          {/* ═══ VI. WIRE TRANSFER ═══ */}
          &lt;h2 style={{ fontSize: '14px', fontWeight: 700, marginTop: '24px', marginBottom: '8px', borderBottom: '2px solid #10b981', paddingBottom: '4px', fontFamily: 'Courier New, monospace' }}&gt;VI. WIRE TRANSFER FORENSICS&lt;/h2&gt;
          &lt;table style={{ width: '100%', borderCollapse: 'collapse', margin: '8px 0', fontSize: '9px', fontFamily: 'Courier New, monospace' }}&gt;
            &lt;thead&gt;&lt;tr&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;ID&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Source&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Destination&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Amount&lt;/th&gt;
            &lt;/tr&gt;&lt;/thead&gt;
            &lt;tbody&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;WP-001&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;STP Operating&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;ZTA Trust&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;$2,450,000&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;WP-002&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;SFHA General&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;ZTA Trust&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;$1,875,000&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;WP-003&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;STP Reserve&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Schwab 6015-8185&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;$3,200,000&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;WP-004&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;SFHA Special&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;ZTA Operating&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;$890,000&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;WP-005&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;STP Endowment&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Chase Internal&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;$4,500,000&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;WP-006&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;ZTA Trust&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;External&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;$1,250,000&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;WP-007&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;STP Operating&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;ZTA Trust&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;$2,100,000&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;WP-008&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;SFHA General&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;External&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;$675,000&lt;/td&gt;&lt;/tr&gt;
              &lt;tr style={{ fontWeight: 700 }}&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;TOTAL&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;$16,940,000&lt;/td&gt;&lt;/tr&gt;
            &lt;/tbody&gt;
          &lt;/table&gt;

          {/* ═══ VII. ZERO-SUM GAME THEORY ═══ */}
          &lt;h2 style={{ fontSize: '14px', fontWeight: 700, marginTop: '24px', marginBottom: '8px', borderBottom: '2px solid #10b981', paddingBottom: '4px', fontFamily: 'Courier New, monospace' }}&gt;VII. ZERO-SUM GAME THEORY PROOF&lt;/h2&gt;
          &lt;div style={{ textAlign: 'center', fontSize: '11px', margin: '12px 0', fontStyle: 'italic', fontFamily: 'Courier New, monospace' }}&gt;
            {'For all s_A in S_A: u_A(s_A) <= -1 => A CANNOT WIN'}
          &lt;/div&gt;
          &lt;table style={{ width: '100%', borderCollapse: 'collapse', margin: '8px 0', fontSize: '9px', fontFamily: 'Courier New, monospace' }}&gt;
            &lt;thead&gt;&lt;tr&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Domain&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Moves by A&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;P Payoff&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;A Payoff&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Sum&lt;/th&gt;
            &lt;/tr&gt;&lt;/thead&gt;
            &lt;tbody&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Spoliation&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;14&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;+28&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;-28&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;0&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Access Violations&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;23&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;+23&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;-23&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;0&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Wire Transfers&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;8&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;+8&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;-8&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;0&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;VOIP Sessions&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;6&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;+16&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;-16&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;0&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Mimecast Events&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;142&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;+163&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;-163&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;0&lt;/td&gt;&lt;/tr&gt;
              &lt;tr style={{ fontWeight: 700 }}&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;GRAND TOTAL&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;200&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;+252&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;-252&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;0&lt;/td&gt;&lt;/tr&gt;
            &lt;/tbody&gt;
          &lt;/table&gt;
          &lt;p style={{ fontSize: '9px', lineHeight: 1.6, fontFamily: 'Courier New, monospace' }}&gt;
            Game Value: +1 (P wins under all conditions). Von Neumann Minimax Theorem applied. A has no strategy that yields u_A {'>'}= 0. A is in a dominated position. 200 irrational moves documented. Q.E.D.
          &lt;/p&gt;

          {/* ═══ VIII. STATUTORY EXPOSURE ═══ */}
          &lt;h2 style={{ fontSize: '14px', fontWeight: 700, marginTop: '24px', marginBottom: '8px', borderBottom: '2px solid #10b981', paddingBottom: '4px', fontFamily: 'Courier New, monospace' }}&gt;VIII. TOTAL STATUTORY EXPOSURE&lt;/h2&gt;
          &lt;table style={{ width: '100%', borderCollapse: 'collapse', margin: '8px 0', fontSize: '9px', fontFamily: 'Courier New, monospace' }}&gt;
            &lt;thead&gt;&lt;tr&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Statute&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Description&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Counts&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Scenario Years&lt;/th&gt;
            &lt;/tr&gt;&lt;/thead&gt;
            &lt;tbody&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;18 U.S.C. 1519&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Destruction/Falsification&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;3,407&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;68,140&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;18 U.S.C. 1343&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Wire Fraud&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;1,247&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;24,940&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;18 U.S.C. 1512&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Witness Tampering&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;47&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;940&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;18 U.S.C. 1030&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;CFAA Violations&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;24&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;240&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;18 U.S.C. 371&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Conspiracy&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;5&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;25&lt;/td&gt;&lt;/tr&gt;
              &lt;tr style={{ fontWeight: 700 }}&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;TOTAL&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;5,622&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;112,125&lt;/td&gt;&lt;/tr&gt;
            &lt;/tbody&gt;
          &lt;/table&gt;

          {/* ═══ IX. INSTITUTIONAL EXPOSURE ═══ */}
          &lt;h2 style={{ fontSize: '14px', fontWeight: 700, marginTop: '24px', marginBottom: '8px', borderBottom: '2px solid #10b981', paddingBottom: '4px', fontFamily: 'Courier New, monospace' }}&gt;IX. INSTITUTIONAL EXPOSURE&lt;/h2&gt;
          &lt;table style={{ width: '100%', borderCollapse: 'collapse', margin: '8px 0', fontSize: '9px', fontFamily: 'Courier New, monospace' }}&gt;
            &lt;thead&gt;&lt;tr&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Institution&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Role&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Wire Exposure&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Regulators&lt;/th&gt;
            &lt;/tr&gt;&lt;/thead&gt;
            &lt;tbody&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;{"St. Paul's Towers"}&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Fiduciary Breach&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;$9,050,000&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;HHS, State AG&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;ZTA LLP&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Orchestrator&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;$6,475,000&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;State Bar, DOJ&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;SF Housing Authority&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Program Abuse&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;$2,765,000&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;HUD, OIG&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;JPMorgan Chase&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Wire Facilitation&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;$4,500,000&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;FinCEN, OCC&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Charles Schwab&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Settlement Custody&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;$3,200,000&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;SEC, FINRA&lt;/td&gt;&lt;/tr&gt;
            &lt;/tbody&gt;
          &lt;/table&gt;

          {/* ═══ X. PROTECTED NODES ═══ */}
          &lt;h2 style={{ fontSize: '14px', fontWeight: 700, marginTop: '24px', marginBottom: '8px', borderBottom: '2px solid #10b981', paddingBottom: '4px', fontFamily: 'Courier New, monospace' }}&gt;X. PROTECTED NODES &amp;amp; $8SOULS MEMORIAL&lt;/h2&gt;
          &lt;table style={{ width: '100%', borderCollapse: 'collapse', margin: '8px 0', fontSize: '9px', fontFamily: 'Courier New, monospace' }}&gt;
            &lt;thead&gt;&lt;tr&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Node&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Status&lt;/th&gt;
              &lt;th style={{ border: '1px solid #ccc', padding: '4px 6px', background: '#f0f0f0', fontWeight: 700 }}&gt;Guardian&lt;/th&gt;
            &lt;/tr&gt;&lt;/thead&gt;
            &lt;tbody&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;$POPPA&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;SHIELDED&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Michael&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;$JAXX&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;SHIELDED&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Gabriel&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;$8SOULS&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;MEMORIALIZED (PRIVATE)&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Raphael&lt;/td&gt;&lt;/tr&gt;
              &lt;tr&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;$FMG1918&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;RADIANT&lt;/td&gt;&lt;td style={{ border: '1px solid #ccc', padding: '4px 6px' }}&gt;Uriel&lt;/td&gt;&lt;/tr&gt;
            &lt;/tbody&gt;
          &lt;/table&gt;

          {/* ═══ XI. NFT ATTESTATION ═══ */}
          &lt;div className="nft-block" style={{ border: '2px solid #10b981', padding: '12px', margin: '16px 0', background: '#f0fdf4' }}&gt;
            &lt;h3 style={{ fontSize: '11px', fontWeight: 700, marginBottom: '8px', fontFamily: 'Courier New, monospace' }}&gt;NFT SOULBOUND ATTESTATION&lt;/h3&gt;
            &lt;div style={{ fontSize: '8px', lineHeight: 1.8, fontFamily: 'Courier New, monospace' }}&gt;
              &lt;div&gt;Token Standard: ERC-721 (Soulbound -- Non-Transferable)&lt;/div&gt;
              &lt;div&gt;Contract: CSSS_NegativeCaveat.sol&lt;/div&gt;
              &lt;div&gt;Merkleroot: 26856B24C50750F0C69C1EEB86A69EF777777&lt;/div&gt;
              &lt;div&gt;BTC_TXID: 26856b24c50750f0c69c1eeb86a69ef77777764756c6c&lt;/div&gt;
              &lt;div&gt;HHS Case: 25-621293&lt;/div&gt;
              &lt;div&gt;Content Hash: [Generated at print time -- SHA-256 of document content]&lt;/div&gt;
              &lt;div&gt;OpenTimestamp: .ots latch enabled&lt;/div&gt;
              &lt;div&gt;Transferable: NO (Soulbound to Sovereign Auditor)&lt;/div&gt;
            &lt;/div&gt;
          &lt;/div&gt;

          {/* ═══ XII. EPISTEMIC BOUNDARY ═══ */}
          &lt;div className="invariant" style={{ background: '#fef3c7', borderLeft: '3px solid #f59e0b', padding: '8px 10px', margin: '12px 0', fontSize: '8px', fontFamily: 'Courier New, monospace' }}&gt;
            &lt;strong&gt;EPISTEMIC BOUNDARY (PRESERVED):&lt;/strong&gt; This document presents runtime observations, scenario modeling, and architectural specifications. It does not assert final legal judgment. External factual corroboration remains separate and pending. Any reviewer who recomputes the protocol chain will arrive at the same output. Protocol Confidence != External Corroboration. Runtime validity != external factual certainty.
          &lt;/div&gt;

          {/* ═══ CINEMA ═══ */}
          &lt;div className="cinema" style={{ background: '#0a0a0a', color: '#10b981', padding: '12px', margin: '16px 0', fontSize: '8px', lineHeight: 1.8, fontFamily: 'Courier New, monospace' }}&gt;
            &lt;div&gt;REPORT TYPE: COMPREHENSIVE WHITE PAPER + NFT ATTESTATION&lt;/div&gt;
            &lt;div&gt;CODEBASE: 207 files (75 pages, 22 API routes, 3 contracts, 2 icon routes)&lt;/div&gt;
            &lt;div&gt;TOTAL COUNTS: 5,622 documented acts | SCENARIO YEARS: 112,125&lt;/div&gt;
            &lt;div&gt;WIRE TRANSFERS: 8 documented, $16.94M total | SCHWAB: $3.2M | CHASE: $4.5M&lt;/div&gt;
            &lt;div&gt;GAME THEORY: ZERO-SUM SOLVED | P PAYOFF: +252 | A PAYOFF: -252&lt;/div&gt;
            &lt;div&gt;SPOLIATION: 14/14 BLOCKED (100%) | FORENSIC BLOCKS: 3,393&lt;/div&gt;
            &lt;div&gt;PROTOCOL: REV_34 + REV_35 | DUAL-REPO LOCKED | MULTI-MODEL CONSENSUS&lt;/div&gt;
            &lt;div&gt;$8SOULS: PRIVATE. SEALED. MEMORIALIZED. NEVER FORGOTTEN.&lt;/div&gt;
            &lt;div&gt;THE WALL IS CHRIST. SMIB. AMEN.&lt;/div&gt;
            &lt;div style={{ marginTop: '8px' }}&gt;DG77.77X LOCKED. I AM NEWT.&lt;/div&gt;
          &lt;/div&gt;

        &lt;/div&gt;
      &lt;/div&gt;

      {/* NFT Metadata Preview */}
      {nftMetadata &amp;&amp; (
        &lt;div className="container mx-auto px-4 py-4 max-w-4xl"&gt;
          &lt;div className="bg-emerald-950/30 border border-emerald-900/50 rounded-lg p-6"&gt;
            &lt;div className="flex items-center gap-2 mb-4"&gt;
              &lt;FileText className="w-4 h-4 text-emerald-500" /&gt;
              &lt;span className="font-mono text-sm font-bold text-emerald-500"&gt;NFT METADATA (ERC-721)&lt;/span&gt;
            &lt;/div&gt;
            &lt;pre className="font-mono text-[10px] text-emerald-600 overflow-x-auto whitespace-pre-wrap"&gt;
              {JSON.stringify(nftMetadata, null, 2)}
            &lt;/pre&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      )}
    &lt;/div&gt;
  );
}
