import React, { useState,useEffect,useContext } from "react";

import FarmsCardGrid from "./Card/FarmsCardGrid";
import CardHorizontal from "./Card/CardHorizontal";
import { motion } from "framer-motion";
import farmsData from "./Card/farmsData";
import { Switch } from "@headlessui/react";
import {useMasterChefV2} from '../../hooks/useContract'
import {BigNumber} from 'ethers'
import Web3Context from '../../context/Web3Context'
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FarmsScreen = () => {
  const MasterChef =useMasterChefV2()
  const [activeTab, setActiveTab] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [enabled1, setEnabled1] = useState(false);

  const {accounts, isLoaded} = useContext(Web3Context) 
  useEffect(() => {
    const a = async ()=>{
      const [load,contract]=await MasterChef
      if(load){
        const pool = await contract.poolLength()

        //BigNumber.from('1').toString()

        
        console.log(pool.toString(),'contract.poolLength()');
      }      
    }
    a()
    //console.log(,'MasterChef MasterChef MasterChef MasterChef');
    return () => {
      
    }
  }, [MasterChef,accounts])


  const [searchTerm, setSearchTerm] = useState("");
  const handleTabSwitch = (e) => {
    e.preventDefault();
    const index = parseInt(e.target.id, 0);
    if (index !== activeTab) {
      setActiveTab(index);
    }
  };

  const childVariants = {
    initial: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <div className="sm:-my-5 -my-3 sm:mx-0 lg:mx-2 sm:p-4 p-12">
        <motion.div className="sm:-my-5 -my-3 mx-auto max-w-screen-xl z-50 rounded-t z-10">
          <motion.div className="text-center flex flex-col mt-8 mb-12 font-pocket">
            <motion.div className="text-6xl font-black text-shadow z-10">
              Stake Liquidity Pool (LP){" "}
            </motion.div>
            <br/>
 <motion.div className="text-6xl font-bold font-black  text-shadow-gray z-10">
              Tokens To earn{" "}
            </motion.div>
          </motion.div>
 <motion.div className="text-center flex flex-col">
            <motion.div className="z-10">
          <FarmsCardGrid searchTerm={searchTerm} />
  </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};
export default FarmsScreen;
