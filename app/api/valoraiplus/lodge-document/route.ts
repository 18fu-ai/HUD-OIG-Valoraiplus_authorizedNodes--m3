import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServiceClient } from "@/lib/valoraiplus/supabase-server";

/**
 * LEGAL NOTICE — STATUS MODEL
 *
 * This API creates an INTERNAL lodging record only.
 * It does NOT file any document with any court.
 *
 * Permitted internal statuses:
 *   READY_FOR_MANUAL_LODGING     — document is prepared and staged
 *   SUBMITTED_PENDING_CLERK_REVIEW — submitted to court/Rapid Legal, awaiting confirmation
 *   RECEIVED_BY_COURT             — court has confirmed receipt
 *   FILED                         — court has confirmed filing (clerk endorsement required)
 *
 * FILED status may ONLY be set after obtaining a court filing confirmation,
 * transaction number, or clerk endorsement per California Rule of Court 2.259.
 *
 * This tool does not replace Rapid Legal, eCourt, the clerk's filing
 * confirmation, proof of service, or the official court docket.
 */

type InternalLodgingStatus =
  | "READY_FOR_MANUAL_LODGING"
  | "SUBMITTED_PENDING_CLERK_REVIEW"
  | "RECEIVED_BY_COURT"
  | "FILED";

interface LodgeDocumentRequest {
  document_id?: string;
  doc_number?: string;
  case_number?: string;
  actor_role?: string;
  internal_status?: InternalLodgingStatus;
  court_filing_reference?: string | null;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LodgeDocumentRequest;

    const {
      document_id,
      doc_number,
      case_number,
      actor_role = "defendant",
      internal_status = "READY_FOR_MANUAL_LODGING",
      court_filing_reference = null,
    } = body;

    // Reject FILED status without a court filing reference
    if (internal_status === "FILED" && !court_filing_reference) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "FILED status requires court_filing_reference (clerk endorsement, transaction number, or eCourt confirmation). Per California Rule of Court 2.259, the court's filing confirmation is required before FILED status may be recorded.",
        },
        { status: 400 }
      );
    }

    if (!document_id && !doc_number) {
      return NextResponse.json(
        {
          ok: false,
          error: "Missing document_id or doc_number",
        },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServiceClient();
    const now = new Date().toISOString();

    // Step 1: Find the document
    let doc = null;
    if (document_id) {
      const { data } = await supabase
        .from("documents")
        .select("*")
        .eq("id", document_id)
        .single();
      doc = data;
    } else if (doc_number) {
      const { data } = await supabase
        .from("documents")
        .select("*")
        .eq("doc_number", doc_number)
        .single();
      doc = data;
    }

    if (!doc) {
      return NextResponse.json(
        {
          ok: false,
          error: "Document not found",
        },
        { status: 404 }
      );
    }

    // Step 2: Update document internal status (NOT necessarily FILED)
    const dbStatus = internal_status === "FILED" ? "FILED" : "STAGED";
    const { error: updateError } = await supabase
      .from("documents")
      .update({
        doc_status: dbStatus,
        ...(internal_status === "FILED" ? { filed_at: now } : {}),
        updated_at: now,
      })
      .eq("id", doc.id);

    if (updateError) {
      return NextResponse.json(
        {
          ok: false,
          error: `Failed to update document status: ${updateError.message}`,
        },
        { status: 500 }
      );
    }

    // Step 3: Log the internal lodging event
    const { error: eventError } = await supabase
      .from("document_events")
      .insert({
        document_id: doc.id,
        event_type: "internal_lodging_record",
        actor_role,
        event_timestamp: now,
        event_details: {
          internal_status,
          court: "Superior Court of California, County of San Francisco",
          department: 12,
          court_filing_reference: court_filing_reference ?? null,
          digital_lodging_note:
            "INTERNAL RECORD ONLY — not a court filing confirmation. FILED status requires clerk endorsement per California Rule of Court 2.259.",
          timestamp_utc: now,
        },
      });

    if (eventError) {
      return NextResponse.json(
        {
          ok: false,
          error: `Failed to log event: ${eventError.message}`,
        },
        { status: 500 }
      );
    }

    // Step 4: Generate internal receipt
    const receipt = {
      ok: true,
      internal_status,
      court_filing_status: "NOT FILED BY THIS SYSTEM",
      document_id: doc.id,
      doc_number: doc.doc_number,
      title: doc.title,
      recorded_at: now,
      court: "Superior Court of California, County of San Francisco",
      department: 12,
      court_filing_reference: court_filing_reference ?? null,
      actor_role,
      notice:
        "This is an internal VALORAIPLUS record only. It does not replace Rapid Legal, eCourt, the clerk's filing confirmation, proof of service, or the official court docket. FILED status requires court filing confirmation per California Rule of Court 2.259.",
      receipt_timestamp: now,
    };

    return NextResponse.json(receipt, { status: 200 });
  } catch (err) {
    console.error("[v0] Lodge document error:", err);
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const doc_number = request.nextUrl.searchParams.get("doc_number");

  if (!doc_number) {
    return NextResponse.json(
      {
        ok: false,
        error: "Missing doc_number query parameter",
      },
      { status: 400 }
    );
  }

  try {
    const supabase = getSupabaseServiceClient();
    const { data: doc } = await supabase
      .from("documents")
      .select("id, doc_number, title, doc_status, filed_at")
      .eq("doc_number", doc_number)
      .single();

    if (!doc) {
      return NextResponse.json(
        {
          ok: false,
          error: "Document not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        document: doc,
        court_filing_status:
          doc.doc_status === "FILED"
            ? "FILED — court confirmation required to rely on this status"
            : "NOT FILED — internal status only",
        notice:
          "This is an internal VALORAIPLUS record only. Official filing status must be verified against the court docket.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[v0] Lodge document GET error:", err);
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
