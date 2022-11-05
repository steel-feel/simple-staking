// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const GLDTokenFactory = await hre.ethers.getContractFactory("GLDToken");
  const gold = await GLDTokenFactory.deploy(100000);

  await gold.deployed();
  console.log(`ERC 20 contract deployed at ${gold.address}`);

  // We get the contract to deploy
  const StakingFactory = await hre.ethers.getContractFactory("Staking");
  const staking = await StakingFactory.deploy(gold.address,5);

  await staking.deployed();

  console.log(`Staking contract deployed at ${staking.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
