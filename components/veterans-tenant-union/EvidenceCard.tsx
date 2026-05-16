'use client'

import { useState } from 'react'

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

interface EvidenceCardProps {
  testimony: TestimonyData
}

export default function EvidenceCard({ testimony }: EvidenceCardProps) {
  const [showFullText, setShowFullText] = useState(false)

  const formattedDate = new Date(testimony.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const hasImages = testimony.media?.some((m) => m.media_type === 'image')

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200 hover:shadow-lg transition">
      {/* Media Preview */}
      {hasImages && (
        <div className="h-40 bg-slate-100 overflow-hidden">
          {testimony.media
            ?.filter((m) => m.media_type === 'image')
            .slice(0, 1)
            .map((media) => (
              <img
                key={media.id}
                src={media.file_url}
                alt={media.file_name}
                className="w-full h-full object-cover"
              />
            ))}
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-semibold text-slate-900">{testimony.tenant_identifier}</p>
            <p className="text-xs text-slate-500">{formattedDate}</p>
          </div>
          {testimony.media && testimony.media.length > 0 && (
            <div className="flex gap-1">
              {testimony.media.map((m) => (
                <span
                  key={m.id}
                  className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium"
                >
                  {m.media_type === 'image' ? '🖼️' : m.media_type === 'audio' ? '🎙️' : m.media_type === 'video' ? '🎬' : '📄'}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Testimony Text */}
        <p className="text-sm text-slate-700 line-clamp-3 mb-3">
          {testimony.testimony_text}
        </p>

        <button
          onClick={() => setShowFullText(!showFullText)}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          {showFullText ? 'Show less' : 'Read more'}
        </button>

        {showFullText && (
          <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-700 whitespace-pre-wrap">{testimony.testimony_text}</p>
          </div>
        )}

        {/* Media Count */}
        {testimony.media && testimony.media.length > 0 && (
          <p className="text-xs text-slate-500 mt-3">
            {testimony.media.length} attachment{testimony.media.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  )
}
