#!/usr/bin/env node
/**
 * Digital Lodging Script for Document 108
 * Usage: node scripts/lodge-document-108.js
 *
 * This script digitally lodges Document 108 in the VALORAIPLUS system.
 * It updates the document status to FILED and creates an immutable event log entry.
 *
 * Requirements:
 * - NEXT_PUBLIC_SUPABASE_URL environment variable
 * - SUPABASE_SERVICE_ROLE_KEY environment variable
 * - Supabase migrations 001-004 already applied
 */

const https = require("https");
const url = require("url");

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

  // Step 1: Update Document 108 status
  console.log("[v0] Step 1: Updating Document 108 status to FILED...");
  const updatePayload = {
    doc_status: "FILED",
    filed_at: now,
    updated_at: now,
  };

  try {
    const response = await makeSupabaseRequest(
      baseUrl,
      serviceKey,
      "PATCH",
      "/rest/v1/documents?doc_number=eq.108",
      updatePayload
    );
    console.log("✓ Document 108 status updated to FILED");
  } catch (err) {
    console.error("❌ Failed to update document:", err);
    process.exit(1);
  }

  // Step 2: Create filing event
  console.log("[v0] Step 2: Creating filing event in document_events...");
  const eventPayload = {
    document_id: null, // Will fetch this from DB
    event_type: "filed",
    actor_role: "clerk",
    event_timestamp: now,
    event_details: {
      court: "Superior Court of California, County of San Francisco",
      department: 12,
      filing_reference: "Document 108",
      digital_lodging: true,
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
      console.error("❌ Document 108 not found");
      process.exit(1);
    }
    eventPayload.document_id = docs[0].id;

    // Create event
    const eventResponse = await makeSupabaseRequest(
      baseUrl,
      serviceKey,
      "POST",
      "/rest/v1/document_events",
      eventPayload
    );
    console.log("✓ Filing event logged immutably");
  } catch (err) {
    console.error("❌ Failed to create event:", err);
    process.exit(1);
  }

  // Step 3: Generate receipt
  console.log("\n═══════════════════════════════════════════════════════════════════");
  console.log("                    DIGITAL LODGING RECEIPT");
  console.log("═══════════════════════════════════════════════════════════════════");
  console.log(`Document:           Document 108`);
  console.log(`Status:             FILED`);
  console.log(`Court:              Superior Court of California, County of San Francisco`);
  console.log(`Department:         12`);
  console.log(`Case Number:        CUD-26-682107`);
  console.log(`Filed At (UTC):     ${now}`);
  console.log(`Actor Role:         clerk`);
  console.log(`Digital Lodging:    TRUE`);
  console.log(`Method:             VALORAIPLUS API`);
  console.log(`═══════════════════════════════════════════════════════════════════`);
  console.log("\n✓ DIGITAL LODGING COMPLETE\n");
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
