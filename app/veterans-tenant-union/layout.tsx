'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function VeteransTenantUnionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-mono text-primary tracking-widest uppercase">
                  SGAU-7226.3461 // Saint Paul Node
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-mono text-muted-foreground">ACTIVE</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight text-balance">
                Veterans Tenant Union
              </h1>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                Secure evidence collection platform — testimony, media, and documentation for federal investigators
              </p>
            </div>
            <div className="hidden md:flex flex-col items-end gap-1 text-right">
              <span className="text-xs font-mono text-muted-foreground">VALORAIPLUS®</span>
              <span className="text-xs font-mono text-muted-foreground">N.E.W.T.™ AUTHORIZED</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex gap-2 mt-5" aria-label="VTU navigation">
            <Link
              href="/veterans-tenant-union"
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === '/veterans-tenant-union'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              Overview
            </Link>
            <Link
              href="/veterans-tenant-union/submit"
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === '/veterans-tenant-union/submit'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              Submit Testimony
            </Link>
            <Link
              href="/veterans-tenant-union/evidence-locker"
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === '/veterans-tenant-union/evidence-locker'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              Evidence Locker
            </Link>
            <Link
              href="/veterans-tenant-union/court-compiler"
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === '/veterans-tenant-union/court-compiler'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              Court PDF Compiler
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  )
}
