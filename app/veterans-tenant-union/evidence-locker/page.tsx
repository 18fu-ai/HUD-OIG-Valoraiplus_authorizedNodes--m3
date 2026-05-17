'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import EvidenceCard from '@/components/veterans-tenant-union/EvidenceCard'
import EvidenceFeed from '@/components/veterans-tenant-union/EvidenceFeed'

interface Testimony {
  id: string
  tenant_identifier: string
  testimony_text: string
  created_at: string
  status?: string
  media: Array<{
    id: string
    media_type: string
    file_url: string
    file_name: string
  }>
}

type ViewMode = 'feed' | 'grid'
type MediaFilter = 'all' | 'image' | 'audio' | 'video' | 'document'

export default function EvidenceLockerPage() {
  const [testimonies, setTestimonies] = useState<Testimony[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('feed')
  const [mediaFilter, setMediaFilter] = useState<MediaFilter>('all')

  useEffect(() => {
    const fetchTestimonies = async () => {
      try {
        const response = await fetch('/api/veterans-tenant-union/testimonies')
        if (!response.ok) throw new Error('Failed to fetch testimonies')
        const data = await response.json()
        setTestimonies(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load evidence')
      } finally {
        setIsLoading(false)
      }
    }
    fetchTestimonies()
  }, [])

  const filtered = testimonies.filter((t) => {
    const matchesSearch =
      !searchTerm ||
      t.testimony_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.tenant_identifier.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMedia =
      mediaFilter === 'all' ||
      t.media?.some((m) => m.media_type === mediaFilter)
    return matchesSearch && matchesMedia
  })

  const totalMedia = testimonies.reduce((acc, t) => acc + (t.media?.length || 0), 0)

  const mediaFilterOptions: { value: MediaFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'image', label: 'Images' },
    { value: 'audio', label: 'Audio' },
    { value: 'video', label: 'Video' },
    { value: 'document', label: 'Documents' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground tracking-tight">Evidence Locker</h2>
          <p className="text-muted-foreground text-sm mt-1">
            All submitted testimonies, preserved with timestamps for federal investigators
          </p>
        </div>
        <Link
          href="/veterans-tenant-union/submit"
          className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-md hover:opacity-90 transition-opacity shrink-0"
        >
          + Submit Testimony
        </Link>
      </div>

      {/* Stats Row */}
      {!isLoading && !error && (
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-border bg-card px-4 py-3">
            <p className="text-2xl font-bold text-foreground">{testimonies.length}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Total Testimonies</p>
          </div>
          <div className="rounded-lg border border-border bg-card px-4 py-3">
            <p className="text-2xl font-bold text-foreground">{totalMedia}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Media Attachments</p>
          </div>
          <div className="rounded-lg border border-border bg-card px-4 py-3">
            <p className="text-2xl font-bold text-foreground">{filtered.length}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Matching Filter</p>
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Search testimonies by name or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Media Filter */}
        <div className="flex gap-1">
          {mediaFilterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setMediaFilter(opt.value)}
              className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                mediaFilter === opt.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex gap-1 border border-border rounded-md overflow-hidden">
          <button
            onClick={() => setViewMode('feed')}
            aria-label="Feed view"
            className={`px-3 py-2 transition-colors ${
              viewMode === 'feed' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
            className={`px-3 py-2 transition-colors ${
              viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Result Count */}
      <p className="text-xs font-mono text-muted-foreground">
        {isLoading ? 'Loading evidence...' : `${filtered.length} entr${filtered.length !== 1 ? 'ies' : 'y'} found`}
        {searchTerm && ` matching "${searchTerm}"`}
      </p>

      {/* Loading */}
      {isLoading && (
        <div className="py-20 text-center">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Loading evidence locker...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-5 py-4">
          <p className="text-sm text-destructive font-medium">{error}</p>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !error && filtered.length === 0 && (
        <div className="py-20 text-center rounded-lg border border-border bg-card">
          <svg className="h-10 w-10 text-muted-foreground mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
          <p className="text-muted-foreground text-sm font-medium mb-4">
            {searchTerm ? 'No testimonies match your search' : 'No testimonies submitted yet'}
          </p>
          {!searchTerm && (
            <Link
              href="/veterans-tenant-union/submit"
              className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-md hover:opacity-90 transition-opacity"
            >
              Submit the first testimony
            </Link>
          )}
        </div>
      )}

      {/* Evidence Display */}
      {!isLoading && !error && filtered.length > 0 && (
        <>
          {viewMode === 'feed' && <EvidenceFeed testimonies={filtered} />}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((testimony) => (
                <EvidenceCard key={testimony.id} testimony={testimony} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Legal Footer */}
      <div className="rounded-lg border border-border bg-card px-5 py-4 mt-8">
        <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-2">
          Evidence Guidelines
        </p>
        <ul className="text-xs text-muted-foreground space-y-1 leading-relaxed">
          <li>All submissions are preserved with atomic timestamps for legal proceedings</li>
          <li>Include specific dates, times, names, and locations in your testimony</li>
          <li>Evidence may be shared with HHS-OCR, CCRD, SF-HRC, and other investigators</li>
          <li>All testimonies are treated as confidential legal documentation</li>
        </ul>
      </div>
    </div>
  )
}
