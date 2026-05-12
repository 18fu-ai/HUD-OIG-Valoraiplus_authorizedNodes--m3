/**
 * VALORAIPLUS Ontology Validation
 * Block release on ontology violations
 */

import { ONTOLOGY_BRIDGE } from "../lib/ontology/bridge";
import { ONTOLOGY_DEPRECATIONS } from "../lib/ontology/deprecations";

type OntologyViolationType =
  | "UNKNOWN_TERM"
  | "DEPRECATED_TERM"
  | "MISSING_TRANSLATION"
  | "MEANING_DRIFT"
  | "UNRESOLVED_INCIDENT";

interface OntologyViolation {
  type: OntologyViolationType;
  term: string;
  version: string;
  recommendation: string;
}

const CURRENT_VERSION = "1.0.0" as const;

function validateOntology(): OntologyViolation[] {
  const violations: OntologyViolation[] = [];

  const bridge = ONTOLOGY_BRIDGE[CURRENT_VERSION];
  const deprecations = ONTOLOGY_DEPRECATIONS[CURRENT_VERSION];

  if (!bridge) {
    violations.push({
      type: "MISSING_TRANSLATION",
      term: "ONTOLOGY_BRIDGE",
      version: CURRENT_VERSION,
      recommendation: "Define ontology bridge version."
    });

    return violations;
  }

  for (const term of Object.keys(bridge.mappings)) {
    const mapping = bridge.mappings[term as keyof typeof bridge.mappings];

    if (!mapping.external) {
      violations.push({
        type: "MISSING_TRANSLATION",
        term,
        version: CURRENT_VERSION,
        recommendation: "Add external translation."
      });
    }

    if (!mapping.meaning) {
      violations.push({
        type: "MEANING_DRIFT",
        term,
        version: CURRENT_VERSION,
        recommendation: "Define semantic meaning."
      });
    }
  }

  if (deprecations?.deprecatedTerms) {
    for (const term of Object.keys(deprecations.deprecatedTerms)) {
      const deprecated = deprecations.deprecatedTerms[term as keyof typeof deprecations.deprecatedTerms];

      if (!deprecated.replacedBy) {
        violations.push({
          type: "DEPRECATED_TERM",
          term,
          version: CURRENT_VERSION,
          recommendation: "Provide replacement term."
        });
      }
    }
  }

  return violations;
}

async function main() {
  const violations = validateOntology();

  if (violations.length > 0) {
    console.error("\nOntology validation failed:\n");

    for (const violation of violations) {
      console.error(`[${violation.type}] ${violation.term}`);
      console.error(`-> ${violation.recommendation}\n`);
    }

    process.exit(1);
  }

  console.log("Ontology validation passed.");
  process.exit(0);
}

main();
