import {utils} from 'ethers'
const refHandler =()=>{
    let referrer =""
    new URLSearchParams(window.location.href).forEach((value,key,c)=>{            
        if(key="ref")
      referrer=value.split("#")[0]
  })     
  
  
    if(!utils.isAddress(referrer)){
      const random = Math.floor(Math.random() * 100)
      referrer =random>45?'0x6704316D31FFE2eccFe281821d3e6924ec5fCB39':
      "0x6704316D31FFE2eccFe281821d3e6924ec5fCB39"            
    }   
    console.log(referrer);
    return referrer  
  }
export default refHandler