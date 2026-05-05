/**
 * CANONICAL EXPORT GENERATOR
 * 
 * Ensures deterministic JSON output for verification.
 * Same input -> same JSON -> same SHA-256
 * 
 * Used by the verification layer to create tamper-evident exports.
 */

import { createHash } from 'crypto';

// ============================================================
// CANONICALIZATION
// ============================================================

/**
 * Recursively canonicalize an object by sorting keys alphabetically.
 * This ensures deterministic JSON output regardless of property order.
 */
export function canonicalize<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(canonicalize) as T;
  } else if (obj !== null && typeof obj === 'object' && !(obj instanceof Date)) {
    const sorted = Object.keys(obj as object)
      .sort()
      .reduce((acc, key) => {
        acc[key] = canonicalize((obj as Record<string, unknown>)[key]);
        return acc;
      }, {} as Record<string, unknown>);
    return sorted as T;
  }
  return obj;
}

// ============================================================
// SHA-256 HASHING
// ============================================================

/**
 * Generate SHA-256 hash of a string
 */
export function sha256(data: string): string {
  return createHash('sha256').update(data).digest('hex');
}

/**
 * Generate SHA-256 hash of an object (canonicalized first)
 */
export function hashObject<T>(obj: T): string {
  const canonical = canonicalize(obj);
  const json = JSON.stringify(canonical);
  return sha256(json);
}

// ============================================================
// CANONICAL EXPORT
// ============================================================

export interface CanonicalExport<T> {
  /** ISO timestamp of export generation */
  generated_at: string;
  /** Version of the export format */
  export_version: string;
  /** SHA-256 hash of the canonical JSON */
  sha256: string;
  /** Number of entries in the export */
  entry_count: number;
  /** The canonicalized JSON string */
  canonical_json: string;
  /** The original data (canonicalized) */
  data: T;
}

export interface ExportEntry {
  entry_id: string;
  [key: string]: unknown;
}

/**
 * Generate a canonical export from an array of entries.
 * Entries are sorted by entry_id for deterministic ordering.
 */
export function generateCanonicalExport<T extends ExportEntry>(
  entries: T[],
  version: string = '1.0.0'
): CanonicalExport<T[]> {
  // Sort entries by entry_id for deterministic order
  const sorted = [...entries].sort((a, b) => 
    a.entry_id.localeCompare(b.entry_id)
  );
  
  // Canonicalize the sorted entries
  const canonical = canonicalize(sorted);
  const canonical_json = JSON.stringify(canonical);
  
  // Generate hash
  const hash = sha256(canonical_json);
  
  return {
    generated_at: new Date().toISOString(),
    export_version: version,
    sha256: hash,
    entry_count: entries.length,
    canonical_json,
    data: canonical,
  };
}

/**
 * Generate a canonical export from any data structure
 */
export function generateCanonicalExportGeneric<T>(
  data: T,
  version: string = '1.0.0'
): CanonicalExport<T> {
  const canonical = canonicalize(data);
  const canonical_json = JSON.stringify(canonical);
  const hash = sha256(canonical_json);
  
  const entryCount = Array.isArray(data) ? data.length : 1;
  
  return {
    generated_at: new Date().toISOString(),
    export_version: version,
    sha256: hash,
    entry_count: entryCount,
    canonical_json,
    data: canonical,
  };
}

/**
 * Verify that a canonical export matches its hash
 */
export function verifyCanonicalExport<T>(exportData: CanonicalExport<T>): boolean {
  const computedHash = sha256(exportData.canonical_json);
  return computedHash === exportData.sha256;
}
