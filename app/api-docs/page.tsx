/**
 * VALORAIPLUS API DOCUMENTATION PAGE
 * Route 71: API Documentation System // v1.4.100D // REV_33
 * 
 * AMATH EXECUTIVE RULE:
 * This is a SERVER COMPONENT that exports route segment config.
 * The client component is imported dynamically to prevent SSR issues.
 * 
 * FIX LOGIC:
 * 1. force-dynamic prevents iad1 build worker export failure
 * 2. Client component handles all browser API access (window, navigator)
 * 3. Clean separation of server config and client interactivity
 * 
 * ANCHOR: SAINT PAUL NODE █████
 * SOVEREIGN: [SOVEREIGN_AUDITOR]
 */

import APIDocsClient from './api-docs-client';

// Route segment config - prevents static export errors
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export const metadata = {
  title: 'VALORAIPLUS API Documentation | REV_33',
  description: 'Sovereign REST Architecture - API endpoint documentation for the VALORAIPLUS intelligence platform.',
};

export default function APIDocsPage() {
  return <APIDocsClient />;
}
