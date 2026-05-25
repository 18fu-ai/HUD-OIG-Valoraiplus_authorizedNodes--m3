"use client";

import { useMemo, useState } from "react";
import type { CaseDashboardPayload, CaseDocument } from "@/lib/valoraiplus/case-types";

type Props = {
  payload: CaseDashboardPayload;
};

const STATUS_ORDER = ["CRITICAL", "HIGH", "MEDIUM", "LOW"];

export default function CaseControlDashboard({ payload }: Props) {
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState<string>("all");

  const filteredDocuments = useMemo(() => {
    const lower = query.trim().toLowerCase();

    return payload.documents.filter((doc) => {
      const matchesQuery =
        !lower ||
        doc.doc_number.toLowerCase().includes(lower) ||
        doc.title.toLowerCase().includes(lower) ||
        (doc.short_description ?? "").toLowerCase().includes(lower) ||
        (doc.doc_type ?? "").toLowerCase().includes(lower);

      const matchesPriority = priority === "all" || doc.priority === priority;

      return matchesQuery && matchesPriority;
    });
  }, [payload.documents, query, priority]);

  return (
    <section className="space-y-5 rounded-2xl border p-4 shadow-sm">
      <header className="space-y-2">
        <div className="text-sm uppercase tracking-wide opacity-60">
          VALORAIPLUS Case-Control Dashboard
        </div>
        <h1 className="text-2xl font-bold">
          {payload.caseRecord?.case_number ?? "CUD-26-682107"}
        </h1>
        <p className="text-sm opacity-75">
          Public court-safe view using redacted records only. Private evidence,
          contact data, medical detail, and unredacted witness material are not
          displayed in this layer.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Metric label="Documents" value={payload.summary.total} />
        <Metric label="Filed" value={payload.summary.filed} />
        <Metric label="Critical" value={payload.summary.critical} />
        <Metric label="High" value={payload.summary.high} />
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_220px]">
        <input
          className="rounded-xl border px-3 py-2 text-sm"
          placeholder="Search document number, title, type, or description..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <select
          className="rounded-xl border px-3 py-2 text-sm"
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          <option value="all">All priorities</option>
          {STATUS_ORDER.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-3">Order</th>
              <th className="p-3">Doc</th>
              <th className="p-3">Title</th>
              <th className="p-3">Status</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map((doc) => (
              <DocumentRow key={doc.id} doc={doc} />
            ))}

            {filteredDocuments.length === 0 && (
              <tr>
                <td className="p-4 text-center opacity-60" colSpan={6}>
                  No documents match the current filters. If the database has no rows,
                  run the Phase 1 seed migration or confirm RLS/admin access.
                </td>
              </tr>
            )}
          </tbody>
        </table>
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

function DocumentRow({ doc }: { doc: CaseDocument }) {
  return (
    <tr className="border-b align-top">
      <td className="p-3">{doc.upload_order ?? "—"}</td>
      <td className="p-3 font-mono">{doc.doc_number}</td>
      <td className="p-3">
        <div className="font-medium">{doc.title}</div>
        {doc.short_description && (
          <div className="mt-1 max-w-3xl text-xs opacity-70">{doc.short_description}</div>
        )}
      </td>
      <td className="p-3">{doc.status}</td>
      <td className="p-3">{doc.priority ?? "—"}</td>
      <td className="p-3">{doc.doc_type ?? "—"}</td>
    </tr>
  );
}
