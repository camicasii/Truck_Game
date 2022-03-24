// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import address from './metaData'
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  const signer = (await ethers.getSigners())[3]
  const PoolRewards = await ethers.getContractAt("PoolRewards",address.PoolRewards);
  const owner = await PoolRewards.OWNER_ROLE()
  await PoolRewards.grantRole(owner,address.TruckGame);
  // await PoolRewards.revokeRole(owner,address.TruckGame);

  // const theTruckFarm = await TheTruckFarm.balanceOf(address.claim);
  

  console.log(" deployed to:", {
    // theTruckFarm: theTruckFarm
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

