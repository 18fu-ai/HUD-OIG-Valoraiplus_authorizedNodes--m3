import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { GlobalNav } from '@/components/global-nav'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'VALORAIPLUS_ VALORAIPLUS2e_ VALORAIPLUS3e_ // MANUS.AI PORT.HOLE',
  description: 'Eternal Universal Dividend. Gen X Retirement Age 56. Zero-Drift Biometric Sovereignty. Made in the USA.',
  generator: 'v0.app',
  icons: {
    icon: '/icon',
    apple: '/apple-icon',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body className="font-sans antialiased bg-background text-foreground">
        <GlobalNav />
        <main className="min-h-[calc(100vh-3.5rem)]">
          {children}
        </main>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
