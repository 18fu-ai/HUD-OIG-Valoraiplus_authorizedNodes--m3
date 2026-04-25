import { CDSErrorBoundary } from '@/components/cds/error-boundary';
import NewtChatClient from './newt-chat-client';

export default function NEWTChatPage() {
  return (
    <CDSErrorBoundary module="N.E.W.T. Chat" showDetails>
      <NewtChatClient />
    </CDSErrorBoundary>
  );
}
