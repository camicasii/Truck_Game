import { ethers, utils, Contract, Wallet, BigNumber } from "ethers";
import { ERC20, ERC721, TruckGame } from "../utils/abi";
// import { Pool } from "./mysql";
import mongoose from "mongoose";
import User from "../models/User";

const address = process.env.SWAP;
const ws_ = process.env.PRC_WS;
const RPC_ = process.env.PRC_HTTP;
//@ts-ignore
const MNEMONIC: string = process.env.MNEMONIC;

// const mysql = Pool();

async function UserWithdraw(ws: any) {
  const provider2 = new ethers.providers.JsonRpcProvider(RPC_);
  let wallet = ethers.Wallet.fromMnemonic(`${MNEMONIC}`);
  wallet = wallet.connect(ws);
  const walletOwner = wallet.connect(provider2);
  //@ts-ignore
  const contractnft = new ethers.Contract(address, TruckGame, wallet);
  //@ts-ignore
  const contractHandle = new ethers.Contract(address, TruckGame, walletOwner);

  contractnft.on(
    "UserWithdraw",
    async (user_, nonce, timestamp, amount, event) => {
      console.log({
        user_,
        nonce,
        timestamp,
        amount,
      });

      // @ts-ignore
      const user = await User.findOne({ address: user_ });      
      const currenAmount = BigNumber.from(user.BUSD);
      if (currenAmount.isZero()) {
        console.log("is Zero");
        return;
      } else if (amount.gte(currenAmount)) {
        await User.findOneAndUpdate({ address: user_ }, { BUSD: 0 });
        await contractHandle.withdraw(user_, currenAmount, nonce);
      } else {
        const newAmount = currenAmount.sub(amount);
        await User.findOneAndUpdate(
          { address: user_ },
          { BUSD: newAmount.toHexString() }
        );
        await contractHandle.withdraw(user_, newAmount, nonce);
      }
    }
  );
}

async function UserExchange(ws: any) {
  let wallet = ethers.Wallet.fromMnemonic(`${MNEMONIC}`);
  wallet = wallet.connect(ws);
  //@ts-ignore
  const contractnft = new ethers.Contract(address, TruckGame, wallet);
  contractnft.on(
    "UserExchange",
    async (user_, amount_: BigNumber, nonce, timestamp, event) => {
      console.log("UserExchange")
      console.log({
        user_,
        amount_: amount_.toHexString(),
        nonce: nonce.toString(),
        timestamp: timestamp.toString(),
      },"UserExchange");
      // @ts-ignore
      const user = await User.findOne({ address: user_ });
      if (user == null) {
        await User.create({
          address: user_,
          nonce: nonce.toString(),
          BUSD: amount_.toHexString(),
          date: timestamp.toString(),
        });
      } else {
        console.log("paso");
        
        // console.log(user);
        const currenAmount = BigNumber.from(user.BUSD);
        await User.findOneAndUpdate(
          { address: user_ },
          { BUSD: amount_.add(currenAmount).toHexString() }
        );
      }
    }
  );
}

async function Withdraw(ws: any) {
  let wallet = ethers.Wallet.fromMnemonic(`${MNEMONIC}`);
  wallet = wallet.connect(ws);
  //@ts-ignore
  const contractnft = new ethers.Contract(address, TruckGame, wallet);

  contractnft.on(
    "Withdraw",
    async (user_, amount_, nonce, timestamp, event) => {
      console.log("withdraw");
      console.log({
        user_,
        amount_,
        nonce,
        timestamp,
      });
    }
  );
}


export async function WithdrawHandle(user_:any ,amount:BigNumber) {
  const provider2 = new ethers.providers.JsonRpcProvider(RPC_);
  let wallet = ethers.Wallet.fromMnemonic(`${MNEMONIC}`);  
  const walletOwner = wallet.connect(provider2);  
  //@ts-ignore
  const contractHandle = new ethers.Contract(address, TruckGame, walletOwner);
      // @ts-ignore
      const user = await User.findOne({ address: user_ });      
      const currenAmount = BigNumber.from(user.BUSD);
      if (amount.gte(currenAmount)) {
        await User.findOneAndUpdate({ address: user_ }, { BUSD: 0 });
        await contractHandle.withdraw(user_, currenAmount);
      } else {
        const newAmount = currenAmount.sub(amount);
        await User.findOneAndUpdate(
          { address: user_ },
          { BUSD: newAmount.toHexString()}
        );
        await contractHandle.withdraw(user_, newAmount);
      }  
}

export async function main() {
  

  //@ts-ignore
  const provider = new ethers.providers.WebSocketProvider(ws_);
  let wallet = ethers.Wallet.fromMnemonic(`${MNEMONIC}`);
  wallet = wallet.connect(provider);
  await UserExchange(provider);
  await UserWithdraw(provider);
  await Withdraw(provider);
}

// main();
