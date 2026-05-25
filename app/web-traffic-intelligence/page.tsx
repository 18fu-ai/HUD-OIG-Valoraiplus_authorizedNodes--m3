import AccessAuditDashboard from "@/components/cds/access-audit-dashboard";
import { getSupabaseServiceClient } from "@/lib/valoraiplus/supabase-server";
import type { AccessSummaryRow, CategoryBreakdownRow } from "@/lib/valoraiplus/case-types";

export const dynamic = "force-dynamic";

export default async function WebTrafficIntelligencePage() {
  const { summaryRows, categoryRows } = await getTrafficRows();

  return (
    <main className="mx-auto max-w-7xl p-4">
      <AccessAuditDashboard
        summaryRows={summaryRows}
        categoryRows={categoryRows}
        refreshSeconds={60}
      />
    </main>
  );
}

async function getTrafficRows(): Promise<{
  summaryRows: AccessSummaryRow[];
  categoryRows: CategoryBreakdownRow[];
}> {
  try {
    const supabase = getSupabaseServiceClient();

    const [summary, category] = await Promise.all([
      supabase
        .from("valoraiplus_access_summary_public_safe")
        .select("*")
        .order("hour_bucket", { ascending: false })
        .limit(100),
      supabase
        .from("valoraiplus_request_category_breakdown")
        .select("*")
        .order("total_hits", { ascending: false })
        .limit(20),
    ]);

    return {
      summaryRows: (summary.data ?? []) as AccessSummaryRow[],
      categoryRows: (category.data ?? []) as CategoryBreakdownRow[],
    };
  } catch {
    return {
      summaryRows: [],
      categoryRows: [],
    };
  }
}
