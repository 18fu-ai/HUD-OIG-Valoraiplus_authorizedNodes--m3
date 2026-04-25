// Force dynamic rendering to prevent static export issues with useChat
export const dynamic = 'force-dynamic';

export default function NEWTChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
