/**
 * Runtime Anchors
 *
 * Production Rule:
 * Anchors and factories are separate references.
 *
 * Mainnet anchor:  0x50FB4a7da28ACaDbD452949508A32726aD6E36C0
 * Active factory:  0x7fAA2FA0b1388b2c8696475d0e08F54F36818FD1
 * Previous factory deprecated.
 */

export const MAINNET_ANCHOR =
  "0x50FB4a7da28ACaDbD452949508A32726aD6E36C0" as const;

export const BASE_FACTORY_ADDRESS =
  "0x7fAA2FA0b1388b2c8696475d0e08F54F36818FD1" as const;

export const DEPRECATED_FACTORY_ADDRESSES = [
  "0x12e2441A6406eF61Ad7e6b5D762988890597587d",
] as const;

const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

export function assertEthAddress(label: string, address: string): void {
  if (!ETH_ADDRESS_REGEX.test(address)) {
    throw new Error(`Invalid ${label} address: ${address}`);
  }
}

export function assertRuntimeAnchors(): void {
  assertEthAddress("mainnet anchor", MAINNET_ANCHOR);
  assertEthAddress("base factory", BASE_FACTORY_ADDRESS);

  for (const address of DEPRECATED_FACTORY_ADDRESSES) {
    if (address.toLowerCase() === BASE_FACTORY_ADDRESS.toLowerCase()) {
      throw new Error(`Active factory is deprecated: ${address}`);
    }
  }
}
