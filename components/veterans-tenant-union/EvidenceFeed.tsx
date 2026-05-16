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
  media: Media[]
}

interface EvidenceFeedProps {
  testimonies: TestimonyData[]
}

export default function EvidenceFeed({ testimonies }: EvidenceFeedProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      {testimonies.map((testimony) => (
        <div
          key={testimony.id}
          className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-200 flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg text-slate-900">{testimony.tenant_identifier}</h3>
              <p className="text-sm text-slate-500">
                {new Date(testimony.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>

            {testimony.media && testimony.media.length > 0 && (
              <div className="flex gap-2">
                {testimony.media.map((m) => (
                  <span
                    key={m.id}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium"
                    title={m.file_name}
                  >
                    {m.media_type === 'image'
                      ? '🖼️ Image'
                      : m.media_type === 'audio'
                      ? '🎙️ Audio'
                      : m.media_type === 'video'
                      ? '🎬 Video'
                      : '📄 Doc'}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Testimony Text */}
          <div className="px-6 py-4">
            <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
              {testimony.testimony_text}
            </p>
          </div>

          {/* Media Section */}
          {testimony.media && testimony.media.length > 0 && (
            <div className="border-t border-slate-200 px-6 py-4 bg-slate-50">
              <button
                onClick={() => setExpandedId(expandedId === testimony.id ? null : testimony.id)}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 mb-3"
              >
                {expandedId === testimony.id ? '▼ Collapse attachments' : '▶ View attachments'}
              </button>

              {expandedId === testimony.id && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {testimony.media.map((media) => (
                    <div
                      key={media.id}
                      className="bg-white rounded-lg border border-slate-300 overflow-hidden"
                    >
                      {media.media_type === 'image' && (
                        <img
                          src={media.file_url}
                          alt={media.file_name}
                          className="w-full h-48 object-cover"
                        />
                      )}

                      {media.media_type === 'audio' && (
                        <MediaPlayer mediaUrl={media.file_url} type="audio" fileName={media.file_name} />
                      )}

                      {media.media_type === 'video' && (
                        <MediaPlayer mediaUrl={media.file_url} type="video" fileName={media.file_name} />
                      )}

                      {media.media_type === 'document' && (
                        <div className="p-4 text-center">
                          <p className="text-3xl mb-2">📄</p>
                          <a
                            href={media.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-blue-600 hover:text-blue-700 break-all"
                            title={media.file_name}
                          >
                            {media.file_name}
                          </a>
                        </div>
                      )}

                      <div className="px-3 py-2 bg-slate-50 border-t border-slate-200">
                        <p className="text-xs text-slate-600 truncate" title={media.file_name}>
                          {media.file_name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
