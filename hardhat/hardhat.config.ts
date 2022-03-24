import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version:"0.8.4",
    settings:{     
     optimizer: {
      // disabled by default
      enabled: true,
      // Optimize for how many times you intend to run the code.
      // Lower values will optimize more for initial deployment cost, higher
      // values will optimize more for high-frequency usage.
      runs: 200,
     }
    }
  },
  defaultNetwork: "BSCtestnet",
  networks: {   
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },    
    BSCmainnet: {
      url: "https://speedy-nodes-nyc.moralis.io/e42b3c0b4ce0b28a66394535/bsc/mainnet",
      chainId: 56, 
      gasPrice: 20000000000,     
      accounts:{          
        mnemonic:process.env.MNEMONIC
      }      
    },
    BSCtestnet: {      
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts:{        
        mnemonic:process.env.MNEMONIC,
        count:10
      },
      timeout:300000    
    }

  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;

/**
 * networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
 
 */
// npx hardhat verify --network BSCtestnet 0xF4C5bba5A650Ee401935e245eCa90BA593b00001 "Hello, Hardhat!" 999 "0xb79ED94cd946645F3265Ef39A6d08dfDDb116bF8"
//  npx hardhat verify --network BSCtestnet --constructor-args arguments.js 0x4E01E0b2E89755b12AA143cAd5d0a8fa4c19E9B2