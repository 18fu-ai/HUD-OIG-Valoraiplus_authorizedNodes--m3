/**
 * VALORAIPLUS Ontology Deprecations
 * Track deprecated ontology terms and prevent silent semantic mutation
 */

import type { OntologyVersion } from "./bridge";

export interface DeprecatedOntologyTerm {
  replacedBy: string;
  reason: string;
  previousMeaning: string;
  newMeaning?: string;
  deprecatedAt: string;
}

export interface OntologyDeprecationSet {
  version: OntologyVersion;
  active: boolean;
  deprecatedTerms: Record<string, DeprecatedOntologyTerm>;
}

export const ONTOLOGY_DEPRECATIONS: Record<OntologyVersion, OntologyDeprecationSet> = {
  "1.0.0": {
    version: "1.0.0",
    active: true,
    deprecatedTerms: {
      "144D": {
        replacedBy: "34D",
        reason: "Sync cadence updated to 34-day cycle",
        previousMeaning: "144-day synchronization period",
        newMeaning: "34-day synchronization period",
        deprecatedAt: "2026-05-01"
      },
      "$VALOR": {
        replacedBy: "$VALORAIPLUS",
        reason: "Token symbol standardization",
        previousMeaning: "Legacy valor token",
        newMeaning: "VALORAIPLUS operating system token",
        deprecatedAt: "2026-04-15"
      },
      "ValorTokenFactory": {
        replacedBy: "JAXXServerFactory",
        reason: "Factory contract renamed for clarity",
        previousMeaning: "Token deployment factory",
        newMeaning: "JAXX server factory deployment system",
        deprecatedAt: "2026-05-10"
      }
    }
  }
} as const;

export function getOntologyDeprecations(version: OntologyVersion): OntologyDeprecationSet {
  return ONTOLOGY_DEPRECATIONS[version];
}

export function isTermDeprecated(
  term: string,
  version: OntologyVersion = "1.0.0"
): boolean {
  const deprecations = ONTOLOGY_DEPRECATIONS[version];
  return term in deprecations.deprecatedTerms;
}

export function getDeprecationInfo(
  term: string,
  version: OntologyVersion = "1.0.0"
): DeprecatedOntologyTerm | null {
  const deprecations = ONTOLOGY_DEPRECATIONS[version];
  return deprecations.deprecatedTerms[term] || null;
}

export function getReplacementTerm(
  term: string,
  version: OntologyVersion = "1.0.0"
): string | null {
  const info = getDeprecationInfo(term, version);
  return info?.replacedBy || null;
}
