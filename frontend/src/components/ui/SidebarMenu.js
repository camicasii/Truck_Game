import * as React from "react";
import { NavLink } from "react-router-dom";
import { SidebarData } from "../../data/SidebarData";
import Link from "../link";
import {Menu, Transition} from '@headlessui/react'
import config from '../../utils/config'

const SidebarMenu = ({ setClosed, isStatic }) => {
  return (
    <>
      {!isStatic && (
        <div className=" py-4 flex-grow bg-[#fbf8fa] ">
          <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased  text-gray-800 ">
            <div className="fixed flex flex-col top-0 left-0 w-64 bg-white h-full mt-[10px] ">
              <div
                className="overflow-y-auto overflow-x-hidden flex-grow bg-[#fbf8fa] px-4"
                style={{ marginTop: "54px" }}
              >
                <ul className="mt-4 flex flex-col py-4 space-y-1 rounded-lg bg-white border-red-400 sm:ml-4 ml-0 text-center shadow-sm transition-all duration-500 justify-center">
                  {SidebarData.map((item, index) => {
                    if(index==0)
                    return(
                      <li key={index} className="pt-4 py-2">
                        <a
                          onClick={() => setClosed(true)}
                          href={item.url}                          
                          className={`font-normal focus:outline-none  border-b-2 border-fuchsia-600 ${
                            setClosed
                              ? "transition-all duration-100"
                              : "transition-all duration-100"
                          }`}
                          inactiveClassName="text-red-400"
                          activeClassName="rounded-sm text-pink-primary "
                        >
                          <span className="flex justify-center">
                            <img src={item.icon} alt={item.icon} />
                          </span>
                          <span className=" text-sm tracking-wide truncate">
                            {item.title}
                          </span>
                        </a>
                      </li>
                    )
                    return (
                      <li key={index} className="pt-4 py-2">
                        <NavLink
                          onClick={() => setClosed(true)}
                          to={item.url}
                          className={`font-normal focus:outline-none  border-b-2 border-fuchsia-600 ${
                            setClosed
                              ? "transition-all duration-100"
                              : "transition-all duration-100"
                          }`}
                          inactiveClassName="text-red-400"
                          activeClassName="rounded-sm text-pink-primary "
                        >
                          <span className="flex justify-center">
                            <img src={item.icon} alt={item.icon} />
                          </span>
                          <span className=" text-sm tracking-wide truncate">
                            {item.title}
                          </span>
                        </NavLink>
                      </li>
                    );
                  })}

 <li className="pt-4 pb-4">
                    <Menu  as="div" className="relative " 
                      onClick={() => setClosed(true)}
         className=" font-bold focus:outline-none px-1 pb-1 "
                      inactiveClassName="text-red-400"
                      activeClassName="rounded-sm text-pink-primary"
                    >
                      <>
 <Menu.Button className="shadow-none">
                       <span className="flex justify-center">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
</svg>
                      </span>
                      <span className="text-sm tracking-wide truncate">
                       
                          More
                       
                      </span>
 </Menu.Button>
  <Transition

    enter="transform transition duration-100 ease-in"
    enterFrom="opacity-0 scale-95"
    enterTo="opacity-100 scale-100"
    leave="transform transition duration-75 ease-out"
    leaveFrom="opacity-100 scale-100"
    leaveTo="opacity-0 scale-95"
  >

    <Menu.Items className="origin-top-right md:ml-0 ml-3 mb-4  right-0 mt-2 w-48 rounded-md shadow-lg bg-pink-primary ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none text-center">
       <div className="py-1">
         <Menu.Item>
           <Link to={config.WHITEPAPER_EN} target={"_blank"} className="group flex items-center px-12 py-2 text-sm  text-white hover:bg-pink-400 hover:text-white">
             Whitepaper EN
           </Link> 
         </Menu.Item>
       </div>
    <div className="py-1">
         <Menu.Item >
           <Link to={config.WHITEPAPER_ES} target={"_blank"} className="group flex items-center px-12 py-2 text-sm  text-white hover:bg-pink-400 hover:text-white">
             Whitepaper ES
           </Link> 
         </Menu.Item>
       </div>
  <div className="py-1 bg-pink-700">
         <Menu.Item >
           <Link  className="group flex items-center px-12 py-2 text-sm  text-gray-300  ">
             Audit
           </Link> 
         </Menu.Item>
       </div>
  <div className="py-1 bg-pink-700">
         <Menu.Item>
           <Link  className="group flex items-center px-12 py-2 text-sm  text-gray-300  ">
             Review
           </Link> 
         </Menu.Item>
       </div>
  <div className="py-1 bg-pink-700">
         <Menu.Item>
           <Link  className="group flex items-center px-12 py-2 text-sm  text-gray-300 ">
             Extras
           </Link> 
         </Menu.Item>
       </div>

     </Menu.Items>

  </Transition>

                        </>

                                  
                    </Menu>

                  </li>
                </ul>
                <div>
                 
  <div className="grid md:grid-cols-3 lg:grid-cols-3 grid-cols-3 mt-2 px-6  py-2 pb-20">
                    <Link to={config.TELEGRAM_ES} target={"_blank"} className="flex text-sm text-gray-500 hover:text-pink-500">
                     ES <img src="/Menu/telegram.svg" className="w-6" />
                    </Link>
                     <Link to={config.TELEGRAM} target={"_blank"} className="flex text-sm text-gray-500 hover:text-pink-500">
                     EN <img src="/Menu/telegram.svg" className="w-6 " />
                    </Link>
                        <Link to={config.TELEGRAM_ANNOUNCEMENT_CHANNEL} target={"_blank"} className="flex text-sm text-gray-500 hover:text-pink-500">
                     AC <img src="/Menu/telegram.svg" className="w-6 " />
                    </Link>
                    <Link to={config.GITHUB} target="_blank" className="mt-4">
                      <img src="/Menu/github.svg" className="w-5" />
                    </Link>
                       <Link to={config.TWITTER} target={"_blank"}  className="mt-4 flex text-gray-500">
                      <img src="/Menu/twitter.svg" className="w-6" />
                    </Link>
                    <Link to="" className="mt-4 flex text-gray-500">
                      ES <img src="/Menu/global.svg" className="w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SidebarMenu;
