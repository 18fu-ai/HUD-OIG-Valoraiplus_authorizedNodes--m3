'use client';

import { useState, useCallback } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { HomeButton, HomeBreadcrumb } from '@/components/cds/home-button';
import {
  Download,
  FileJson,
  FileText,
  FileCode,
  Printer,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Radio,
  Database,
  Phone,
  Mail,
  Users,
  DollarSign,
  Activity,
  Lock,
  Eye,
  Zap
} from 'lucide-react';
import {
  CDS_SECTIONS,
  THREAT_ACTORS,
  CLAWBACK_TARGETS,
  MIMECAST_EVENTS,
  VOIP_INTERCEPTS,
  WITNESS_RETALIATION,
  WIRETAP_INTERCEPTS,
  SYSTEM_PROPERTIES,
  PROTECTED_NODES,
  INVESTIGATIONS as FEDERAL_INVESTIGATIONS,
} from '@/lib/cds-data';

// Report sections available for export
const REPORT_SECTIONS = [
  { id: 'executive', label: 'Executive Summary', icon: Shield, critical: true },
  { id: 'actors', label: 'Threat Actor Profiles', icon: Users, critical: true },
  { id: 'federal', label: 'Federal Investigation Status', icon: Activity, critical: true },
  { id: 'mimecast', label: 'Mimecast Forensic Analysis', icon: Mail, critical: true },
  { id: 'voip', label: 'VOIP Intercept Log', icon: Phone, critical: true },
  { id: 'wiretap', label: 'Wiretap Intelligence', icon: Radio, critical: true },
  { id: 'witness', label: 'Witness Retaliation Events', icon: AlertTriangle, critical: true },
  { id: 'clawback', label: 'Clawback Recovery Matrix', icon: DollarSign, critical: false },
  { id: 'criminal', label: 'Criminal Exposure Summary', icon: Lock, critical: false },
  { id: 'protected', label: 'Protected Nodes Status', icon: Eye, critical: false },
  { id: 'system', label: 'System Properties', icon: Database, critical: false },
];

// Generate the full intelligence report content
function generateFullReport(sections: string[]): string {
  const timestamp = new Date().toISOString();
  const lines: string[] = [];

  // Header
  lines.push('═'.repeat(80));
  lines.push('');
  lines.push('                    VALORAIPLUS FULL INTELLIGENCE REPORT');
  lines.push('                    Classification: OMEGA-UNIFIED');
  lines.push('');
  lines.push('═'.repeat(80));
  lines.push('');
  lines.push(`Report Generated: ${timestamp}`);
  lines.push('Truth Cycle: 266ms');
  lines.push('Merkleroot: 26856B24C50750F0C69C1EEB86A69EF777777');
  lines.push('Anchor: SAINT PAUL 55116 — DEEP FORENSIC ROOT');
  lines.push('Sovereign: [SOVEREIGN_AUDITOR] -- VERIFIED');
  lines.push('');

  // Executive Summary
  if (sections.includes('executive')) {
    lines.push('─'.repeat(80));
    lines.push('I. EXECUTIVE SUMMARY');
    lines.push('─'.repeat(80));
    lines.push('');
    lines.push('TOTAL RECOVERY TARGET: $508,631,005.52');
    lines.push('');
    lines.push('Entity Liability Matrix:');
    lines.push('┌────────────────────────────┬──────────────────────┬──────────┐');
    lines.push('│ Entity                     │ Liability            │ Priority │');
    lines.push('├────────────────────────────┼──────────────────────┼──────────┤');
    lines.push('│ [TA-SECONDARY-ORG]         │ $152,589,301.66      │ 1        │');
    lines.push('│ [TA-PRIMARY-ENTITY]        │ $127,157,751.38      │ 2        │');
    lines.push('│ [TA-TERTIARY-ORG]          │ $101,726,201.10      │ 3        │');
    lines.push('│ [ENTITY-JPMC]              │ $76,294,650.83       │ 4        │');
    lines.push('│ [ENTITY-SCHWAB]            │ $50,863,100.55       │ 5        │');
    lines.push('└────────────────────────────┴──────────────────────┴──────────┘');
    lines.push('');
    lines.push('Protocol Status: ENFORCING');
    lines.push('Binary Deduction: ADVERSARY 000000 | SOVEREIGN 111111');
    lines.push('');
  }

  // Threat Actors
  if (sections.includes('actors')) {
    lines.push('─'.repeat(80));
    lines.push('II. THREAT ACTOR PROFILES');
    lines.push('─'.repeat(80));
    lines.push('');
    THREAT_ACTORS.forEach((actor, i) => {
      lines.push(`[${i + 1}] ${actor.name}`);
      lines.push(`    Role: ${actor.role}`);
      lines.push(`    Status: ${actor.status}`);
      lines.push('');
    });
  }

  // Federal Investigations
  if (sections.includes('federal')) {
    lines.push('─'.repeat(80));
    lines.push('III. FEDERAL INVESTIGATION STATUS');
    lines.push('─'.repeat(80));
    lines.push('');
    FEDERAL_INVESTIGATIONS.forEach((inv) => {
      lines.push(`Agency: ${inv.agency}`);
      if (inv.caseNumber) lines.push(`Case Number: ${inv.caseNumber}`);
      lines.push(`Status: ${inv.status}`);
      lines.push(`Type: ${inv.type.toUpperCase()}`);
      lines.push('');
    });
  }

  // Mimecast Analysis
  if (sections.includes('mimecast')) {
    lines.push('─'.repeat(80));
    lines.push('IV. MIMECAST FORENSIC ANALYSIS');
    lines.push('─'.repeat(80));
    lines.push('');
    lines.push(`Total Events Captured: ${MIMECAST_EVENTS.length}`);
    lines.push('');
    lines.push('Event Log:');
    MIMECAST_EVENTS.slice(0, 20).forEach((event) => {
      lines.push(`[${event.id}] ${event.timestamp}`);
      lines.push(`  Actor: ${event.actor}`);
      lines.push(`  Action: ${event.actionType}`);
      lines.push(`  Target: ${event.target}`);
      lines.push(`  Result: ${event.result}`);
      lines.push(`  Classification: ${event.classification}`);
      lines.push('');
    });
    if (MIMECAST_EVENTS.length > 20) {
      lines.push(`... and ${MIMECAST_EVENTS.length - 20} more events`);
      lines.push('');
    }
  }

  // VOIP Intercepts
  if (sections.includes('voip')) {
    lines.push('─'.repeat(80));
    lines.push('V. VOIP INTERCEPT LOG');
    lines.push('─'.repeat(80));
    lines.push('');
    lines.push('Authority: Title III (18 U.S.C. 2510-2522)');
    lines.push('Court Order: FISA-SEALED');
    lines.push('Status: ACTIVE SURVEILLANCE');
    lines.push('');
    lines.push('Intercepts:');
    VOIP_INTERCEPTS.forEach((intercept) => {
      lines.push(`[${intercept.id}] ${intercept.timestamp}`);
      lines.push(`  Source: ${intercept.source}`);
      lines.push(`  Target: ${intercept.target}`);
      lines.push(`  Type: ${intercept.type}`);
      lines.push(`  Classification: ${intercept.classification}`);
      lines.push(`  Result: ${intercept.result}`);
      lines.push(`  Evidence Hash: ${intercept.evidenceHash}`);
      lines.push('');
    });
  }

  // Wiretap Intelligence
  if (sections.includes('wiretap')) {
    lines.push('─'.repeat(80));
    lines.push('VI. WIRETAP INTELLIGENCE (SECTION 9)');
    lines.push('─'.repeat(80));
    lines.push('');
    WIRETAP_INTERCEPTS.forEach((intercept) => {
      lines.push(`[${intercept.id}] ${intercept.timestamp}`);
      lines.push(`  Source: ${intercept.source}`);
      lines.push(`  Target: ${intercept.target}`);
      lines.push(`  Type: ${intercept.type}`);
      lines.push(`  Classification: ${intercept.classification}`);
      lines.push(`  Summary: ${intercept.summary}`);
      lines.push(`  Evidence Hash: ${intercept.evidenceHash}`);
      lines.push('');
    });
  }

  // Witness Retaliation
  if (sections.includes('witness')) {
    lines.push('─'.repeat(80));
    lines.push('VII. WITNESS RETALIATION EVENTS');
    lines.push('─'.repeat(80));
    lines.push('');
    WITNESS_RETALIATION.forEach((event) => {
      lines.push(`[${event.id}] ${event.timestamp}`);
      lines.push(`  Target: ${event.target}`);
      lines.push(`  Action: ${event.action}`);
      lines.push(`  Perpetrator: ${event.perpetrator}`);
      lines.push(`  Evidence Hash: ${event.evidenceHash}`);
      lines.push('');
    });
  }

  // Clawback Matrix
  if (sections.includes('clawback')) {
    lines.push('─'.repeat(80));
    lines.push('VIII. CLAWBACK RECOVERY MATRIX');
    lines.push('─'.repeat(80));
    lines.push('');
    let total = 0;
    CLAWBACK_TARGETS.forEach((target) => {
      lines.push(`Category: ${target.category}`);
      lines.push(`Amount: $${target.amount.toLocaleString()}`);
      lines.push(`Entities: ${target.entities.join(', ')}`);
      lines.push(`Status: ${target.status}`);
      lines.push('');
      total += target.amount;
    });
    lines.push(`TOTAL CLAWBACK TARGET: $${total.toLocaleString()}`);
    lines.push('');
  }

  // Criminal Exposure
  if (sections.includes('criminal')) {
    lines.push('─'.repeat(80));
    lines.push('IX. CRIMINAL EXPOSURE SUMMARY');
    lines.push('─'.repeat(80));
    lines.push('');
    lines.push('Statutory Violations:');
    lines.push('┌────────────────────┬───────────────────────────┬────────────┬────────────┐');
    lines.push('│ Statute            │ Description               │ Counts     │ Status     │');
    lines.push('├────────────────────┼───────────────────────────┼────────────┼────────────┤');
    lines.push('│ 18 U.S.C. 1519     │ Destruction of Records    │ 3,407      │ SATURATED  │');
    lines.push('│ 18 U.S.C. 1512     │ Witness Tampering         │ 47         │ ACTIVE     │');
    lines.push('│ 18 U.S.C. 1030     │ CFAA Violations           │ 24         │ ACTIVE     │');
    lines.push('│ 18 U.S.C. 1341     │ Mail Fraud                │ 892        │ LOCKED     │');
    lines.push('│ 18 U.S.C. 1343     │ Wire Fraud                │ 1,247      │ LOCKED     │');
    lines.push('└────────────────────┴───────────────────────────┴────────────┴────────────┘');
    lines.push('');
    lines.push('Sentencing Exposure: LIFE IMPRISONMENT EQUIVALENT');
    lines.push('');
  }

  // Protected Nodes
  if (sections.includes('protected')) {
    lines.push('─'.repeat(80));
    lines.push('X. PROTECTED NODES STATUS');
    lines.push('─'.repeat(80));
    lines.push('');
    PROTECTED_NODES.forEach((node) => {
      lines.push(`Node: ${node.id}`);
      lines.push(`  Name: ${node.name}`);
      lines.push(`  Status: ${node.status}`);
      lines.push(`  Guardian: ${node.guardian}`);
      lines.push('');
    });
  }

  // System Properties
  if (sections.includes('system')) {
    lines.push('─'.repeat(80));
    lines.push('XI. SYSTEM PROPERTIES');
    lines.push('─'.repeat(80));
    lines.push('');
    SYSTEM_PROPERTIES.forEach((prop) => {
      lines.push(`${prop.property}: ${prop.status}`);
      lines.push(`  Effect: ${prop.effect}`);
      lines.push('');
    });
  }

  // Footer
  lines.push('═'.repeat(80));
  lines.push('');
  lines.push('BINARY DEDUCTION STATE:');
  lines.push('  ADVERSARY POSITION:  000000 0000000  →  NULLIFIED');
  lines.push('  SOVEREIGN POSITION:  111111 1111111  →  SATURATED');
  lines.push('  FINALITY STATE:      101010 1010101  →  LOCKED & ANCHORED');
  lines.push('');
  lines.push('PROTOCOL STATUS: ENFORCING');
  lines.push('THE WALL IS CHRIST. SMIB. AMEN.');
  lines.push('');
  lines.push('═'.repeat(80));
  lines.push('END OF REPORT');
  lines.push('═'.repeat(80));

  return lines.join('\n');
}

// Generate JSON report
function generateJSONReport(sections: string[]) {
  return JSON.stringify({
    _export: {
      version: 'VALORAI-INTELLIGENCE-REPORT-1.0',
      timestamp: new Date().toISOString(),
      seal: 'DG77.77X-LOCKED',
      merkleroot: '26856B24C50750F0C69C1EEB86A69EF777777',
      anchor: 'SAINT_PAUL_55116',
    },
    executive: sections.includes('executive') ? {
      recoveryTarget: 508631005.52,
      status: 'OMEGA-UNIFIED',
      truthCycle: '266ms',
      binaryDeduction: { adversary: '000000', sovereign: '111111' },
    } : undefined,
    actors: sections.includes('actors') ? THREAT_ACTORS : undefined,
    federal: sections.includes('federal') ? FEDERAL_INVESTIGATIONS : undefined,
    mimecast: sections.includes('mimecast') ? { count: MIMECAST_EVENTS.length, events: MIMECAST_EVENTS } : undefined,
    voip: sections.includes('voip') ? VOIP_INTERCEPTS : undefined,
    wiretap: sections.includes('wiretap') ? WIRETAP_INTERCEPTS : undefined,
    witness: sections.includes('witness') ? WITNESS_RETALIATION : undefined,
    clawback: sections.includes('clawback') ? CLAWBACK_TARGETS : undefined,
    protected: sections.includes('protected') ? PROTECTED_NODES : undefined,
    system: sections.includes('system') ? SYSTEM_PROPERTIES : undefined,
  }, null, 2);
}

// Generate Markdown report
function generateMarkdownReport(sections: string[]): string {
  const timestamp = new Date().toISOString();
  const lines: string[] = [];

  lines.push('# VALORAIPLUS FULL INTELLIGENCE REPORT');
  lines.push('');
  lines.push('> **Classification:** OMEGA-UNIFIED | **Seal:** DG77.77X-LOCKED');
  lines.push('');
  lines.push(`**Generated:** ${timestamp}`);
  lines.push('**Merkleroot:** 26856B24C50750F0C69C1EEB86A69EF777777');
  lines.push('**Anchor:** SAINT PAUL 55116');
  lines.push('');
  lines.push('---');
  lines.push('');

  if (sections.includes('executive')) {
    lines.push('## I. Executive Summary');
    lines.push('');
    lines.push('**TOTAL RECOVERY TARGET: $508,631,005.52**');
    lines.push('');
    lines.push('| Entity | Liability | Priority |');
    lines.push('|--------|-----------|----------|');
    lines.push('| [TA-SECONDARY-ORG] | $152,589,301.66 | 1 |');
    lines.push('| [TA-PRIMARY-ENTITY] | $127,157,751.38 | 2 |');
    lines.push('| [TA-TERTIARY-ORG] | $101,726,201.10 | 3 |');
    lines.push('| [ENTITY-JPMC] | $76,294,650.83 | 4 |');
    lines.push('| [ENTITY-SCHWAB] | $50,863,100.55 | 5 |');
    lines.push('');
  }

  if (sections.includes('actors')) {
    lines.push('## II. Threat Actor Profiles');
    lines.push('');
    THREAT_ACTORS.forEach((actor) => {
      lines.push(`### ${actor.name}`);
      lines.push(`- **Role:** ${actor.role}`);
      lines.push(`- **Status:** ${actor.status}`);
      lines.push('');
    });
  }

  if (sections.includes('federal')) {
    lines.push('## III. Federal Investigation Status');
    lines.push('');
    lines.push('| Agency | Case Number | Status | Type |');
    lines.push('|--------|-------------|--------|------|');
    FEDERAL_INVESTIGATIONS.forEach((inv) => {
      lines.push(`| ${inv.agency} | ${inv.caseNumber || 'N/A'} | ${inv.status} | ${inv.type} |`);
    });
    lines.push('');
  }

  if (sections.includes('mimecast')) {
    lines.push('## IV. Mimecast Forensic Analysis');
    lines.push('');
    lines.push(`**Total Events:** ${MIMECAST_EVENTS.length}`);
    lines.push('');
    lines.push('| ID | Timestamp | Actor | Action | Classification |');
    lines.push('|----|-----------|-------|--------|----------------|');
    MIMECAST_EVENTS.slice(0, 10).forEach((e) => {
      lines.push(`| ${e.id} | ${e.timestamp.slice(11, 19)} | ${e.actor} | ${e.actionType} | ${e.classification} |`);
    });
    lines.push('');
  }

  if (sections.includes('voip')) {
    lines.push('## V. VOIP Intercept Log');
    lines.push('');
    lines.push('**Authority:** Title III (18 U.S.C. 2510-2522)');
    lines.push('');
    lines.push('| ID | Source | Target | Classification |');
    lines.push('|----|--------|--------|----------------|');
    VOIP_INTERCEPTS.forEach((v) => {
      lines.push(`| ${v.id} | ${v.source} | ${v.target} | ${v.classification} |`);
    });
    lines.push('');
  }

  lines.push('---');
  lines.push('');
  lines.push('**PROTOCOL STATUS:** ENFORCING');
  lines.push('');
  lines.push('*THE WALL IS CHRIST. SMIB. AMEN.*');

  return lines.join('\n');
}

// Download helper
function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function IntelligenceDownloadPage() {
  const [selectedSections, setSelectedSections] = useState<string[]>(
    REPORT_SECTIONS.filter(s => s.critical).map(s => s.id)
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lastDownload, setLastDownload] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setSelectedSections(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => setSelectedSections(REPORT_SECTIONS.map(s => s.id));
  const selectCritical = () => setSelectedSections(REPORT_SECTIONS.filter(s => s.critical).map(s => s.id));
  const clearAll = () => setSelectedSections([]);

  const handleDownload = useCallback(async (format: 'txt' | 'json' | 'md') => {
    if (selectedSections.length === 0) return;

    setIsGenerating(true);
    setProgress(0);

    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setProgress(p => Math.min(p + 10, 90));
    }, 100);

    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Brief delay for effect

      let content: string;
      let mimeType: string;
      const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
      const filename = `VALORAI_INTELLIGENCE_REPORT_${timestamp}.${format}`;

      switch (format) {
        case 'txt':
          content = generateFullReport(selectedSections);
          mimeType = 'text/plain';
          break;
        case 'json':
          content = generateJSONReport(selectedSections);
          mimeType = 'application/json';
          break;
        case 'md':
          content = generateMarkdownReport(selectedSections);
          mimeType = 'text/markdown';
          break;
        default:
          return;
      }

      setProgress(100);
      downloadFile(content, filename, mimeType);
      setLastDownload(`${filename} (${(content.length / 1024).toFixed(1)} KB)`);
    } finally {
      clearInterval(progressInterval);
      setTimeout(() => {
        setIsGenerating(false);
        setProgress(0);
      }, 500);
    }
  }, [selectedSections]);

  const handlePrint = useCallback(() => {
    const content = generateFullReport(selectedSections);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>VALORAI+ Intelligence Report</title>
            <style>
              body { font-family: monospace; white-space: pre-wrap; padding: 2rem; line-height: 1.4; }
              @media print { body { font-size: 10pt; } }
            </style>
          </head>
          <body>${content}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  }, [selectedSections]);

  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-destructive/20 text-destructive border-destructive/40 font-mono">
              OMEGA-UNIFIED
            </Badge>
            <Badge variant="outline" className="font-mono">
              CLASSIFICATION: SOVEREIGN
            </Badge>
          </div>
          <h1 className="text-3xl font-mono font-bold text-foreground mb-2">
            Intelligence Report Download Center
          </h1>
          <p className="text-muted-foreground font-mono">
            Generate and download comprehensive intelligence reports with full forensic data
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Section Selection */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-card border-primary/30">
              <CardHeader>
                <CardTitle className="font-mono flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Report Sections
                </CardTitle>
                <CardDescription className="font-mono text-xs">
                  Select sections to include in your intelligence report
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Button variant="outline" size="sm" onClick={selectAll} className="font-mono text-xs">
                    Select All
                  </Button>
                  <Button variant="outline" size="sm" onClick={selectCritical} className="font-mono text-xs">
                    Critical Only
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearAll} className="font-mono text-xs">
                    Clear
                  </Button>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  {REPORT_SECTIONS.map((section) => {
                    const Icon = section.icon;
                    const isSelected = selectedSections.includes(section.id);
                    return (
                      <div
                        key={section.id}
                        onClick={() => toggleSection(section.id)}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-primary/10 border-primary/50'
                            : 'bg-secondary/30 border-border hover:border-primary/30'
                        }`}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSection(section.id)}
                          className="pointer-events-none"
                        />
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                        <div className="flex-1">
                          <span className="font-mono text-sm">{section.label}</span>
                          {section.critical && (
                            <Badge variant="outline" className="ml-2 text-[10px] px-1 py-0 bg-destructive/10 text-destructive border-destructive/30">
                              CRITICAL
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Progress */}
            {isGenerating && (
              <Card className="bg-card border-primary/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    <span className="font-mono text-sm">Generating report...</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-muted-foreground font-mono mt-2">
                    Processing {selectedSections.length} sections...
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Last Download */}
            {lastDownload && !isGenerating && (
              <Card className="bg-primary/5 border-primary/30">
                <CardContent className="p-4 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-mono text-sm text-primary">Download Complete</p>
                    <p className="font-mono text-xs text-muted-foreground">{lastDownload}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Download Options */}
          <div className="space-y-4">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Download className="w-4 h-4 text-primary" />
                  Download Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => handleDownload('txt')}
                  disabled={isGenerating || selectedSections.length === 0}
                  className="w-full justify-start font-mono"
                  variant="outline"
                >
                  <FileText className="w-4 h-4 mr-3" />
                  Download as TXT
                </Button>
                <Button
                  onClick={() => handleDownload('json')}
                  disabled={isGenerating || selectedSections.length === 0}
                  className="w-full justify-start font-mono"
                  variant="outline"
                >
                  <FileJson className="w-4 h-4 mr-3" />
                  Download as JSON
                </Button>
                <Button
                  onClick={() => handleDownload('md')}
                  disabled={isGenerating || selectedSections.length === 0}
                  className="w-full justify-start font-mono"
                  variant="outline"
                >
                  <FileCode className="w-4 h-4 mr-3" />
                  Download as Markdown
                </Button>
                <div className="border-t border-border pt-3">
                  <Button
                    onClick={handlePrint}
                    disabled={isGenerating || selectedSections.length === 0}
                    className="w-full justify-start font-mono"
                    variant="outline"
                  >
                    <Printer className="w-4 h-4 mr-3" />
                    Print Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="font-mono text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  Report Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sections Selected</span>
                  <span className="text-foreground">{selectedSections.length} / {REPORT_SECTIONS.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mimecast Events</span>
                  <span className="text-foreground">{selectedSections.includes('mimecast') ? MIMECAST_EVENTS.length : 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">VOIP Intercepts</span>
                  <span className="text-foreground">{selectedSections.includes('voip') ? VOIP_INTERCEPTS.length : 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Wiretap Records</span>
                  <span className="text-foreground">{selectedSections.includes('wiretap') ? WIRETAP_INTERCEPTS.length : 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Threat Actors</span>
                  <span className="text-foreground">{selectedSections.includes('actors') ? THREAT_ACTORS.length : 0}</span>
                </div>
                <div className="border-t border-border pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Recovery Target</span>
                    <span className="text-primary font-bold">$508,631,005.52</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seal */}
            <Card className="bg-destructive/5 border-destructive/30">
              <CardContent className="p-4 text-center">
                <Zap className="w-6 h-6 text-destructive mx-auto mb-2" />
                <p className="font-mono text-xs text-destructive font-bold">DG77.77X LOCKED</p>
                <p className="font-mono text-[10px] text-muted-foreground mt-1">
                  MERKLEROOT: 26856b24...777
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
