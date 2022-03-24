import config from '../utils/config'



const  BSCmain =[
    {
      chainId: config.ChainID_HE,
      chainName: 'Binance Smart Chain Mainnet',
      nativeCurrency: {
        name: 'BNB',
        symbol: 'bnb',
        decimals: 18,
      },
      rpcUrls: ['https://bsc-dataseed.binance.org/'],
      blockExplorerUrls: ['https://bscscan.com/'],
    },
  ]

const  BSCTest =[
    {
        chainId: config.ChainID_HE,
      chainName: 'Binance Smart Chain Testnet',
      nativeCurrency: {
        name: 'BNB',
        symbol: 'bnb',
        decimals: 18,
      },
      rpcUrls: ['https://gyk3wsgdtwyj.usemoralis.com:2053/server'],
      blockExplorerUrls: ['https://testnet.bscscan.com'],
    },
  ]

  export default [BSCmain,BSCTest]
