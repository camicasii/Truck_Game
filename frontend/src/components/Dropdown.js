import React from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'



const Dropdown = (  {liquidity,symbol}) => { 

const validLiquidity = new RegExp(
   '/0{3,}\d+$/'
);
  return(
  <>
           <Menu as="div" className=" inline-block text-left z-20 flex justify-center mt-2">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md  px-4 py-1  text-base font-medium text-green-900 font-pocket">
          Details
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute  mt-10 md:w-80 w-3/6 rounded-md shadow-lg  bg-[#2f2e2e] ring-1 ring-black ring-opacity-5 focus:outline-none ">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <>
              <div className="-mt-px flex ">
              <div className="w-0 flex-1 flex">
                <p
               
                  className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-2 text-sm  font-medium border border-transparent rounded-bl-lg text-white"
                >
                                  <span className="ml-3">Total Liquidity:
</span>
                </p>
              </div>
              <div className="-ml-px w-0 flex-1 flex">
                <p
                  
                  className="relative w-0 flex-1 inline-flex items-center justify-center py-2 text-sm text-gray-100 font-medium border border-transparent rounded-br-lg "
                >
                                  <span className="ml-3"> {liquidity} {symbol}</span>
                </p>
              </div>
              
            </div>

                </>
              )}
            </Menu.Item>

          </div>
        </Menu.Items>
      </Transition>
    </Menu>

  </>
)}
export default Dropdown
