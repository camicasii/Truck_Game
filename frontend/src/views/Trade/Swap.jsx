import React from 'react'


const Swap = (  ) => (
  <>
           <div className="md:w-full w-[400px] max-w-3xl flex flex-col justify-center">
            <div class="grid mt-8  gap-8 grid-cols-1">
              <div class="flex flex-col ">
                <div class="bg-white shadow-md rounded-3xl p-5">
                  <div class="flex flex-row items-center">
                    <img src="/trade/Grupo_14415.svg" className="mr-2" alt="lolli"/>
                    <h2 class="font-semibold text-lg text-blue-400 mr-auto">
                      Exchange
                    </h2>
                    <div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0">
                      <button className="mr-2">
                        <img src="/trade/Grupo_14389.svg" alt="lolli"/>
                      </button>
                      <button>
                        <img src="/trade/reloj-de-pared.svg" alt="lolli"/>
                      </button>
                    </div>
                  </div>

                  <div class="flex flex-row items-center border border-gray-100 mt-4 py-2 px-2 shadow-md rounded-lg">
                    <div className="px-4 text-gray-500 font-bold text-sm">
                      <p>From</p> <p className="py-2">0.00</p>
                    </div>

                    <div className="md:ml-auto ml-24 w-full sm:w-auto sm:ml-auto sm:mt-0 flex-end">
                      <p className="text-blue-primary">Balance</p>
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
                    <div class=" flex justify-center">
                      <img src="/trade/flecha.svg" className="w-4" alt="lolli"/>
                    </div>
                    <div className="flex flex-row items-center border border-gray-100 mt-4 py-2 px-2 shadow-md rounded-lg">
                      <div className="px-4 text-gray-500 font-bold text-sm">
                        <p>To</p> <p className="py-2">0.00</p>
                      </div>

                      <div className=" w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0">
                        <label className="font-semibold text-blue-primary py-2">
                          Balance
                        </label>
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
                    <div class="flex flex-row text-sm items-center mt-4">
                      <p class="font-semibold  text-gray-500 mr-auto">Price</p>
                      <div className="text-blue-primary font-bold">
                        <p>0.000461358 BNB per Lollipop</p>
                      </div>
                    </div>

                    <div class="flex flex-row text-sm items-center text-gray-500 mt-4">
                      <p class="font-semibold   mr-auto">Slippage Tolerance</p>
                      <div className="font-semibold">
                        <p>6%</p>
                      </div>
                    </div>
                    <div>
                      <button className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink-500 hover:bg-pink-600 hover:shadow-lg focus:outline-none font-bold">
                        Swap
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  </>
)
export default Swap
