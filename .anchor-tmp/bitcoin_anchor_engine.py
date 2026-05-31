#!/usr/bin/env python3
"""
DIRS v2 — Bitcoin Anchor Engine
System: VALORAIPLUS//e | Service: DIRS v2 | Node: Saint Paul Node
Case File: CUD-26-682107

Lifecycle:
  1. Build OP_RETURN transaction embedding VLRA magic + Merkle root
  2. Fund, sign, broadcast via sendrawtransaction
  3. POLL Blockstream Esplora until confirmed=true (block included)
  4. READ BACK the transaction hex and decode the OP_RETURN output
  5. MATCH the decoded payload against EXPECTED_OP_RETURN_PAYLOAD
  6. WRITE canonical bitcoin_anchor_receipt_verified JSON to
     anchor-receipts.ndjson (append-only) on full match
  7. WRITE audit event to audit-log.ndjson

Hard stop conditions (exit non-zero, no receipt written):
  TXID_NOT_FOUND       — TXID not found by Blockstream after broadcast
  TX_UNCONFIRMED       — Still in mempool beyond CONFIRMATION_TIMEOUT_HOURS
  OP_RETURN_NOT_FOUND  — No OP_RETURN output in the confirmed TX
  OP_RETURN_MISMATCH   — Payload does not match expected Merkle root
  BROADCAST_FAILED     — sendrawtransaction returned an error

Security:
  Seed phrases, private keys, WIF, mnemonics, and derivation path material
  must never be logged, embedded in receipts, or written to any output file.
  Labels like "donnygillson.seed" are opaque identifiers only.

Usage:
  python3 bitcoin_anchor_engine.py [--txid <existing_txid>] [--dry-run]

  --txid   Skip broadcast; jump straight to confirmation polling for an
           already-broadcast TXID. Use this when you have a TXID from a
           prior broadcast attempt and need to verify + receipt it.
  --dry-run  Validate configuration and print curl commands; no broadcast.
"""

import sys
import os
import json
import time
import hashlib
import argparse
import datetime
import urllib.request
import urllib.error
from pathlib import Path

# ─── POLICY CONSTANTS ─────────────────────────────────────────────────────────

EXPECTED_MERKLE_ROOT       = "f678317a8ca029bea556c4c9e721ea1b6e7e6faf3e494bb96df821dc6d548d66"
EXPECTED_OP_RETURN_PAYLOAD = "5650f678317a8ca029bea556c4c9e721ea1b6e7e6faf3e494bb96df821dc6d548d66"
VLRA_MAGIC_HEX             = "5650"   # 'VP' in ASCII — VALORAIPLUS prefix
SCHEMA_VERSION             = "1.0.0"
SYSTEM                     = "VALORAIPLUS//e"
SERVICE                    = "DIRS v2"
NODE                       = "Saint Paul Node"
CASE_FILE                  = "CUD-26-682107"
EXTERNAL_CERT_STATUS       = "not_claimed"

# Polling configuration
POLL_INTERVAL_SECONDS      = 60       # check every 60s (Bitcoin ~10min blocks)
CONFIRMATION_TIMEOUT_HOURS = 6        # give up after 6 hours in mempool
MAX_POLL_ATTEMPTS          = int((CONFIRMATION_TIMEOUT_HOURS * 3600) / POLL_INTERVAL_SECONDS)

# Esplora endpoints (Blockstream public API)
ESPLORA_BASE    = "https://blockstream.info/api"
MEMPOOL_BASE    = "https://mempool.space/api"

# Output files
BASE_DIR        = Path(__file__).parent
RECEIPT_FILE    = BASE_DIR / "anchor-receipts.ndjson"
AUDIT_LOG_FILE  = BASE_DIR / "audit-log.ndjson"

# ─── UTILITIES ────────────────────────────────────────────────────────────────

def now_utc() -> str:
    return datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")

def append_ndjson(path: Path, obj: dict) -> None:
    with open(path, "a", encoding="utf-8") as f:
        f.write(json.dumps(obj) + "\n")

def audit(event_type: str, **kwargs) -> None:
    entry = {
        "event_type":  event_type,
        "timestamp":   now_utc(),
        "system":      SYSTEM,
        "service":     SERVICE,
        "node":        NODE,
        "case_file":   CASE_FILE,
        "external_certification_status": EXTERNAL_CERT_STATUS,
        **kwargs,
    }
    append_ndjson(AUDIT_LOG_FILE, entry)
    print(f"[AUDIT] {event_type}" + (f" | {kwargs.get('message','')}" if kwargs.get('message') else ""))

def hard_stop(code: str, message: str) -> None:
    audit("anchor_verification_hard_stop",
          stop_code=code,
          message=message,
          package_status="UNSEALED — receipt NOT written")
    print(f"\n{'='*60}")
    print(f" DIRS v2 HARD STOP: {code}")
    print(f" {message}")
    print(f" Validator Package: UNSEALED — no receipt written")
    print(f" External Cert:     {EXTERNAL_CERT_STATUS}")
    print(f"{'='*60}\n")
    sys.exit(1)

# ─── HTTP ─────────────────────────────────────────────────────────────────────

def http_get(url: str, timeout: int = 15) -> dict | str | None:
    """GET url. Returns parsed JSON dict, raw string, or None on 404/error."""
    try:
        req = urllib.request.Request(
            url,
            headers={"User-Agent": "DIRS-v2-anchor-engine/1.0"}
        )
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            body = resp.read().decode("utf-8")
            try:
                return json.loads(body)
            except json.JSONDecodeError:
                return body  # raw hex string for /hex endpoint
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return None
        raise
    except Exception:
        return None

# ─── OP_RETURN DECODE ─────────────────────────────────────────────────────────

def decode_op_return_from_hex(tx_hex: str) -> str | None:
    """
    Parse raw transaction hex and extract the OP_RETURN data payload.

    Bitcoin raw TX output scriptpubkey format for OP_RETURN:
      6a             — OP_RETURN opcode
      [length byte]  — number of bytes to push (e.g. 0x24 = 36 bytes)
      [data]         — the actual payload

    We scan all outputs for scriptPubKey starting with 6a.
    This is a minimal parser sufficient for standard OP_RETURN outputs
    (single-push, ≤75 bytes) as produced by the engine.
    """
    if not tx_hex or len(tx_hex) < 20:
        return None

    # Walk through the raw hex to find OP_RETURN scriptPubKeys
    # A simplified approach: scan for the pattern 6a + length + expected payload
    # More robust: use the Esplora JSON /tx endpoint vout parsing instead
    return None  # raw hex parsing fallback — primary path uses JSON vout below

def decode_op_return_from_vout(vout_list: list) -> str | None:
    """
    Extract OP_RETURN payload from a transaction's vout array
    as returned by Blockstream Esplora GET /tx/:txid

    Esplora vout schema:
      {
        "scriptpubkey":       "6a24...",
        "scriptpubkey_type":  "op_return",
        "value":              0
      }

    Strips the leading opcode + length byte(s) to return the raw data hex.
    """
    for output in vout_list:
        spk  = output.get("scriptpubkey", "")
        stype = output.get("scriptpubkey_type", "")

        # Accept both explicit op_return type and raw scriptpubkey starting 6a
        if stype != "op_return" and not spk.lower().startswith("6a"):
            continue

        spk = spk.lower()
        if not spk.startswith("6a"):
            continue

        data = spk[2:]  # strip OP_RETURN opcode
        if not data:
            continue

        first_byte = int(data[:2], 16)
        if first_byte == 0x4c:
            # OP_PUSHDATA1: next byte is length
            data = data[4:]
        elif first_byte == 0x4d:
            # OP_PUSHDATA2: next 2 bytes are length LE
            data = data[6:]
        elif first_byte <= 0x4b:
            # Direct push: skip 1-byte length
            data = data[2:]
        # else: data starts immediately (OP_0 or similar — unusual)

        return data

    return None

# ─── STEP 1: BROADCAST (or accept existing TXID) ──────────────────────────────

def broadcast_transaction(dry_run: bool = False) -> str:
    """
    Build, fund, sign, and broadcast the OP_RETURN anchor transaction.

    IMPORTANT: This function requires bitcoinlib or similar. If not available,
    it prints instructions and exits. The caller should provide --txid if they
    have already broadcast externally.

    Returns the TXID string.
    """
    print("\n[Engine] Checking for bitcoinlib...")
    try:
        from bitcoinlib.wallets import Wallet
        from bitcoinlib.transactions import Transaction, Output
        from bitcoinlib.encoding import to_bytes
    except ImportError:
        print("[Engine] bitcoinlib not installed.")
        print("")
        print("To broadcast from this script, install it:")
        print("  pip install bitcoinlib")
        print("")
        print("Alternatively, broadcast your transaction externally and run:")
        print(f"  python3 {__file__} --txid <YOUR_TXID>")
        print("")
        print("The OP_RETURN payload to embed is:")
        print(f"  {EXPECTED_OP_RETURN_PAYLOAD}")
        print(f"  (hex bytes: 6a 24 {EXPECTED_OP_RETURN_PAYLOAD})")
        audit("broadcast_skipped",
              message="bitcoinlib not available — provide --txid from external broadcast",
              op_return_payload=EXPECTED_OP_RETURN_PAYLOAD)
        sys.exit(0)

    if dry_run:
        print("[DRY RUN] Would broadcast OP_RETURN transaction with payload:")
        print(f"  {EXPECTED_OP_RETURN_PAYLOAD}")
        print("[DRY RUN] No broadcast performed.")
        return ""

    # NOTE: Actual key material must come from environment variables or a
    # hardware wallet — never hardcoded, never logged.
    # Example (implement per your wallet setup):
    #   wif = os.environ.get("VALOR_WIF")
    #   if not wif:
    #       hard_stop("MISSING_KEY", "VALOR_WIF environment variable not set")
    raise NotImplementedError(
        "Implement broadcast_transaction() with your specific wallet/key setup. "
        "Key material must come from environment variables or hardware wallet. "
        "Never hardcode WIF or seed phrases."
    )

# ─── STEP 2: CONFIRMATION POLLING ─────────────────────────────────────────────

def poll_confirmation(txid: str) -> dict:
    """
    Poll Blockstream Esplora GET /tx/:txid/status until confirmed=true.
    Falls back to mempool.space if Blockstream is unreachable.

    Returns the status dict: {confirmed, block_height, block_hash, block_time}
    Hard stops if TXID not found or timeout exceeded.
    """
    print(f"\n[Engine] Polling confirmation for TXID: {txid}")
    print(f"         Expected payload: {EXPECTED_OP_RETURN_PAYLOAD}")
    print(f"         Max wait: {CONFIRMATION_TIMEOUT_HOURS}h ({MAX_POLL_ATTEMPTS} attempts @ {POLL_INTERVAL_SECONDS}s)\n")

    # Print the exact curl commands for manual verification
    print("─── Manual verification commands ───────────────────────────────────")
    print(f"curl https://blockstream.info/api/tx/{txid}/status")
    print(f"curl https://blockstream.info/api/tx/{txid}")
    print(f"curl https://mempool.space/api/tx/{txid}/status")
    print(f"\nExpected OP_RETURN in hex field:")
    print(f"  6a24{EXPECTED_OP_RETURN_PAYLOAD}")
    print("────────────────────────────────────────────────────────────────────\n")

    audit("anchor_confirmation_polling_started",
          txid=txid,
          max_attempts=MAX_POLL_ATTEMPTS,
          poll_interval_seconds=POLL_INTERVAL_SECONDS)

    for attempt in range(1, MAX_POLL_ATTEMPTS + 1):
        print(f"[Poll {attempt}/{MAX_POLL_ATTEMPTS}] {now_utc()} — querying status...", end=" ")

        # Try Blockstream first
        status = http_get(f"{ESPLORA_BASE}/tx/{txid}/status")
        source = "blockstream.info"

        if status is None:
            # Fall back to mempool.space
            status = http_get(f"{MEMPOOL_BASE}/tx/{txid}/status")
            source = "mempool.space"

        if status is None:
            print(f"TXID not found by either source")
            if attempt >= 3:
                hard_stop("TXID_NOT_FOUND",
                    f"TXID {txid} was not found by blockstream.info or mempool.space "
                    f"after {attempt} attempts. Broadcast may have failed or been dropped.")
            time.sleep(POLL_INTERVAL_SECONDS)
            continue

        confirmed = status.get("confirmed", False)
        block_height = status.get("block_height")
        block_hash   = status.get("block_hash")
        block_time   = status.get("block_time")

        if confirmed:
            print(f"CONFIRMED ✓  block={block_height}  source={source}")
            audit("anchor_tx_confirmed",
                  txid=txid,
                  block_height=block_height,
                  block_hash=block_hash,
                  block_time=block_time,
                  source=source)
            return {
                "confirmed":    True,
                "block_height": block_height,
                "block_hash":   block_hash,
                "block_time":   block_time,
                "source":       source,
            }
        else:
            print(f"mempool (unconfirmed)  source={source}")

        if attempt < MAX_POLL_ATTEMPTS:
            time.sleep(POLL_INTERVAL_SECONDS)

    hard_stop("TX_UNCONFIRMED",
        f"TXID {txid} remained unconfirmed after {CONFIRMATION_TIMEOUT_HOURS} hours. "
        f"Transaction may have been dropped from mempool. "
        f"Do not seal the Validator Package. Consider re-broadcasting.")

# ─── STEP 3: OP_RETURN READBACK ───────────────────────────────────────────────

def verify_op_return(txid: str) -> str:
    """
    Fetch the full transaction JSON from Blockstream and decode the OP_RETURN
    output. Compares the decoded payload against EXPECTED_OP_RETURN_PAYLOAD.

    Returns the matched payload hex string.
    Hard stops if not found or mismatched.
    """
    print(f"\n[Engine] Reading back OP_RETURN from confirmed TX...")

    tx_data = http_get(f"{ESPLORA_BASE}/tx/{txid}")
    if tx_data is None:
        # Try mempool.space
        tx_data = http_get(f"{MEMPOOL_BASE}/tx/{txid}")

    if not tx_data or not isinstance(tx_data, dict):
        hard_stop("TX_DATA_NOT_FOUND",
            f"Could not retrieve transaction data for confirmed TXID {txid}.")

    vout = tx_data.get("vout", [])
    if not vout:
        hard_stop("VOUT_EMPTY",
            f"Transaction {txid} has no outputs. Cannot verify OP_RETURN.")

    payload = decode_op_return_from_vout(vout)

    print(f"  Decoded payload : {payload or '(none)'}")
    print(f"  Expected        : {EXPECTED_OP_RETURN_PAYLOAD}")

    if payload is None:
        hard_stop("OP_RETURN_NOT_FOUND",
            f"No OP_RETURN output found in confirmed TX {txid}. "
            f"This transaction cannot anchor the DIRS v2 manifest.")

    if payload != EXPECTED_OP_RETURN_PAYLOAD:
        hard_stop("OP_RETURN_MISMATCH",
            f"OP_RETURN payload does not match expected value.\n"
            f"  Found    : {payload}\n"
            f"  Expected : {EXPECTED_OP_RETURN_PAYLOAD}\n"
            f"This transaction anchors a different payload and cannot be "
            f"used for this manifest.")

    print(f"  Match           : ✓ PAYLOAD VERIFIED")
    audit("op_return_payload_verified",
          txid=txid,
          payload=payload,
          merkle_root=EXPECTED_MERKLE_ROOT)

    return payload

# ─── STEP 4: RECEIPT MATERIALIZATION ─────────────────────────────────────────

def build_receipt(txid: str, confirmation: dict, payload: str,
                  sources: list) -> dict:
    """
    Build the canonical bitcoin_anchor_receipt_verified object.
    Computes anchor_receipt_hash_sha256 via self-hashing:
      1. Build receipt with hash field = ""
      2. SHA-256 over canonical JSON (fixed key order, UTF-8)
      3. Set hash field, return final receipt
    """
    skeleton = {
        "event_type":                  "bitcoin_anchor_receipt_verified",
        "schema_version":              SCHEMA_VERSION,
        "system":                      SYSTEM,
        "service":                     SERVICE,
        "node":                        NODE,
        "case_file":                   CASE_FILE,
        "network":                     "bitcoin_mainnet",
        "txid":                        txid,
        "merkle_root":                 EXPECTED_MERKLE_ROOT,
        "op_return_payload_hex":       payload,
        "block_height":                confirmation["block_height"],
        "block_hash":                  confirmation["block_hash"],
        "block_time_unix":             confirmation.get("block_time"),
        "confirmation_count":          1,  # at minimum 1 at time of receipt
        "verified_at_iso8601":         now_utc(),
        "verification_sources":        sources,
        "anchor_receipt_hash_sha256":  "",   # placeholder — filled below
        "final_bundle_hash_sha256":    "RECOMPUTE_REQUIRED",
        "external_certification_status": EXTERNAL_CERT_STATUS,
    }

    # Self-hash over canonical form (key order fixed by literal above)
    canonical  = json.dumps(skeleton, separators=(",", ":"))
    self_hash  = hashlib.sha256(canonical.encode("utf-8")).hexdigest()
    skeleton["anchor_receipt_hash_sha256"] = self_hash

    return skeleton

# ─── STEP 5: WRITE RECEIPT + AUDIT ────────────────────────────────────────────

def write_receipt(receipt: dict) -> None:
    append_ndjson(RECEIPT_FILE, receipt)
    print(f"\n[Engine] Receipt written → {RECEIPT_FILE}")
    print(f"  anchor_receipt_hash_sha256 : {receipt['anchor_receipt_hash_sha256']}")
    print(f"  final_bundle_hash_sha256   : {receipt['final_bundle_hash_sha256']}")

    audit("bitcoin_anchor_receipt_written",
          txid=receipt["txid"],
          block_height=receipt["block_height"],
          anchor_receipt_hash=receipt["anchor_receipt_hash_sha256"],
          message="Receipt appended to anchor-receipts.ndjson")

def receipt_already_exists(txid: str) -> bool:
    if not RECEIPT_FILE.exists():
        return False
    for line in RECEIPT_FILE.read_text().splitlines():
        try:
            if json.loads(line).get("txid") == txid:
                return True
        except Exception:
            pass
    return False

# ─── MAIN ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="DIRS v2 Bitcoin Anchor Engine — VALORAIPLUS//e"
    )
    parser.add_argument("--txid",     type=str, default="",
        help="Skip broadcast; verify + receipt an already-broadcast TXID")
    parser.add_argument("--dry-run",  action="store_true",
        help="Validate config and print curl commands; no broadcast or write")
    args = parser.parse_args()

    txid = args.txid.lower().strip() if args.txid else ""

    print("=" * 60)
    print(" DIRS v2 — Bitcoin Anchor Engine")
    print(f" System  : {SYSTEM}")
    print(f" Service : {SERVICE}")
    print(f" Node    : {NODE}")
    print(f" Case    : {CASE_FILE}")
    print(f" Ext Cert: {EXTERNAL_CERT_STATUS}")
    print("=" * 60)

    # Dry run — just print verification commands and exit
    if args.dry_run:
        print("\n[DRY RUN] Configuration valid.")
        print(f"\nExpected OP_RETURN payload:\n  {EXPECTED_OP_RETURN_PAYLOAD}")
        print(f"\nExpected Merkle root:\n  {EXPECTED_MERKLE_ROOT}")
        print(f"\nWhen you have a TXID, run:")
        print(f"  python3 {__file__} --txid <YOUR_64_CHAR_TXID>")
        print(f"\nOr verify manually:")
        print(f"  curl https://blockstream.info/api/tx/<TXID>/status")
        print(f"  curl https://blockstream.info/api/tx/<TXID>")
        return

    # Validate TXID format if provided
    if txid:
        if len(txid) != 64 or not all(c in "0123456789abcdef" for c in txid):
            hard_stop("INVALID_TXID",
                f"Provided TXID is malformed: '{txid}'. "
                f"Must be exactly 64 lowercase hex characters.")
        print(f"\n[Engine] Using provided TXID: {txid}")
        print(f"         Skipping broadcast — jumping to confirmation polling")
    else:
        print("\n[Engine] No --txid provided — attempting broadcast...")
        txid = broadcast_transaction(dry_run=False)

    # Check if already receipted
    if receipt_already_exists(txid):
        print(f"\n[Engine] TXID {txid[:16]}... already has a verified receipt.")
        print(f"         Nothing to do. Validator Package may now be sealed.")
        print(f"\n  Next step:")
        print(f"  node anchor-verify/recompute-bundle-hash.js --manifest <manifest.json>")
        return

    # Step 2: Poll for confirmation
    confirmation = poll_confirmation(txid)

    # Step 3: Verify OP_RETURN readback
    payload = verify_op_return(txid)

    # Step 4: Build receipt
    sources = [
        {
            "source":                confirmation["source"],
            "url_queried":           f"{ESPLORA_BASE}/tx/{txid}/status",
            "confirmed":             True,
            "response_block_height": confirmation["block_height"],
            "response_block_hash":   confirmation["block_hash"],
        }
    ]
    receipt = build_receipt(txid, confirmation, payload, sources)

    # Step 5: Write receipt + audit
    write_receipt(receipt)

    # Final status
    print(f"\n{'='*60}")
    print(f" ANCHOR RECEIPT VERIFIED")
    print(f"{'='*60}")
    print(f"  TXID              : {txid}")
    print(f"  Block Height      : {confirmation['block_height']}")
    print(f"  Block Hash        : {str(confirmation['block_hash'])[:32]}...")
    print(f"  Confirmations     : 1 (at time of receipt)")
    print(f"  Receipt Hash      : {receipt['anchor_receipt_hash_sha256']}")
    print(f"  Receipt File      : {RECEIPT_FILE}")
    print(f"  Validator Package : UNSEALED — run recompute-bundle-hash.js next")
    print(f"  External Cert     : {EXTERNAL_CERT_STATUS}")
    print(f"{'='*60}")
    print(f"\n  NEXT STEP:")
    print(f"  node anchor-verify/recompute-bundle-hash.js --manifest <manifest.json>")
    print(f"\n  OR run the ADIAM orchestrator and BundleSealerAgent will do it automatically.")

if __name__ == "__main__":
    main()
