"use client";

import type { AccessSummaryRow, CategoryBreakdownRow } from "@/lib/valoraiplus/case-types";

type Props = {
  summaryRows: AccessSummaryRow[];
  categoryRows: CategoryBreakdownRow[];
  refreshSeconds?: number;
};

export default function AccessAuditDashboard({
  summaryRows,
  categoryRows,
  refreshSeconds = 60,
}: Props) {
  const totalHits = summaryRows.reduce((sum, row) => sum + Number(row.total_hits || 0), 0);
  const totalAnomalies = summaryRows.reduce((sum, row) => sum + Number(row.anomaly_hits || 0), 0);
  const totalPdf = summaryRows.reduce((sum, row) => sum + Number(row.pdf_hits || 0), 0);

  return (
    <section className="space-y-4 rounded-2xl border p-4 shadow-sm">
      <header>
        <h1 className="text-2xl font-bold">VALORAIPLUS Access Audit</h1>
        <p className="mt-1 text-sm opacity-75">
          Privacy-preserving access audit for owned infrastructure. Refresh target:
          every {refreshSeconds} seconds.
        </p>
      </header>

      <div className="rounded-xl border p-3 text-sm leading-6 opacity-85">
        Raw IP addresses and raw user-agent strings are not stored. Visitor and session
        identifiers are HMAC-SHA256 hashes only. This dashboard is for security
        monitoring, access-pattern review, and evidence-preservation support.
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Metric label="Total hits" value={totalHits} />
        <Metric label="PDF hits" value={totalPdf} />
        <Metric label="Anomalies" value={totalAnomalies} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TablePanel
          title="Request category breakdown"
          headers={["Category", "Hits", "Anomalies", "Bot-like"]}
          rows={categoryRows.map((row) => [
            row.request_category,
            row.total_hits,
            row.anomaly_hits,
            row.bot_like_hits,
          ])}
        />

        <TablePanel
          title="Hourly summary"
          headers={["Hour", "Category", "Country", "Hits"]}
          rows={summaryRows.map((row) => [
            new Date(row.hour_bucket).toLocaleString(),
            row.request_category,
            row.country_code ?? "unknown",
            row.total_hits,
          ])}
        />
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border p-3">
      <div className="text-xs uppercase tracking-wide opacity-60">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}

function TablePanel({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: string[];
  rows: Array<Array<string | number>>;
}) {
  return (
    <div className="rounded-xl border p-3">
      <h2 className="mb-2 font-semibold">{title}</h2>
      <div className="max-h-80 overflow-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              {headers.map((header) => (
                <th className="py-2" key={header}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr className="border-b" key={index}>
                {row.map((cell, cellIndex) => (
                  <td className="py-2" key={cellIndex}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td className="py-4 text-center opacity-60" colSpan={headers.length}>
                  No rows available yet. Apply telemetry migrations or wait for traffic.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
