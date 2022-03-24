import React from "react";
import { useEffect, useContext, useState } from "react";
import { utils, constants, BigNumber, ethers } from "ethers";
import { useToasts } from "react-toast-notifications";
import Web3Context from "../../context/Web3Context";
import { motion } from "framer-motion";
import { UseIco, useBUSD,UsetruckGame } from "../../hooks/useContract.js";
import config from "../../utils/config";

const ClaimGame = () => {
  const ICO = UsetruckGame();
  const BUSD = useBUSD();
  const { accounts, isLoaded } = useContext(Web3Context);
  const [approve, setapprove] = useState(true);
  const [balance, setbalance] = useState(0);
  const { addToast } = useToasts();
  const [update, setupdate] = useState(1);
  const [amount, setamount] = useState(0);  
  const [tokenAmount, setTokenAmount] = useState(0);
  const [totalInvest, settotalInvest] = useState(0);


  useEffect(() => {
    if (isLoaded) {
      // allowanceHandle();
      // dataUSer();
      setTimeout(async()=>{
        try{
          const [_, contract] = await ICO;
      const res = await contract.users(accounts);

      console.log(res.balance);
        
      setTokenAmount(utils.formatEther(res.balance))
        
        }        
        catch(e){
        console.log(e);}
      })
      console.log("paso");
    }
  }, [isLoaded, accounts, update]);

  useEffect(() => {
    if (isLoaded) {
      // allowanceHandle();
      // dataUSer();
      setTimeout(async()=>{
        try{
        // const data = await fetch()
        let uri="http://localhost:5000/user/"+accounts

        console.log(uri);
        // let uri="http://localhost:1235/get_ttf/0xb79ED94cd946645F3265Ef39A6d08dfDDb116bF8"
        let data = await fetch(uri)
        data = await data.json()
        // console.log(utils.formatEther(BigNumber.from(data.balance_hex)));
        setbalance(data.amount)
        console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
        }
        catch(e){
        console.log(e);}
      })
      console.log("paso");
    }
  }, [isLoaded, accounts, update]);

  // useEffect(() => {
  //   if (!isLoaded || amount == "") return;
  //   const tokenAmount_ = Number(amount) * 1;
  //   setTokenAmount(tokenAmount_);
  //   return () => {};
  // }, [amount]);

  const allowanceHandle = async () => {
    try {
      const [_, contract] = await BUSD;
      const res = await contract.allowance(accounts, config.ico);
      if (res.gt(constants.MaxUint256.div(4))) setapprove(true);
      else setapprove(false);
    } catch (error) {
      console.log(error);
      if (error.data.message != undefined)
        addToast(error.data.message, { appearance: "error" });
      else addToast(error.message, { appearance: "error" });
    }
  };

  const approveHandle = async (e) => {
    e.preventDefault();
    try {
      const [_, contract] = await BUSD;
      const res = await contract.approve(config.ico, constants.MaxUint256);
      addToast("approve success", { appearance: "success" });
      res.wait().then(() => {
        setapprove(true);
        addToast("approve Complete", { appearance: "success" });
      });
    } catch (error) {
      console.log(error);
      if (typeof error.data == "string")
        addToast(error.data.message, { appearance: "error" });
      else addToast(error.message, { appearance: "error" });
    }
  };

  const buy = async (e) => {
    // if (amount < 30)
      // return addToast("minimum amount of 30$", { appearance: "warning" });
    // if (amount > 1500)
      // return addToast("maximum amount of 1500$", { appearance: "warning" });

    e.preventDefault();


    let uri="http://localhost:5000/user/"+accounts+"/w"
    let data = await fetch(uri)
    // try {
    //   const [_, contract] = await ICO;
    //   const res = await contract.withdrawUser(utils.parseEther(amount.toString()));
    //   addToast("buy success", { appearance: "success" });
    //   res.wait().then(() => {
    //     setapprove(true);
    //     addToast("buy Complete", { appearance: "success" });
    //   });
    // } catch (error) {
    //   console.log(error);
    //   if (error.data != undefined)
    //     addToast(error.data.message, { appearance: "error" });
    //   else addToast(error.message, { appearance: "error" });
    // }
  };

  const withdraw = async (e) => {
    // if (amount < 30)
      // return addToast("minimum amount of 30$", { appearance: "warning" });
    // if (amount > 1500)
      // return addToast("maximum amount of 1500$", { appearance: "warning" });

    e.preventDefault();
    
    try {
      const [_, contract] = await ICO;
      const res = await contract.ClaimUser();
      addToast("buy success", { appearance: "success" });
      res.wait().then(() => {
        setapprove(true);
        addToast("buy Complete", { appearance: "success" });
      });
    } catch (error) {
      console.log(error);
      if (error.data != undefined)
        addToast(error.data.message, { appearance: "error" });
      else addToast(error.message, { appearance: "error" });
    }
  };
 

  return (
    <>
      <div className="sm:-my-5 -my-3 sm:mx-0 lg:mx-2 sm:p-4 p-12">
        <motion.div className="sm:-my-5 -my-3 mx-auto max-w-screen-xl z-50 rounded-t z-10">
          <motion.div className="text-center flex flex-col mt-8 mb-12 t">
            <motion.div className=" z-10">
              <div className="sm:-my-5 -my-3 sm:mx-0 lg:mx-2 sm:p-4 p-12">
                <div className="hero-headline flex flex-col items-center justify-center  text-center z-20 mb-24">
                  <div className="md:w-[400px] w-[400px] max-w-2xl flex flex-col justify-center">
                    <p className="mt-8 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                    ClaimGame
                    </p>
                    <div class="grid mt-8  gap-8 grid-cols-1">
                      <div class="flex flex-col ">
                        <div class="bg-white shadow-md rounded-3xl p-5">
                          <div class="flex flex-col items-center">
                            <img
                              src="/logo.png"
                              className="mr-2 w-20"
                              alt="lolli"
                            />
                            <h2 className="font-semibold text-2xl text-black mt-4 justify-center">
                              Exchange
                            </h2>
                            <div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
                          </div>
                          <div className="mt-5 md:mt-0 md:col-span-2">
                            <form action="#" method="POST">
                              <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="grid grid-cols-2 gap-6">
                                  <div className="col-span-6 sm:col-span-3">
                                    <label
                                      htmlFor="form"
                                      className="block text-sm text-gray-500 font-bold "
                                    >
                                      you
                                    </label>
                                    <div className="mt-2 border-b border-gray-300 focus-within:border-indigo-600">
                                      <input
                                        min={0}
                                        className="block w-full border-0 border-b border-transparent bg-gray-50 focus:border-blue-600 focus:ring-0 sm:text-sm py-2 px-2 font-bold"
                                        type="number"
                                        placeholder="BUSD Amount "
                                        onChange={(e) => {
                                          setamount(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="w-full">
                                    balance contract
                                  </div>
                                  <p>{tokenAmount}</p>BUDS
                                  <div className="w-full">
                                   Balance server
                                  </div>
                                  <p>{balance}</p> BUDS
                                </div>
                              </div>
                            </form>
                          </div>

                          <div class="mt-5">
                          <div>
                                <button
                                  onClick={(e) => withdraw(e)}
                                  className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink-500 hover:bg-pink-600 hover:shadow-lg focus:outline-none font-bold"
                                >
                                  Claim Blockchain
                                </button>
                              </div>
                            
                              <div>
                                <button
                                  onClick={(e) => buy(e)}
                                  className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink-500 hover:bg-pink-600 hover:shadow-lg focus:outline-none font-bold"
                                >
                                  Claim server
                                </button>
                              </div>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <br />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};
export default ClaimGame;
