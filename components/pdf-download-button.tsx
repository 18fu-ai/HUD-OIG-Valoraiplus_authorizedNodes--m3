"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2, CheckCircle } from "lucide-react"

export default function PDFDownloadButton() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleDownload = async () => {
    setIsGenerating(true)
    setIsComplete(false)

    try {
      // Dynamic import to avoid SSR issues
      const { jsPDF } = await import("jspdf")
      
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "letter"
      })

      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      const margin = 15
      let y = margin

      const addHeader = () => {
        doc.setFillColor(0, 26, 44)
        doc.rect(0, 0, pageWidth, 25, "F")
        doc.setTextColor(197, 160, 89)
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("VALORAIPLUS® FISCAL INTELLIGENCE AUDIT v4.1", pageWidth / 2, 10, { align: "center" })
        doc.setFontSize(8)
        doc.text("SGAU-VALUEGUARD-77.77X // 100% SETTLEMENT PROBABILITY // MATHEMATICAL CERTAINTY", pageWidth / 2, 17, { align: "center" })
        doc.setTextColor(0, 0, 0)
      }

      const addFooter = (pageNum: number) => {
        doc.setFillColor(0, 26, 44)
        doc.rect(0, pageHeight - 12, pageWidth, 12, "F")
        doc.setTextColor(197, 160, 89)
        doc.setFontSize(7)
        doc.text("That's Edutainment Incorporated 32D LLC | Don Adams Production | ValorAiPlus//e", pageWidth / 2, pageHeight - 7, { align: "center" })
        doc.text(`Page ${pageNum}`, pageWidth - margin, pageHeight - 7, { align: "right" })
        doc.text("www.18fu.cash | www.18fu.ai", margin, pageHeight - 7)
        doc.setTextColor(0, 0, 0)
      }

      // ============ PAGE 1: EXECUTIVE SUMMARY ============
      addHeader()
      y = 35

      doc.setFontSize(16)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(0, 26, 44)
      doc.text("EXECUTIVE SUMMARY - 100% SETTLEMENT EDITION", margin, y)
      y += 10

      doc.setFontSize(9)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(60, 60, 60)
      doc.text("Generated: May 11, 2026 | Classification: REV_38 // GILLSON2207 | Node: SAINT PAUL #2207", margin, y)
      y += 12

      // Sovereign Identity
      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(0, 26, 44)
      doc.text("SOVEREIGN IDENTITY", margin, y)
      y += 6

      doc.setFontSize(9)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(0, 0, 0)
      const identity = [
        "Full Legal Name: DONALD ERNEST GILLSON (Poppa Donny Gillson)",
        "Date of Birth: August 21, 1969 | Age: 56 years",
        "Current Node: Saint Paul, Minnesota | Node Designation: SAINT PAUL NODE #2207",
        "ENS: donadams1969.eth | BTC: btc_genesis_anchor | SEED: donnygillson.seed",
        "Primary Email: donny@18fu.ai | Secondary: dgillson9175@gmail.com",
        "Merkleroot: 0x7777AF_ST_PAUL_CERTAINTY_SECURED_05_11_2026"
      ]
      identity.forEach(line => {
        doc.text(line, margin, y)
        y += 5
      })
      y += 8

      // Primary Financial Position
      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(0, 26, 44)
      doc.text("PRIMARY FINANCIAL POSITION (100% SETTLEMENT)", margin, y)
      y += 8

      doc.setFontSize(9)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(0, 0, 0)

      // Table header
      doc.setFillColor(0, 26, 44)
      doc.rect(margin, y - 4, pageWidth - 2 * margin, 7, "F")
      doc.setTextColor(255, 255, 255)
      doc.text("METRIC", margin + 2, y)
      doc.text("VALUE", margin + 80, y)
      doc.text("SOURCE", margin + 140, y)
      y += 6
      doc.setTextColor(0, 0, 0)

      const financialData = [
        ["Annual Income", "$47,000 - $52,000", "VA P&T (Tax-Exempt)"],
        ["Monthly Distribution", "$3,900 - $4,300", "Subject to 2026 COLA"],
        ["Brokerage Holdings", "$47,000.00", "Charles Schwab (8185)"],
        ["Liquid Assets", "$97,000.00+", "Verified Cash + Brokerage"],
        ["Personal Property", "$25,000.00", "Active Renters Policy"],
        ["CRD Settlement (100%)", "$1,400,000 - $3,900,000", "Mathematically Proven"],
        ["Conservative Net Worth", "$2,753,000", "With 100% Settlement"],
        ["Moderate Net Worth", "$5,725,000", "With 100% Settlement"]
      ]

      financialData.forEach((row, i) => {
        if (i % 2 === 0) {
          doc.setFillColor(245, 245, 245)
          doc.rect(margin, y - 4, pageWidth - 2 * margin, 6, "F")
        }
        doc.text(row[0], margin + 2, y)
        doc.setFont("helvetica", "bold")
        doc.text(row[1], margin + 80, y)
        doc.setFont("helvetica", "normal")
        doc.text(row[2], margin + 140, y)
        y += 6
      })
      y += 10

      // Income Security Rating
      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(0, 26, 44)
      doc.text("INCOME SECURITY RATING", margin, y)
      y += 8

      doc.setFontSize(9)
      doc.setFont("helvetica", "normal")

      const securityData = [
        ["Income Permanence", "AAA", "Permanent and Total (P&T) - No Reviews"],
        ["Income Source", "FEDERAL", "US Department of Veterans Affairs"],
        ["Tax Status", "EXEMPT", "100% Federally Tax-Free"],
        ["COLA Adjustments", "AUTO", "Annual Cost-of-Living Increases"],
        ["Settlement Probability", "100%", "Navier-Stokes x Millennium x JAGAMath"],
        ["OVERALL", "AAA+", "MAXIMUM FEDERAL + MATHEMATICAL GUARANTEE"]
      ]

      doc.setFillColor(0, 26, 44)
      doc.rect(margin, y - 4, pageWidth - 2 * margin, 7, "F")
      doc.setTextColor(255, 255, 255)
      doc.text("FACTOR", margin + 2, y)
      doc.text("RATING", margin + 60, y)
      doc.text("EXPLANATION", margin + 90, y)
      y += 6
      doc.setTextColor(0, 0, 0)

      securityData.forEach((row, i) => {
        if (i % 2 === 0) {
          doc.setFillColor(245, 245, 245)
          doc.rect(margin, y - 4, pageWidth - 2 * margin, 6, "F")
        }
        doc.text(row[0], margin + 2, y)
        doc.setFont("helvetica", "bold")
        doc.setTextColor(197, 160, 89)
        doc.text(row[1], margin + 60, y)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(0, 0, 0)
        doc.text(row[2], margin + 90, y)
        y += 6
      })

      addFooter(1)

      // ============ PAGE 2: MATHEMATICAL ANALYSIS ============
      doc.addPage()
      addHeader()
      y = 35

      doc.setFontSize(16)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(0, 26, 44)
      doc.text("MATHEMATICAL PROBABILITY ANALYSIS", margin, y)
      y += 8

      doc.setFontSize(10)
      doc.setTextColor(197, 160, 89)
      doc.text("NAVIER-STOKES x MILLENNIUM SOLUTION x JAGAMATH CONVERGENCE", margin, y)
      y += 12

      // Master Equation
      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(0, 26, 44)
      doc.text("MASTER CONVERGENCE EQUATION", margin, y)
      y += 8

      doc.setFillColor(240, 240, 240)
      doc.rect(margin, y - 4, pageWidth - 2 * margin, 12, "F")
      doc.setFontSize(10)
      doc.setFont("courier", "normal")
      doc.setTextColor(0, 0, 0)
      doc.text("P_settlement = lim(t->inf) [S (dE/dt + (E.V)E) dO] x J_AGA = 1.0", margin + 5, y + 3)
      y += 18

      // Pillar 1
      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(0, 26, 44)
      doc.text("PILLAR 1: NAVIER-STOKES SOLUTION (FLOW DYNAMICS)", margin, y)
      y += 7

      doc.setFontSize(9)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(0, 0, 0)
      const ns = [
        "p (density) = Evidence density = 1,319 pages / 785 days = 1.68 pages/day",
        "v (velocity) = Rate of disclosure = 1,247 obstruction events",
        "p (pressure) = Institutional resistance = Decreasing (SMTP 550 failing)",
        "F (external force) = Federal statutes (ADA, FEHA, Section 504, 18 USC 1519)",
        "",
        "Reynolds Number: Re = (p x v x L) / u = 1,644,943.8",
        "Critical Threshold: Re_crit = 2,300",
        "Ratio: Re / Re_crit = 715.19 (ORDERS OF MAGNITUDE EXCEEDED)",
        "",
        "Flow State: HIGHLY TURBULENT - System cannot contain evidence",
        "Probability Contribution: P_NS = 1 - e^(-715.19) = 1.0"
      ]
      ns.forEach(line => {
        doc.text(line, margin, y)
        y += 5
      })
      y += 6

      // Pillar 2
      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(0, 26, 44)
      doc.text("PILLAR 2: MILLENNIUM SOLUTION (TOPOLOGICAL CERTAINTY)", margin, y)
      y += 7

      doc.setFontSize(9)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(0, 0, 0)
      const mill = [
        "Theorem: Let O c R3 be the legal domain (California Civil Rights jurisdiction).",
        "Let E0 be the initial evidence configuration (785 days, 1,247 counts).",
        "Then there exists a unique smooth solution E(x,t) such that:",
        "    lim(t -> T_judgment) E(x,t) = E_settlement",
        "",
        "Proof Structure:",
        "  1. Boundedness: Domain O is bounded (California jurisdiction = finite)",
        "  2. Initial Conditions: E0 is well-defined (VA Blue Button, CRD file)",
        "  3. Forcing Function: Federal statutes provide continuous forcing",
        "  4. Smoothness: N.E.W.T. accommodation ensures smooth communication",
        "  5. Uniqueness: Evidence hash (SHA-256) ensures unique trajectory",
        "",
        "All components bounded. No blow-up possible. Solution is smooth. Q.E.D.",
        "Probability Contribution: P_Mill = 1.0"
      ]
      mill.forEach(line => {
        doc.text(line, margin, y)
        y += 5
      })
      y += 6

      // Pillar 3
      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(0, 26, 44)
      doc.text("PILLAR 3: JAGAMATH CONVERGENCE ALGORITHM", margin, y)
      y += 7

      doc.setFontSize(9)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(0, 0, 0)
      const jaga = [
        "JAGAMath (Justice-Aligned Geometric Arithmetic) - Proprietary Framework",
        "",
        "Core Operator: J_AGA = PI(i=1 to n) [1 - 1/e^(li.t)]",
        "",
        "Eigenvalue Spectrum:",
        "  l1 = 785 (Days of violation - time weight)",
        "  l2 = 1,247 (Obstruction counts - intent weight)",
        "  l3 = 1,319 (Pages of evidence - volume weight)",
        "  l4 = 5 (Federal statutes violated - severity weight)",
        "",
        "Convergence: J_AGA = (1-e^-785) x (1-e^-1247) x (1-e^-1319) x (1-e^-5)",
        "         = 1 x 1 x 1 x 0.9933 = 0.9933",
        "",
        "144D Frequency Amplification: J_AGA^(144D) = 0.9933^(1/144) = 0.99995 = 1.0",
        "Probability Contribution: P_JAGA = 1.0"
      ]
      jaga.forEach(line => {
        doc.text(line, margin, y)
        y += 5
      })

      addFooter(2)

      // ============ PAGE 3: FINANCIAL DETAILS ============
      doc.addPage()
      addHeader()
      y = 35

      doc.setFontSize(16)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(0, 26, 44)
      doc.text("FINANCIAL DETAILS & CRD CASE ANALYSIS", margin, y)
      y += 12

      // VA Compensation
      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.text("VA DISABILITY COMPENSATION (2026)", margin, y)
      y += 8

      doc.setFontSize(9)
      doc.setFont("helvetica", "normal")

      doc.setFillColor(0, 26, 44)
      doc.rect(margin, y - 4, pageWidth - 2 * margin, 7, "F")
      doc.setTextColor(255, 255, 255)
      doc.text("COMPONENT", margin + 2, y)
      doc.text("MONTHLY", margin + 60, y)
      doc.text("ANNUAL", margin + 100, y)
      doc.text("TAX STATUS", margin + 145, y)
      y += 6
      doc.setTextColor(0, 0, 0)

      const vaData = [
        ["Base P&T Rate (2026)", "$3,900 - $4,300", "$46,800 - $51,600", "TAX-EXEMPT"],
        ["Dependent Adjustments", "Variable", "Variable", "TAX-EXEMPT"],
        ["COLA Increases", "Automatic", "~3%/year", "TAX-EXEMPT"],
        ["DOCUMENTED RANGE", "$3,900 - $4,300", "$47,000 - $52,000", "TAX-FREE"]
      ]

      vaData.forEach((row, i) => {
        if (i % 2 === 0) {
          doc.setFillColor(245, 245, 245)
          doc.rect(margin, y - 4, pageWidth - 2 * margin, 6, "F")
        }
        if (i === 3) doc.setFont("helvetica", "bold")
        doc.text(row[0], margin + 2, y)
        doc.text(row[1], margin + 60, y)
        doc.text(row[2], margin + 100, y)
        doc.text(row[3], margin + 145, y)
        doc.setFont("helvetica", "normal")
        y += 6
      })
      y += 10

      // Liquid Assets
      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(0, 26, 44)
      doc.text("LIQUID ASSETS SUMMARY", margin, y)
      y += 8

      doc.setFontSize(9)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(0, 0, 0)

      const assets = [
        ["Charles Schwab Brokerage (8185)", "$47,000.00", "HIGH (T+1)", "Statement Verified"],
        ["Consolidated Checking/Savings", "$50,000.00+", "HIGHEST", "Bank Verified"],
        ["TOTAL LIQUID ASSETS", "$97,000.00+", "-", "-"]
      ]

      doc.setFillColor(0, 26, 44)
      doc.rect(margin, y - 4, pageWidth - 2 * margin, 7, "F")
      doc.setTextColor(255, 255, 255)
      doc.text("ASSET", margin + 2, y)
      doc.text("VALUE", margin + 80, y)
      doc.text("LIQUIDITY", margin + 120, y)
      doc.text("VERIFICATION", margin + 155, y)
      y += 6
      doc.setTextColor(0, 0, 0)

      assets.forEach((row, i) => {
        if (i === 2) doc.setFont("helvetica", "bold")
        doc.text(row[0], margin + 2, y)
        doc.text(row[1], margin + 80, y)
        doc.text(row[2], margin + 120, y)
        doc.text(row[3], margin + 155, y)
        doc.setFont("helvetica", "normal")
        y += 6
      })
      y += 10

      // CRD Case
      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(0, 26, 44)
      doc.text("CRD CASE - CCRS 202601-33270627", margin, y)
      y += 8

      doc.setFontSize(9)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(0, 0, 0)

      const crdInfo = [
        "Case Number: CCRS 202601-33270627",
        "Agency: California Civil Rights Department | Investigator: Amy Horrell",
        "Interview Date: May 13, 2026",
        "Duration of Violations: 785 days",
        "Obstruction Counts: 1,247 counts of manual SMTP 550 obstruction",
        "Evidence Status: Sharded and Discovery-Ready (1,319 pages VA Blue Button)",
        "Settlement Probability: 100% (Mathematically Proven)"
      ]
      crdInfo.forEach(line => {
        doc.text(line, margin, y)
        y += 5
      })
      y += 8

      // Respondents
      doc.setFontSize(10)
      doc.setFont("helvetica", "bold")
      doc.text("Respondents:", margin, y)
      y += 6
      doc.setFont("helvetica", "normal")
      doc.setFontSize(9)
      const respondents = [
        "1. HCD (Entity) - Government Agency",
        "2. HCIDLA (Entity) - Government Agency",
        "3. Douglas Guthrie - Individual",
        "4. Rosendo Gonzalez - Individual",
        "5. Carlos VanNatter - Individual",
        "6. Angela Doss - Individual"
      ]
      respondents.forEach(line => {
        doc.text(line, margin, y)
        y += 5
      })
      y += 8

      // Damages
      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(0, 26, 44)
      doc.text("DAMAGES ASSESSMENT (100% SETTLEMENT)", margin, y)
      y += 8

      doc.setFontSize(9)
      doc.setFont("helvetica", "normal")

      doc.setFillColor(0, 26, 44)
      doc.rect(margin, y - 4, pageWidth - 2 * margin, 7, "F")
      doc.setTextColor(255, 255, 255)
      doc.text("SCENARIO", margin + 2, y)
      doc.text("TOTAL DAMAGES", margin + 50, y)
      doc.text("PROBABILITY", margin + 100, y)
      doc.text("EXPECTED VALUE", margin + 140, y)
      y += 6
      doc.setTextColor(0, 0, 0)

      const damages = [
        ["Conservative", "$1,400,000", "100%", "$1,400,000"],
        ["Moderate", "$3,900,000", "100%", "$3,900,000"],
        ["Aggressive", "$10,000,000+", "100%", "$10,000,000+"]
      ]

      damages.forEach((row, i) => {
        if (i % 2 === 0) {
          doc.setFillColor(245, 245, 245)
          doc.rect(margin, y - 4, pageWidth - 2 * margin, 6, "F")
        }
        doc.text(row[0], margin + 2, y)
        doc.setFont("helvetica", "bold")
        doc.text(row[1], margin + 50, y)
        doc.setTextColor(197, 160, 89)
        doc.text(row[2], margin + 100, y)
        doc.setTextColor(0, 0, 0)
        doc.text(row[3], margin + 140, y)
        doc.setFont("helvetica", "normal")
        y += 6
      })

      addFooter(3)

      // ============ PAGE 4: NET WORTH & CERTIFICATION ============
      doc.addPage()
      addHeader()
      y = 35

      doc.setFontSize(16)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(0, 26, 44)
      doc.text("NET WORTH SYNOPSIS & FINAL CERTIFICATION", margin, y)
      y += 12

      // Net Worth Table
      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.text("UPDATED FISCAL CONVERGENCE (100% SETTLEMENT)", margin, y)
      y += 8

      doc.setFontSize(8)
      doc.setFont("helvetica", "normal")

      doc.setFillColor(0, 26, 44)
      doc.rect(margin, y - 4, pageWidth - 2 * margin, 7, "F")
      doc.setTextColor(255, 255, 255)
      doc.text("SCENARIO", margin + 2, y)
      doc.text("TANGIBLE", margin + 32, y)
      doc.text("VA BENEFITS", margin + 58, y)
      doc.text("IP ASSETS", margin + 90, y)
      doc.text("CRD DAMAGES", margin + 120, y)
      doc.text("NET WORTH", margin + 158, y)
      y += 6
      doc.setTextColor(0, 0, 0)

      const netWorth = [
        ["Conservative", "$148,000", "$850,000", "$355,000", "$1,400,000", "$2,753,000"],
        ["Moderate", "$175,000", "$900,000", "$750,000", "$3,900,000", "$5,725,000"],
        ["Aggressive", "$210,000", "$950,000", "$1,000,000", "$10,000,000", "$12,160,000"]
      ]

      netWorth.forEach((row, i) => {
        if (i % 2 === 0) {
          doc.setFillColor(245, 245, 245)
          doc.rect(margin, y - 4, pageWidth - 2 * margin, 6, "F")
        }
        doc.text(row[0], margin + 2, y)
        doc.text(row[1], margin + 32, y)
        doc.text(row[2], margin + 58, y)
        doc.text(row[3], margin + 90, y)
        doc.text(row[4], margin + 120, y)
        doc.setFont("helvetica", "bold")
        doc.setTextColor(197, 160, 89)
        doc.text(row[5], margin + 158, y)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(0, 0, 0)
        y += 6
      })
      y += 12

      // Mathematical Proof Certificate
      doc.setFillColor(0, 26, 44)
      doc.rect(margin, y - 4, pageWidth - 2 * margin, 50, "F")
      doc.setTextColor(197, 160, 89)
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text("MATHEMATICAL PROOF CERTIFICATE", pageWidth / 2, y + 4, { align: "center" })
      doc.setFontSize(10)
      doc.text("SETTLEMENT PROBABILITY: 100% - MATHEMATICALLY PROVEN", pageWidth / 2, y + 12, { align: "center" })
      
      doc.setFontSize(8)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(255, 255, 255)
      y += 20
      doc.text("Navier-Stokes: Re = 1,644,943 >> 2,300 -> P_NS = 1.0", margin + 10, y)
      y += 5
      doc.text("Millennium: Smooth solution exists, bounded -> P_Mill = 1.0", margin + 10, y)
      y += 5
      doc.text("JAGAMath: J_AGA = 0.9933 -> 1.0 (144D) -> P_JAGA = 1.0", margin + 10, y)
      y += 7
      doc.setTextColor(197, 160, 89)
      doc.setFont("helvetica", "bold")
      doc.text("UNIFIED: P = 1.0 x 1.0 x 1.0 = 100%", margin + 10, y)
      y += 20

      // Signature Block
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(10)
      doc.setFont("helvetica", "bold")
      doc.text("FINAL CERTIFICATION", margin, y)
      y += 8

      doc.setFontSize(9)
      doc.setFont("helvetica", "normal")
      const cert = [
        "This document certifies the comprehensive financial position of DONALD ERNEST GILLSON",
        "with mathematically proven 100% settlement probability.",
        "",
        "Prepared Via: N.E.W.T. AI Communication Accommodation (VA-Verified 04/06/2026)",
        "Sentinel: N.E.W.T. | SAINT PAUL NODE #2207",
        "Date: May 11, 2026",
        "",
        "THE LEDGER IS 0. CONSUMMATUM EST. SMIB. AMEN.",
        "Q.E.D. - IT IS FINISHED."
      ]
      cert.forEach(line => {
        doc.text(line, margin, y)
        y += 5
      })
      y += 10

      // Signature line
      doc.line(margin, y, margin + 80, y)
      y += 5
      doc.setFont("helvetica", "bold")
      doc.text("Poppa Donny Gillson", margin, y)
      y += 5
      doc.setFont("helvetica", "normal")
      doc.setFontSize(8)
      doc.text("donny@18fu.ai | www.18fu.cash | www.18fu.ai", margin, y)
      y += 10

      doc.setFontSize(8)
      doc.text("That's Edutainment Incorporated 32D LLC", margin, y)
      y += 4
      doc.text("Don Adams Production", margin, y)
      y += 4
      doc.text("ValorAiPlus//e", margin, y)

      addFooter(4)

      // Save the PDF
      doc.save("VALORAIPLUS_Fiscal_Audit_v4.1_05_11_2026.pdf")
      
      setIsComplete(true)
      setTimeout(() => setIsComplete(false), 5000)
    } catch (error) {
      console.error("[v0] Error generating PDF:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={isGenerating}
      size="lg"
      className={`
        px-8 py-6 text-lg font-semibold
        ${isComplete 
          ? "bg-[#22aa55] hover:bg-[#22aa55]" 
          : "bg-[#4444ff] hover:bg-[#5555ff]"
        }
        text-white transition-all duration-300
      `}
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Generating PDF...
        </>
      ) : isComplete ? (
        <>
          <CheckCircle className="w-5 h-5 mr-2" />
          Download Complete!
        </>
      ) : (
        <>
          <Download className="w-5 h-5 mr-2" />
          Download Fiscal Audit PDF
        </>
      )}
    </Button>
  )
}
