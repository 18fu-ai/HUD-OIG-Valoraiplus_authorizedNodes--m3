import crypto from 'crypto';

/**
 * Canonicalizes an object by sorting keys recursively
 * Ensures: Same input → same JSON → same SHA-256
 */
function canonicalize(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(canonicalize);
  } else if (obj && typeof obj === 'object' && obj !== null) {
    const record = obj as Record<string, unknown>;
    return Object.keys(record)
      .sort()
      .reduce((acc: Record<string, unknown>, key: string) => {
        acc[key] = canonicalize(record[key]);
        return acc;
      }, {});
  }
  return obj;
}

export interface CanonicalExport {
  canonical_json: string;
  sha256: string;
  entry_count: number;
  generated_at: string;
}

export interface AuditEntry {
  entry_id: string;
  [key: string]: unknown;
}

/**
 * Generates a canonical export with deterministic hash
 * Rule: Same input → same JSON → same SHA-256
 */
export function generateCanonicalExport(entries: AuditEntry[]): CanonicalExport {
  // Sort by entry_id for deterministic ordering
  const sorted = [...entries].sort((a, b) =>
    a.entry_id.localeCompare(b.entry_id)
  );

  const canonical = canonicalize(sorted);
  const json = JSON.stringify(canonical);

  const hash = crypto.createHash('sha256').update(json).digest('hex');

  return {
    canonical_json: json,
    sha256: hash,
    entry_count: entries.length,
    generated_at: new Date().toISOString(),
  };
}

/**
 * Verifies a canonical export hash matches the data
 */
export function verifyCanonicalHash(canonicalJson: string, expectedHash: string): boolean {
  const computedHash = crypto.createHash('sha256').update(canonicalJson).digest('hex');
  return computedHash === expectedHash;
}
