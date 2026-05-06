'use client';

import { useState } from 'react';
import { DocumentSidebar } from '@/components/docs/document-sidebar';
import { DocumentViewer } from '@/components/docs/document-viewer';
import { DocumentSearch } from '@/components/docs/document-search';

export default function DocumentationPage() {
  const [selectedSection, setSelectedSection] = useState('security-architecture');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-mono font-bold text-foreground">
                Documentation Portal
              </h1>
              <p className="text-sm text-muted-foreground font-mono">
                REV 45 | Comprehensive Reference Report | SGAU 7226.3461
              </p>
            </div>
            <DocumentSearch query={searchQuery} onQueryChange={setSearchQuery} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        <DocumentSidebar 
          selectedSection={selectedSection} 
          onSelectSection={setSelectedSection}
          searchQuery={searchQuery}
        />
        <DocumentViewer section={selectedSection} />
      </div>
    </div>
  );
}
