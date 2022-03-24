/* eslint-disable */
import React, { createContext, useState, useEffect,useMemo } from 'react';
import Web3 from 'web3';
import { ethers } from 'ethers'
import PROVIDER from '../hooks/provider'
import {useToken}  from '../hooks/useContract'

import {BigNumber,Contract} from 'ethers'
import config from '../utils/config'
const Web3Context = createContext();


const Web3Provider = ({ children }) => {
  
  const [accounts, setAccounts] = useState(['000000000000000000000000000000000000000000000']);
  const [err, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [update, setupdate] = useState(0);
  const [balanceOf_, setbalanceOf_] = useState(BigNumber.from('0'))
  




const wallet =async () => {
  
  try {    
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");      
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const  acount_ = await signer.getAddress()
      console.log("Account222:",  await signer.getAddress());
      return acount_  
  } catch (error) {
    console.log("wallet error");

  //  return await window.web3.eth.getAccounts();   
  }  
}

const etherJSProvider =async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");  
  return provider;
}

const enable =async () => {  
  try {    
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      // Prompt user for account connections
      if(await provider.send("eth_requestAccounts", [])); 
      return true
  } catch (error) {
    return false
  }  
}



  const ethereumProvider = async () => {
    try {
      console.log('ethereum',window.ethereum.isMetaMask);      
      if(window.ethereum.isMetaMask){
              const provider = window.ethereum                
              // await provider.request({
                // method: 'wallet_addEthereumChain',
                // params:PROVIDER[config.CHAIN],
              // })            
        }        
        const accounts_ = await wallet()
        setAccounts(accounts_);
    } catch (error) {
      console.log(error, 'ERRROR');
      setError(true);
    }
  };

  const extensionSetup = async () => {
    if (window.ethereum) {
      if(await enable()){
      await ethereumProvider();
      return true;}
    }   
    
    // Fallback to localhost; use dev console port by default...
    else {
      /* const provider = new Web3.providers.HttpProvider(
          "http://localhost:9545"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");*/
      return false;
    }
  };

  const OnAcountsChange = async (time) => {
    window.ethereum.on('accountsChanged', async () => {
      //On change Address
      let accounts_ = await wallet();
      setAccounts(accounts_);
      console.log(`Account changed: ${accounts_}`);
    });
    ethereum.on('chainChanged', async(chainId) => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      //const chainId = await ethereum.request({ method: 'eth_chainId' });            
          if(chainId != process.REACT_APP_CHAIN_ID)
            setIsLoaded(false);
          else 
            setIsLoaded(true);
            
      //window.location.reload();
    });
    window.ethereum.on('disconnect', () => {
      //On disconect
      setIsLoaded(false);
      console.log('disconnect');
    });

    clearInterval(time);
  };

  const updateHandler = () => {
    setupdate(update + 1);
  };

  //load web3

  useEffect(() => {
    let time;
    window.addEventListener('load', function (event) {        
      time = setInterval(async () => {
        if (!isLoaded) {
          const state = await extensionSetup();
          if (state) {            
            const chainId = await ethereum.request({ method: 'eth_chainId' });                                  
            console.log(chainId,"chainId");
       //     if(chainId == config.ChainID_HE)
            setIsLoaded(true);
            clearInterval(time);
          } else {
            setError(true);
            clearInterval(time);
          }
        } else clearInterval(time);
      }, 300);
    });

    return () => {
      clearInterval(time);
    };
  }, []);

  // on wallet change
  useEffect(() => {
    const time = setTimeout(async () => {
      if (isLoaded) {
        await OnAcountsChange(time);
      }
    }, 600);

    return () => {
      clearInterval(time);
    };
  }, [isLoaded]);

  //


  const datas = { accounts, isLoaded, extensionSetup, err,balanceOf_,setupdate,updateHandler };

  return <Web3Context.Provider value={datas}>{children}</Web3Context.Provider>;
};

export { Web3Provider };
export default Web3Context;
