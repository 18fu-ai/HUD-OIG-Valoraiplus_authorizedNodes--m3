import type { Metadata } from "next";
import { InternalDashboard } from "@/components/valoraiplus/internal-dashboard";

export const metadata: Metadata = {
  title: "VALORAIPLUS | Internal Case-Control Dashboard",
  description:
    "Internal case-control and privacy-preserving access-audit dashboard. Not a court docket. Not formal service. Not proof of filing.",
};

export default function InternalDashboardPage() {
  return <InternalDashboard />;
}
