const address = {
    token_old:process.env.REACT_APP_TOKEN_OLD,
    token_new:"0x5584E306468DdF49a079bDEAdd0D873bAeD00248"||process.env.REACT_APP_TOKEN,
    ico:process.env.REACT_APP_ICO,
    claim:process.env.REACT_APP_CLAIM,
    busd:process.env.REACT_APP_BUDS,

}

// # busd_test:"0x5584E306468DdF49a079bDEAdd0D873bAeD00248",
// # PoolRewards:"0xD7742b92091C86B3720448a46f7e8E97176c8061",
// # TruckGame:"0x4865ffe7996Db9bfEB72e9CE9B403995325BDd94"
const infoBase={
TELEGRAM: "https://t.me/TheTruckFarmOficial",
TELEGRAM_ES:"https://t.me/TheTruckFarmOficial",
TELEGRAM_ANNOUNCEMENT_CHANNEL:"https://t.me/TheTruckFarmOficial",
TWITTER:"https://twitter.com/TheTruck_Farm",
TWITTER_USER:"TheTruck_Farm",
GITHUB:"",
WHITEPAPER_EN:"https://thetruckfarmassociation.gitbook.io/the-truck-farm/",
WHITEPAPER_ES:"https://thetruckfarmassociation.gitbook.io/the-truck-farm/",
REVIEW:"",
AUDIT:"",
TOKEN_URL:"https://bscscan.com/address/0x974eae2489e0a0137ec39d6823a86c2d86d52006#code",
}

// # busd_test:"0x5584E306468DdF49a079bDEAdd0D873bAeD00248",
// # PoolRewards:"0xD7742b92091C86B3720448a46f7e8E97176c8061",
// # TruckGame:"0x4865ffe7996Db9bfEB72e9CE9B403995325BDd94"
const dev={
    TOKEN:"0x83C0Eb9DA869138dc98185675f3dfAa2a41B54Ee",
    TOKEN_BSC:"https://testnet.bscscan.com/token/0x09A1Dfb95aed384cd878847E25eBE6ff11562549",
    CHAIN_ID :97,
    CHAIN :1,
    ChainID_HE:0x61,     
    TOKEN_MASTER_CHEF_v2:"",
    TOKEN_VAULT:"",
    PANCAKE_ROUTER:"0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
    ICO:"0x9863F1480851B6503e064CEeE37A7872455E3Ed0",
    truckGame:"0xa3FD2632882Df24898b7DF919Df3c77F9fFa09bA"    
    
}

const produc ={    
    TOKEN:"0x5f5A759250f2b02f2029f90b09cBc4827634b900",
    TOKEN_BSC:"https://testnet.bscscan.com/token/0xd4cc9538bbd3eda848da2292c0e383835703f138",
    CHAIN :0,
    CHAIN_ID :56,
    ChainID_HE:0x38, 
    TOKEN_MASTER_CHEF_v2:"",
    TOKEN_VAULT:"",
    PANCAKE_ROUTER:"0x10ED43C718714eb63d5aA57B78B54704E256024E",
    ICO:"",
    truckGame:"0xa3FD2632882Df24898b7DF919Df3c77F9fFa09bA"    
}

// export default process.env.NODE_ENV=="development_"?Object.assign(infoBase,address,dev):Object.assign(infoBase,address,produc)    
export default true?Object.assign(infoBase,address,dev):Object.assign(infoBase,address,produc)    
