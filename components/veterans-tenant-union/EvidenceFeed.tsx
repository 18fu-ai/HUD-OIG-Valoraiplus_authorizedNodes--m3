'use client'

import { useState } from 'react'
import MediaPlayer from './MediaPlayer'

interface Media {
  id: string
  media_type: string
  file_url: string
  file_name: string
}

interface TestimonyData {
  id: string
  tenant_identifier: string
  testimony_text: string
  created_at: string
  status?: string
  media: Media[]
}

interface EvidenceFeedProps {
  testimonies: TestimonyData[]
}

export default function EvidenceFeed({ testimonies }: EvidenceFeedProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      {testimonies.map((testimony, index) => {
        const isExpanded = expandedId === testimony.id
        const date = new Date(testimony.created_at)
        const formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
        const formattedTime = date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short',
        })

        return (
          <article
            key={testimony.id}
            className="rounded-lg border border-border bg-card overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-border flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                {/* Entry Number */}
                <div className="shrink-0 h-9 w-9 rounded-md bg-secondary border border-border flex items-center justify-center">
                  <span className="text-xs font-mono font-bold text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{testimony.tenant_identifier}</h3>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">
                    {formattedDate} · {formattedTime}
                  </p>
                </div>
              </div>

              {/* Media Tags */}
              {testimony.media && testimony.media.length > 0 && (
                <div className="flex flex-wrap gap-1.5 shrink-0">
                  {testimony.media.map((m) => (
                    <span
                      key={m.id}
                      className="text-xs font-mono px-2 py-0.5 bg-secondary border border-border text-muted-foreground rounded"
                      title={m.file_name}
                    >
                      {m.media_type === 'image' ? 'IMG' : m.media_type === 'audio' ? 'AUD' : m.media_type === 'video' ? 'VID' : 'DOC'}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Testimony Text */}
            <div className="px-6 py-5">
              <p className={`text-sm text-foreground leading-relaxed whitespace-pre-wrap ${!isExpanded ? 'line-clamp-4' : ''}`}>
                {testimony.testimony_text}
              </p>

              <button
                onClick={() => setExpandedId(isExpanded ? null : testimony.id)}
                className="text-xs font-medium text-primary hover:opacity-80 transition-opacity mt-3"
              >
                {isExpanded ? 'Collapse testimony' : 'Read full testimony'}
              </button>
            </div>

            {/* Media Section — shown when expanded */}
            {isExpanded && testimony.media && testimony.media.length > 0 && (
              <div className="border-t border-border px-6 py-5 bg-background/50">
                <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-4">
                  Evidence Attachments — {testimony.media.length} file{testimony.media.length !== 1 ? 's' : ''}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {testimony.media.map((media) => (
                    <div
                      key={media.id}
                      className="rounded-md border border-border overflow-hidden bg-card"
                    >
                      {media.media_type === 'image' && (
                        <>
                          <img
                            src={media.file_url}
                            alt={media.file_name}
                            className="w-full object-cover max-h-56"
                          />
                          <div className="px-3 py-2 bg-muted border-t border-border">
                            <p className="text-xs font-mono text-muted-foreground truncate">{media.file_name}</p>
                          </div>
                        </>
                      )}

                      {media.media_type === 'audio' && (
                        <MediaPlayer
                          mediaUrl={media.file_url}
                          type="audio"
                          fileName={media.file_name}
                        />
                      )}

                      {media.media_type === 'video' && (
                        <MediaPlayer
                          mediaUrl={media.file_url}
                          type="video"
                          fileName={media.file_name}
                        />
                      )}

                      {media.media_type === 'document' && (
                        <div className="p-4 flex items-center gap-3">
                          <span className="text-xs font-mono bg-secondary border border-border px-2 py-1 rounded text-muted-foreground shrink-0">
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
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}
