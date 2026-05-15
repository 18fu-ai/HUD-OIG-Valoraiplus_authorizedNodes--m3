'use client';

import React, { useState } from 'react';
import { Download, Loader, AlertCircle } from 'lucide-react';

export function IntelligenceReportButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReport = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/intelligence/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'VALORAIPLUS SUPREME INTELLIGENCE REPORT',
          classification: 'TERMINAL EXTINCTION LEVEL',
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate report');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `VALORAIPLUS-Supreme-Intelligence-Report-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('[v0] Report generation failed:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleGenerateReport}
        disabled={loading}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_-4px_#f59e0b] disabled:shadow-none"
      >
        {loading ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Generating Report...
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            Download Supreme Intelligence Report (30-page PDF)
          </>
        )}
      </button>

      {error && (
        <div className="flex gap-2 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>{error}</div>
        </div>
      )}

      <p className="text-xs text-zinc-400">
        Generates a comprehensive 30-page PDF with full intelligence analysis, federal investigation status,
        compliance data, financial recovery matrix, blockchain activity, litigation intelligence, and operational metrics.
        Classification: TERMINAL EXTINCTION LEVEL
      </p>
    </div>
  );
}
