/* eslint-disable */
import React, { createContext, useState, useEffect,useMemo,useContext } from 'react';
import Web3 from 'web3';
import { ethers } from 'ethers'
import Web3Context from './Web3Context'
import {useToken}  from '../hooks/useContract'

import {BigNumber,Contract} from 'ethers'
import config from '../utils/config'
const TokenContext = createContext();


const TokenProvider = ({ children }) => {
  
  const { accounts, isLoaded, error } = useContext(Web3Context);
  const Token = useToken()   
  
  const [update, setupdate] = useState(0);
  const [balanceOf_, setbalanceOf_] = useState(BigNumber.from('0'))
  

  const balanceOfHandle = async()=>{ 
    console.log("//////////////////////////");   
    if (!isLoaded && accounts!=['000000000000000000000000000000000000000000000'])
    return
    const [_,contract] =await Token  
    const tokenBalance = await contract.balanceOf(accounts)        
    setbalanceOf_(tokenBalance)
  }

useEffect(() => {
    if (isLoaded)
    balanceOfHandle()  
  
  
  return () => {
  
  };
}, [accounts,isLoaded,update]);
// 
   const datas = { balanceOf_,setupdate};

  return <TokenContext.Provider value={datas}>{children}</TokenContext.Provider>;
};

export { TokenProvider };
export default TokenContext;
