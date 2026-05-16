'use client'

import { useState } from 'react'
import MediaPlayer from './MediaPlayer'

interface Media {
  id: string
  media_type: string
  file_url: string
  file_name: string
  mime_type?: string
}

interface TestimonyData {
  id: string
  tenant_identifier: string
  testimony_text: string
  created_at: string
  status?: string
  media: Media[]
}

interface EvidenceCardProps {
  testimony: TestimonyData
}

const mediaTypeIcon: Record<string, string> = {
  image: 'IMG',
  audio: 'AUD',
  video: 'VID',
  document: 'DOC',
}

export default function EvidenceCard({ testimony }: EvidenceCardProps) {
  const [expanded, setExpanded] = useState(false)

  const date = new Date(testimony.created_at)
  const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  const hasImages = testimony.media?.some((m) => m.media_type === 'image')
  const previewImage = testimony.media?.find((m) => m.media_type === 'image')
  const mediaCounts = testimony.media?.reduce(
    (acc, m) => { acc[m.media_type] = (acc[m.media_type] || 0) + 1; return acc },
    {} as Record<string, number>
  )

  return (
    <article className="rounded-lg border border-border bg-card overflow-hidden flex flex-col hover:border-primary/40 transition-colors">
      {/* Image Thumbnail */}
      {hasImages && previewImage && (
        <div className="h-36 bg-muted overflow-hidden">
          <img
            src={previewImage.file_url}
            alt={previewImage.file_name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-4 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="min-w-0">
            <p className="font-semibold text-foreground text-sm truncate">{testimony.tenant_identifier}</p>
            <p className="text-xs text-muted-foreground font-mono">{formattedDate} · {formattedTime}</p>
          </div>
          {mediaCounts && Object.keys(mediaCounts).length > 0 && (
            <div className="flex gap-1 shrink-0">
              {Object.entries(mediaCounts).map(([type, count]) => (
                <span
                  key={type}
                  className="text-xs font-mono px-1.5 py-0.5 bg-secondary text-muted-foreground border border-border rounded"
                >
                  {count} {mediaTypeIcon[type] || type.toUpperCase()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Testimony Text */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 flex-1">
          {testimony.testimony_text}
        </p>

        {/* Expand Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-medium text-primary hover:opacity-80 transition-opacity mt-3 text-left"
        >
          {expanded ? 'Collapse' : 'View full testimony'}
        </button>

        {/* Expanded Content */}
        {expanded && (
          <div className="mt-3 space-y-3">
            <div className="rounded-md border border-border bg-background p-3">
              <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                {testimony.testimony_text}
              </p>
            </div>

            {/* Media Attachments */}
            {testimony.media && testimony.media.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
                  Attachments
                </p>
                {testimony.media.map((media) => (
                  <div key={media.id} className="rounded-md border border-border overflow-hidden">
                    {media.media_type === 'image' && (
                      <img
                        src={media.file_url}
                        alt={media.file_name}
                        className="w-full object-cover"
                      />
                    )}
                    {media.media_type === 'audio' && (
                      <MediaPlayer mediaUrl={media.file_url} type="audio" fileName={media.file_name} />
                    )}
                    {media.media_type === 'video' && (
                      <MediaPlayer mediaUrl={media.file_url} type="video" fileName={media.file_name} />
                    )}
                    {media.media_type === 'document' && (
                      <div className="p-3 flex items-center gap-3">
                        <span className="text-xs font-mono bg-secondary px-2 py-1 rounded border border-border text-muted-foreground">
                          DOC
                        </span>
                        <a
                          href={media.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline truncate"
                        >
                          {media.file_name}
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
