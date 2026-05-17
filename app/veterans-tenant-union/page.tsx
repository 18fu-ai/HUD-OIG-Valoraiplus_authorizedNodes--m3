import Link from 'next/link'

export default function VeteransTenantUnionPage() {
  const stats = [
    { label: 'Active Investigators', value: '3', note: 'HHS-OCR · CCRD · SF-HRC' },
    { label: 'Federal Case Numbers', value: '2', note: '#25-621293 · #202601-33270627' },
    { label: 'VTU Executive Members', value: '5', note: 'Donny · Jeff · Dan · Dan L. · Robert' },
    { label: 'Evidence Nodes', value: '5', note: 'Elder abuse · RICO · Negligence · IP · Tags' },
  ]

  const nodes = [
    {
      id: 'NODE 1',
      title: 'Aggravated Elder & Dependent Adult Abuse',
      statute: 'CA Penal Code §368',
      description:
        'Sunday meal services terminated following $50,000 Little Caesars donation. Management taunted hungry, mentally ill veterans with personal DoorDash deliveries in full view of the community.',
      severity: 'critical',
    },
    {
      id: 'NODE 2',
      title: 'RICO Enterprise & IP Theft',
      statute: '18 U.S.C. §1962',
      description:
        'Staff reverse-engineered and stole research from the Tenant Secretary\'s Doctoral Dissertation (Chapter 31). Stolen IP utilized to build the SMTP 550 Mimecast email blockade suppressing Union coordination.',
      severity: 'critical',
    },
    {
      id: 'NODE 3',
      title: 'Criminal Negligence — "Not My Job" Default',
      statute: 'Federal Supportive Housing Contract Breach',
      description:
        'Management explicitly stated managing protocol for deceased veterans is "not his job." Refusal to report illegal drug manufacturing creates a safety vacuum directly contributing to veteran deaths.',
      severity: 'high',
    },
    {
      id: 'NODE 4',
      title: 'Interference with Federal Vocational Rehabilitation',
      statute: '38 U.S.C. §3101 · Chapter 31',
      description:
        'Biohazard constructive eviction strategy — rat and cockroach infestation of Unit 301 — deployed to derail the Secretary\'s Doctorate and Chapter 31 progress.',
      severity: 'high',
    },
    {
      id: 'NODE 5',
      title: 'Administrative Lawlessness',
      statute: 'CA Vehicle Code §4000',
      description:
        'Property Manager operates a vehicle in the facility lot with 2022 license plates (four years expired). A manager in total defiance of state law lacks legal credibility to administer federal housing funds.',
      severity: 'medium',
    },
  ]

  const severityStyles: Record<string, string> = {
    critical: 'text-destructive border-destructive/40 bg-destructive/10',
    high: 'text-yellow-400 border-yellow-400/40 bg-yellow-400/10',
    medium: 'text-accent border-accent/40 bg-accent/10',
  }

  return (
    <div className="space-y-10">
      {/* Status Banner */}
      <div className="rounded-lg border border-primary/30 bg-primary/10 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-primary tracking-widest uppercase mb-1">
            CCRS Portal Status — Vesting Active
          </p>
          <p className="text-foreground font-semibold">
            Union Declaration filed. Systemic Investigation Division triggered.
          </p>
        </div>
        <Link
          href="/veterans-tenant-union/submit"
          className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-md hover:opacity-90 transition-opacity"
        >
          Submit Testimony
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-card p-5">
            <p className="text-3xl font-bold text-primary">{stat.value}</p>
            <p className="text-sm font-medium text-foreground mt-1">{stat.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.note}</p>
          </div>
        ))}
      </div>

      {/* Evidence Nodes */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-5 tracking-tight">
          Liability Nodes — CCRS Portal Memorialized
        </h2>
        <div className="space-y-3">
          {nodes.map((node) => (
            <div
              key={node.id}
              className="rounded-lg border border-border bg-card p-5 flex gap-5 items-start"
            >
              <div className="shrink-0">
                <span
                  className={`inline-block text-xs font-mono font-bold px-2 py-1 rounded border ${severityStyles[node.severity]}`}
                >
                  {node.id}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h3 className="font-semibold text-foreground">{node.title}</h3>
                  <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                    {node.statute}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{node.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VTU Executive Branch */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-sm font-mono text-muted-foreground tracking-widest uppercase mb-4">
          VTU Executive Branch — Signatory Authority
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            { name: 'Dr. Donny Gillson', role: 'Secretary, Principal Architect — VALORAIPLUS®', age: 56 },
            { name: 'Jeff', role: 'Executive Member', age: 68 },
            { name: 'Dan', role: 'Executive Member', age: 76 },
            { name: 'Dan Lucian', role: 'Executive Member', age: 63 },
            { name: 'Robert', role: 'Executive Member', age: 61 },
          ].map((member) => (
            <div key={member.name} className="flex items-center gap-3 bg-secondary rounded-md px-4 py-2.5">
              <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">{member.name[0]}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role} · Age {member.age}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/veterans-tenant-union/submit"
          className="flex-1 text-center px-6 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          Submit Your Testimony
        </Link>
        <Link
          href="/veterans-tenant-union/evidence-locker"
          className="flex-1 text-center px-6 py-4 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/80 transition-colors"
        >
          View Evidence Locker
        </Link>
      </div>
    </div>
  )
}
