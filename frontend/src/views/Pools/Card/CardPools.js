import React,{useEffect,useState,useContext} from "react";
import poolsData from "./poolsData";
import NoApproveCardPools from "./NoApproveCardPools";
import ApproveCardPools from "./ApproveCardPools";
import { motion } from 'framer-motion';
import Web3Context from "../../../context/Web3Context";
import { IBEP20, MasterChefV2, Vault, PancakeRouter } from "../../../hooks/abiHelpers";
import { constants, BigNumber, ethers } from "ethers";
import config from '../../../utils/config'

const CardPools = ({ searchTerm,activepool }) => {
  const { accounts, isLoaded, setupdate, update } = useContext(Web3Context);
  
  const [pricesLolli, setpricesLolli] = useState(BigNumber.from(ethers.utils.parseEther('0.005')))

const [poolD, setpoolD] = useState([])
  useEffect(() => {
  
const price = async()  =>{
  const pancakeAddress = config.CHAIN==0?"0x10ED43C718714eb63d5aA57B78B54704E256024E":'0xD99D1c33F9fC3444f8101754aBC46c52416550D1'
  const pancakeRouter = new window.web3.eth.Contract(
    PancakeRouter,
    pancakeAddress        
  );
  const busd = config.CHAIN==0?'0xe9e7cea3dedca5984780bafc599bd69add087d56':'0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee'
  const wbnb= "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
  const price_= await pancakeRouter.methods
  .getAmountsOut(ethers.utils.parseEther("1").toString()
  ,['0x6cC87fa92EF561b91f232d71507625eC76c930aa',wbnb,busd])
  .call();  
  setpricesLolli(ethers.utils.parseEther(price_[2]))  
}
    setpoolD(poolsData)
    

    if(isLoaded)
    price()
    return () => {
    
    }
  }, [isLoaded])
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-12 "   initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}>
          {/*Promo*/}
          {poolD
            .filter((pool) => {
              if (searchTerm === "") {
                return pool;
              } else if (
                pool.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return pool;
              }
            })
            .map((pool,key) => {
              return <ApproveCardPools pool={pool} key={key} pricesLolli={pricesLolli}/>
              
              
              
            })}
        </motion.div>
      </div>
    </>
  );
};
export default CardPools;
