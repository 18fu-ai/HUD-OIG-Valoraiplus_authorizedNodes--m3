"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2, CheckCircle } from "lucide-react"
import { generateFiscalAuditPDF } from "@/components/fiscal-audit-pdf"

export default function PDFDownloadButton() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleDownload = async () => {
    setIsGenerating(true)
    setIsComplete(false)

    try {
      const blob = await generateFiscalAuditPDF()
      
      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "VALORAIPLUS_Fiscal_Audit_v4.1_05_11_2026.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      setIsComplete(true)
      setTimeout(() => setIsComplete(false), 3000)
    } catch (error) {
      console.error("Error generating PDF:", error)
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
