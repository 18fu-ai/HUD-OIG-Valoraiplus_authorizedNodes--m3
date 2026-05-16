'use client'

import { useState, useEffect } from 'react'
import EvidenceCard from '@/components/veterans-tenant-union/EvidenceCard'
import EvidenceFeed from '@/components/veterans-tenant-union/EvidenceFeed'

interface Testimony {
  id: string
  tenant_identifier: string
  testimony_text: string
  created_at: string
  media: Array<{
    id: string
    media_type: string
    file_url: string
    file_name: string
  }>
}

export default function EvidenceLockerPage() {
  const [testimonies, setTestimonies] = useState<Testimony[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'feed'>('feed')

  useEffect(() => {
    const fetchTestimonies = async () => {
      try {
        const response = await fetch('/api/veterans-tenant-union/testimonies')
        if (!response.ok) {
          throw new Error('Failed to fetch testimonies')
        }
        const data = await response.json()
        setTestimonies(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonies()
  }, [])

  const filteredTestimonies = testimonies.filter((testimony) =>
    testimony.testimony_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimony.tenant_identifier.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Evidence Locker</h2>
        
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search testimonies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('feed')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                viewMode === 'feed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              Feed View
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              Grid View
            </button>
          </div>
        </div>

        <div className="text-sm text-slate-600">
          {filteredTestimonies.length} testimony{filteredTestimonies.length !== 1 ? 'ies' : ''} found
        </div>
      </div>

      {isLoading && (
        <div className="text-center py-12">
          <p className="text-slate-600">Loading evidence...</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-medium">{error}</p>
        </div>
      )}

      {!isLoading && filteredTestimonies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-600">No testimonies yet. Be the first to submit.</p>
        </div>
      )}

      {!isLoading && filteredTestimonies.length > 0 && (
        <>
          {viewMode === 'feed' && (
            <EvidenceFeed testimonies={filteredTestimonies} />
          )}
          
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTestimonies.map((testimony) => (
                <EvidenceCard key={testimony.id} testimony={testimony} />
              ))}
            </div>
          )}
        </>
      )}

      <div className="mt-12 p-6 bg-slate-100 border border-slate-300 rounded-lg">
        <h3 className="font-semibold text-slate-900 mb-2">Evidence Guidelines</h3>
        <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
          <li>All submissions are preserved with timestamps for legal proceedings</li>
          <li>Include specific dates, times, names, and locations</li>
          <li>Media attachments strengthen your evidence</li>
          <li>This evidence may be shared with federal investigators (HHS-OCR, CCRD)</li>
          <li>All testimonies are treated as confidential legal documentation</li>
        </ul>
      </div>
    </div>
  )
}
