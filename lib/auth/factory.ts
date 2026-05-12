/**
 * VALORAIPLUS® FACTORY AUTHORITY
 * Single source of truth for the active JAXX.server.factory address.
 * All token activity MUST originate from this factory.
 *
 * Anchor and factory are tracked separately — see lib/auth/anchors.ts.
 */

import {
  BASE_FACTORY_ADDRESS,
  DEPRECATED_FACTORY_ADDRESSES,
} from "./anchors";

export { BASE_FACTORY_ADDRESS, DEPRECATED_FACTORY_ADDRESSES };

export const FACTORY_ADDRESS = BASE_FACTORY_ADDRESS;

export const FACTORY_CHAIN_ID = 8453;

export const FACTORY_NETWORK = "Base Mainnet";

export const FACTORY_SOVEREIGN = "0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB";

export const FACTORY_DEPLOYER = "0x50FB4a7da28ACaDbD452949508A32726aD6E36C0";

export const FACTORY_BLOCK_DEPLOYED = 45_881_967;

/**
 * assertActiveFactory — throws at module load time if a consumer
 * accidentally references a deprecated factory address.
 */
export function assertActiveFactory(address: string): void {
  if (address.toLowerCase() !== FACTORY_ADDRESS.toLowerCase()) {
    throw new Error(
      `[FACTORY] DEAD FACTORY REFERENCE DETECTED.\n` +
      `  Got:      ${address}\n` +
      `  Expected: ${FACTORY_ADDRESS}\n` +
      `  Refusing to continue. Update your reference to the active factory.`
    );
  }
}

/**
 * isActiveFactory — non-throwing variant for conditional checks.
 */
export function isActiveFactory(address: string): boolean {
  return address.toLowerCase() === FACTORY_ADDRESS.toLowerCase();
}
