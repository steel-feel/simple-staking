// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const fs = require('fs');
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const TokenFactory = await hre.ethers.getContractFactory("GLDToken");
  const token = await TokenFactory.deploy(100000);


  // We get the contract to deploy
  const SimpleStaking = await hre.ethers.getContractFactory("Staking");
  const oStimpleStaking = await SimpleStaking.deploy(token.address);

  await oStimpleStaking.deployed();

  console.log("Staking contract deployed to:", oStimpleStaking.address);

 // process.env["STAKE_CON"] = oStimpleStaking.address;

 var contracts = {
  STAKE_CON : oStimpleStaking.address
 };

 await fs.promises.writeFile("../contracts.json", JSON.stringify(contracts)).catch((err) => {
  throw new Error(err)
});



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
