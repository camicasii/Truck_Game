import React from "react";
import clsx from "clsx";
import ButtonPopover from "../ButtonPopover";
import ModalROI from "../../../components/ModalROI";
import Dropdown from "../../../components/Dropdown";
import Web3Context from "../../../context/Web3Context";
import { useEffect, useContext, useState, useRef } from "react";
import { useToasts } from "react-toast-notifications";
import refHandler from "../../../hooks/refHandler";
import { constants, BigNumber, ethers } from "ethers";
import address from "../../../hooks/address";
import {
  useMasterChefV2,
  useToken,
  UsePancakeRouter,
  Usevault,
} from "../../../hooks/useContract";
import config from '../../../utils/config'


const ApproveCardpool = ({ pool }) => {
  const MasterChefV2 = useMasterChefV2();
  const PancakeRouter = UsePancakeRouter();
  const Vault = Usevault();
  const Token = useToken(pool.address);

  const { accounts, isLoaded} = useContext(Web3Context);
  const [youStake, setyouStake] = useState(constants.Zero);
  const [approve, setapprove] = useState(false);
  const [allowance, setallowance] = useState(0);
  const [pending, setpending] = useState(0);
  const [liquidity, setliquidity] = useState(0);
  const [reward, setreward] = useState(0);
  const [amountRef, setamountRef] = useState(0);
  const [symbol, setsymbol] = useState("");
  const [canDepost, setcanDepost] = useState(false);
  const [canHarvest, setcanHarvest] = useState(false);
  const [canWithdraw, setcanWithdraw] = useState(false);
  const [balanceOf, setbalanceOf] = useState(constants.Zero);
  const [aprView, setaprView] = useState("10000");
  const [update, setupdate] = useState(1);
  const [getPrice, setgetPrice] = useState(0);
  const [tokenPrice, settokenPrice] = useState(0);
  const [pendingview, setpendingview] = useState(0);
  const [youStakeView, setyouStakeView] = useState(0);
  const [decimal, setdecimal] = useState(18);
  const ref = useRef(0);
  const [LOLLIPRICE, setLOLLIPRICE] = useState(
    BigNumber.from(ethers.utils.parseEther("0.005"))
  );
  const { addToast } = useToasts();

  useEffect(() => {
    const test = async () => {
      await apr();
    };
    if (isLoaded) test();

    return () => {};
  }, [getPrice]);

  useEffect(() => {
    const test = async () => {
      await allowanceHandle();
      await poolinfo();
    };
    if (isLoaded) test();
    return () => {};
  }, [isLoaded, accounts, update]);
  

  const allowanceHandle = async () => {
    const [load, contract] = await Token;
    if (!load && contract != null) return;
    try {
      const allowance_ = await contract.allowance(
        accounts[0],
        config.TOKEN_MASTER_CHEF_v2
      );
      if (allowance_.lt(constants.MaxUint256.div(5))) setapprove(false);
      else setapprove(true);
      setallowance(allowance_);
      return allowance_;
    } catch (error) {
      console.log(error);
    }
  };

  const approveHandle = async (e) => {
    e.preventDefault();

    const [load, contract] = await Token;
    if (!load && contract != null) return;    
    try {
      const a = await contract.approve(
        config.TOKEN_MASTER_CHEF_v2,
        constants.MaxUint256
      );
      a.wait().then((event) => {
        addToast("Approve Successfully", { appearance: "success" });
        setapprove(true);
        setupdate(update + 1);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const poolinfo = async () => {
    try {
      const [, masterChefV2] = await MasterChefV2;
      const [, vault] = await Vault;
      const [, iBEP20] = await Token;
      const [, pancakeRouter] = await PancakeRouter;

      if (
        masterChefV2 == null ||
        masterChefV2 == null ||
        masterChefV2 == null 
      ) {
        return;
      }
      const res = await masterChefV2.userInfo(pool.poolID, accounts[0]);

      const pending_ = await masterChefV2.pendingToken(
        pool.poolID,
        accounts[0]
      );

      const liquidity_ = await vault.getTokenBalance(pool.address);

      const symbol_ = await iBEP20.symbol();
      const decimal_ = await iBEP20.decimals();

      const tokenBalance = await iBEP20.balanceOf(accounts[0]);

      const canDepost_ = await masterChefV2.canDepost(pool.poolID);

      const canHarvest_ = await masterChefV2.canHarvest(
        pool.poolID,
        accounts[0]
      );

      // let price = [0, ethers.utils.parseEther("1").toString()];
      // const bnbAddress =
        // config.CHAIN == 0
          // ? address.WBNB.address
          // : "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";
      // const busdAddress =
        // config.CHAIN == 0
          // ? address.BUSD.address
          // : "0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee";
// 
      // try {
        // price = await pancakeRouter.getAmountsOut(
          // ethers.utils.parseUnits("1", decimal_).toString(),
          // pool.address,
          // bnbAddress,
          // busdAddress
        // );
      // } catch {
        // console.log(`comparacion incorrecta en ${pool.name}`);
        // price = [0, ethers.utils.parseEther("2")];
      // }
// 
      // settokenPrice(price[price.length - 1]);

      setdecimal(decimal_);
      setbalanceOf(tokenBalance);
      setcanDepost(canDepost_);
      setcanHarvest(canHarvest_);
      setpending(ethers.utils.formatUnits(pending_, 18));
      setpendingview(Number(ethers.utils.formatUnits(pending_, 18).toString()));
      setyouStakeView(
        Number(ethers.utils.formatUnits(res.amount, decimal_).toString())
      );
      setyouStake(res.amount);
      setliquidity(liquidity_);
      setreward(
        Number(ethers.utils.formatUnits(res.rewardDebt, decimal_).toString())
      );
      setsymbol(symbol_);
      setgetPrice(getPrice + 1);
    } catch (error) {
      console.log(error, pool.name);
    }
  };
  const apr = async () => {
    try {
      const secondPYear = 365 * 24 * 60 * 60;
      const [, masterChefV2] = await MasterChefV2;
      const [, vault] = await Vault;
      const [, iBEP20] = await Token;

      const returnPoolPerSecond = await masterChefV2.returnPoolPerSecond(
        pool.poolID
      );

      /**
       * Get farm APR value in %
       * @param poolWeight allocationPoint / totalAllocationPoint
       * @param cakePriceUsd Cake price in USD
       * @param poolLiquidityUsd Total pool liquidity in USD
       * @param farmAddress Farm Address
       * @returns Farm Apr
       */
      // export const getFarmApr = (
      //   poolWeight: BigNumber,
      //   cakePriceUsd: BigNumber,
      //   poolLiquidityUsd: BigNumber,
      //   farmAddress: string,
      // ): { cakeRewardsApr: number; lpRewardsApr: number } => {
      //   const yearlyCakeRewardAllocation = poolWeight ? poolWeight.times(CAKE_PER_YEAR) : new BigNumber(NaN)
      //   const cakeRewardsApr = yearlyCakeRewardAllocation.times(cakePriceUsd).div(poolLiquidityUsd).times(100)
      //   let cakeRewardsAprAsNumber = null
      //   if (!cakeRewardsApr.isNaN() && cakeRewardsApr.isFinite()) {
      //     cakeRewardsAprAsNumber = cakeRewardsApr.toNumber()
      //   }
      //   const lpRewardsApr = lpAprs[farmAddress?.toLocaleLowerCase()] ?? 0
      //   return { cakeRewardsApr: cakeRewardsAprAsNumber, lpRewardsApr }
      // }

      const yearlyCakeRewardAllocation = BigNumber.from(returnPoolPerSecond)
        .mul(BigNumber.from(secondPYear))
        .mul(LOLLIPRICE);

      let totalStakingTokenInPool = 0;
      const tempPrice = ethers.utils.parseUnits(
        tokenPrice.toFixed(6).toString(),
        decimal
      );

      console.log(tempPrice);
      if (decimal == 18)
        totalStakingTokenInPool = tempPrice.mul(BigNumber.from(liquidity));
      else
        totalStakingTokenInPool = tempPrice.mul(
          ethers.utils.parseUnits((liquidity / 10 ** 18).toString(), decimal)
        );

      let token = 0;
      if (totalStakingTokenInPool != 0)
        token = (
          (yearlyCakeRewardAllocation.toString() * 100) /
          totalStakingTokenInPool.toString()
        ).toFixed(2);
      if (token != 0) setaprView(token);
      else console.log("token is 0");
    } catch (error) {
      console.log(error);
      console.log("error in apr", decimal);
    }

    // export const getFarmApr = (
    //   poolWeight: BigNumber,
    //   cakePriceUsd: BigNumber,
    //   poolLiquidityUsd: BigNumber,
    //   farmAddress: string,
    // ): { cakeRewardsApr: number; lpRewardsApr: number } => {
    //   const yearlyCakeRewardAllocation = poolWeight ? poolWeight.times(CAKE_PER_YEAR) : new BigNumber(NaN)
    //   const cakeRewardsApr = yearlyCakeRewardAllocation.times(cakePriceUsd).div(poolLiquidityUsd).times(100)
    //   let cakeRewardsAprAsNumber = null
    //   if (!cakeRewardsApr.isNaN() && cakeRewardsApr.isFinite()) {
    //     cakeRewardsAprAsNumber = cakeRewardsApr.toNumber()
    //   }
    //   const lpRewardsApr = lpAprs[farmAddress?.toLocaleLowerCase()] ?? 0
    //   return { cakeRewardsApr: cakeRewardsAprAsNumber, lpRewardsApr }
    // }
  };

  const harvestHandle = async (amount_) => {
    if (amount_ == 0 && !canHarvest)
      return addToast("it is not yet time for the next harvest", {
        appearance: "error",
      });
    if (amount_ == 0 && canHarvest && !(parseInt(pending) > 0))
      return addToast("Insufficient balance for harvest", {
        appearance: "error",
      });

    //const amount = BigNumber.from(amount_).mul(constants.WeiPerEther)
    const amount = amount_;

    try {
      const [, masterChefV2] = await MasterChefV2;
      const res = await masterChefV2.harvest(pool.poolID);
      res.wait().then(() => {
        addToast("Harvest Successfully", { appearance: "success" });
        setupdate(update + 1);
      });
    } catch (error) {
      addToast(error.message, { appearance: "error" });
      console.log(error);
    }
  };

  const withdrawHandle = async () => {
    
    try {      
      if (!youStake.gt(constants.Zero))
        return addToast("Insufficient balance for withdraw", {
          appearance: "error",
        });
      const [, masterChefV2] = await MasterChefV2;
      const res = await masterChefV2.withdraw(pool.poolID);
      res.wait().then(() => {
        addToast("Withdraw Successfully", { appearance: "success" });
        setupdate(update + 1);
      });
    } catch (error) {
      addToast(error.message, { appearance: "error" });
      console.log(error);
    }
  };

  const depositHandle = async () => {    
    try {
      let refValue = parseFloat(ref.current.value);
      refValue = Number.isNaN(refValue) ? 0 : refValue;
      let amount;
      amount = ethers.utils.parseUnits(refValue.toString(), decimal);
      if (balanceOf.lt(constants.Zero))
        return addToast("Insufficient balance ", { appearance: "error" });

      const [, masterChefV2] = await MasterChefV2;

      const res = await masterChefV2.deposit(pool.poolID, amount.toString());
      res.wait().then(() => {
        addToast("Deposit Successfully", { appearance: "success" });
        setupdate(update + 1);
      });
    } catch (error) {
      addToast(error.message, { appearance: "error" });
      console.log(error);
    }
  };

  return (
    <>
      {pool.name != undefined ? (
        <div key={pool.id}>
          <div
            className={clsx("bg-cover bg-center bg-fixed  overflow-hidden sm:p-4 p-5 mb-16 rounded-lg")}
            style={{ backgroundImage: `url(/cardHome.svg)` }}
            index={pool.id}
          >
            <div className="flex justify-center">
              <img
                src={pool.image || "/pool/Grupo_15891.svg"}
                className="w-20 absolute -mt-16"
                alt="lolli"
              />
            </div>
            <div className="flex justify-center font-black text-shadow mt-6 text-4xl font-pocket">
              {pool.name}
            </div>
            <div className="flex justify-center ">
              <div>
                {" "}
                <div className="flex justify-end">
                  <span className="  inline-flex shadow-sm rounded-md">
                    <ButtonPopover />
                    <button
                      type="button"
                      className="-ml-px  inline-flex items-center px-4 py-1 rounded-lg  bg-yellow-400 text-lg font-bold text-green-600 font-pocket"
                    >
                      {pool.distribution}x
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-2 mt-8">
              <div className="font-pocket text-2xl text-[#5b2806] ">APR</div>
              <div className="font-pocket text-2xl text-[#5b2806] flex space-x-2 justify-center">
                <p>{aprView}%</p>{" "}
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-2 mt-2">
              <div className="font-pocket text-2xl text-[#5b2806]">Earn</div>
              <div className="font-pocket text-2xl text-[#5b2806] flex flex-col space-x-2 justify-end">
                <p>{pool.name}</p>
                <p className="text-[#5b2806]  text-sm font-pocket">
                  Deposit Fee 0%
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-2 mt-2">
              <div className="flex flex-col">
                <p className="font-pocket text-3xl text-shadow font-black">
                  $MAT EARNED
                </p>{" "}
                <p className="font-pocket text-2xl text-[#5b2806]">
                  {" "}
                  {pendingview.toFixed(4)}
                </p>
              </div>
              <div className="font-pocket text-2xl text-[#5b2806] flex flex-col space-x-2 justify-end">
                <button
                  type=" button"
                  className={[
                    "px-8 py-3 text-[#5b2806] text-sm  rounded-full transition-all ease-in-out duration-150",
                    canHarvest && pending > 0
                      ? "bg-blue-secondary"
                      : "bg-gray-200",
                  ].join(" ")}
                  style={{
                    background:
                      "linear-gradient(#ffcb00 -10%,#fe0,#f80,#ff4d00)",
                  }}
                  onClick={() => harvestHandle()}
                >
                  Harvest
                </button>{" "}
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <div className="text-gray-500 text-md font-semibold flex space-x-2 justify-end">
                <button
                  type="button"
                  className={[
                    "px-20 py-3 text-green-900 text-lg  rounded-lg transition-all ease-in-out duration-150 font-pocket ",
                    canWithdraw && youStake > 0 ? "bg-red-500" : "bg-gray-200",
                  ].join(" ")}
                  style={{
                    background:
                      "linear-gradient(#76fa00 -10%,#64ec06,#31c21a,#009a2d)",
                  }}
                  onClick={() => withdrawHandle()}
                >
                  Withdraw
                </button>{" "}
              </div>
            </div>
            <div className="flex flex-col justify-center space-x-2 mt-2 font-pocket">
              <p className="font-black text-xl text-yellow-900 ">{pool.name}</p>
              <p className="font-black text-xl text-shadow">
                You STAKED <span class="pl-3"> {youStakeView.toFixed(4)}</span>
              </p>
              <input
                type="number"
                className="flex-shrink-0 w-full inline-flex items-center  justify-center px-5 py-2 border border-transparent rounded-full shadow-sm text-sm font-bold text-white  bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:flex-1 placeholder-white"
                placeholder="Amount"
                ref={ref}
                min="0"
                onChange={() => {
                  console.log(ref.current.value);
                  if (parseInt(ref.current.value) < 0) ref.current.value = 0;
                }}
              />
              {approve ? (
                <div>
                  <button
                    type="button"
                    className={[
                      "px-12 py-2 text-black text-lg  rounded-full transition-all ease-in-out duration-150 font-pocket mt-2",
                      canWithdraw && youStake > 0
                        ? "bg-red-500"
                        : "bg-gray-200",
                    ].join(" ")}
                    style={{
                      background: "linear-gradient(#efefef -10%,#9f9f9f)",
                    }}
                    onClick={(e) => depositHandle()}
                  >
                    Stake
                  </button>{" "}
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    className={[
                      "px-12 py-2 text-black text-lg  rounded-full transition-all ease-in-out duration-150 font-pocket mt-2 bg-yellow-500",
                      "bg-red-500",
                    ].join(" ")}
                    style={{
                      background:
                        "linear-gradient(#ffcb00 -10%,#fe0,#f80,#ff4d00)",
                    }}
                    onClick={(e) => approveHandle(e)}
                  >
                    Appove
                  </button>{" "}
                </div>
              )}
            </div>

            <Dropdown
              liquidity={Number(
                ethers.utils.formatUnits(liquidity, decimal).toString()
              ).toFixed(4)}
              symbol={pool.name}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};
export default ApproveCardpool;
