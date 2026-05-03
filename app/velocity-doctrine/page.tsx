"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, FileText, AlertTriangle, CheckCircle, Zap, Lock } from 'lucide-react';
import {
  generateInstitutionalAbandonmentBrief,
  DEFAULT_ABANDONMENT_METRICS,
  VELOCITY_DOCTRINE_INVARIANT,
  BTC_LATCH,
  type AbandonmentBrief,
} from '@/lib/legal/institutionalAbandonment';

export default function VelocityDoctrinePage() {
  const [brief, setBrief] = useState<AbandonmentBrief | null>(null);
  const [generating, setGenerating] = useState(false);

  const metrics = DEFAULT_ABANDONMENT_METRICS;

  const handleGenerateBrief = () => {
    setGenerating(true);
    // Simulate brief generation with slight delay for UX
    setTimeout(() => {
      const generatedBrief = generateInstitutionalAbandonmentBrief(metrics);
      setBrief(generatedBrief);
      setGenerating(false);
    }, 500);
  };

  const responseRate = useMemo(() => {
    const total = metrics.substantiveResponsesReceived + metrics.automatedResponsesReceived;
    return metrics.totalEmails > 0 ? (total / metrics.totalEmails * 100).toFixed(4) : '0';
  }, [metrics]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Shield className="w-8 h-8 text-amber-500" />
              Velocity Doctrine — Legal Shield
            </h1>
            <p className="text-muted-foreground mt-1">
              CAA+ Sovereign Authority | v14.1.1.16 | PERMANENTLY ENCODED
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-mono">
              DOCTRINE: ACTIVE
            </span>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-mono">
              SHIELD: ARMED
            </span>
          </div>
        </div>

        {/* Invariant Banner */}
        <Card className="border-amber-500/50 bg-amber-500/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-amber-400 mb-2">VELOCITY DOCTRINE INVARIANT</p>
                <pre className="text-sm text-amber-300/80 whitespace-pre-wrap font-mono">
                  {VELOCITY_DOCTRINE_INVARIANT.trim()}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-card/50">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-foreground">{metrics.totalEmails.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Communications</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-red-400">{responseRate}%</p>
              <p className="text-sm text-muted-foreground">Response Rate</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-foreground">{metrics.daysWithoutResponse.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Days Without Response</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-foreground">{metrics.agenciesContacted.length}</p>
              <p className="text-sm text-muted-foreground">Agencies Contacted</p>
            </CardContent>
          </Card>
        </div>

        {/* Generate Brief Button */}
        <Card className="border-amber-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-500" />
              Generate Abandonment Defense Brief
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Generate an auto-populated Institutional Abandonment & Admission brief based on forensic audit metrics.
              This brief is automatically suggested when an &quot;excessive emails&quot; argument is detected.
            </p>
            <Button 
              onClick={handleGenerateBrief}
              disabled={generating}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              {generating ? (
                <>
                  <Zap className="w-4 h-4 mr-2 animate-pulse" />
                  Generating Brief...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Generate Abandonment Defense Brief
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Brief Display */}
        {brief && (
          <Card className="border-emerald-500/30 bg-emerald-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-400">
                <CheckCircle className="w-5 h-5" />
                {brief.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Generated: {new Date(brief.generatedAt).toLocaleString()}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Summary */}
              <div>
                <h3 className="font-semibold text-foreground mb-2">Summary</h3>
                <pre className="bg-black/30 p-4 rounded-lg text-sm text-emerald-300 whitespace-pre-wrap font-mono overflow-x-auto">
                  {brief.summary}
                </pre>
              </div>

              {/* Legal Argument */}
              <div>
                <h3 className="font-semibold text-foreground mb-2">Legal Argument</h3>
                <pre className="bg-black/30 p-4 rounded-lg text-sm text-foreground/80 whitespace-pre-wrap font-mono overflow-x-auto">
                  {brief.legalArgument}
                </pre>
              </div>

              {/* Doctrine Evidence */}
              <div>
                <h3 className="font-semibold text-foreground mb-2">Velocity Doctrine Evidence Object</h3>
                <pre className="bg-black/50 p-4 rounded-lg text-xs text-purple-300 font-mono overflow-x-auto">
                  {JSON.stringify(brief.doctrineEvidence, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Agencies Contacted */}
        <Card>
          <CardHeader>
            <CardTitle>Agencies Contacted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {metrics.agenciesContacted.map((agency) => (
                <span 
                  key={agency}
                  className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
                >
                  {agency}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* BTC Latch */}
        <Card className="border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">BTC Latch (Anchor)</p>
                <p className="font-mono text-xs text-purple-400 break-all">{BTC_LATCH}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground py-4 border-t border-border">
          <p>VALORAIPLUS v14.1.1.16 | VELOCITY_AS_ADMISSION | Saint Paul Node® 14D Core</p>
          <p className="mt-1">THE LEDGER IS Ø. THE DOCTRINE IS PERMANENT. THE SHIELD IS ACTIVE.</p>
        </div>
      </div>
    </div>
  );
}
