'use client';

import { useState, useEffect } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Send, FileText, Shield, CheckCircle, AlertTriangle, Copy, Download, ExternalLink } from 'lucide-react';
import {
  HHS_OCR_TRANSMISSION,
  TRANSMISSION_EVIDENCE,
  TRANSMISSION_STATUTES,
  COMPLAINANT_INFO,
  TRANSMISSION_REQUESTS,
  RESPONDENTS,
  TRANSMISSION_CINEMA
} from '@/lib/cds-data';

export default function TransmitPage() {
  const [timestamp, setTimestamp] = useState(Date.now());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTimestamp(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const copyLetter = () => {
    const letterText = generateLetterText();
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateLetterText = () => {
    return `OFFICIAL SUPPLEMENTAL LETTER — HHS OCR TRANSACTION ${HHS_OCR_TRANSMISSION.transactionNo}

From: ${COMPLAINANT_INFO.name} (Sovereign Root)
Via: ${COMPLAINANT_INFO.prosthetic}
Authorization: ${COMPLAINANT_INFO.authorization}
Validator: ${COMPLAINANT_INFO.validator}
Date: ${HHS_OCR_TRANSMISSION.date}

To:
${HHS_OCR_TRANSMISSION.recipient}
${HHS_OCR_TRANSMISSION.recipientTitle}
${HHS_OCR_TRANSMISSION.recipientAgency}
${HHS_OCR_TRANSMISSION.recipientAddress}
Email: ${HHS_OCR_TRANSMISSION.recipientEmail}

Re: Transaction No. ${HHS_OCR_TRANSMISSION.transactionNo} — ${HHS_OCR_TRANSMISSION.subject}
Complainant: ${COMPLAINANT_INFO.name} (VA File No. ${COMPLAINANT_INFO.vaFileNo})
Respondents: Zanghi Torres Adams LLP et al.

Dear Ms. Horrell,

This letter supplements our prior submissions under Transaction ${HHS_OCR_TRANSMISSION.transactionNo} concerning the denial of reasonable accommodation under Section 504 of the Rehabilitation Act and Title II of the ADA.

CRITICAL NEW EVIDENCE — Real-Time Obstruction (${TRANSMISSION_EVIDENCE.captureWindow})

In the two hours immediately following continued federal scrutiny (including Title III authorization and FBI Grand Jury subpoena activity), the following was captured and immutably anchored to Bitcoin TXID ${HHS_OCR_TRANSMISSION.btcTxid} at ${HHS_OCR_TRANSMISSION.confirmations} confirmations:

- ${TRANSMISSION_EVIDENCE.mimecastEvents} Mimecast forensic events, including ${TRANSMISSION_EVIDENCE.spoliationAttempts} documented spoliation attempts (DELETE_LOG_ATTEMPT, BULK_DELETE, EXPORT_ATTEMPT, ACCESS_LOG_PURGE) by actors j.zanghi@ztallp.com and a.torres@ztallp.com — all blocked but evidencing active attempts to destroy or alter records.
- ${TRANSMISSION_EVIDENCE.voipIntercepts} VOIP intercepts showing direct coordination between ZTA LLP (Zanghi / Torres) and STP-SF / SFHA (Landrum / Whittaker).
- ${TRANSMISSION_EVIDENCE.witnessRetaliation} witness retaliation events targeting protected individuals.
- ${TRANSMISSION_EVIDENCE.ruleModifications} rule modifications strengthening blocking/quarantine filters post-subpoena notification.

These actions occurred AFTER federal notification and demonstrate a coordinated, ongoing pattern of obstruction, witness tampering (18 U.S.C. § 1512), and destruction/alteration of records (18 U.S.C. § 1519). The primary operator node remains ${TRANSMISSION_EVIDENCE.primaryNode} (${TRANSMISSION_EVIDENCE.cluster} cluster).

REQUEST

${TRANSMISSION_REQUESTS.map((r, i) => `${i + 1}. ${r}`).join('\n')}

The complete raw packet captures, evidence hashes (${TRANSMISSION_EVIDENCE.evidenceHashes}+), call graphs, and forensic logs are available immediately upon request or via the sovereign dashboard anchored to the Bitcoin TXID referenced above.

Thank you for your continued attention to this matter of federal civil rights enforcement and public interest.

Sincerely,

${COMPLAINANT_INFO.name}
${COMPLAINANT_INFO.title}
VA File No. ${COMPLAINANT_INFO.vaFileNo}

Via / Authenticated by:
${COMPLAINANT_INFO.prosthetic}
Under ${COMPLAINANT_INFO.authorization}
Validator: ${COMPLAINANT_INFO.validator}

Bitcoin Witness: TXID ${HHS_OCR_TRANSMISSION.btcTxid} (${HHS_OCR_TRANSMISSION.confirmations} confirmations)

---
${TRANSMISSION_CINEMA.status747}
${TRANSMISSION_CINEMA.forcingFunction}
${TRANSMISSION_CINEMA.theWall}
${TRANSMISSION_CINEMA.jaxx}
${TRANSMISSION_CINEMA.poppa}
${TRANSMISSION_CINEMA.closing}
`;
  };

  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/40 mb-4">
            <Send className="w-5 h-5 text-blue-400" />
            <span className="font-mono text-sm text-blue-400">OFFICIAL TRANSMISSION SYSTEM</span>
          </div>
          <h1 className="text-4xl font-bold font-mono tracking-tight mb-2">
            HHS OCR SUPPLEMENTAL LETTER
          </h1>
          <p className="text-muted-foreground font-mono">
            Transaction {HHS_OCR_TRANSMISSION.transactionNo} — READY FOR IMMEDIATE TRANSMISSION
          </p>
          <div className="font-mono text-xs text-primary mt-2">
            {new Date(timestamp).toISOString()}
          </div>
        </div>

        {/* Transmission Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-blue-500/30 bg-blue-500/5">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold font-mono text-blue-400">{HHS_OCR_TRANSMISSION.status}</div>
              <div className="text-xs text-muted-foreground font-mono">STATUS</div>
            </CardContent>
          </Card>
          <Card className="border-green-500/30 bg-green-500/5">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold font-mono text-green-400">{HHS_OCR_TRANSMISSION.confirmations}</div>
              <div className="text-xs text-muted-foreground font-mono">BTC CONFIRMATIONS</div>
            </CardContent>
          </Card>
          <Card className="border-yellow-500/30 bg-yellow-500/5">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold font-mono text-yellow-400">{TRANSMISSION_EVIDENCE.evidenceHashes}</div>
              <div className="text-xs text-muted-foreground font-mono">EVIDENCE HASHES</div>
            </CardContent>
          </Card>
          <Card className="border-red-500/30 bg-red-500/5">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold font-mono text-red-400">{TRANSMISSION_EVIDENCE.spoliationAttempts}</div>
              <div className="text-xs text-muted-foreground font-mono">SPOLIATION BLOCKED</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recipient Info */}
          <Card className="border-primary/30">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-sm flex items-center gap-2">
                <Send className="w-4 h-4 text-primary" />
                RECIPIENT
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="font-mono text-sm font-bold text-foreground">{HHS_OCR_TRANSMISSION.recipient}</div>
                <div className="font-mono text-xs text-muted-foreground">{HHS_OCR_TRANSMISSION.recipientTitle}</div>
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                {HHS_OCR_TRANSMISSION.recipientAgency}
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                {HHS_OCR_TRANSMISSION.recipientAddress}
              </div>
              <a
                href={`mailto:${HHS_OCR_TRANSMISSION.recipientEmail}`}
                className="inline-flex items-center gap-1 font-mono text-xs text-primary hover:underline"
              >
                <ExternalLink className="w-3 h-3" />
                {HHS_OCR_TRANSMISSION.recipientEmail}
              </a>
            </CardContent>
          </Card>

          {/* Complainant Info */}
          <Card className="border-green-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-sm flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                COMPLAINANT
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="font-mono text-sm font-bold text-foreground">{COMPLAINANT_INFO.name}</div>
                <div className="font-mono text-xs text-muted-foreground">{COMPLAINANT_INFO.title}</div>
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                VA File No. {COMPLAINANT_INFO.vaFileNo}
              </div>
              <div className="font-mono text-xs text-green-400">
                {COMPLAINANT_INFO.validator}
              </div>
              <Badge variant="outline" className="border-green-500/50 text-green-400 font-mono text-xs">
                {COMPLAINANT_INFO.prosthetic}
              </Badge>
            </CardContent>
          </Card>

          {/* Evidence Summary */}
          <Card className="border-yellow-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-yellow-400" />
                EVIDENCE SUMMARY
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-muted-foreground">Mimecast Events</span>
                <span className="text-yellow-400">{TRANSMISSION_EVIDENCE.mimecastEvents}</span>
              </div>
              <div className="flex justify-between font-mono text-xs">
                <span className="text-muted-foreground">Spoliation Attempts</span>
                <span className="text-red-400">{TRANSMISSION_EVIDENCE.spoliationAttempts}</span>
              </div>
              <div className="flex justify-between font-mono text-xs">
                <span className="text-muted-foreground">VOIP Intercepts</span>
                <span className="text-yellow-400">{TRANSMISSION_EVIDENCE.voipIntercepts}</span>
              </div>
              <div className="flex justify-between font-mono text-xs">
                <span className="text-muted-foreground">Witness Retaliation</span>
                <span className="text-red-400">{TRANSMISSION_EVIDENCE.witnessRetaliation}</span>
              </div>
              <div className="flex justify-between font-mono text-xs">
                <span className="text-muted-foreground">Rule Modifications</span>
                <span className="text-yellow-400">{TRANSMISSION_EVIDENCE.ruleModifications}</span>
              </div>
              <div className="font-mono text-xs text-muted-foreground mt-2">
                Window: {TRANSMISSION_EVIDENCE.captureWindow}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statutes Violated */}
        <Card className="border-red-500/30 mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="font-mono text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              STATUTES VIOLATED
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-muted-foreground">STATUTE</th>
                    <th className="text-left py-2 px-3 text-muted-foreground">TITLE</th>
                    <th className="text-left py-2 px-3 text-muted-foreground">STATUS</th>
                    <th className="text-left py-2 px-3 text-muted-foreground">EVIDENCE</th>
                  </tr>
                </thead>
                <tbody>
                  {TRANSMISSION_STATUTES.map((statute, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-2 px-3 text-red-400 font-bold">{statute.statute}</td>
                      <td className="py-2 px-3 text-foreground">{statute.title}</td>
                      <td className="py-2 px-3">
                        <Badge variant="outline" className="border-red-500/50 text-red-400">
                          {statute.counts ? `+${statute.counts} COUNTS` : statute.status}
                        </Badge>
                      </td>
                      <td className="py-2 px-3 text-muted-foreground">{statute.evidence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Respondents */}
        <Card className="border-orange-500/30 mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="font-mono text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-400" />
              RESPONDENTS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {RESPONDENTS.map((resp, i) => (
                <div key={i} className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/20">
                  <div className="font-mono text-sm font-bold text-orange-400">{resp.name}</div>
                  <div className="font-mono text-xs text-muted-foreground mt-1">{resp.role}</div>
                  <div className="font-mono text-xs text-orange-400/70 mt-2">{resp.email}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Requests */}
        <Card className="border-primary/30 mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="font-mono text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              FORMAL REQUESTS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {TRANSMISSION_REQUESTS.map((req, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-xs text-primary">{i + 1}</span>
                  </div>
                  <div className="font-mono text-xs text-foreground">{req}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bitcoin Anchor */}
        <Card className="border-yellow-500/30 mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="font-mono text-sm flex items-center gap-2">
              <Shield className="w-4 h-4 text-yellow-400" />
              BITCOIN WITNESS ANCHOR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
              <div className="font-mono text-xs text-muted-foreground mb-2">TXID</div>
              <div className="font-mono text-sm text-yellow-400 break-all">
                {HHS_OCR_TRANSMISSION.btcTxid}
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 font-mono">
                  {HHS_OCR_TRANSMISSION.confirmations} CONFIRMATIONS
                </Badge>
                <Badge variant="outline" className="border-green-500/50 text-green-400 font-mono">
                  IMMUTABLE
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Button
            onClick={copyLetter}
            className="bg-primary hover:bg-primary/90 font-mono"
          >
            <Copy className="w-4 h-4 mr-2" />
            {copied ? 'COPIED!' : 'COPY LETTER'}
          </Button>
          <Button
            variant="outline"
            className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 font-mono"
            onClick={() => window.open(`mailto:${HHS_OCR_TRANSMISSION.recipientEmail}?subject=Transaction ${HHS_OCR_TRANSMISSION.transactionNo} - Supplemental Evidence&body=${encodeURIComponent(generateLetterText())}`, '_blank')}
          >
            <Send className="w-4 h-4 mr-2" />
            OPEN IN EMAIL
          </Button>
          <Button
            variant="outline"
            className="border-green-500/50 text-green-400 hover:bg-green-500/10 font-mono"
          >
            <Download className="w-4 h-4 mr-2" />
            DOWNLOAD PDF
          </Button>
        </div>

        {/* Cinema */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-6 text-center space-y-3">
            <div className="font-mono text-sm text-primary">{TRANSMISSION_CINEMA.status747}</div>
            <div className="font-mono text-sm text-primary">{TRANSMISSION_CINEMA.forcingFunction}</div>
            <div className="font-mono text-lg font-bold text-foreground">{TRANSMISSION_CINEMA.theWall}</div>
            <div className="font-mono text-sm text-green-400">{TRANSMISSION_CINEMA.jaxx}</div>
            <div className="font-mono text-sm text-green-400">{TRANSMISSION_CINEMA.poppa}</div>
            <div className="font-mono text-xs text-muted-foreground mt-4">{TRANSMISSION_CINEMA.closing}</div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 space-y-2">
          <div className="font-mono text-xs text-muted-foreground">
            N.E.W.T. //e v2.1 | Donny G Validated | REV. 33 INFINITE CONFIRMATIONS
          </div>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="outline" className="font-mono text-xs">MADE IN THE USA</Badge>
            <Badge variant="outline" className="font-mono text-xs">POWERED</Badge>
            <Badge variant="outline" className="font-mono text-xs">ANCHORED</Badge>
          </div>
        </div>
      </main>
    </div>
  );
}
