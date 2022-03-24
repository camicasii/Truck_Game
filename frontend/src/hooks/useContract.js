import { useMemo,useContext,useState} from 'react';
import {IBEP20,MasterChefV2,PancakeRouter,Vault,Pair,ICO,Claim,truckGame}  from './abiHelpers'
import Web3Context from '../context/Web3Context'
import {Contract,ethers} from 'ethers'
import config from '../utils/config'
const etherJSProvider =async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  return provider;  
}

export const useMasterChefV2 = ()=>{    
    const {accounts, isLoaded} = useContext(Web3Context)    
    const [load, setload] = useState(false)
    return useMemo(async() => {
    if(!isLoaded )
    return [load,null]
      const provider =await etherJSProvider()
      const signer = provider.getSigner()        
      const contract = new Contract(config.TOKEN_MASTER_CHEF_v2,MasterChefV2,signer)                
      return [true, contract]
      },[accounts,isLoaded])
}
export const useBUSD = ()=>{    
  const {isLoaded,accounts} = useContext(Web3Context)        
  return useMemo(async() => {    
    if(isLoaded == undefined||!isLoaded )
    return [false,null]
    
    const provider =await etherJSProvider()
    const signer = provider.getSigner()    
    const contract = new Contract(config.busd,IBEP20,signer)
    return [true, contract]
    },[accounts,isLoaded])
}
export const useToken = ()=>{    
  const {isLoaded,accounts} = useContext(Web3Context)        
  return useMemo(async() => {    
    if(isLoaded == undefined||!isLoaded )
    return [false,null]    
    const provider =await etherJSProvider()
    const signer = provider.getSigner()    
    const contract = new Contract(config.token_new,IBEP20,signer)
    return [true, contract]
    },[accounts,isLoaded])
}
export const useTokenOld = ()=>{    
  const {isLoaded,accounts} = useContext(Web3Context)        
  return useMemo(async() => {    
    if(isLoaded == undefined||!isLoaded )
    return [false,null]    
    const provider =await etherJSProvider()
    const signer = provider.getSigner()     
    const contract = new Contract(config.token_old,IBEP20,signer)
    return [true, contract]
    },[accounts,isLoaded])
}

export const Usevault = ()=>{    
  const {accounts, isLoaded} = useContext(Web3Context)        
  return useMemo(async() => {
    if(!isLoaded)
    return [false,null]
    const provider =await etherJSProvider()
    const signer = provider.getSigner()    
    const contract = new Contract(config.TOKEN_VAULT,Vault,signer)    
    
    return [true, contract]
  },[accounts,isLoaded])
}
export const UsePancakeRouter = ()=>{    
  const {accounts, isLoaded,error} = useContext(Web3Context)        
  return useMemo(async() => {
    if(!isLoaded)
    return [false,null]
    const provider =await etherJSProvider()
    const signer = provider.getSigner()    
    const contract = new Contract(config.PANCAKE_ROUTER,PancakeRouter,signer)    
    
    return [true, contract]
  },[accounts,isLoaded])
}

export const UsePair = ()=>{    
  const {accounts, isLoaded} = useContext(Web3Context)        
  return useMemo(async() => {
    if(!isLoaded )
    return [false,null]
    const provider =await etherJSProvider()
    const signer = provider.getSigner()      
    const contract = new Contract(config.PANCAKE_ROUTER,Pair,signer)    
    
    return [true, contract]
    },[accounts,isLoaded])
}

export const UsetruckGame = ()=>{    
  const {accounts, isLoaded} = useContext(Web3Context)        
  return useMemo(async() => {
    if(!isLoaded )
    return [false,null]
    const provider =await etherJSProvider()
    const signer = provider.getSigner()      
    const contract = new Contract(config.truckGame,truckGame,signer)    
    
    return [true, contract]
    },[accounts,isLoaded])
}
export const UseIco = ()=>{    
  const {accounts, isLoaded} = useContext(Web3Context)        
  return useMemo(async() => {
    if(!isLoaded )
    return [false,null]
    const provider =await etherJSProvider()
    const signer = provider.getSigner()      
    const contract = new Contract(config.ico,ICO,signer)    
    
    return [true, contract]
    },[accounts,isLoaded])
}

export const UseClaim = ()=>{    
  const {accounts, isLoaded} = useContext(Web3Context)        
  return useMemo(async() => {
    if(!isLoaded )
    return [false,null]
    const provider =await etherJSProvider()
    const signer = provider.getSigner()      
    const contract = new Contract(config.claim,Claim,signer)    
    
    return [true, contract]
    },[accounts,isLoaded])
}



