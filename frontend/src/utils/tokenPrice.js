import {  useEffect, useState,useContext} from "react";
import {IBEP20,MasterChefV2, PancakeRouter}  from '../hooks/abiHelpers.js'
import Web3 from 'web3'
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid'
import { CursorClickIcon, MailOpenIcon, ChartBarIcon } from '@heroicons/react/outline'
import Web3Context from "../context/Web3Context";
import { constants, BigNumber, ethers } from "ethers";

export const TokenPrice = () =>{
  const { accounts, isLoaded,balanceOf_ } = useContext(Web3Context);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);
const test =async ()=>{
  const pancakeAddress = config.CHAIN==0?"0x10ED43C718714eb63d5aA57B78B54704E256024E":'0xD99D1c33F9fC3444f8101754aBC46c52416550D1'
      
  const pancakeRouter = new window.web3.eth.Contract(
    PancakeRouter,
    pancakeAddress        
  );
  const busd = config.CHAIN==0?'0xe9e7cea3dedca5984780bafc599bd69add087d56':'0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee'
  let price= await pancakeRouter.methods
 .getAmountsOut(ethers.utils.parseEther("1").toString()
 ,['0x6cc87fa92ef561b91f232d71507625ec76c930aa',busd])
 .call();
 setData(Number(ethers.utils.formatUnits(price[1]).toString()).toFixed(5))
 setLoading(false)
 
}

  useEffect(() => {
if(isLoaded)
test()

 }, [isLoaded]);

if(loading){return <h1>Loading...</h1>}
if(error){return <h1>Error</h1>}
return (  <div>
    <dl className="mt-5 grid grid-cols-1 gap-5 px-8 md:px-16">
      
          <div
            
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute bg-pink-primary rounded-md p-3">
                <ChartBarIcon className="w-6 h-6 text-white" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate text-left">Price</p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900 break-all">{data}</p>
           
              <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a href="https://poocoin.app/tokens/0x6cc87fa92ef561b91f232d71507625ec76c930aa" target="_blank" className="font-medium text-pink-600 hover:text-pink-500">
                    {' '}
                    See More<span className="sr-only">stats</span>
                  </a>
                </div>
              </div>
            </dd>
          </div>
      
      </dl>
    </div>)
}

