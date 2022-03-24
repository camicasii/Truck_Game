import config from '../../../utils/config'
export default [
  {
    id: 1,
     image:
    "/monster.svg",
    poolID:0,
    address:config.TOKEN_MAT,
    rainbow: true,
    name: "MAT",
    
    distribution: "15",
    APR: 2917411,
    earned: 65,
    status: false,
    ROI: [
      { timeframe: '1d', roi: '0.27%', per: '29.21',  },
  { timeframe: '7d', roi: '1.27%', per: '209.21',  },
 { timeframe: '30d', roi: '8.27%', per: '909.21',  },
 { timeframe: '365d(APY)', roi: '168.27%', per: '1909.21',  },
         ],
  },
  {
    id: 2,
      image:
      "/monster.svg",
    rainbow: true,
    name: "MAT",
    check:true,
    poolID:1,
    address:config.TOKEN_MAT,
    distribution: "6",
    APR: 2917411,
    earned: 65,
    status: false,
       ROI: [
      { timeframe: '1d', roi: '0.27%', per: '29.21',  },
  { timeframe: '7d', roi: '1.27%', per: '209.21',  },
 { timeframe: '30d', roi: '8.27%', per: '909.21',  },
 { timeframe: '365d(APY)', roi: '168.27%', per: '1909.21',  },
         ],  

  },
 {
    id: 3,
    image:
    "/monster.svg",
      poolID:2,
      address:config.TOKEN_MAT,
    rainbow: true,
    name: "MAT",
    distribution: "6",
    APR: 2917411,
    earned: 65,
    status: false,
     ROI: [
      { timeframe: '1d', roi: '0.27%', per: '29.21',  },
  { timeframe: '7d', roi: '1.27%', per: '209.21',  },
 { timeframe: '30d', roi: '8.27%', per: '909.21',  },
 { timeframe: '365d(APY)', roi: '168.27%', per: '1909.21',  },
         ],  
  },
   ];
