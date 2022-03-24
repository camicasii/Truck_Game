// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { constants } from "ethers";


async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const [acount,user,dev,_] = await ethers.getSigners()
  const Token = await ethers.getContractFactory("Token");
  const CrowdSAle = await ethers.getContractFactory("CrowdSale");
  const token = await Token.deploy();
  //const crowSale = await CrowdSAle.deploy(token.address,dev.address);
  const crowSale = await CrowdSAle.deploy();

  await token.deployed();
  await crowSale.deployed();
  await token.transfer(crowSale.address,ethers.utils.parseEther('100000000'))
  await token.connect(user).approve(crowSale.address,constants.MaxUint256)  
  await token.approve(crowSale.address,constants.MaxUint256)  
  await crowSale.start()
    
  

  console.log("Greeter deployed to:", token.address);
  console.log("Greeter deployed to:", crowSale.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

