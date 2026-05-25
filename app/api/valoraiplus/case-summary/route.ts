import { NextResponse } from "next/server";
import { getCaseDashboardPayload } from "@/lib/valoraiplus/case-queries";

export const runtime = "nodejs";

export async function GET() {
  try {
    const payload = await getCaseDashboardPayload("CUD-26-682107");

    return NextResponse.json({
      ok: true,
      status: "loaded",
      ...payload,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        status: "error",
        reason: error instanceof Error ? error.message : "unknown_error",
      },
      { status: 500 }
    );
  }
}
