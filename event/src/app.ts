import express from 'express'
import User from "./models/User";
import cors from 'cors';
import mongoose from "mongoose";
import {main,WithdrawHandle  } from "./event/event";
import { ethers, utils, Contract, Wallet, BigNumber } from "ethers";
const app = express()

app.use(cors())
app.use(express.json())





app.get('/user/:address', async function (req, res) {
const {address} =req.params
  const user = await User.findOne({ address: address});
  if(user==null)
  return res.json({address:"0"})
  else{
    console.log(user);
    
    const amount = utils.formatEther(BigNumber.from(user.BUSD))
  res.json({user,amount})}
})


app.get('/user/:address/w', async function (req, res) {
  const {address} =req.params
    const user = await User.findOne({ address: address});
    if(user==null)
    return res.json({address:"0"})
    else{
      const amount = BigNumber.from(user.BUSD)
      console.log(amount);
      
      if (amount.isZero()) {
        console.log("is Zero");
        return res.json({user:user.address,amount:0})
      }      
      else
      WithdrawHandle(address,amount)
  }
  })


app.listen(5000,async()=>{
  try {    
    await mongoose.connect("mongodb://root:example@mongo:27017/",//("mongodb+srv://camicasii:159753@cluster0.e3btj.mongodb.net/myFirstDatabase",
      //@ts-ignore
      { useNewUrlParser: true }
    );
    await main()
    console.log(`Server started and listening on port`);
  } catch (err) {
    console.log(`Error starting server: {err.message}`);
  }
})