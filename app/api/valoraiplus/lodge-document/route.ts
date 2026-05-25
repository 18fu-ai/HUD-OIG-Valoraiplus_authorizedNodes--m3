import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServiceClient } from "@/lib/valoraiplus/supabase-server";

interface LodgeDocumentRequest {
  document_id?: string;
  doc_number?: string;
  case_number?: string;
  actor_role?: string;
  court_filing_reference?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LodgeDocumentRequest;

    const {
      document_id,
      doc_number,
      case_number,
      actor_role = "clerk",
      court_filing_reference,
    } = body;

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

    // Step 2: Update document status to FILED
    const { error: updateError } = await supabase
      .from("documents")
      .update({
        doc_status: "FILED",
        filed_at: now,
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

    // Step 3: Log the filing event
    const { error: eventError } = await supabase
      .from("document_events")
      .insert({
        document_id: doc.id,
        event_type: "filed",
        actor_role,
        event_timestamp: now,
        event_details: {
          court: "Superior Court of California, County of San Francisco",
          department: 12,
          filing_reference: court_filing_reference || "Document 108",
          digital_lodging: true,
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

    // Step 4: Generate receipt
    const receipt = {
      ok: true,
      status: "lodged",
      document_id: doc.id,
      doc_number: doc.doc_number,
      title: doc.title,
      filed_at: now,
      court: "Superior Court of California, County of San Francisco",
      department: 12,
      filing_reference: court_filing_reference || "Document 108",
      actor_role,
      digital_lodging: true,
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
        is_filed: doc.doc_status === "FILED",
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
