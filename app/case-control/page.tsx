import CaseControlDashboard from "@/components/cds/case-control-dashboard";
import { getCaseDashboardPayload } from "@/lib/valoraiplus/case-queries";

export const dynamic = "force-dynamic";

export default async function CaseControlPage() {
  const payload = await getCaseDashboardPayload("CUD-26-682107");

  return (
    <main className="mx-auto max-w-7xl p-4">
      <CaseControlDashboard payload={payload} />
    </main>
  );
}
