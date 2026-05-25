#!/usr/bin/env node
/**
 * VALORAIPLUS Internal Lodging Record — Document 108
 * Usage: node scripts/lodge-document-108.js
 *
 * LEGAL NOTICE:
 * This script creates an INTERNAL lodging record only.
 * It does NOT file any document with any court.
 * Default internal status: READY_FOR_MANUAL_LODGING
 *
 * FILED status may only be recorded after obtaining a court filing
 * confirmation, transaction number, or clerk endorsement per
 * California Rule of Court 2.259.
 *
 * This tool does not replace Rapid Legal, eCourt, the clerk's filing
 * confirmation, proof of service, or the official court docket.
 *
 * Status model:
 *   READY_FOR_MANUAL_LODGING       — document prepared and staged (default)
 *   SUBMITTED_PENDING_CLERK_REVIEW — submitted, awaiting confirmation
 *   RECEIVED_BY_COURT              — court confirmed receipt
 *   FILED                          — court confirmed filing (requires court_filing_reference)
 *
 * Requirements:
 * - NEXT_PUBLIC_SUPABASE_URL environment variable
 * - SUPABASE_SERVICE_ROLE_KEY environment variable
 * - Supabase migrations 001-004 already applied
 */

const https = require("https");

// Set internal status here — do not set FILED without court confirmation
const INTERNAL_STATUS = "READY_FOR_MANUAL_LODGING";
const COURT_FILING_REFERENCE = null; // Set to clerk confirmation/transaction number when available
const ACTOR_ROLE = "defendant"; // Not "clerk" — the clerk is at the court

async function lodgeDocument108() {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!baseUrl || !serviceKey) {
    console.error("❌ Missing environment variables:");
    console.error("   - NEXT_PUBLIC_SUPABASE_URL");
    console.error("   - SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }

  const now = new Date().toISOString();

  // Step 1: Update Document 108 internal status
  const dbStatus = INTERNAL_STATUS === "FILED" ? "FILED" : "STAGED";
  console.log(`[VALORAIPLUS] Step 1: Recording internal status '${INTERNAL_STATUS}' for Document 108...`);
  const updatePayload = {
    doc_status: dbStatus,
    ...(INTERNAL_STATUS === "FILED" ? { filed_at: now } : {}),
    updated_at: now,
  };

  try {
    await makeSupabaseRequest(
      baseUrl,
      serviceKey,
      "PATCH",
      "/rest/v1/documents?doc_number=eq.108",
      updatePayload
    );
    console.log(`[VALORAIPLUS] Document 108 internal status set to ${dbStatus}`);
  } catch (err) {
    console.error("[VALORAIPLUS] Failed to update document:", err.message);
    process.exit(1);
  }

  // Step 2: Create internal lodging event
  console.log("[VALORAIPLUS] Step 2: Creating internal lodging event...");
  const eventPayload = {
    document_id: null,
    event_type: "internal_lodging_record",
    actor_role: ACTOR_ROLE,
    event_timestamp: now,
    event_details: {
      internal_status: INTERNAL_STATUS,
      court: "Superior Court of California, County of San Francisco",
      department: 12,
      court_filing_reference: COURT_FILING_REFERENCE,
      digital_lodging_note:
        "INTERNAL RECORD ONLY — not a court filing confirmation. FILED status requires clerk endorsement per California Rule of Court 2.259.",
      timestamp_utc: now,
    },
  };

  // Fetch document ID first
  try {
    const docResponse = await makeSupabaseRequest(
      baseUrl,
      serviceKey,
      "GET",
      "/rest/v1/documents?doc_number=eq.108&select=id",
      null
    );
    const docs = JSON.parse(docResponse);
    if (!docs.length) {
      console.error("[VALORAIPLUS] Document 108 not found — confirm seed migration applied");
      process.exit(1);
    }
    eventPayload.document_id = docs[0].id;

    await makeSupabaseRequest(
      baseUrl,
      serviceKey,
      "POST",
      "/rest/v1/document_events",
      eventPayload
    );
    console.log("[VALORAIPLUS] Internal lodging event logged");
  } catch (err) {
    console.error("[VALORAIPLUS] Failed to create event:", err.message);
    process.exit(1);
  }

  // Step 3: Output internal receipt
  console.log("\n═══════════════════════════════════════════════════════════════════");
  console.log("              VALORAIPLUS INTERNAL LODGING RECORD");
  console.log("═══════════════════════════════════════════════════════════════════");
  console.log(`Document:             Document 108`);
  console.log(`Internal Status:      ${INTERNAL_STATUS}`);
  console.log(`Court Filing Status:  NOT FILED BY THIS SYSTEM`);
  console.log(`Court:                Superior Court of California, County of San Francisco`);
  console.log(`Department:           12`);
  console.log(`Case Number:          CUD-26-682107`);
  console.log(`Recorded At (UTC):    ${now}`);
  console.log(`Actor Role:           ${ACTOR_ROLE}`);
  console.log(`Court Filing Ref:     ${COURT_FILING_REFERENCE ?? "NONE — not yet filed with court"}`);
  console.log("═══════════════════════════════════════════════════════════════════");
  console.log("NOTICE: This is an internal VALORAIPLUS record only.");
  console.log("It does not replace Rapid Legal, eCourt, the clerk's filing");
  console.log("confirmation, proof of service, or the official court docket.");
  console.log("FILED status requires court filing confirmation per CRC 2.259.");
  console.log("═══════════════════════════════════════════════════════════════════\n");
}

function makeSupabaseRequest(baseUrl, serviceKey, method, path, body) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(baseUrl);
    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || 443,
      path: path,
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${serviceKey}`,
        apikey: serviceKey,
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on("error", reject);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

lodgeDocument108().catch(console.error);
