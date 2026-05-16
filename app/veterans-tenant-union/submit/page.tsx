'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SubmitTestimonyPage() {
  const router = useRouter()
  const [tenantIdentifier, setTenantIdentifier] = useState('')
  const [testimonyText, setTestimonyText] = useState('')
  const [mediaFiles, setMediaFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMediaFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('tenant_identifier', tenantIdentifier)
      formData.append('testimony_text', testimonyText)

      mediaFiles.forEach((file, index) => {
        formData.append(`media_${index}`, file)
      })

      const response = await fetch('/api/veterans-tenant-union/submit', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to submit testimony')
      }

      setSuccess(true)
      setTenantIdentifier('')
      setTestimonyText('')
      setMediaFiles([])

      setTimeout(() => {
        router.push('/veterans-tenant-union/evidence-locker')
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Submit Your Testimony</h2>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">Testimony submitted successfully! Redirecting...</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tenant Identifier */}
          <div>
            <label htmlFor="tenant_identifier" className="block text-sm font-medium text-slate-700 mb-2">
              Your Name / Tenant Identifier *
            </label>
            <input
              id="tenant_identifier"
              type="text"
              value={tenantIdentifier}
              onChange={(e) => setTenantIdentifier(e.target.value)}
              placeholder="e.g., John Smith, Veteran #123"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-slate-500 mt-1">How should we identify your submission?</p>
          </div>

          {/* Testimony Text */}
          <div>
            <label htmlFor="testimony_text" className="block text-sm font-medium text-slate-700 mb-2">
              Your Testimony *
            </label>
            <textarea
              id="testimony_text"
              value={testimonyText}
              onChange={(e) => setTestimonyText(e.target.value)}
              placeholder="Share your experience and observations. Include dates, names, and specific incidents."
              required
              rows={8}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans"
            />
            <p className="text-xs text-slate-500 mt-1">Be as detailed as possible to support the evidence</p>
          </div>

          {/* Media Upload */}
          <div>
            <label htmlFor="media_files" className="block text-sm font-medium text-slate-700 mb-2">
              Attach Media (Optional)
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
              <input
                id="media_files"
                type="file"
                multiple
                accept="image/*,audio/*,video/*,.pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="media_files"
                className="cursor-pointer block"
              >
                <p className="text-slate-600 font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-500 mt-1">Supports images, audio, video, and documents</p>
              </label>
            </div>

            {mediaFiles.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-slate-700 mb-2">Selected files:</p>
                <ul className="space-y-2">
                  {mediaFiles.map((file, index) => (
                    <li key={index} className="flex items-center justify-between p-2 bg-slate-100 rounded">
                      <span className="text-sm text-slate-700">{file.name}</span>
                      <span className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {isLoading ? 'Submitting...' : 'Submit Testimony'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Why Your Testimony Matters</h3>
        <ul className="text-sm text-blue-900 space-y-1 list-disc list-inside">
          <li>Your testimony documents patterns of institutional failure</li>
          <li>This evidence supports federal investigations (HHS-OCR, CCRD)</li>
          <li>Multiple testimonies establish systemic violations</li>
          <li>Your experience may help protect other veterans</li>
        </ul>
      </div>
    </div>
  )
}
