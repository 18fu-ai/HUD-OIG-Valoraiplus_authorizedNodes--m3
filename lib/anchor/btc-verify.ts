/**
 * Live Bitcoin Anchor Verifier
 * ============================
 * Queries real Bitcoin block explorers (mempool.space, blockstream.info)
 * to verify whether a txid actually exists on-chain, and decodes the
 * real OP_RETURN payload from the transaction's outputs.
 *
 * This module NEVER fabricates a txid or payload. A node can only be
 * reported as CONFIRMED when an explorer returns confirmed === true.
 */

export type BtcVerificationStatus =
  | "CONFIRMED" // tx is mined into a block
  | "PENDING" // tx exists in mempool but is not yet confirmed
  | "NOT_FOUND" // tx does not exist on-chain or in mempool
  | "PAYLOAD_MISMATCH" // tx confirmed but OP_RETURN does not match expected hash
  | "EXPLORER_UNAVAILABLE"; // could not reach any explorer

export interface BtcVerificationResult {
  txid: string;
  status: BtcVerificationStatus;
  confirmed: boolean;
  blockHeight: number | null;
  blockHash: string | null;
  blockTime: number | null;
  opReturnPayloads: string[]; // hex strings found in OP_RETURN outputs
  expectedPayload: string | null;
  payloadMatches: boolean | null;
  source: string | null; // which explorer answered
  checkedAt: string;
}

const EXPLORERS = [
  { name: "mempool.space", base: "https://mempool.space/api" },
  { name: "blockstream.info", base: "https://blockstream.info/api" },
];

// A valid Bitcoin txid is 64 lowercase hex chars.
export function isValidTxid(txid: string): boolean {
  return /^[a-f0-9]{64}$/.test(txid.trim().toLowerCase());
}

interface EsploraVout {
  scriptpubkey?: string;
  scriptpubkey_asm?: string;
  scriptpubkey_type?: string;
}

interface EsploraTx {
  txid: string;
  status?: {
    confirmed?: boolean;
    block_height?: number;
    block_hash?: string;
    block_time?: number;
  };
  vout?: EsploraVout[];
}

/**
 * Extracts the hex data pushed by OP_RETURN outputs.
 * Esplora's scriptpubkey_asm looks like: "OP_RETURN OP_PUSHBYTES_32 <hex>"
 */
function extractOpReturnPayloads(tx: EsploraTx): string[] {
  const payloads: string[] = [];
  for (const vout of tx.vout ?? []) {
    if (vout.scriptpubkey_type !== "op_return") continue;
    const asm = vout.scriptpubkey_asm ?? "";
    // Collect every token after a push opcode that is pure hex.
    const tokens = asm.split(/\s+/);
    for (const token of tokens) {
      if (/^[a-f0-9]{2,}$/i.test(token) && !token.startsWith("OP_")) {
        payloads.push(token.toLowerCase());
      }
    }
  }
  return payloads;
}

async function fetchTxFromExplorer(
  base: string,
  txid: string,
): Promise<EsploraTx | null> {
  const res = await fetch(`${base}/tx/${txid}`, {
    headers: { Accept: "application/json" },
    // Always hit the network; anchor state must be live.
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Explorer ${base} returned ${res.status}`);
  return (await res.json()) as EsploraTx;
}

/**
 * Verifies a Bitcoin txid against live explorers.
 * @param txid       64-hex Bitcoin transaction id
 * @param expectedPayload optional hex string the OP_RETURN must contain
 */
export async function verifyBtcAnchor(
  txid: string,
  expectedPayload?: string,
): Promise<BtcVerificationResult> {
  const normalizedTxid = txid.trim().toLowerCase();
  const normalizedExpected = expectedPayload?.trim().toLowerCase() ?? null;
  const checkedAt = new Date().toISOString();

  const base: BtcVerificationResult = {
    txid: normalizedTxid,
    status: "NOT_FOUND",
    confirmed: false,
    blockHeight: null,
    blockHash: null,
    blockTime: null,
    opReturnPayloads: [],
    expectedPayload: normalizedExpected,
    payloadMatches: null,
    source: null,
    checkedAt,
  };

  if (!isValidTxid(normalizedTxid)) {
    return { ...base, status: "NOT_FOUND" };
  }

  let reachedAnyExplorer = false;

  for (const explorer of EXPLORERS) {
    try {
      const tx = await fetchTxFromExplorer(explorer.base, normalizedTxid);
      reachedAnyExplorer = true;

      // 404 -> explorer reachable but tx absent. Try the next one to be sure.
      if (!tx) continue;

      const opReturnPayloads = extractOpReturnPayloads(tx);
      const confirmed = tx.status?.confirmed === true;

      let payloadMatches: boolean | null = null;
      if (normalizedExpected) {
        payloadMatches = opReturnPayloads.some(
          (p) => p === normalizedExpected || p.includes(normalizedExpected),
        );
      }

      let status: BtcVerificationStatus;
      if (!confirmed) {
        status = "PENDING";
      } else if (normalizedExpected && payloadMatches === false) {
        status = "PAYLOAD_MISMATCH";
      } else {
        status = "CONFIRMED";
      }

      return {
        txid: normalizedTxid,
        status,
        confirmed,
        blockHeight: tx.status?.block_height ?? null,
        blockHash: tx.status?.block_hash ?? null,
        blockTime: tx.status?.block_time ?? null,
        opReturnPayloads,
        expectedPayload: normalizedExpected,
        payloadMatches,
        source: explorer.name,
        checkedAt,
      };
    } catch {
      // Try the next explorer.
      continue;
    }
  }

  // If every explorer was reachable and all returned 404 -> truly not found.
  if (reachedAnyExplorer) {
    return { ...base, status: "NOT_FOUND", source: "mempool.space+blockstream.info" };
  }

  // Could not reach any explorer.
  return { ...base, status: "EXPLORER_UNAVAILABLE" };
}
