import { getSupabaseAnonClient } from "@/lib/valoraiplus/supabase-server";
import type { CaseDashboardPayload, CaseDocument, CaseRecord } from "@/lib/valoraiplus/case-types";

export async function getCaseDashboardPayload(
  caseNumber = "CUD-26-682107"
): Promise<CaseDashboardPayload> {
  const supabase = getSupabaseAnonClient();

  const { data: caseRecord, error: caseError } = await supabase
    .from("cases")
    .select("*")
    .eq("case_number", caseNumber)
    .maybeSingle();

  if (caseError) {
    return emptyPayload(null);
  }

  if (!caseRecord) {
    return emptyPayload(null);
  }

  const { data: documents, error: documentError } = await supabase
    .from("public_court_documents")
    .select("*")
    .eq("case_id", caseRecord.id)
    .order("upload_order", { ascending: true, nullsFirst: false })
    .order("doc_number", { ascending: true });

  if (documentError) {
    return emptyPayload(caseRecord as CaseRecord);
  }

  const docs = (documents ?? []) as CaseDocument[];

  return {
    caseRecord: caseRecord as CaseRecord,
    documents: docs,
    summary: summarizeDocuments(docs),
  };
}

function emptyPayload(caseRecord: CaseRecord | null): CaseDashboardPayload {
  return {
    caseRecord,
    documents: [],
    summary: {
      total: 0,
      filed: 0,
      pending: 0,
      lodged: 0,
      active: 0,
      critical: 0,
      high: 0,
    },
  };
}

function summarizeDocuments(documents: CaseDocument[]) {
  return {
    total: documents.length,
    filed: documents.filter((doc) => doc.status === "FILED").length,
    pending: documents.filter((doc) => doc.status === "PENDING").length,
    lodged: documents.filter((doc) => doc.status === "LODGED").length,
    active: documents.filter((doc) => doc.status === "ACTIVE").length,
    critical: documents.filter((doc) => doc.priority === "CRITICAL").length,
    high: documents.filter((doc) => doc.priority === "HIGH").length,
  };
}
