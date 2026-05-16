'use client'

import { useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface FilePreview {
  file: File
  previewUrl: string | null
  mediaType: 'image' | 'audio' | 'video' | 'document'
}

function getMediaType(file: File): 'image' | 'audio' | 'video' | 'document' {
  if (file.type.startsWith('image/')) return 'image'
  if (file.type.startsWith('audio/')) return 'audio'
  if (file.type.startsWith('video/')) return 'video'
  return 'document'
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1048576).toFixed(1) + ' MB'
}

const mediaTypeLabel: Record<string, string> = {
  image: 'Image',
  audio: 'Audio',
  video: 'Video',
  document: 'Document',
}

export default function SubmitTestimonyPage() {
  const router = useRouter()
  const [tenantIdentifier, setTenantIdentifier] = useState('')
  const [testimonyText, setTestimonyText] = useState('')
  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const processFiles = useCallback((files: File[]) => {
    const newPreviews: FilePreview[] = files.map((file) => {
      const mediaType = getMediaType(file)
      const previewUrl =
        mediaType === 'image' || mediaType === 'audio' || mediaType === 'video'
          ? URL.createObjectURL(file)
          : null
      return { file, previewUrl, mediaType }
    })
    setFilePreviews((prev) => [...prev, ...newPreviews])
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) processFiles(Array.from(e.target.files))
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files) processFiles(Array.from(e.dataTransfer.files))
  }

  const removeFile = (index: number) => {
    setFilePreviews((prev) => {
      const updated = [...prev]
      if (updated[index].previewUrl) URL.revokeObjectURL(updated[index].previewUrl!)
      updated.splice(index, 1)
      return updated
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('tenant_identifier', tenantIdentifier)
      formData.append('testimony_text', testimonyText)
      filePreviews.forEach(({ file }, i) => {
        formData.append(`media_${i}`, file)
      })

      const response = await fetch('/api/veterans-tenant-union/submit', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Failed to submit testimony')

      setSuccess(true)
      setTimeout(() => router.push('/veterans-tenant-union/evidence-locker'), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="rounded-lg border border-primary/40 bg-primary/10 p-10 text-center">
          <div className="h-14 w-14 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-4">
            <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Testimony Submitted</h2>
          <p className="text-muted-foreground">
            Your testimony has been sealed in the evidence locker. Redirecting...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground tracking-tight">Submit Testimony</h2>
        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
          Your account will be preserved with an atomic timestamp and stored in the VTU evidence locker for federal investigators.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3">
          <p className="text-sm text-destructive font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tenant Identifier */}
        <div className="rounded-lg border border-border bg-card p-6 space-y-4">
          <h3 className="text-sm font-mono text-muted-foreground tracking-widest uppercase">
            Identification
          </h3>
          <div>
            <label htmlFor="tenant_identifier" className="block text-sm font-medium text-foreground mb-2">
              Your Name / Tenant Identifier <span className="text-destructive">*</span>
            </label>
            <input
              id="tenant_identifier"
              type="text"
              value={tenantIdentifier}
              onChange={(e) => setTenantIdentifier(e.target.value)}
              placeholder="e.g., John Smith, Unit 204"
              required
              className="w-full px-4 py-2.5 rounded-md border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              How you wish to be identified in the evidence record
            </p>
          </div>
        </div>

        {/* Testimony Text */}
        <div className="rounded-lg border border-border bg-card p-6 space-y-4">
          <h3 className="text-sm font-mono text-muted-foreground tracking-widest uppercase">
            Testimony
          </h3>
          <div>
            <label htmlFor="testimony_text" className="block text-sm font-medium text-foreground mb-2">
              Your Account <span className="text-destructive">*</span>
            </label>
            <textarea
              id="testimony_text"
              value={testimonyText}
              onChange={(e) => setTestimonyText(e.target.value)}
              placeholder="Describe what you witnessed or experienced. Include specific dates, times, names, and locations. The more detail, the stronger the evidence."
              required
              rows={10}
              className="w-full px-4 py-2.5 rounded-md border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm leading-relaxed resize-y font-sans"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              {testimonyText.length} characters — be as detailed as possible
            </p>
          </div>
        </div>

        {/* Media Upload */}
        <div className="rounded-lg border border-border bg-card p-6 space-y-4">
          <h3 className="text-sm font-mono text-muted-foreground tracking-widest uppercase">
            Media Attachments
          </h3>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-md border-2 border-dashed transition-colors px-6 py-10 text-center ${
              isDragging
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/50 hover:bg-secondary/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,audio/*,video/*,.pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Upload media files"
            />
            <svg className="h-8 w-8 text-muted-foreground mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <p className="text-sm font-medium text-foreground">
              {isDragging ? 'Drop files here' : 'Click or drag files to upload'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Images, audio recordings, video, and documents accepted
            </p>
          </div>

          {/* File Previews */}
          {filePreviews.length > 0 && (
            <div className="space-y-3 mt-2">
              {filePreviews.map((fp, index) => (
                <div
                  key={index}
                  className="rounded-md border border-border bg-secondary overflow-hidden"
                >
                  {/* Image Preview */}
                  {fp.mediaType === 'image' && fp.previewUrl && (
                    <img
                      src={fp.previewUrl}
                      alt={fp.file.name}
                      className="w-full max-h-48 object-cover"
                    />
                  )}

                  {/* Audio Preview */}
                  {fp.mediaType === 'audio' && fp.previewUrl && (
                    <div className="p-4 bg-muted">
                      <audio controls className="w-full" src={fp.previewUrl}>
                        <track kind="captions" />
                      </audio>
                    </div>
                  )}

                  {/* Video Preview */}
                  {fp.mediaType === 'video' && fp.previewUrl && (
                    <video
                      controls
                      className="w-full max-h-48 bg-black"
                      src={fp.previewUrl}
                    >
                      <track kind="captions" />
                    </video>
                  )}

                  {/* File Info Row */}
                  <div className="flex items-center justify-between px-4 py-2.5">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs font-mono bg-card border border-border px-2 py-0.5 rounded text-muted-foreground shrink-0">
                        {mediaTypeLabel[fp.mediaType]}
                      </span>
                      <span className="text-sm text-foreground truncate">{fp.file.name}</span>
                      <span className="text-xs text-muted-foreground shrink-0">{formatBytes(fp.file.size)}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-muted-foreground hover:text-destructive transition-colors ml-3 shrink-0"
                      aria-label={`Remove ${fp.file.name}`}
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading || !tenantIdentifier || !testimonyText}
            className="flex-1 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity text-sm"
          >
            {isLoading ? 'Submitting to Evidence Locker...' : 'Submit Testimony'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-border text-muted-foreground font-medium rounded-lg hover:bg-secondary transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Legal Note */}
      <div className="rounded-lg border border-border bg-card px-5 py-4">
        <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-2">
          Legal Notice
        </p>
        <ul className="text-xs text-muted-foreground space-y-1 leading-relaxed">
          <li>All submissions are preserved with atomic timestamps for legal proceedings</li>
          <li>Evidence may be shared with HHS-OCR (#25-621293), CCRD (#202601-33270627), and SF-HRC</li>
          <li>Multiple testimonies establish systemic violations qualifying for class-action status</li>
          <li>Your submission is protected activity under federal and state law</li>
        </ul>
      </div>
    </div>
  )
}
