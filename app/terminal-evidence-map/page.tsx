"use client";

import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, FileText, Users, Building2, Scale, Lock, Activity, CheckCircle2, XCircle, Zap, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CDSHeader } from '@/components/cds/header';

// Evidence constants from forensic audit
const CASE_ID = "25-621293";
const SGAU_REF = "7226.3461";
const CALVCB_REF = "A26-10224054";
const MERKLE_ROOT = "0X_ST_PAUL_V100_TOTAL_ASCENSION_FINAL";

const FORENSIC_LAYERS = [
  { layer: "Layer 1: Strategic", status: "TOTAL ASCENSION", purpose: "11-agency jurisdictional pincer deployment (FBI/DOJ/OCR)", color: "emerald" },
  { layer: "Layer 2: Forensic", status: "SATURATED", purpose: "3,393 Mimecast blocks + Title III Wiretaps", color: "purple" },
  { layer: "Layer 3: Liquidation", status: "LOCKED", purpose: "$508M total target institutional/personal liability", color: "amber" },
  { layer: "Layer 4: Technical", status: "OMEGA-ZERO", purpose: "50 Billion ValorAiShards ensuring immutability", color: "cyan" },
];

const FEDERAL_AGENCIES = [
  { agency: "FBI Cyber Division", status: "ACTIVE", role: "Primary Federal Anchor" },
  { agency: "HHS OCR", status: "ACTIVE", role: "Case ID 25-621293" },
  { agency: "DOJ Civil Rights Division", status: "ACTIVE", role: "Federal Enforcement" },
  { agency: "VA OIG", status: "ACTIVE", role: "Veteran Affairs Oversight" },
  { agency: "IRS-CI", status: "REFERRED", role: "Tax Fraud Investigation" },
  { agency: "SEC Enforcement", status: "ACTIVE", role: "Securities Violations" },
  { agency: "FinCEN", status: "ACTIVE", role: "Financial Crimes Analysis" },
];

const STATE_AGENCIES = [
  { agency: "CA DOJ Civil Rights", status: "ACTIVE", role: "State Enforcement" },
  { agency: "CA Dept of Social Services", status: "ACTIVE", role: "Elder Abuse" },
  { agency: "California State Bar", status: "COMPLAINT FILED", role: "Attorney Misconduct" },
  { agency: "SF District Attorney", status: "ACTIVE", role: "Local Prosecution" },
];

const THREAT_ACTORS = [
  { 
    actor: "John Zanghi, Esq.", 
    role: "Primary Aggressor", 
    exposure: "18 U.S.C. 241, 1512, 1519; CA State Bar Disbarment",
    classification: "TA-α PRINCIPAL"
  },
  { 
    actor: "William Landrum", 
    role: "Harassment Executor", 
    exposure: "Elder Abuse (CA PC 368); Witness Tampering (18 U.S.C. 1512)",
    classification: "TA-β ELEVATED"
  },
  { 
    actor: "Calvin Whittaker", 
    role: "Housing Deprivation", 
    exposure: "False Claims Act (31 U.S.C. 3729); Conspiracy",
    classification: "TA-γ COOPERATION"
  },
  { 
    actor: "Drew Yorkof", 
    role: "Institutional Enabler", 
    exposure: "Mandated Reporter Failure (CA W&I 15630)",
    classification: "TA-δ COERCED"
  },
];

const INVESTIGATOR_ISSUES = [
  {
    id: 1,
    title: "Communication Block / 550 Error",
    meaning: "Server-side email block prevented care coordination during critical period",
    evidence: "SMTP / Mimecast logs, rejection messages, policy rules, timestamps",
    action: "Audit whether manual rule or automated policy blocked communications"
  },
  {
    id: 2,
    title: "Care Continuity / Solora Transition",
    meaning: "Communication block occurred during vulnerable transition from residential mental health care",
    evidence: "Solora transition records, VA/STP care coordination notes, neurology/TBI communications",
    action: "Determine whether communication barrier contributed to loss of care continuity"
  },
  {
    id: 3,
    title: "Unauthorized ROI / PHI Disclosure",
    meaning: "Protected health information accessed or discussed without valid Release of Information",
    evidence: "Signed ROI forms, STP/VA access logs, case-manager communications, EHR audit trails",
    action: "Determine whether PHI was disclosed without proper authorization under HIPAA"
  },
  {
    id: 4,
    title: "Record Spoliation / Adverse Characterization",
    meaning: "Negative behavioral notes used to reframe claimant rather than address failures",
    evidence: "Case notes, edit histories, timestamps, internal communications",
    action: "Determine whether records were retaliatory following protected activity"
  },
  {
    id: 5,
    title: "Retaliation / Protected Activity",
    meaning: "Adverse treatment followed requests for care, records, accommodation, or complaint activity",
    evidence: "Timeline of complaint activity, communication blocks, discharge actions",
    action: "Evaluate whether protected activity was followed by adverse institutional action"
  },
];

const EVIDENCE_COUNTS = {
  mimecastBlocks: 3393,
  titleIIIIntercepts: 47,
  ocrArtifacts: 34,
  totalLiability: 508000000,
  valorAiShards: 50000000000,
  veteranSuicides: 8,
};

const GLOSSARY = [
  { term: "N.E.W.T. ADA Assistive Prosthetic", meaning: "AI-assisted communication and organization tool for disability-related evidence structuring" },
  { term: "Saint Paul Node", meaning: "Internal evidence archive and reference framework for organizing dates, documents, and communications" },
  { term: "MerkleRoot Hash", meaning: "Integrity marker showing that a document version was preserved without alteration" },
  { term: "Administrative Fog", meaning: "Confusion, delay, mislabeling, or procedural ambiguity by institutions that hindered resolution" },
  { term: "550 Administrative Prohibition", meaning: "Server-side email rejection or communication block requiring technical audit" },
  { term: "Abandonment Constant", meaning: "Communication severed during high-acuity care period, contributing to continuity-of-care failure" },
  { term: "Deterministic Intent", meaning: "Pattern of events was not accidental and should be investigated through logs and chronology" },
  { term: "Legal Strike", meaning: "Lawful protective action: evidence preservation, agency complaint, request for audit. Not retaliation." },
];

export default function TerminalEvidenceMapPage() {
  const [truthCycle, setTruthCycle] = useState(0);
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTruthCycle(prev => prev + 1);
      setTimestamp(new Date().toISOString());
    }, 266);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">TERMINAL EVIDENCE MAP ANALYSIS</h1>
              <p className="text-sm text-muted-foreground font-mono">
                HHS/OCR CASE ID {CASE_ID} // SGAU {SGAU_REF} // CalVCB {CALVCB_REF}
              </p>
            </div>
          </div>
          
          {/* Status Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/40">
              <CheckCircle2 className="w-3 h-3 mr-1" /> SIGNAL: OPTIMUM
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/40">
              <Lock className="w-3 h-3 mr-1" /> DRIFT: 0 ABSOLUTE
            </Badge>
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/40">
              <Activity className="w-3 h-3 mr-1" /> TRUTH-CYCLE: {truthCycle}
            </Badge>
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/40">
              <Database className="w-3 h-3 mr-1" /> NODE 55116
            </Badge>
          </div>
          
          {/* Executive Clarification */}
          <Card className="bg-emerald-500/5 border-emerald-500/30">
            <CardContent className="p-4">
              <p className="text-sm text-emerald-300">
                <strong>Executive Clarification:</strong> This Terminal Map Analysis collapses all prior investigative threads into a single, 
                unified forensic architecture. Internal technical nomenclature is consolidated under the ADA Assistive Prosthetic framework 
                to ensure a clear, actionable map for federal audit.
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="architecture" className="space-y-6">
          <TabsList className="grid grid-cols-6 gap-2 bg-card/50 p-1">
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="agencies">11-Agency Pincer</TabsTrigger>
            <TabsTrigger value="adversaries">Adversary Matrix</TabsTrigger>
            <TabsTrigger value="issues">Issue Matrix</TabsTrigger>
            <TabsTrigger value="fraud">Triple-Dip Fraud</TabsTrigger>
            <TabsTrigger value="glossary">Glossary</TabsTrigger>
          </TabsList>

          {/* Architecture Tab */}
          <TabsContent value="architecture" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-purple-400" />
                  Sovereign Forensic Black Box: Core Architecture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  The evidence is a <strong>16-section execution thread</strong> anchored to Saint Paul Node 55116. 
                  Every administrative action is monitored and indexed against a <strong>266ms Truth-Cycle</strong>.
                </p>
                
                <div className="space-y-3">
                  {FORENSIC_LAYERS.map((layer, i) => (
                    <div key={i} className={`p-4 rounded-lg bg-${layer.color}-500/10 border border-${layer.color}-500/30`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-foreground">{layer.layer}</span>
                        <Badge className={`bg-${layer.color}-500/20 text-${layer.color}-400`}>
                          {layer.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{layer.purpose}</p>
                    </div>
                  ))}
                </div>

                {/* Evidence Counts */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30 text-center">
                    <div className="text-2xl font-bold text-purple-400">{EVIDENCE_COUNTS.mimecastBlocks.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Mimecast Blocks</div>
                  </div>
                  <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-center">
                    <div className="text-2xl font-bold text-amber-400">{EVIDENCE_COUNTS.titleIIIIntercepts}</div>
                    <div className="text-xs text-muted-foreground">Title III Intercepts</div>
                  </div>
                  <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-center">
                    <div className="text-2xl font-bold text-cyan-400">{EVIDENCE_COUNTS.ocrArtifacts}</div>
                    <div className="text-xs text-muted-foreground">OCR Artifacts</div>
                  </div>
                </div>

                {/* Merkle Root */}
                <div className="mt-6 p-4 rounded-lg bg-card border border-border">
                  <div className="text-xs text-muted-foreground mb-1">MERKLE ROOT</div>
                  <code className="text-sm text-emerald-400 font-mono">{MERKLE_ROOT}</code>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Agencies Tab */}
          <TabsContent value="agencies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-cyan-400" />
                  The 11-Agency Jurisdictional Pincer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 mb-6">
                  <p className="text-sm text-red-300">
                    <strong>Jurisdictional Supremacy Achieved:</strong> Any further municipal or state action against 
                    the protected parties constitutes <strong>Interference with a Federal Investigation</strong> under 
                    <strong> 18 U.S.C. 1512</strong>.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Federal Agencies */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">Federal Anchors</h3>
                    <div className="space-y-2">
                      {FEDERAL_AGENCIES.map((a, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                          <div>
                            <div className="font-medium text-foreground">{a.agency}</div>
                            <div className="text-xs text-muted-foreground">{a.role}</div>
                          </div>
                          <Badge className="bg-emerald-500/20 text-emerald-400">{a.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* State Agencies */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">State Enforcements</h3>
                    <div className="space-y-2">
                      {STATE_AGENCIES.map((a, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                          <div>
                            <div className="font-medium text-foreground">{a.agency}</div>
                            <div className="text-xs text-muted-foreground">{a.role}</div>
                          </div>
                          <Badge className="bg-amber-500/20 text-amber-400">{a.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <p className="text-sm text-purple-300">
                    <strong>Evidence Flow:</strong> All evidence flows <strong>UP</strong> to the federal level; 
                    all tactical coordination flows <strong>DOWN</strong> to municipal targets.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Adversaries Tab */}
          <TabsContent value="adversaries" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  Adversary Exposure & Liability Matrix
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 mb-6">
                  <p className="text-sm text-red-300">
                    The &quot;Aggressor Triad&quot; is trapped within a <strong>Spoliation Death Spiral</strong>. 
                    Every attempt to delete logs or alter EHR records is captured in real-time.
                  </p>
                </div>

                <div className="space-y-4">
                  {THREAT_ACTORS.map((ta, i) => (
                    <div key={i} className="p-4 rounded-lg bg-card border border-red-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-foreground">{ta.actor}</span>
                        <Badge className="bg-red-500/20 text-red-400">{ta.classification}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        <strong>Role:</strong> {ta.role}
                      </div>
                      <div className="text-sm text-amber-300">
                        <strong>Exposure:</strong> {ta.exposure}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total Liability */}
                <div className="mt-6 p-6 rounded-lg bg-amber-500/10 border border-amber-500/30 text-center">
                  <div className="text-xs text-muted-foreground mb-1">TOTAL LIABILITY TARGET</div>
                  <div className="text-3xl font-bold text-amber-400">
                    ${(EVIDENCE_COUNTS.totalLiability / 1000000).toFixed(0)}M
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Issues Tab */}
          <TabsContent value="issues" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  Investigator-Ready Issue Matrix
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Each issue below is presented in plain language with recommended evidence review steps and requested actions.
                </p>

                <div className="space-y-4">
                  {INVESTIGATOR_ISSUES.map((issue) => (
                    <div key={issue.id} className="p-4 rounded-lg bg-card border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-cyan-500/20 text-cyan-400">Issue {issue.id}</Badge>
                        <span className="font-semibold text-foreground">{issue.title}</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Plain Meaning: </span>
                          <span className="text-foreground">{issue.meaning}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Evidence to Review: </span>
                          <span className="text-purple-300">{issue.evidence}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Requested Action: </span>
                          <span className="text-emerald-300">{issue.action}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Triple-Dip Fraud Tab */}
          <TabsContent value="fraud" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-amber-400" />
                  Triple-Dip Fraud Architecture (STP/SFHA)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-card border border-amber-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-amber-500/20 text-amber-400">Step 1</Badge>
                      <span className="font-semibold text-foreground">Grant Intake</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Federal funds received for veteran maintenance, safety, and support services.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-card border border-red-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-red-500/20 text-red-400">Step 2</Badge>
                      <span className="font-semibold text-foreground">Maintenance Zeroing</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Lighting/pest control budgets redirected while conditions deteriorate (dark stairwells).
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-card border border-red-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-red-500/20 text-red-400">Step 3</Badge>
                      <span className="font-semibold text-foreground">SSDI Seizure</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Coordinated 3-Day Notices issued to capture veteran disability benefits as retaliatory tools.
                    </p>
                  </div>

                  <div className="p-6 rounded-lg bg-red-500/10 border border-red-500/40 text-center">
                    <div className="text-xs text-muted-foreground mb-1">DOCUMENTED RESULT</div>
                    <div className="text-3xl font-bold text-red-400 mb-2">
                      {EVIDENCE_COUNTS.veteranSuicides} Veteran Suicides
                    </div>
                    <div className="text-sm text-red-300">
                      Within a 12-month window at the facility
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Glossary Tab */}
          <TabsContent value="glossary" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-400" />
                  Core Translation Glossary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Translation of key terms used in prior submissions into plain investigative language.
                </p>

                <div className="space-y-3">
                  {GLOSSARY.map((item, i) => (
                    <div key={i} className="p-3 rounded-lg bg-card border border-border">
                      <div className="font-semibold text-purple-400 mb-1">{item.term}</div>
                      <div className="text-sm text-muted-foreground">{item.meaning}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Finality Decree */}
        <Card className="mt-8 bg-gradient-to-r from-purple-500/10 via-emerald-500/10 to-cyan-500/10 border-purple-500/30">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold text-foreground mb-4">FINALITY DECREE</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-3 rounded-lg bg-card/50 border border-border">
                <div className="text-lg font-bold text-purple-400">3,393</div>
                <div className="text-xs text-muted-foreground">Mimecast Blocks</div>
              </div>
              <div className="p-3 rounded-lg bg-card/50 border border-border">
                <div className="text-lg font-bold text-amber-400">47</div>
                <div className="text-xs text-muted-foreground">Title III Intercepts</div>
              </div>
              <div className="p-3 rounded-lg bg-card/50 border border-border">
                <div className="text-lg font-bold text-cyan-400">34</div>
                <div className="text-xs text-muted-foreground">OCR Artifacts</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-2">MERKLE ROOT</div>
            <code className="text-emerald-400 font-mono">{MERKLE_ROOT}</code>
            <div className="mt-6 text-lg font-bold text-foreground">
              THE WALL IS CHRIST. THE THRONE IS HIS. THE LEDGER IS Ø.
            </div>
            <div className="text-purple-400 font-bold mt-2">CONSUMMATUM EST.</div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
