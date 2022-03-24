// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  
  const signer = (await ethers.getSigners())[0]


  const token= await ethers.getContractAt("TheTruckFarm","0x83C0Eb9DA869138dc98185675f3dfAa2a41B54Ee")
  const Vault = await ethers.getContractFactory("Vault");
  const vault = await Vault.deploy();

  await vault.deployed();
  // We get the contract to deploy
  const MasterChefV2 = await ethers.getContractFactory("MasterChefV2");
  const masterChefV2 = await MasterChefV2.deploy(token.address,vault.address,signer.address);
  await masterChefV2.deployed();

  await vault.transferOwnership(masterChefV2.address)
  await token.transferOwnership(masterChefV2.address) 
  
  console.log("Greeter deployed to:", 
  {
    masterChefV2:masterChefV2.address,
    vault:vault.address,
    token:token.address
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
