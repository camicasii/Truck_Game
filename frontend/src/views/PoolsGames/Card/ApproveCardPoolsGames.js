import clsx from "clsx";
import React from "react";
import Dropdown from "../../../components/Dropdown";
import ModalROI from "../../../components/ModalROI";
import { useEffect, useContext, useState, useRef } from "react";
import Web3Context from "../../../context/Web3Context";
import { IBEP20, MasterChefV2, Vault, PancakeRouter } from "../../../hooks/abiHelpers";
import { constants, BigNumber, ethers } from "ethers";
import { useToasts } from "react-toast-notifications";
import refHandler from "../../../hooks/refHandler";
import address from "../../../hooks/address";
import config from '../../../utils/config'

const ApproveCardPoolsGames = ({ pool }) => {
  const { accounts, isLoaded } = useContext(Web3Context);
  const [youStake, setyouStake] = useState(0);
  const [approve, setapprove] = useState(false);
  const [allowance, setallowance] = useState(0);
  const [pending, setpending] = useState(0);
  const [liquidity, setliquidity] = useState(0);
  const [reward, setreward] = useState(0);
  const [symbol, setsymbol] = useState("");
  const [canDepost, setcanDepost] = useState(false);
  const [canHarvest, setcanHarvest] = useState(false);
  const [canWithdraw, setcanWithdraw] = useState(false);
  const [balanceOf, setbalanceOf] = useState(0);
  const [aprView, setaprView] = useState('100000')
  const [update, setupdate] = useState(1)
  const [tokenPrice, settokenPrice] = useState(0)
  const [getPrice, setgetPrice] = useState(0)
  const [decimal, setdecimal] = useState(2)
  const [pendingview, setpendingview] = useState(0)
  const [youStakeView, setyouStakeView] = useState(0)
  const [LOLLIPRICE, setLOLLIPRICE] = useState(BigNumber.from(ethers.utils.parseEther('0.005')));



  const ref = useRef(0);
  const { addToast } = useToasts();



useEffect(() => {    
    const test=async()=>{            
      await apr();      
    }
    if (isLoaded) 
    test()
      
    
    return () => {};
  }, [getPrice]);
  
  useEffect(() => {    
    const test=async()=>{            
      await allowanceHandle();
      await poolinfo()      
    }
    if (isLoaded) 
    test()
      
    
    return () => {};
  }, [isLoaded, accounts,update]);

  

  
  
  const allowanceHandle = async () => {
    try {
      const iBEP20 = new window.web3.eth.Contract(
        IBEP20,
        pool.address
      );
      const allowance_ = await iBEP20.methods
        .allowance(accounts[0], config.TOKEN_MASTER_CHEF_v2)
        .call();  
      if (BigNumber.from(allowance_).lt(constants.MaxUint256.div(5))) 
      setapprove(false);
      else
      setapprove(true);
      setallowance(allowance_)
      return allowance_;
    } catch (error) {
      console.log(error,ethers.utils.parseEther('0.5').toString(),'config.TOKEN_MASTER_CHEF_v2)');
    }
  };

  const approveHandle = async (e) => {
    e.preventDefault();
    const iBEP20 = new window.web3.eth.Contract(
      IBEP20,
      String(pool.address).toUpperCase()
    );    
    try {
      await iBEP20.methods
        .approve(
          config.TOKEN_MASTER_CHEF_v2,
          constants.MaxUint256
        )
        .send({ from: accounts[0] })
        .on("transactionHash", function (hash) {})
        .on("confirmation", function (confirmationNumber, receipt) {})
        .on("receipt", function (receipt) {
          addToast("Approve Successfully", { appearance: "success" });
          setapprove(true)
          setupdate(update + 1)
        })
        .on("error", function (error, receipt) {
          // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
          addToast(error.message, { appearance: "error" });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const poolinfo = async () => {
    /**
        *   function canHarvest(uint256 _pid, address _user) public view returns (bool) {
        function canDepost(uint256 _pid, address _user) public view returns(bool){
        function canWithdraw(uint256 _pid, address _user) public view returns(bool){
        * 
        */

    try {
      const masterChefV2 = new window.web3.eth.Contract(
        MasterChefV2,
        config.TOKEN_MASTER_CHEF_v2
      );
      const vaultAddress = config.CHAIN==0?"0x284FCD9f6eCd0666855FfCF0E147ed2F5CC43736":'0x9c06ee8691752106415dFe559104Bb5CE4AC0eC2'
      const vault = new window.web3.eth.Contract(
        Vault,
        vaultAddress
      );
      
      const pancakeAddress = config.CHAIN==0?"0x10ED43C718714eb63d5aA57B78B54704E256024E":'0xD99D1c33F9fC3444f8101754aBC46c52416550D1'
      
      const pancakeRouter = new window.web3.eth.Contract(
        PancakeRouter,
        pancakeAddress        
      );
      //const poolinf =await masterChefV2.methods.poolInfo(pool.poolID).call()
      const res = await masterChefV2.methods
        .userInfo(pool.poolID, accounts[0])
        .call();
      const pending_ = await masterChefV2.methods
        .pendingLollipop(pool.poolID, accounts[0])
        .call();
      const liquidity_ = await vault.methods
        .getTokenBalance(pool.address)
        .call();
      const iBEP20 = new window.web3.eth.Contract(
        IBEP20,
        String(pool.address).toUpperCase()
      );
      const symbol_ = await iBEP20.methods.symbol().call();
      const tokenBalance = await iBEP20.methods.balanceOf(accounts[0]).call();     
      const decimal_ = await iBEP20.methods.decimals().call();

      const canDepost_ = await masterChefV2.methods
        .canDepost(pool.poolID, accounts[0])
        .call();
      const canHarvest_ = await masterChefV2.methods
        .canHarvest(pool.poolID, accounts[0])
        .call();
      const canWithdraw_ = await masterChefV2.methods
        .canWithdraw(pool.poolID, accounts[0])
        .call();

        //console.log(ethers.utils.parseEther("1").toString(),'ethers.utils.parseEther(1)');
        let  price = [0,ethers.utils.parseEther("1").toString()]
        const bnbAddress = config.CHAIN == 0 ? address.WBNB.address:'0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd'
        const busdAddress = config.CHAIN == 0 ? address.BUSD.address : '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee'
        if(pool.name != 'BUSD') {
            try{
              if(pool.name != 'D-ReiT') {
                price = await pancakeRouter.methods
                  .getAmountsOut(ethers.utils.parseUnits("1", decimal_).toString()
                  ,[pool.address,busdAddress]).call();
              } else {
                price = await pancakeRouter.methods
                .getAmountsOut(ethers.utils.parseUnits("1", decimal_).toString()
                ,[pool.address,bnbAddress,busdAddress])
                .call();
              }
            } catch {
              try {
                price = await pancakeRouter.methods
                .getAmountsOut(ethers.utils.parseUnits("1", decimal_).toString()
                ,[pool.address,bnbAddress,busdAddress])
                .call();
              } catch {
                console.log(`comparacion incorrecta en ${pool.name}`);
                price = [0,ethers.utils.parseEther("2")]
              }
          }
        }

      // if(pool.name == 'LOLLI' || pool.name == 'BUSD'){
      //   console.log(price[price.length-1],`price OF ${pool.name}`);
      // }

      // if(pool.name == 'DOGE'){
      //   console.log(price[price.length-1],`price OF ${pool.name}`);
      // }

      // if(pool.name == 'D-ReiT'){
      //   console.log(price[price.length-1],`price OF ${pool.name}`);
      // }

      if(pool.name == 'WBNB'){      
          console.log(pending_,'pending_');
      }
      console.log(canHarvest_,'canHarvest_');

      if(pool.name == 'LOLLI') {
        setLOLLIPRICE(BigNumber.from(price[price.length-1]));
      } else {
        const _lolliprice_array = await pancakeRouter.methods
        .getAmountsOut(ethers.utils.parseEther("1").toString()
        ,[address.LOLLI.address,busdAddress]).call();
        setLOLLIPRICE(BigNumber.from(_lolliprice_array[_lolliprice_array.length-1]));
      }
      setdecimal(decimal_)
      settokenPrice(price[price.length-1])
      setbalanceOf(tokenBalance);
      setcanDepost(canDepost_);
      setcanHarvest(canHarvest_);
      setcanWithdraw(canWithdraw_);      
      setpending(ethers.utils.formatUnits(pending_,18));      
      setpendingview((Number(ethers.utils.formatUnits(pending_,18).toString())));
      setyouStakeView((Number(ethers.utils.formatUnits( res.amount,decimal_).toString())));
      setyouStake(res.amount);      
      setliquidity(liquidity_);
      setreward((Number(ethers.utils.formatUnits( res.rewardDebt,decimal_).toString())));      
      setsymbol(symbol_);
      setgetPrice(getPrice + 1)
    } catch (error) {
      console.log(error, pool.name);
    }
  };//
  const apr = async () => {
    try {
      const secondPYear = 365 * 24 * 60 * 60 ;
      const masterChefV2 = new window.web3.eth.Contract(
        MasterChefV2,
        config.TOKEN_MASTER_CHEF_v2
      );    

      const returnPoolPerSecond = await masterChefV2.methods
      .returnPoolPerSecond(pool.poolID)
      .call();        
 
      console.log(tokenPrice,pool.name);
      const yearlyCakeRewardAllocation =  BigNumber.from(returnPoolPerSecond)
      .mul(BigNumber.from(secondPYear))
      .mul(LOLLIPRICE)


      let totalStakingTokenInPool

      if(decimal == 18)
        totalStakingTokenInPool = BigNumber.from(tokenPrice).mul(liquidity)
      else
        totalStakingTokenInPool = BigNumber.from(tokenPrice).mul(ethers.utils.parseUnits((liquidity/(10**decimal)).toString(), 18))

        let token = 0;
        if(totalStakingTokenInPool != 0)
          token = (yearlyCakeRewardAllocation.toString() * 100 / totalStakingTokenInPool.toString()).toFixed(2)

      if(token !=0)
      setaprView(token)

    } catch (error) {
      console.log('poolGames error', error);
    }
  };
  const harvestHandle = async (amount_,) => {
    if(amount_ == 0 && !canHarvest )
    return addToast("it is not yet time for the next harvest", {
      appearance: "error",
    });
    if (amount_ == 0 && canHarvest && !(parseInt(pending) > 0))
      return addToast("Insufficient balance for harvest", {
        appearance: "error",
      });

      //const amount = BigNumber.from(amount_).mul(constants.WeiPerEther)
      
      const amount = amount_
      

      
      try {
      const masterChefV2 = new window.web3.eth.Contract(
        MasterChefV2,
        config.TOKEN_MASTER_CHEF_v2
      );
      await masterChefV2.methods
        .withdraw(pool.poolID, amount.toString())
        .send({ from: accounts[0] })
        .on("transactionHash", function (hash) {})
        .on("confirmation", function (confirmationNumber, receipt) {})
        .on("receipt", function (receipt) {          
          if(amount_ !=0)
          addToast("Withdraw Successfully", { appearance: "success" });
          else
          addToast("Harvest Successfully", { appearance: "success" });
          setupdate(update + 1)
        })
        .on("error", function (error, receipt) {
          // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
          addToast(error.message, { appearance: "error" });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const withdrawHandle = async () => {
    try {
      if (canWithdraw && youStake < 1)
        return addToast("Insufficient balance for withdraw", {
          appearance: "error",
        });
      await harvestHandle(youStake);
    } catch (error) {
      console.log(error);
    }
  };

  const depositHandle = async (e) => {
    e.preventDefault();
    try {
      let refValue = parseFloat(ref.current.value);      
      refValue = Number.isNaN(refValue) ? 0 : refValue;
      
      const ref_ = refHandler();
      
      const amount = ethers.utils.parseUnits(refValue.toString(),decimal)

      if (canDepost && balanceOf < 10000 && (amount.toString()) < balanceOf)
        return addToast("Insufficient balance ", { appearance: "error" });  
      if(balanceOf <1000)   
        return addToast("Insufficient balance ", { appearance: "error" }); 
      if(parseInt(amount.toString()) >parseInt(balanceOf))   
        return addToast("Insufficient balance ", { appearance: "error" }); 

      const masterChefV2 = new window.web3.eth.Contract(
        MasterChefV2,
        config.TOKEN_MASTER_CHEF_v2
      );
      await masterChefV2.methods
        .deposit(pool.poolID, amount.toString(), ref_)
        .send({ from: accounts[0] })
        .on("transactionHash", function (hash) {})
        .on("confirmation", function (confirmationNumber, receipt) {})
        .on("receipt", function (receipt) {
          addToast("Deposit Successfully", { appearance: "success" });
          setupdate(update + 1)
        })
        .on("error", function (error, receipt) {
          // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
          addToast(error.message, { appearance: "error" });
        });
    } catch (error) {
      console.log(error);
    }
  };
  

  return(
  <>
    <div className={clsx("z-10", pool.rainbow === true && "shadowRainbo")}>
      <div
        className={clsx(
          "bg-white dark:bg-gray-800 dark:text-gray-200 shadow-sm rounded-lg overflow-hidden sm:p-2 p-2 ",
          pool.rainbow === true && ""
        )}
        index={pool.id}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-2 ">
          <div>
            <p className="text-gray-500 font-extrabold text-xl ">
              {pool.name} Pool
            </p>
            <img src={pool.image} className="w-20 rounded-full" alt="lolli" />
          </div>
          <div>
            <div className="grid gap-1">
              <button className=" font-semibold   text-white bg-blue-400 text-center  py-2 px-3 rounded-full my-2"
              onClick={()=>harvestHandle(0)}
              >
                {" "}
                Harvest
              </button>
              <button className="font-semibold   text-white bg-red-400 text-center  py-2 px-3 rounded-full"
              onClick={withdrawHandle}
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
 
        <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-2 mt-2 text-pink-primary font-semibold">
          LOLLI earned 
          <div>Deposit Fee 4% total bloqueado</div>
        </div>

     {approve?<div className="mt-2 sm:flex sm:justify-center lg:justify-start ">
          <div>
            <input
            ref={ref}
            min='0' 
            onChange={()=>{
              console.log(ref.current.value);
              if(parseInt(ref.current.value)<0)
              ref.current.value=0
            }}                 
              type="number"
              className={`w-full  px-16 py-2.5 border border-transparent 
              shadow-sm text-sm font-bold rounded-full text-white bg-pink-primary 
              placeholder-yellow-200
              hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2
               focus:ring-indigo-500 mt-2`}
              placeholder="amount"
            />
              
            
            
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-5 flex items-center justify-center cursor-pointer "
          onClick={depositHandle}
          >
            <img src="/pool/buttonMas.svg" alt="" className=" " />
          </div>
          <div className="text-gray-500 text-md font-semibold flex space-x-2 justify-end"></div>
        </div>:<div className=" my-4 text-center justify-items-center justify-center mt-2 text-gray-500 font-bold px-12 py-2 cursor-pointer">
          <span className="flex justify-center">
            <img
              src="/pool/control.svg"
              className="absolute -mt-7 "
              alt="Grupo_15890"
            />
          </span>
          <p
          onClick={approveHandle}
          className="text-white text-md bg-gradient-to-br from-[#4e5fa7] to-[#514574] hover:bg-pink-600 rounded-full transition-all ease-in-out duration-150 py-2">
            Approve contract
          </p>{" "}
        </div>}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-2 mt-4 px-2">
          <div className="text-pink-primary text-md font-semibold">APR:</div>
          <div className="text-gray-500 text-md font-semibold flex space-x-2 justify-end">
            <p>{aprView}%</p>
            <ModalROI ROI={pool.ROI} name={pool.name} link={"#"} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-2 mt-2 px-2">
          <p className="text-pink-primary text-md font-semibold">Your harvest:</p>
          <p className="text-gray-500 text-md font-semibold flex space-x-2 justify-end">
            {pendingview.toFixed(4)}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-2 mt-2 px-2">
          <p className="text-pink-primary text-md font-semibold">
            Stake value:
          </p>
          <p className="text-gray-500 text-md font-semibold flex space-x-2 justify-end">
            {youStakeView.toFixed(4)} {symbol}
          </p>
        </div>
        <div className="border-b-2 border-gray-200 mx-4 mt-2" />
        <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-2 mt-4 px-2 ">
          <div className="px-4">
            <p className=" font-semibold flex justify-center text-pink-500  py-1  border border-pink-400  rounded-full mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>{" "}
              Core
            </p>
          </div>

          <div className="flex text-center justify-items-center justify-center text-gray-500 font-semibold space-x-2">
            <Dropdown liquidity={
                Number(ethers.utils.formatUnits( liquidity).toString()).toFixed(4)
              }  symbol={symbol}/>
          </div>
        </div>
      </div>
    </div>
  </>
);}
export default ApproveCardPoolsGames;
