const { ethers } = require("hardhat");

/**
 * Grant DEPLOYER_ROLE to the deployer address
 * Factory: 0x12e2441A6406eF61Ad7e6b5D762988890597587d
 */

const FACTORY_ADDRESS = "0x12e2441A6406eF61Ad7e6b5D762988890597587d";
const DEPLOYER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("DEPLOYER_ROLE"));

async function main() {
  console.log("\n=== GRANTING DEPLOYER_ROLE ===\n");
  
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);
  console.log("DEPLOYER_ROLE:", DEPLOYER_ROLE);
  
  const factory = await ethers.getContractAt("JAXXServerFactory", FACTORY_ADDRESS);
  
  // Check if already has role
  const hasRole = await factory.hasRole(DEPLOYER_ROLE, deployer.address);
  console.log("Has DEPLOYER_ROLE:", hasRole);
  
  if (!hasRole) {
    console.log("\nGranting DEPLOYER_ROLE...");
    const tx = await factory.grantRole(DEPLOYER_ROLE, deployer.address);
    await tx.wait();
    console.log("Role granted! TX:", tx.hash);
  }
  
  // Also check SOVEREIGN_ROLE
  const SOVEREIGN_ROLE = ethers.keccak256(ethers.toUtf8Bytes("SOVEREIGN_ROLE"));
  const hasSovereignRole = await factory.hasRole(SOVEREIGN_ROLE, deployer.address);
  console.log("Has SOVEREIGN_ROLE:", hasSovereignRole);
  
  // Check DEFAULT_ADMIN_ROLE
  const DEFAULT_ADMIN_ROLE = "0x0000000000000000000000000000000000000000000000000000000000000000";
  const hasAdminRole = await factory.hasRole(DEFAULT_ADMIN_ROLE, deployer.address);
  console.log("Has DEFAULT_ADMIN_ROLE:", hasAdminRole);
  
  // Check who is the sovereign
  const sovereign = await factory.sovereignAddress();
  console.log("Sovereign Address:", sovereign);
  
  // Check the role admin for DEPLOYER_ROLE
  const roleAdmin = await factory.getRoleAdmin(DEPLOYER_ROLE);
  console.log("DEPLOYER_ROLE Admin:", roleAdmin);
  
  // Check if sovereign has admin role
  const sovereignHasAdmin = await factory.hasRole(DEFAULT_ADMIN_ROLE, sovereign);
  console.log("Sovereign has DEFAULT_ADMIN_ROLE:", sovereignHasAdmin);
}

main().catch(console.error);
