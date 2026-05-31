/**
 * Live Bitcoin Anchor Verification Route
 * ======================================
 * GET  /api/anchor/btc?txid=<64hex>&expected=<hex>
 * POST /api/anchor/btc   { txid, expectedPayload }
 *
 * Returns the REAL on-chain status of a Bitcoin txid by querying live
 * block explorers. No txid or payload is ever fabricated. A seal can
 * only become CONFIRMED when an explorer returns confirmed === true.
 */

import { NextResponse } from "next/server";
import { verifyBtcAnchor, isValidTxid } from "@/lib/anchor/btc-verify";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const txid = searchParams.get("txid")?.trim() ?? "";
  const expected = searchParams.get("expected")?.trim() || undefined;

  if (!txid) {
    return NextResponse.json(
      { error: "Missing required query param: txid" },
      { status: 400 },
    );
  }

  if (!isValidTxid(txid)) {
    return NextResponse.json(
      {
        error: "Invalid txid. A Bitcoin txid must be exactly 64 hexadecimal characters.",
        txid,
      },
      { status: 400 },
    );
  }

  const result = await verifyBtcAnchor(txid, expected);

  const httpStatus =
    result.status === "EXPLORER_UNAVAILABLE" ? 503 : 200;

  return NextResponse.json(result, {
    status: httpStatus,
    headers: {
      "X-Anchor-Status": result.status,
      "X-Anchor-Confirmed": String(result.confirmed),
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const txid: string = (body.txid ?? "").trim();
    const expectedPayload: string | undefined =
      body.expectedPayload?.trim() || undefined;

    if (!txid) {
      return NextResponse.json(
        { error: "Missing required field: txid" },
        { status: 400 },
      );
    }

    if (!isValidTxid(txid)) {
      return NextResponse.json(
        {
          error: "Invalid txid. A Bitcoin txid must be exactly 64 hexadecimal characters.",
          txid,
        },
        { status: 400 },
      );
    }

    const result = await verifyBtcAnchor(txid, expectedPayload);
    const httpStatus = result.status === "EXPLORER_UNAVAILABLE" ? 503 : 200;

    return NextResponse.json(result, {
      status: httpStatus,
      headers: {
        "X-Anchor-Status": result.status,
        "X-Anchor-Confirmed": String(result.confirmed),
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body. Expected JSON with a txid field." },
      { status: 400 },
    );
  }
}
