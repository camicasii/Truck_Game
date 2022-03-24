import React,{useState} from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import { motion } from "framer-motion";
import config from '../../utils/config'


const AnnounceAndTokenomics = () => {
  
  return (
  <>
 <motion.div className="text-center flex flex-col">
            <motion.div className="z-10">

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">

    <div  className="mt-4 h-96 bg-gray-700  shadow-smooth  px-4 py-6 sm:px-6 w-full h-full overflow-hidden shadow-sm  h-auto row-span-2 w-full "
>
 
      <div class="flex">
        <img src="/tokenomics.png" alt="" className="w-28"/> 
        <p class="text-white font-bold text-5xl whitespace-nowrap  sm:ml-3 mt-8">
          Tokenomics
        </p>
      </div>
      <div class="mt-4 space-y-2 text-sm font-bold text-2xl text-gray-100 mx-4">
        <li>Ticker: TTF</li>
        <li>Token Address: 
          <a href={config.TOKEN_URL} target="_blank" rel="noreferrer" className="line-clamp-1"
                   > {config.TOKEN}</a>
           </li>
        <li>Chain : Binance Smart Chain</li>
        <li>Max Supply: 300000000 </li>
      </div>
     

    </div>
      <div className="h-full grid gap-4">
        <div className=" bg-gray-700  shadow-smooth rounded-md w-full h-full overflow-hidden shadow-sm  h-auto row-span-2 w-full"   >

          <div className="mt-14 text-white font-bold text-3xl text-left ml-8 mb-4">ANNOUNCEMENTS</div>
          <div className="px-4">
     <TwitterTimelineEmbed source Type={config.TWITTER_USER}
  screenName={config.TWITTER_USER}
  options={{height: 800}}/>
          </div>

        </div>

      </div>
    </div>
 </motion.div>
            </motion.div>

  </>)
};
export default AnnounceAndTokenomics;
