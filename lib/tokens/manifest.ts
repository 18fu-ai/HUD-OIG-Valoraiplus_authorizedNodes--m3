/**
 * VALORAIPLUS® TOKEN MANIFEST
 * Populated from on-chain query of 0x7fAA2FA0b1388b2c8696475d0e08F54F36818FD1
 *
 * RELEASE RULE:
 *   No token enters active status unless:
 *   sourceFactory === 0x7fAA2FA0b1388b2c8696475d0e08F54F36818FD1
 */

import { FACTORY_ADDRESS, assertActiveFactory } from "../auth/factory";

export interface TokenManifestEntry {
  symbol: string;
  name: string;
  address: string;
  sourceFactory: string;
  chain: "base";
  category: string;
  status: "active" | "pendingVerification" | "deprecated" | "failed";
}

// Guard — fails hard if factory reference is stale
assertActiveFactory(FACTORY_ADDRESS);

export const TOKEN_MANIFEST_SOURCE_FACTORY = FACTORY_ADDRESS;

export const TOKEN_MANIFEST: TokenManifestEntry[] = [
  { symbol: "VCORE",         name: "ValorCore",        address: "0xC20610545cc936cEF4eD884ae034bD6514322d40", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "CORE",       status: "active" },
  { symbol: "VAI",           name: "ValorAI",          address: "0x86330A16121978e62CC2580a955b0983eaF8268d", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "CORE",       status: "active" },
  { symbol: "VSEC",          name: "ValorSecurity",    address: "0x7b072C8d7905e991F851e447db6a3764e3A843EB", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "CORE",       status: "active" },
  { symbol: "VMAX",          name: "ValorMax",         address: "0x4f1a078847C3cA6bd2795B68eeA221dEb8c27FB2", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "CORE",       status: "active" },
  { symbol: "VBLK",          name: "ValorBlock",       address: "0xB6178393A8691Ea80FEFF0656ceD63Fe1Bd19F23", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "CORE",       status: "active" },
  { symbol: "DBLK",          name: "DynastyBlock",     address: "0x03563e91D01f4f8a04657500e8eb3F18e8610668", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "CORE",       status: "active" },
  { symbol: "VGOV",          name: "ValorGov",         address: "0x27f9e880F91E1f3b94Dc059caE2AaB28719F9f31", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "GOVERNANCE", status: "active" },
  { symbol: "VALX",          name: "ValorAlpha",       address: "0x66D1c350F3B27523CE4360cF65C4082343A58a45", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "CORE",       status: "active" },
  { symbol: "GILLBTC",       name: "GillBTC",          address: "0x3ea6d23C18843141251866a32a699cf0FA360aa8", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "DYNASTY",    status: "active" },
  { symbol: "BTC2.0",        name: "Bitcoin 2.0",      address: "0x313bAe03D68A575B966fa39b19516B6A926dFeEc", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "DYNASTY",    status: "active" },
  { symbol: "FLAME",         name: "Flame",            address: "0xf8b057924a8d5043478Ee38ED41Db77b9DEb4CdD", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "UTILITY",    status: "active" },
  { symbol: "BLUFLM",        name: "BlueFlame",        address: "0xe41eaf1Ec35E4A682A07317Eb3b703C3C39f2adc", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "UTILITY",    status: "active" },
  { symbol: "GILLSON2207",   name: "Gillson 2207",     address: "0xc28e8d0F978a1341a7cA56600b50C2f4763C7865", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "DYNASTY",    status: "active" },
  { symbol: "JAXX2207",      name: "Jaxx 2207",        address: "0x427b3b1dbDc4ea1713c708a0F0d913c7d464c2A5", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "DYNASTY",    status: "active" },
  { symbol: "NEWT2207",      name: "Newt 2207",        address: "0xA974A31fD78cD4B0DaaDFA7793931f42CD907cb0", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "DYNASTY",    status: "active" },
  { symbol: "FMG1918",       name: "FMG 1918",         address: "0x76d8ca560f41036CA55DFdFAACe6a1413F689077", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "DYNASTY",    status: "active" },
  { symbol: "DBG1932",       name: "DBG 1932",         address: "0xBA1Abc4aFf7E658Bf4496cBFF080477E52DD8A49", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "DYNASTY",    status: "active" },
  { symbol: "DEG1969",       name: "DEG 1969",         address: "0xEac8e1812541DDF65D2B102125dbD7A80B1F7463", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "DYNASTY",    status: "active" },
  { symbol: "LEG1977",       name: "LEG 1977",         address: "0x436a7d1E812347eD7F56398649947B5bf71FDe19", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "DYNASTY",    status: "active" },
  { symbol: "SGAU",          name: "SGAU ValueGuard",  address: "0x374366eE057d6eef3ffF91877CC131896CfA8C7B", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "ANCHOR",     status: "active" },
  { symbol: "VALORAIPLUS",   name: "ValorAI Plus",     address: "0x70943DEac156Ee8715e450ac15197A00212f1420", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "VALOR",      status: "active" },
  { symbol: "VALORAIPLUS3E", name: "ValorAI Plus 3E",  address: "0xfA5F1Ca2D807CA473E82FF4E9f299c1c39c4e31b", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "VALOR",      status: "active" },
  { symbol: "VREW",          name: "ValorReward",      address: "0x51e538D4BacC72d8FedEcb38E08F21F7371966Db", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "UTILITY",    status: "active" },
  { symbol: "VPNT",          name: "ValorPoint",       address: "0x57788813aadbA3b96da602aBdd5bB211c2937Da5", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "UTILITY",    status: "active" },
  { symbol: "POPPA",         name: "Poppa",            address: "0xCFD95eC167EaAC35D4055b1416E2Ab668EB87213", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "SOVEREIGN",  status: "active" },
  { symbol: "NEWT",          name: "Newt",             address: "0xA1FE26FB66Dfd99EE29315B39d1F001A67F75923", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "SOVEREIGN",  status: "active" },
  { symbol: "VRES",          name: "ValorResource",    address: "0x9BBd47E4d217668a256Bcd42662c1748c0a683C7", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "UTILITY",    status: "active" },
  { symbol: "VDAT",          name: "ValorData",        address: "0xBB1eDD091e40B63E00A24110A9527507710b6C4A", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "UTILITY",    status: "active" },
  { symbol: "VANA",          name: "ValorAna",         address: "0x0A9840Ac81d0E4BCA22D5153583f953632c8Aa7D", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "UTILITY",    status: "active" },
  { symbol: "VTRS",          name: "ValorTrust",       address: "0x5eF623696B00f8Ce5ef060bEa75E6CC20a8Cd159", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "UTILITY",    status: "active" },
  { symbol: "VRSV",          name: "ValorReserve",     address: "0x9F0a6D0F3DFC088C673e6262A648CdcB9fc9CfD5", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "UTILITY",    status: "active" },
  { symbol: "VFND",          name: "ValorFund",        address: "0xaFAbe9F4720403dD211Ff428DB87f3EDc769A3C7", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "UTILITY",    status: "active" },
  { symbol: "VGAM",          name: "ValorGame",        address: "0x55cB4D26cebb78E2CCEdd4f5C63F24bb779EDDA8", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "GAMING",     status: "active" },
  { symbol: "VMTA",          name: "ValorMeta",        address: "0xF0BC7F7ef1a084860EfD112B07cD8E9cF5A5A620", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "META",       status: "active" },
  { symbol: "VSWP",          name: "ValorSwap",        address: "0x2e40f28DE29636b8800710b6b04c506c74Dbb3f8", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "DEFI",       status: "active" },
  { symbol: "VYLD",          name: "ValorYield",       address: "0xD7057959b6d610311016320AE7e741ff70925f73", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "DEFI",       status: "active" },
  { symbol: "VLND",          name: "ValorLend",        address: "0x17e8177aAa10E3c0072470419d2Ee0d4C7d5F934", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "DEFI",       status: "active" },
  { symbol: "VID",           name: "ValorID",          address: "0x3Ea9c41Bf9FAb5A6e9432EA44928Ae05c602e41f", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "IDENTITY",   status: "active" },
  { symbol: "VKYC",          name: "ValorKYC",         address: "0x0D0B30dC98518DE2597F5d9517f06b577CcFD7D9", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "IDENTITY",   status: "active" },
  { symbol: "VENT",          name: "ValorEnterprise",  address: "0xA19a6463bBFFA67d4cB6A3064497E23FFDfF53A2", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "ENTERPRISE", status: "active" },
  { symbol: "VPRO",          name: "ValorPro",         address: "0x8DCF80331c9f864b005583dAe14B6Da0ca81998C", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "ENTERPRISE", status: "active" },
  { symbol: "VBIZ",          name: "ValorBiz",         address: "0xBa44c13829aA21833a5AA351c60953334f314d02", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "ENTERPRISE", status: "active" },
  // --- PENDING LAMINAR_FLUSH_FORCE RECONCILIATION (9 tokens) ---
  { symbol: "DONNY2207",     name: "Donny 2207",       address: "", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "DYNASTY",   status: "pendingVerification" },
  { symbol: "LEG1904",       name: "LEG 1904",         address: "", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "DYNASTY",   status: "pendingVerification" },
  { symbol: "VALORAIPLUS2E", name: "ValorAI Plus 2E",  address: "", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "VALOR",     status: "pendingVerification" },
  { symbol: "VCRD",          name: "ValorCredit",      address: "", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "DEFI",      status: "pendingVerification" },
  { symbol: "JAXX",          name: "Jaxx",             address: "", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "DYNASTY",   status: "pendingVerification" },
  { symbol: "VNFT",          name: "ValorNFT",         address: "", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "NFT",       status: "pendingVerification" },
  { symbol: "VSOC",          name: "ValorSocial",      address: "", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "SOCIAL",    status: "pendingVerification" },
  { symbol: "VCOM",          name: "ValorComm",        address: "", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "SOCIAL",    status: "pendingVerification" },
  { symbol: "VACN",          name: "ValorAcademy",     address: "", sourceFactory: FACTORY_ADDRESS, chain: "base", category: "EDUCATION", status: "pendingVerification" },
];

/**
 * Returns only tokens that are fully active and tied to the live factory.
 * This is the only function that should be used in runtime token lookups.
 */
export function getActiveTokenManifest(): TokenManifestEntry[] {
  return TOKEN_MANIFEST.filter(
    (token) =>
      token.status === "active" &&
      token.address !== "" &&
      token.sourceFactory.toLowerCase() === FACTORY_ADDRESS.toLowerCase()
  );
}

/**
 * Returns pending tokens awaiting nonce reconciliation.
 */
export function getPendingTokenManifest(): TokenManifestEntry[] {
  return TOKEN_MANIFEST.filter((t) => t.status === "pendingVerification");
}
