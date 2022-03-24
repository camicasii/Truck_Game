import React, { useEffect, useState, useContext } from "react";
import Web3Context from "../../context/Web3Context";
import {
  useMasterChefV2,
  useToken,
  UsePancakeRouter,
  Usevault,
} from "../../hooks/useContract";
import { utils } from "ethers";
import { useToasts } from "react-toast-notifications";
import { constants, BigNumber, ethers } from "ethers";
import { motion } from "framer-motion";
import config from "../../utils/config";

const ColumnsHome = () => {
  const { accounts, isLoaded, error } = useContext(Web3Context);
  //const MasterChefV2 = useMasterChefV2();
  //const PancakeRouter = UsePancakeRouter();
  //const Vault = Usevault();
  //const Token = useToken(config.TOKEN);
  const [totalSupply, settotalSupply] = useState(utils.parseEther("300000000"));
  const [harvest_Zero, setHarvest_Zero] = useState("0.000");
  const [harvest_ONE, setHarvest_ONE] = useState("0.000");
  const [burn, setburn] = useState("0");
  const [update, setupdate] = useState(1);

  const { addToast } = useToasts();
  useEffect(() => {
    if (isLoaded && !error) {
      //totalSupplyHandle();
      //balanceOfHandle();
      //pendingTokenHandle()
    }
    return () => {};
  }, [isLoaded, error, update]);

  const harvestHandle = async (id) => {
    try {
      // const [, masterChefV2] = await MasterChefV2;
      // const res = await masterChefV2.harvest(id);
      // res.wait().then(() => {
      // addToast("Harvest Successfully", { appearance: "success" });
      // setupdate(update + 1);
      // });
    } catch (error) {
      addToast(error.message, { appearance: "error" });
      console.log(error);
    }
  };

  const pendingTokenHandle = async () => {
    // const [, masterChefV2] = await MasterChefV2;
    // const pending_ZERO = await masterChefV2.pendingToken(
    // 0,
    // accounts[0]
    // );
    // const pending_ONE = await masterChefV2.pendingToken(
    // 1,
    // accounts[0]
    // );
    // setHarvest_Zero(ethers.utils.formatUnits(pending_ZERO))
    // setHarvest_ONE(ethers.utils.formatUnits(pending_ONE))
    // console.log(ethers.utils.formatUnits(pending_ZERO));
    // console.log(ethers.utils.formatUnits(pending_ONE));
  };

  const totalSupplyHandle = async () => {
    // const [, iBEP20] = await Token;
    // const tokenBalance = await iBEP20.totalSupply();
    // const amount = ethers.utils.formatUnits(tokenBalance);
    // settotalSupply(Number(amount).toFixed(4));
  };

  const balanceOfHandle = async () => {
    // const [, iBEP20] = await Token;
    // const tokenBalance = await iBEP20
    // .balanceOf("0x000000000000000000000000000000000000dEaD")
    //
    // const amount = ethers.utils.formatUnits(tokenBalance);
    // setburn(Number(amount).toFixed(4));
  };

  const harvest = [
    {
      name: "TTF TO HARVEST",

      imageUrl: "/home/items-image.svg",
    },
    {
      name: "TTF TO HARVEST",

      imageUrl: "/home/items-image.svg",
    },
  ];

  const stats = [
    {
      name: "TTF TO STATS",

      imageUrl: "/home/items-image.svg",
    },
    {
      name: "TTF TO STATS",

      imageUrl: "/home/items-image.svg",
    },
  ];

  return (
    <div className="z-50 ">
      <motion.div className="text-center flex flex-col">
        <motion.div className="z-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 px-8 ">
            {harvest.map((data, i) => (
              <div
                key={i}
                className="bg-gray-700  shadow-smooth  sm:p-8 p-5 rounded-md  hidden"
              >
                <div className="flex items-center space-x-3 hidden">
                  <div className="flex-shrink-0">
                    <img
                      className="h-16 w-16 bg-black rounded-full px-2 py-2"
                      src="/cars.png"
                      alt=""
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-2xl font-bold text-white">
                      {data.name}{" "}
                    </p>
                  </div>
                </div>
                <div className="text-right mt-3 hidden ">
                  <p className="font-bold font-pocket text-3xl text-gray-200">
                    {i == 1 ? harvest_ONE : harvest_Zero}
                  </p>
                  <motion.div className="text-right flex flex-col">
                    <motion.div className="z-10">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-bold rounded-md shadow-sm text-white bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        onClick={() => {
                          harvestHandle(i);
                        }}
                      >
                        Harvest All (0)
                      </button>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            ))}
            {stats.map((data, i) => (
              <div
                key={i}
                className="bg-gray-700  shadow-smooth  rounded-md     px-6 py-5 shadow-sm "
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <img
                      className="h-16 w-16 bg-black rounded-full px-2 py-2 "
                      src="/cars.png"
                      alt=""
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-4xl font-bold text-white">
                      {data.name}{" "}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 mt-3 mr-6">
                  <p className="font-bold text-2xl text-gray-100">
                    Total TTF supply
                  </p>
                  <p className="font-bold font-pocket text-3xl text-white">
                    {utils.formatEther(totalSupply)}
                  </p>
                  <p className="font-bold text-2xl text-white">
                    Total TTF burned
                  </p>
                  <p className="font-bold font-pocket text-3xl text-gray-100">
                    {burn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default ColumnsHome;
