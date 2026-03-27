const { ethers } = require("hardhat");

async function main() {
  // Get the deployer wallet
  const [deployer] = await ethers.getSigners();
  console.log("Deploying from wallet:", deployer.address);

  // Load and deploy the contract
  const Registry = await ethers.getContractFactory("StudentRegistry");
  const registry = await Registry.deploy();

  // Wait for deployment to finish
  await registry.waitForDeployment();

  // Print the contract address
  console.log("StudentRegistry deployed to:", await registry.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
