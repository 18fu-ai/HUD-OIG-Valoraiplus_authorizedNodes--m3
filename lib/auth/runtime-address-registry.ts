/**
 * VALORAIPLUS® RUNTIME ADDRESS REGISTRY
 *
 * Rule: address role state belongs in lib/auth — validators only enforce it.
 *
 * All contract addresses that participate in the VALORAIPLUS® runtime are
 * declared here with their role and verification status. Downstream scripts
 * import helpers from this file instead of hard-coding addresses.
 */

import {
  MAINNET_ANCHOR,
  BASE_FACTORY_ADDRESS,
  RUNTIME_REFERENCES,
} from "./anchors";

export type RuntimeAddressRole =
  | "mainnetAnchor"
  | "baseFactory"
  | "token"
  | "verifier"
  | "treasury"
  | "runtimeReference";

export interface RuntimeAddressRecord {
  label: string;
  address: string;
  role: RuntimeAddressRole;
  verified: boolean;
  notes?: string;
}

export const RUNTIME_ADDRESS_REGISTRY: readonly RuntimeAddressRecord[] = [
  {
    label: "mainnetAnchor",
    address: MAINNET_ANCHOR,
    role: "mainnetAnchor",
    verified: true,
    notes: "Deployer wallet (EOA) — Base Mainnet anchor.",
  },
  {
    label: "baseFactory",
    address: BASE_FACTORY_ADDRESS,
    role: "baseFactory",
    verified: true,
    notes: "Active JAXX.server.factory v2.",
  },
  {
    label: "referenceA",
    address: RUNTIME_REFERENCES.referenceA,
    role: "runtimeReference",
    verified: false,
    notes: "Pending classification.",
  },
  {
    label: "referenceB",
    address: RUNTIME_REFERENCES.referenceB,
    role: "runtimeReference",
    verified: false,
    notes: "Pending classification.",
  },
] as const;

/** Full registry — verified and unverified. */
export function getRuntimeAddressRegistry(): readonly RuntimeAddressRecord[] {
  return RUNTIME_ADDRESS_REGISTRY;
}

/** Only records that have been classified and verified. */
export function getVerifiedRuntimeAddresses(): RuntimeAddressRecord[] {
  return RUNTIME_ADDRESS_REGISTRY.filter((r) => r.verified);
}

/** Records that are observed but not yet classified. */
export function getUnverifiedRuntimeReferences(): RuntimeAddressRecord[] {
  return RUNTIME_ADDRESS_REGISTRY.filter((r) => !r.verified);
}

/** Look up a record by label. Returns undefined if not found. */
export function getRegistryEntry(label: string): RuntimeAddressRecord | undefined {
  return RUNTIME_ADDRESS_REGISTRY.find((r) => r.label === label);
}

/** Look up a record by address (case-insensitive). */
export function getRegistryEntryByAddress(
  address: string
): RuntimeAddressRecord | undefined {
  const lower = address.toLowerCase();
  return RUNTIME_ADDRESS_REGISTRY.find((r) => r.address.toLowerCase() === lower);
}
