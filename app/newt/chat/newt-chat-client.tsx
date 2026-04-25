'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import NewtChatRuntime from './newt-chat-runtime';

/**
 * NewtChatClient — Mounted Gate Wrapper
 * 
 * This component gates the rendering of NewtChatRuntime until after
 * the component has mounted on the client. This prevents useChat()
 * from running during SSR/static export, which would break the build.
 */
export default function NewtChatClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-emerald-500 font-mono text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-lg">N.E.W.T.</p>
          <p className="text-sm text-emerald-700 mt-2">Initializing Sovereign Auditor...</p>
        </div>
      </div>
    );
  }

  return <NewtChatRuntime />;
}
