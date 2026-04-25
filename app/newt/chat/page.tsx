import { Suspense } from 'react';
import { CDSErrorBoundary } from '@/components/cds/error-boundary';
import NewtChatClient from './newt-chat-client';

export default function NEWTChatPage() {
  return (
    <CDSErrorBoundary module="N.E.W.T. Chat" showDetails>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-slate-950 text-emerald-500 font-mono">
            <div className="text-center">
              <div className="animate-pulse text-2xl mb-2">N.E.W.T.</div>
              <div className="text-sm text-emerald-700">Initializing Sovereign Auditor...</div>
            </div>
          </div>
        }
      >
        <NewtChatClient />
      </Suspense>
    </CDSErrorBoundary>
  );
}
