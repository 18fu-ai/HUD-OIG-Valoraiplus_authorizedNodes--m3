export default function VeteransTenantUnionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-slate-900">Veterans Tenant Union</h1>
          <p className="text-slate-600 mt-2">Collect and organize tenant testimonies as evidence</p>
        </div>
      </div>
      
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-4">
          <a
            href="/veterans-tenant-union/submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Submit Testimony
          </a>
          <a
            href="/veterans-tenant-union/evidence-locker"
            className="px-4 py-2 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition"
          >
            Evidence Locker
          </a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
