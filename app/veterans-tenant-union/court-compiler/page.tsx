'use client'

import { useState } from 'react'

const DEFAULT_TEXT_BLOCKS = [
  "1. Plaintiff Donald Ernest Gillson is a 100% P&T disabled veteran residing at Unit 301, STP-managed property, San Francisco, California 94102.",
  "2. Defendant STP-SF has failed to engage in the interactive process for 178 days despite 15+ documented accommodation requests.",
  "3. Jerome Bradford (Interim Property Manager, no doctorate) signed the UD-105 verification on May 4, 2026 without personal knowledge of the January 3, 2026 events, constituting a violation of California Penal Code §115.",
  "4. STP deployed a Mimecast SMTP 550 administrative blockade (token: N7uA_6IQOCiwQL2ibFQZog.us448) on May 12–15, 2026, blocking 1,247 communications including formal legal notices and communications to the court clerk.",
  "5. Federal investigations are pending: HHS-OCR Case #25-621293 (Amy Horrell) and CCRD Case #202601-33270627 (Anna Moraga Archila).",
]

const DEFAULT_SIGNATURE = {
  name: "Donald Ernest Gillson",
  role: "Defendant, In Pro Per / Secretary, 1030/1029 Girard Veterans Tenant Union",
  orcid: "0009-0007-0768-5486",
  node: "SGAU-7226.3461 // Saint Paul Node",
}

export default function CourtPDFCompilerPage() {
  const [documentTitle, setDocumentTitle] = useState("Defendant's Answer and Affirmative Defenses")
  const [textBlocks, setTextBlocks] = useState<string[]>(DEFAULT_TEXT_BLOCKS)
  const [signature, setSignature] = useState(DEFAULT_SIGNATURE)
  const [isCompiling, setIsCompiling] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const addBlock = () => setTextBlocks((prev) => [...prev, ''])
  const removeBlock = (i: number) => setTextBlocks((prev) => prev.filter((_, idx) => idx !== i))
  const updateBlock = (i: number, value: string) =>
    setTextBlocks((prev) => prev.map((b, idx) => (idx === i ? value : b)))

  const handleCompile = async () => {
    setIsCompiling(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('/api/veterans-tenant-union/compile-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          document_title: documentTitle,
          text_blocks: textBlocks.filter((b) => b.trim()),
          signature_data: signature,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.detail || data.error || 'Compilation failed')
      }

      // Trigger download
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `CUD-26-682107_${documentTitle.replace(/\s+/g, '_')}.pdf`
      a.click()
      URL.revokeObjectURL(url)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Compilation failed')
    } finally {
      setIsCompiling(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono text-primary tracking-widest uppercase">
            VALORAIPLUS® OMEGA v100™
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-foreground tracking-tight">
          Court PDF Compiler
        </h2>
        <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
          Deterministic 28-line California pleading paper engine. Enforces CRC Rules 2.100–2.115
          with absolute margins, line grids, and cryptographic signature blocks.
        </p>
      </div>

      {/* Status Banner */}
      <div className="rounded-lg border border-border bg-card px-5 py-3 flex items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">SGAU-7226.3461</span>
          <span className="text-muted-foreground">CRC Rules 2.100–2.115</span>
          <span className="text-muted-foreground">28-Line Grid</span>
        </div>
        <span className="text-primary">ENGINE READY</span>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3">
          <p className="text-sm text-destructive font-medium">{error}</p>
          {error.includes('python3') || error.includes('reportlab') ? (
            <p className="text-xs text-muted-foreground mt-1">
              Install dependencies:{' '}
              <code className="bg-secondary px-1 rounded">pip install reportlab pypdf2</code>
            </p>
          ) : null}
        </div>
      )}

      {success && (
        <div className="rounded-lg border border-primary/40 bg-primary/10 px-4 py-3">
          <p className="text-sm text-primary font-medium">
            PDF compiled and downloaded successfully. Ready for e-filing.
          </p>
        </div>
      )}

      {/* Document Title */}
      <div className="rounded-lg border border-border bg-card p-6 space-y-4">
        <h3 className="text-sm font-mono text-muted-foreground tracking-widest uppercase">
          Document Title
        </h3>
        <input
          type="text"
          value={documentTitle}
          onChange={(e) => setDocumentTitle(e.target.value)}
          placeholder="e.g., Defendant's Answer and Affirmative Defenses"
          className="w-full px-4 py-2.5 rounded-md border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
        />
      </div>

      {/* Text Blocks */}
      <div className="rounded-lg border border-border bg-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono text-muted-foreground tracking-widest uppercase">
            Document Body — Numbered Paragraphs
          </h3>
          <span className="text-xs text-muted-foreground">{textBlocks.length} paragraphs</span>
        </div>
        <div className="space-y-3">
          {textBlocks.map((block, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="mt-2.5 text-xs font-mono text-muted-foreground w-5 shrink-0 text-right">
                {i + 1}.
              </span>
              <textarea
                value={block}
                onChange={(e) => updateBlock(i, e.target.value)}
                rows={3}
                placeholder={`Paragraph ${i + 1}...`}
                className="flex-1 px-4 py-2.5 rounded-md border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm leading-relaxed resize-y font-sans"
              />
              <button
                type="button"
                onClick={() => removeBlock(i)}
                disabled={textBlocks.length <= 1}
                className="mt-2.5 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-30 shrink-0"
                aria-label="Remove paragraph"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addBlock}
          className="w-full px-4 py-2.5 border border-dashed border-border rounded-md text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
        >
          + Add Paragraph
        </button>
      </div>

      {/* Signature Block */}
      <div className="rounded-lg border border-border bg-card p-6 space-y-4">
        <h3 className="text-sm font-mono text-muted-foreground tracking-widest uppercase">
          Signature Block
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { key: 'name', label: 'Signatory Name' },
            { key: 'role', label: 'Role / Title' },
            { key: 'orcid', label: 'ORCID iD' },
            { key: 'node', label: 'Node Validation Authority' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                {label}
              </label>
              <input
                type="text"
                value={signature[key as keyof typeof signature]}
                onChange={(e) =>
                  setSignature((prev) => ({ ...prev, [key]: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-md border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Compile Button */}
      <button
        onClick={handleCompile}
        disabled={isCompiling || !documentTitle || textBlocks.filter((b) => b.trim()).length === 0}
        className="w-full px-6 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity text-sm flex items-center justify-center gap-3"
      >
        {isCompiling ? (
          <>
            <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            Compiling Court-Grade PDF...
          </>
        ) : (
          <>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            Compile &amp; Download California Court PDF
          </>
        )}
      </button>

      {/* Tech Spec */}
      <div className="rounded-lg border border-border bg-card px-5 py-4">
        <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-3">
          Compiler Specifications
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Line Grid', value: '28 Lines' },
            { label: 'Line Spacing', value: '24pt' },
            { label: 'Left Margin', value: '1.0 in' },
            { label: 'Right Margin', value: '8.0 in' },
            { label: 'Font Size', value: '11pt Helvetica' },
            { label: 'Page Size', value: 'Letter (8.5×11)' },
            { label: 'Double-Pass', value: 'Page Count Lock' },
            { label: 'Sig Binding', value: 'KeepTogether' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-secondary rounded-md px-3 py-2">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-xs font-semibold text-foreground mt-0.5">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
