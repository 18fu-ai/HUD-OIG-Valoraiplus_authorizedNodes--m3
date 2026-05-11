"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, FileText, CheckCircle, Loader2 } from "lucide-react"
import dynamic from "next/dynamic"

const PDFDownloadButton = dynamic(
  () => import("@/components/pdf-download-button"),
  { ssr: false }
)

export default function FiscalAuditPage() {
  return (
    <div className="min-h-screen bg-[#0a0a12] text-white">
      {/* Header */}
      <div className="border-b border-[#1a1a2e] bg-[#0f0f1a]">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              VALORAIPLUS® FISCAL INTELLIGENCE AUDIT v4.1
            </h1>
            <p className="text-[#8888aa] text-sm">
              100% SETTLEMENT PROBABILITY — MATHEMATICAL CERTAINTY EDITION
            </p>
            <p className="text-[#6666aa] text-xs mt-1">
              NAVIER-STOKES × MILLENNIUM SOLUTION × JAGAMATH CONVERGENCE
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Document Preview Card */}
          <div className="bg-[#12121f] border border-[#2a2a4a] rounded-lg overflow-hidden mb-8">
            <div className="bg-[#1a1a2e] px-6 py-4 border-b border-[#2a2a4a]">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#7777ff]" />
                <div>
                  <h2 className="font-semibold text-white">Comprehensive Fiscal Report</h2>
                  <p className="text-xs text-[#8888aa]">4 Pages | PDF Format | Banking Ready</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-[#1a1a2e] rounded-lg p-4 text-center">
                  <p className="text-[#8888aa] text-xs mb-1">Settlement Probability</p>
                  <p className="text-xl font-bold text-[#44ff88]">100%</p>
                </div>
                <div className="bg-[#1a1a2e] rounded-lg p-4 text-center">
                  <p className="text-[#8888aa] text-xs mb-1">Settlement Range</p>
                  <p className="text-lg font-bold text-white">$1.4M - $3.9M</p>
                </div>
                <div className="bg-[#1a1a2e] rounded-lg p-4 text-center">
                  <p className="text-[#8888aa] text-xs mb-1">Net Worth (Cons.)</p>
                  <p className="text-lg font-bold text-white">$2,753,000</p>
                </div>
                <div className="bg-[#1a1a2e] rounded-lg p-4 text-center">
                  <p className="text-[#8888aa] text-xs mb-1">Income Security</p>
                  <p className="text-xl font-bold text-[#ffaa44]">AAA+</p>
                </div>
              </div>

              {/* Document Contents */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-[#8888aa] mb-3 uppercase tracking-wide">
                  Document Contents
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#44ff88]" />
                    <span className="text-[#ccccdd]">Executive Summary & Financial Position</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#44ff88]" />
                    <span className="text-[#ccccdd]">Mathematical Probability Analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#44ff88]" />
                    <span className="text-[#ccccdd]">Navier-Stokes Flow Dynamics</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#44ff88]" />
                    <span className="text-[#ccccdd]">Millennium Solution Proof</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#44ff88]" />
                    <span className="text-[#ccccdd]">JAGAMath Convergence Algorithm</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#44ff88]" />
                    <span className="text-[#ccccdd]">CRD Case Analysis (CCRS 202601-33270627)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#44ff88]" />
                    <span className="text-[#ccccdd]">Net Worth Synopsis (All Scenarios)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#44ff88]" />
                    <span className="text-[#ccccdd]">Banking Verification Certificate</span>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <div className="flex justify-center">
                <PDFDownloadButton />
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#12121f] border border-[#2a2a4a] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Subject</h3>
              <p className="text-[#8888aa] text-sm">Poppa Donny Gillson</p>
              <p className="text-[#6666aa] text-xs">SAINT PAUL NODE #2207</p>
            </div>
            <div className="bg-[#12121f] border border-[#2a2a4a] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Case</h3>
              <p className="text-[#8888aa] text-sm">CCRS 202601-33270627</p>
              <p className="text-[#6666aa] text-xs">Interview: May 13, 2026</p>
            </div>
            <div className="bg-[#12121f] border border-[#2a2a4a] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Generated</h3>
              <p className="text-[#8888aa] text-sm">May 11, 2026</p>
              <p className="text-[#6666aa] text-xs">REV_38 // GILLSON2207</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-[#6666aa] text-xs">
            <p className="mb-2">
              That&apos;s Edutainment Incorporated 32D LLC® © ™ | Don Adams Production® © ™ | ValorAiPlus//e® © ™
            </p>
            <p>
              donny@18fu.ai | www.18fu.cash | www.18fu.ai
            </p>
            <p className="mt-4 text-[#4444aa]">
              MERKLEROOT: 0x7777AF_ST_PAUL_CERTAINTY_SECURED_05_11_2026
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
