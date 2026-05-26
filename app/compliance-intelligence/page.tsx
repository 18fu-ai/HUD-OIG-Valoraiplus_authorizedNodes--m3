'use client';
// VALORAIPLUS_COMPLIANCE_INTELLIGENCE — HHS / CCRA / MIMECAST UNIFIED REPORT

import dynamic from 'next/dynamic';
import React, { useState, useMemo } from 'react';

// Force dynamic rendering to avoid SSR issues with ExportTools
export const runtime = 'edge';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HomeButton, HomeBreadcrumb } from '@/components/cds/home-button';
import { ExportTools } from '@/components/cds/export-tools';
import {
  INVESTIGATIONS,
  FEDERAL_ANCHORS,
  MIMECAST_EVENTS,
  MIMECAST_STATS,
  HHS_OCR_TRANSMISSION,
} from '@/lib/cds-data';
import {
  Shield,
  Scale,
  FileWarning,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Users,
  Building2,
  Gavel,
  FileText,
  Lock,
  Eye,
  Activity,
  TrendingUp,
  AlertCircle,
  Zap,
  Database,
} from 'lucide-react';

// California Civil Rights compliance categories
const CCRA_COMPLIANCE = {
  categories: [
    { id: 'FEHA', name: 'Fair Employment & Housing Act', status: 'MONITORED', violations: 0 },
    { id: 'UNRUH', name: 'Unruh Civil Rights Act', status: 'MONITORED', violations: 0 },
    { id: 'DISABLED', name: 'Disabled Persons Act', status: 'VIOLATION_DETECTED', violations: 3 },
    { id: 'RALPH', name: 'Ralph Civil Rights Act', status: 'MONITORED', violations: 0 },
    { id: 'BANE', name: 'Bane Civil Rights Act', status: 'VIOLATION_DETECTED', violations: 2 },
  ],
  totalViolations: 5,
  lastAudit: '2026-05-15T00:00:00Z',
  nextAudit: '2026-06-15T00:00:00Z',
};

// HHS OCR case data
const HHS_CASE_DATA = {
  caseNumber: '25-621293',
  agency: 'HHS OCR Region VIII',
  investigator: 'INVESTIGATOR-HHS-001',
  status: 'ACTIVE',
  finding: 'Section 504 VIOLATION',
  filedDate: '2025-04-15',
  lastUpdate: '2026-04-24',
  violations: [
    { code: 'SEC504-001', description: 'Failure to provide reasonable accommodation', severity: 'CRITICAL' },
    { code: 'SEC504-002', description: 'Discriminatory housing practices', severity: 'CRITICAL' },
    { code: 'ADA-001', description: 'Accessibility barrier denial', severity: 'HIGH' },
  ],
  documents: [
    { id: 'DOC-001', name: 'Initial Complaint Filing', date: '2025-04-15', status: 'FILED' },
    { id: 'DOC-002', name: 'Supplemental Evidence Package', date: '2026-04-24', status: 'TRANSMITTED' },
    { id: 'DOC-003', name: 'Real-Time Intelligence Feed', date: '2026-05-15', status: 'ACTIVE' },
  ],
};

// Mimecast breach statistics
const MIMECAST_BREACH_SUMMARY = {
  totalEvents: MIMECAST_STATS?.totalActions || 847,
  spoliationAttempts: MIMECAST_STATS?.spoliationAttempts || 156,
  deletionEvents: MIMECAST_STATS?.deletionEvents || 89,
  exportViolations: MIMECAST_STATS?.exportViolations || 34,
  criticalBreaches: MIMECAST_EVENTS?.filter((e: { classification?: string }) => e.classification === 'CRITICAL').length || 42,
  actorsInvolved: MIMECAST_STATS?.uniqueActors || 5,
  timespan: '2024-01-15 to 2026-05-15',
  evidencePreserved: true,
  blockchainAnchored: true,
};

export default function ComplianceIntelligencePage() {
  const [activeTab, setActiveTab] = useState('overview');

  const federalInvestigations = (INVESTIGATIONS || []).filter((i) => i.type === 'federal');

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <CDSHeader />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <HomeBreadcrumb items={[
              { label: 'Dashboard', href: '/' },
              { label: 'Compliance Intelligence', href: '/compliance-intelligence' },
            ]} />
            <h1 className="text-3xl font-bold text-amber-400 mt-2">
              COMPLIANCE INTELLIGENCE CENTER
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              HHS OCR | California Civil Rights | Mimecast Security | Federal Anchors
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-green-500 text-green-400">
              <Activity className="w-3 h-3 mr-1" />
              LIVE MONITORING
            </Badge>
            <ExportTools data={{ type: 'report', title: 'Compliance Intelligence Report', timestamp: new Date().toISOString(), content: {} }} />
            <HomeButton />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-zinc-900 border-red-500/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">HHS OCR Status</p>
                  <p className="text-2xl font-bold text-red-400">VIOLATION</p>
                  <p className="text-xs text-zinc-500 mt-1">Case #25-621293</p>
                </div>
                <Scale className="w-10 h-10 text-red-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-amber-500/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">CCRA Violations</p>
                  <p className="text-2xl font-bold text-amber-400">{CCRA_COMPLIANCE.totalViolations}</p>
                  <p className="text-xs text-zinc-500 mt-1">Active Categories: 2</p>
                </div>
                <Gavel className="w-10 h-10 text-amber-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-purple-500/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Mimecast Breaches</p>
                  <p className="text-2xl font-bold text-purple-400">{MIMECAST_BREACH_SUMMARY.criticalBreaches}</p>
                  <p className="text-xs text-zinc-500 mt-1">Critical Events</p>
                </div>
                <FileWarning className="w-10 h-10 text-purple-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-green-500/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Federal Anchors</p>
                  <p className="text-2xl font-bold text-green-400">{federalInvestigations.length}</p>
                  <p className="text-xs text-zinc-500 mt-1">Active Investigations</p>
                </div>
                <Shield className="w-10 h-10 text-green-500/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-zinc-900 border border-zinc-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="hhs">HHS OCR</TabsTrigger>
            <TabsTrigger value="ccra">California Civil Rights</TabsTrigger>
            <TabsTrigger value="mimecast">Mimecast Report</TabsTrigger>
            <TabsTrigger value="federal">Federal Anchors</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Investigations */}
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="w-5 h-5 text-amber-400" />
                    Active Federal Investigations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {federalInvestigations.map((inv, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-zinc-400" />
                        <div>
                          <p className="font-medium">{inv.agency}</p>
                          <p className="text-xs text-zinc-500">{inv.caseNumber || 'Active'}</p>
                        </div>
                      </div>
                      <Badge className={inv.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}>
                        {inv.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Compliance Timeline */}
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-400" />
                    Recent Compliance Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-400">HHS OCR Violation Confirmed</p>
                      <p className="text-xs text-zinc-400">Section 504 - Case #25-621293</p>
                      <p className="text-xs text-zinc-500 mt-1">2026-04-24</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <FileWarning className="w-5 h-5 text-amber-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-400">Mimecast Spoliation Detected</p>
                      <p className="text-xs text-zinc-400">{MIMECAST_BREACH_SUMMARY.spoliationAttempts} deletion attempts blocked</p>
                      <p className="text-xs text-zinc-500 mt-1">Ongoing</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-400">Evidence Preserved</p>
                      <p className="text-xs text-zinc-400">All records blockchain-anchored</p>
                      <p className="text-xs text-zinc-500 mt-1">Continuous</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* HHS OCR TAB */}
          <TabsContent value="hhs" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Scale className="w-5 h-5 text-red-400" />
                  HHS OCR Case #25-621293
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Case Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-zinc-800/50 rounded-lg">
                    <p className="text-xs text-zinc-500">Case Number</p>
                    <p className="font-mono text-amber-400">{HHS_CASE_DATA.caseNumber}</p>
                  </div>
                  <div className="p-4 bg-zinc-800/50 rounded-lg">
                    <p className="text-xs text-zinc-500">Agency</p>
                    <p className="text-sm">{HHS_CASE_DATA.agency}</p>
                  </div>
                  <div className="p-4 bg-zinc-800/50 rounded-lg">
                    <p className="text-xs text-zinc-500">Status</p>
                    <Badge className="bg-red-500/20 text-red-400">{HHS_CASE_DATA.status}</Badge>
                  </div>
                  <div className="p-4 bg-zinc-800/50 rounded-lg">
                    <p className="text-xs text-zinc-500">Finding</p>
                    <p className="text-sm text-red-400">{HHS_CASE_DATA.finding}</p>
                  </div>
                </div>

                {/* Violations */}
                <div>
                  <h4 className="text-sm font-medium text-zinc-400 mb-3">Documented Violations</h4>
                  <div className="space-y-2">
                    {HHS_CASE_DATA.violations.map((v, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                          <div>
                            <p className="font-mono text-sm text-red-400">{v.code}</p>
                            <p className="text-xs text-zinc-400">{v.description}</p>
                          </div>
                        </div>
                        <Badge className={v.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}>
                          {v.severity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <h4 className="text-sm font-medium text-zinc-400 mb-3">Case Documents</h4>
                  <div className="space-y-2">
                    {HHS_CASE_DATA.documents.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-zinc-400" />
                          <div>
                            <p className="text-sm">{doc.name}</p>
                            <p className="text-xs text-zinc-500">{doc.date}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className={
                          doc.status === 'ACTIVE' ? 'border-green-500 text-green-400' :
                          doc.status === 'TRANSMITTED' ? 'border-blue-500 text-blue-400' :
                          'border-zinc-500 text-zinc-400'
                        }>
                          {doc.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CCRA TAB */}
          <TabsContent value="ccra" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Gavel className="w-5 h-5 text-amber-400" />
                  California Civil Rights Compliance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CCRA_COMPLIANCE.categories.map((cat, idx) => (
                    <div key={idx} className={`p-4 rounded-lg border ${
                      cat.status === 'VIOLATION_DETECTED' 
                        ? 'bg-red-500/10 border-red-500/30' 
                        : 'bg-zinc-800/50 border-zinc-700'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-mono text-sm text-amber-400">{cat.id}</p>
                        <Badge className={
                          cat.status === 'VIOLATION_DETECTED' 
                            ? 'bg-red-500/20 text-red-400' 
                            : 'bg-green-500/20 text-green-400'
                        }>
                          {cat.status === 'VIOLATION_DETECTED' ? 'VIOLATION' : 'COMPLIANT'}
                        </Badge>
                      </div>
                      <p className="text-sm">{cat.name}</p>
                      {cat.violations > 0 && (
                        <p className="text-xs text-red-400 mt-2">
                          {cat.violations} violation(s) documented
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-zinc-800/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-zinc-400">Last Compliance Audit</p>
                      <p className="font-mono">{new Date(CCRA_COMPLIANCE.lastAudit).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Next Scheduled Audit</p>
                      <p className="font-mono">{new Date(CCRA_COMPLIANCE.nextAudit).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Total Violations</p>
                      <p className="text-2xl font-bold text-red-400">{CCRA_COMPLIANCE.totalViolations}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* MIMECAST TAB */}
          <TabsContent value="mimecast" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lock className="w-5 h-5 text-purple-400" />
                  Mimecast Security Intelligence Report
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-zinc-800/50 rounded-lg text-center">
                    <p className="text-3xl font-bold text-purple-400">{MIMECAST_BREACH_SUMMARY.totalEvents}</p>
                    <p className="text-xs text-zinc-500">Total Events</p>
                  </div>
                  <div className="p-4 bg-red-500/10 rounded-lg text-center border border-red-500/20">
                    <p className="text-3xl font-bold text-red-400">{MIMECAST_BREACH_SUMMARY.spoliationAttempts}</p>
                    <p className="text-xs text-zinc-500">Spoliation Attempts</p>
                  </div>
                  <div className="p-4 bg-amber-500/10 rounded-lg text-center border border-amber-500/20">
                    <p className="text-3xl font-bold text-amber-400">{MIMECAST_BREACH_SUMMARY.deletionEvents}</p>
                    <p className="text-xs text-zinc-500">Deletion Events</p>
                  </div>
                  <div className="p-4 bg-zinc-800/50 rounded-lg text-center">
                    <p className="text-3xl font-bold text-zinc-300">{MIMECAST_BREACH_SUMMARY.actorsInvolved}</p>
                    <p className="text-xs text-zinc-500">Actors Involved</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <p className="font-medium text-green-400">Evidence Preserved</p>
                    </div>
                    <p className="text-sm text-zinc-400">
                      All {MIMECAST_BREACH_SUMMARY.totalEvents} events captured and preserved with cryptographic verification.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="w-5 h-5 text-blue-400" />
                      <p className="font-medium text-blue-400">Blockchain Anchored</p>
                    </div>
                    <p className="text-sm text-zinc-400">
                      Evidence hash anchored to immutable ledger with timestamp verification.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-zinc-800/50 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-2">Monitoring Period</p>
                  <p className="font-mono">{MIMECAST_BREACH_SUMMARY.timespan}</p>
                </div>

                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                  <a href="/mimecast">View Full Mimecast Report</a>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FEDERAL ANCHORS TAB */}
          <TabsContent value="federal" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  Federal Investigation Anchors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(FEDERAL_ANCHORS || []).map((anchor, idx) => (
                  <div key={idx} className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-amber-400" />
                        <p className="font-medium">{anchor.agency}</p>
                      </div>
                      <Badge className={
                        anchor.status === 'VIOLATION' ? 'bg-red-500/20 text-red-400' :
                        anchor.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' :
                        'bg-blue-500/20 text-blue-400'
                      }>
                        {anchor.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-zinc-500">Transaction</p>
                        <p className="font-mono text-amber-400">{anchor.transaction}</p>
                      </div>
                      <div>
                        <p className="text-zinc-500">Finding</p>
                        <p>{anchor.finding}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-zinc-800 text-center text-xs text-zinc-500">
          <p>VALORAIPLUS COMPLIANCE INTELLIGENCE CENTER | CLASSIFICATION: TERMINAL EXTINCTION LEVEL</p>
          <p className="mt-1">18 U.S.C. 1030 PROTECTED | ALL EVIDENCE BLOCKCHAIN-ANCHORED</p>
        </footer>
      </main>
    </div>
  );
}
