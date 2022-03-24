import React,{useState,useContext,useEffect} from 'react'
import { CopyToClipboard } from "react-copy-to-clipboard";
import Web3Context from "../../context/Web3Context";
const ReferralScreen = (  ) =>{
const { accounts, isLoaded } = useContext(Web3Context);

const [isCopied, setIsCopied] = useState(false);

const [codeSnippet, setcodeSnippet] = useState(`www.sugarswap.net`)
 

useEffect(() => {
  const ref = `${window.location.origin}?ref=${accounts[0]}`
  setcodeSnippet(ref)
  return () => {
  
  }
}, [accounts,isLoaded])


const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return(
  <>
 <div className="m-auto max-w-6xl p-4 pt-8 ">
    <div className="hero-headline flex flex-col items-center justify-center  text-center z-40 mt-16">

    

      <div className="grid lg:grid-cols-1  gap-8  z-40">
        
        <div>
 <img alt="card img" className="rounded-t  w-[600px] lg:-mt-32" src="/home.svg"/> 
        </div>
 

            </div>

  <div className=" flex flex-col justify-center">
  
    <div className="md:text-6xl text-4xl lg:mt-0 mt-0  font-black font-bold font-pocket text-shadow z-10">Referral Program</div>
  
      </div>

     <div className="w-5/6  shadow-sm rounded-lg overflow-hidden sm:p-8 p-5 lg:col-span-2 text-white block z-40 bg-cover"  style={{ backgroundImage: `url(/referral.svg)` }}>
        <div>
 <img alt="card img" className="rounded-t absolute -mt-6 -ml-20 invisible md:visible w-40" src="/monster.svg"/> 
        </div>


      
            <h1 className="text-4xl font-black py-2 text-yellow-900 font-pocket">Referral link</h1>
       <div className="mt-4 mt-2 sm:text-sm text-xs font-semibold  text-center flex justify-center space-x-4">
       <p className=" truncate px-3 text-yellow-800 bg-yellow-200 py-2 rounded-md">{codeSnippet}    
       </p>
      <div className="cursor-pointer">    <CopyToClipboard text={codeSnippet} onCopy={onCopyText}>
            <span className="text-yellow-900">{isCopied ? "Copied!" : <svg className="w-9 h-9 text-yellow-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"></path><path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z"></path></svg>
}</span>
          </CopyToClipboard> </div> 
</div>
     </div>


  

    




   </div>    </div>
  </>
)}
export default ReferralScreen
