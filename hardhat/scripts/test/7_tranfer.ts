// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import address from './metaData'


async function burn(token:any) {
  const signer = (await ethers.getSigners())[0]  
  const IERC20 = await ethers.getContractAt("IERC20",token);
  const balance = await IERC20.balanceOf(signer.address)
  console.log(balance.toString());
  
  await IERC20.transfer("0x000000000000000000000000000000000000dEaD",balance);
  
}
async function burnNFT(IERC20:any,id:any) {
  const signer = (await ethers.getSigners())[0]      
  await IERC20.transferFrom(signer.address,"0x000000000000000000000000000000000000dEaD",id);
  
}
async function burnNFTExt(IERC20:any,id:any) {
  const signer = (await ethers.getSigners())[0]    
  const ownerOf = await IERC20.ownerOf(id)  
  if(ownerOf==signer.address)
  await IERC20.transferFrom(signer.address,"0x000000000000000000000000000000000000dEaD",id);
  
}
async function main() {  
    

  const token_ =[
    
    
    
    
   "0x863315FC16b77385c5f1a8871F7E7331fcDE205a"

  ]
  
  const IERC20 = await ethers.getContractAt("ERC721",token_[0]);
  
  
  
  
  
  for (let index =1 ; index <= 100; index++) {
    await burnNFT(IERC20,index)    
  }
  

  
  
  

  // console.log(" deployed to:", {
  //   theTruckFarm: TheTruckFarm.address});
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
