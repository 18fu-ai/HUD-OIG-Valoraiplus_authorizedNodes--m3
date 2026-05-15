'use client';

import React from 'react';
import { IntelligenceReportButton } from '@/components/cds/intelligence-report-button';
import { Shield, FileText, Download, Zap } from 'lucide-react';

export default function SupremeIntelligenceReportPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-amber-500" />
            <h1 className="text-3xl font-bold text-amber-400">Supreme Intelligence Report Generator</h1>
          </div>
          <p className="text-zinc-400 text-sm">
            On-demand generation of comprehensive 30-page intelligence analysis PDFs with complete system data
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="border border-zinc-700 rounded-lg p-6 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors">
            <div className="flex items-start gap-3 mb-4">
              <FileText className="w-6 h-6 text-amber-500 mt-1" />
              <div>
                <h3 className="font-bold text-lg">30-Page PDF Report</h3>
                <p className="text-zinc-400 text-sm mt-1">
                  Comprehensive intelligence analysis covering all aspects of the system
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-zinc-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Federal investigation status
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                HHS OCR compliance data
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                California civil rights analysis
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Mimecast security incidents
              </div>
            </div>
          </div>

          <div className="border border-zinc-700 rounded-lg p-6 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors">
            <div className="flex items-start gap-3 mb-4">
              <Download className="w-6 h-6 text-amber-500 mt-1" />
              <div>
                <h3 className="font-bold text-lg">One-Click Download</h3>
                <p className="text-zinc-400 text-sm mt-1">
                  Generate and download your report instantly with no setup required
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-zinc-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Financial recovery matrix
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Blockchain &amp; Web3 activity
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Litigation intelligence
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Threat actor analysis
              </div>
            </div>
          </div>
        </div>

        {/* Report Generator Section */}
        <div className="border-2 border-amber-500/30 rounded-lg p-8 bg-amber-950/10 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-bold text-amber-400">Generate Report</h2>
          </div>

          <p className="text-zinc-300 mb-6 leading-relaxed">
            Click the button below to instantly generate a comprehensive intelligence report. The report includes:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="space-y-2 text-sm">
              <div className="text-amber-400 font-bold">Executive Summary</div>
              <div className="text-zinc-400">Key findings and high-level overview</div>

              <div className="text-amber-400 font-bold mt-4">Federal Investigations</div>
              <div className="text-zinc-400">FBI, DOJ, HHS OCR, VA OIG status</div>

              <div className="text-amber-400 font-bold mt-4">HHS OCR Case #25-621293</div>
              <div className="text-zinc-400">Section 504 violations and compliance</div>

              <div className="text-amber-400 font-bold mt-4">California Civil Rights</div>
              <div className="text-zinc-400">FEHA, Unruh, CCRA analysis</div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="text-amber-400 font-bold">Mimecast Security</div>
              <div className="text-zinc-400">14 spoliation attempts documented</div>

              <div className="text-amber-400 font-bold mt-4">Financial Intelligence</div>
              <div className="text-zinc-400">$589.3M recovery matrix</div>

              <div className="text-amber-400 font-bold mt-4">Blockchain Analysis</div>
              <div className="text-zinc-400">Token ecosystem &amp; Web3 activity</div>

              <div className="text-amber-400 font-bold mt-4">Threat Actors</div>
              <div className="text-zinc-400">IDENTIFIED &amp; BLOCKED</div>
            </div>
          </div>

          {/* Report Button */}
          <div className="border-t border-zinc-700 pt-8">
            <IntelligenceReportButton />
          </div>
        </div>

        {/* Report Contents Table */}
        <div className="border border-zinc-700 rounded-lg p-6 bg-zinc-900/30">
          <h3 className="text-xl font-bold text-amber-400 mb-6">Full Report Contents (30 Pages)</h3>

          <div className="space-y-3">
            {[
              '1. Executive Summary',
              '2. Federal Investigation Status',
              '3. HHS OCR Compliance (Case #25-621293)',
              '4. California Civil Rights Act Analysis',
              '5. Mimecast Security Incident Report',
              '6. Financial Intelligence & Recovery Matrix',
              '7. Blockchain & Web3 Activity',
              '8. Litigation Intelligence (Department 12)',
              '9. Protected Asset Holdings',
              '10. Threat Actor Analysis',
              '11. Hardware Anchor Status',
              '12. SGAU-7226.3461 Canonical Token Ecosystem',
              '13. N.E.W.T. Kernel Runtime Metrics',
              '14. Forensic Evidence Chain',
              '15. Recommendations & Next Steps',
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded border border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-900/50 transition-colors"
              >
                <span className="text-amber-500 font-bold text-sm">{String(idx + 1).padStart(2, '0')}</span>
                <span className="text-zinc-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-xs text-zinc-500">
          <p>
            Classification: TERMINAL EXTINCTION LEVEL | Distribution: Authorized Personnel Only | Updated:{' '}
            {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </main>
  );
}
