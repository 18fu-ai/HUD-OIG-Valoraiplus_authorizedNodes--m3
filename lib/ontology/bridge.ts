/**
 * VALORAIPLUS Ontology Bridge
 * Versioned internal -> external ontology mappings
 */

export type OntologyVersion = "1.0.0";

export type RuntimeDomain =
  | "internal"
  | "external"
  | "externalTechnical"
  | "institutional";

export interface OntologyMapping {
  external: string;
  meaning: string;
  institutional?: string;
}

export interface OntologyBridge {
  version: OntologyVersion;
  mappings: Record<string, OntologyMapping>;
}

export const ONTOLOGY_BRIDGE: Record<OntologyVersion, OntologyBridge> = {
  "1.0.0": {
    version: "1.0.0",

    mappings: {
      BALANCE_ANCHOR: {
        external: "BALANCE_REFERENCE",
        meaning: "fixed reference state",
        institutional: "reference value"
      },

      resonance: {
        external: "reference",
        meaning: "state alignment",
        institutional: "documented reference"
      },

      laminar: {
        external: "deterministicProcessing",
        meaning: "stable execution",
        institutional: "consistent processing"
      },

      sync: {
        external: "synchronizationState",
        meaning: "state transition status",
        institutional: "current status"
      },

      ledgerState: {
        external: "referenceState",
        meaning: "bounded system condition",
        institutional: "documented status"
      },

      factory: {
        external: "runtimeEnvironment",
        meaning: "execution environment",
        institutional: "system environment"
      },

      validator: {
        external: "verificationWorkflow",
        meaning: "integrity review",
        institutional: "review process"
      },

      sovereign: {
        external: "primaryAuthority",
        meaning: "root governance entity",
        institutional: "principal owner"
      },

      shard: {
        external: "dataSegment",
        meaning: "partitioned evidence unit",
        institutional: "document section"
      },

      anchor: {
        external: "fixedReference",
        meaning: "immutable state marker",
        institutional: "baseline reference"
      },

      canon: {
        external: "authorizedSet",
        meaning: "complete token collection",
        institutional: "approved token list"
      },

      mevr: {
        external: "runtimeValidator",
        meaning: "minimal evidence verification runtime",
        institutional: "verification system"
      }
    }
  }
} as const;

export function getOntologyBridge(version: OntologyVersion): OntologyBridge {
  return ONTOLOGY_BRIDGE[version];
}

export function translateTerm(
  term: string,
  version: OntologyVersion = "1.0.0",
  domain: RuntimeDomain = "external"
): string {
  const bridge = ONTOLOGY_BRIDGE[version];
  const mapping = bridge.mappings[term];
  
  if (!mapping) return term;
  
  if (domain === "institutional" && mapping.institutional) {
    return mapping.institutional;
  }
  
  return mapping.external;
}

export function getMeaning(
  term: string,
  version: OntologyVersion = "1.0.0"
): string | null {
  const bridge = ONTOLOGY_BRIDGE[version];
  return bridge.mappings[term]?.meaning || null;
}
