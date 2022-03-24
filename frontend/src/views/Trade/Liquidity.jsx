import React from 'react'


const Liquidity = (  ) => (
  <>
           <div className="md:w-full w-[400px] max-w-3xl flex flex-col justify-center">
            <div class="grid mt-8  gap-8 grid-cols-1">
              <div class="flex flex-col ">
                <div class="bg-white shadow-md rounded-3xl p-5">
                  <div class="flex flex-row items-center">
                    <img src="/trade/liquidity.svg" className="mr-2" alt="lolli"/>
                    <h2 class="font-semibold text-lg text-blue-400 mr-auto">
                      Your Liquidity
                    </h2>
                    <button type="button" class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0 flex justify-center text-lg text-blue-400 font-black mr-8">
                      <p className="mr-2 ">ADD</p>
                    
                        <img src="/trade/add.svg" alt="lolli" className="mt-0.5"/>
                    
                    </button>
                  </div>
<div class="divide-y divide-fuchsia-300 mt-2">
  <div></div>
  <div></div>

</div>
                  <div class="flex flex-row items-center  mt-4 py-2 px-2 ">
                    <div className="px-4 text-gray-500 font-bold text-left">
                      <p className="text-md text-gray-500 font-black">Remove liquidity</p> <p className="py-2 text-xs text-gray-400">Remove liquidity to recieve tokens back</p>
                    </div>

                    <div className="md:ml-auto ml-24 w-full sm:w-auto sm:ml-auto sm:mt-0 flex-end">
                      <div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0">
                      <button className="mr-2">
                        <img src="/trade/Grupo_14389.svg" alt="lolli"/>
                      </button>
                      <button>
                        <img src="/trade/reloj-de-pared.svg" alt="lolli"/>
                      </button>
                    </div>
                       <select
                          class="block w-full bg-[#f1f5f8] text-gray-500 font-bold border border-[#f1f5f8] rounded-lg h-10 px-4 md:w-full "
                          required="required"
                        >
                          <option value="">Select Balance</option>
                          <option value="">BNB</option>
                          <option value="">Cake</option>
                          <option value="">USDT</option>
                        </select>

                    </div>
                  </div>
                  <div class="mt-5">

                    
                 
                      <div className="  shadow-sm w-full px-6 py-3 mt-3 text-lg text-gray-600 transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-gray-200  hover:shadow-lg focus:outline-none font-black ">
                        <p >No liquidity found.</p>  
                        <p>Dont's see a pool you joined?</p>
<button type="button" className=" shadow-sm w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-blue-400 hover:bg-blue-500 hover:shadow-lg focus:outline-none font-bold">
                        Add liquidity instead   
                      </button>

                      </div>
                  


                    <div>
                      <button className="border border-blue-primary shadow-sm w-full px-6 py-3 mt-3 text-lg text-blue-primary transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-white hover:bg-indigo-50 hover:shadow-lg focus:outline-none font-bold flex justify-center">
                        Add liquidity instead      <img src="/trade/add.svg" alt="lolli" className="mt-0.5 ml-2"/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  </>
)
export default Liquidity
