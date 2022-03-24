import React, { useState } from "react";
import CardPools from "./Card/CardPools";
import CardHorizontalPool from "./Card/CardHorizontalPool";
import { motion } from "framer-motion";
import poolsGamesData from "./Card/poolsGamesData";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const PoolsGamesScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [enabled1, setEnabled1] = useState(false);
  const handleTabSwitch = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== activeTab) {
      setActiveTab(index);
    }
  };

  const childVariants = {
    initial: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <div className="sm:-my-5 -my-3 sm:mx-0 lg:mr-4 md:p-0 p-8">
        <motion.div
          className="sm:-my-5 -my-3 mx-auto max-w-screen-xl "
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.75 }}
        >
          <div
            className=" mt-8 rounded-md"
            style={{
              backgroundImage: "url(" + "/pool/bg.svg" + ")",
            }}
          >
            <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between flex-wrap">
                <div className="w-0 flex-1 flex items-center">
                  <span className="flex p-2 rounded-lg ">
                    <img
                      src="/pool/banner1.svg"
                      alt=""
                      className="w-full text-white"
                      aria-hidden="true"
                    />
                  </span>
                  <p className="ml-3 font-medium text-white truncate">
                    <span className="md:hidden text-xl">Pool Games</span>
                    <span className="hidden md:inline text-7xl font-medium">
                      Pools Games
                    </span>
                    <br />
                    <span className="md:hidden text-xl">
                      Just Stake some tokens to earn
                    </span>
                    <span className="hidden md:inline text-xl pt-2">
                      Just Stake some tokens to earn
                    </span>
                    <br />
                    <span className="md:hidden text-xl">
                      High APR, low risk
                    </span>
                    <span className="hidden md:inline text-xl pt-2">
                      High APR, low risk
                    </span>
                  </p>
                </div>
                <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto md:block hidden">
                  <img src="/pool/banner2.svg" alt="" />
                </div>
                <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                  <img
                    src="/pool/banner3.svg"
                    alt=""
                    className="w-24 md:w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className=" px-4 py-5  sm:px-6 mt-12  max-w-6xl mx-auto"
          initial="initial"
          animate="visible"
          variants={{
            initial: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.div
            className="-ml-4 -mt-4 grid md:flex md:justify-between justify-center items-center flex-wrap sm:flex-nowrap "
            variants={childVariants}
          >
            <div className="ml-4 mt-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <button
                    onClick={handleTabSwitch}
                    activeTab={activeTab === 0}
                    id={0}
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    <img src="/farm/Grupo_14499.svg" className="w-6.5" alt="" />
                  </button>{" "}
                </div>
                <div className="ml-4">
                  <button
                    type="button"
                    onClick={handleTabSwitch}
                    activeTab={activeTab === 1}
                    id={1}
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    {" "}
                    <img
                      src="/farm/Grupo_14497.svg"
                      className="w-6.5"
                      onClick={handleTabSwitch}
                      activeTab={activeTab === 1}
                      id={1}
                      alt=""
                    />
                  </button>
                </div>
                <div className="ml-4">
                  <Switch.Group as="div" className="flex items-center">
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className={classNames(
                        enabled ? "bg-gray-200" : "bg-gray-200",
                        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          enabled ? "translate-x-5" : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 rounded-full bg-gray-600 shadow transform ring-0 transition ease-in-out duration-200"
                        )}
                      />
                    </Switch>
                    <Switch.Label as="span" className="ml-3 hidden md:block">
                      <span className="text-sm font-medium text-gray-500 font-semibold">
                        Staked Only{" "}
                      </span>
                    </Switch.Label>
                  </Switch.Group>{" "}
                </div>
                <div className="ml-4">
                  <Switch
                    checked={enabled1}
                    onChange={setEnabled1}
                    className={classNames(
                      enabled1 ? "bg-white" : "bg-white ",
                      "relative inline-flex flex-shrink-0 h-7 w-24 border-2 border-transparent bg-white shadow-md  rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    )}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      className={classNames(
                        enabled1 ? "translate-x-7" : "translate-x-0",
                        "pointer-events-none relative inline-block h-6 w-16 rounded-full bg-blue-400 text-white shadow transform ring-0 transition ease-in-out duration-200"
                      )}
                    >
                      <span
                        className={classNames(
                          enabled1
                            ? "opacity-0 ease-out duration-100"
                            : "opacity-100 ease-in duration-200",
                          "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity text-xs"
                        )}
                        aria-hidden="true"
                      >
                        Live
                      </span>
                      <span
                        className={classNames(
                          enabled1
                            ? "opacity-100 ease-in duration-200"
                            : "opacity-0 ease-out duration-100",
                          "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity text-xs"
                        )}
                        aria-hidden="true"
                      >
                        Finished
                      </span>
                    </span>
                  </Switch>{" "}
                </div>
              </div>
            </div>
            <div className="ml-4 mt-4 flex-shrink-0 flex">
              <div>
                <select
                  id="location"
                  name="location"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300  focus:outline-none focus:ring-indigo-500 focus:border-pink-500 sm:text-sm rounded-full bg-white shadow-sm"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  defaultValue=""
                >
                  <option value="">SORT BY</option>
                  {poolsGamesData.map((pool) => (
                    <>
                      <option>{pool.name}</option>
                    </>
                  ))}
                </select>
              </div>
              <div class="box-wrapper ml-4">
                <div class=" bg-white rounded-full flex items-center w-full p-2 py-2 shadow-sm border border-gray-300">
                  <button class="outline-none focus:outline-none">
                    <svg
                      class=" w-5 text-blue-600 h-5 cursor-pointer"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </button>
                  <input
                    type="search"
                    name=""
                    id=""
                    placeholder="Search Pools Games"
                    x-model="q"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    class="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent  "
                  />
                </div>
              </div>{" "}
            </div>
          </motion.div>
        </motion.div>

        <div
          className={`${!activeTab ? "" : "hidden"}`}
          activeTab={activeTab === 0}
        >
          <CardPools searchTerm={searchTerm} />
        </div>

        <div
          className={`${activeTab ? "" : "hidden"}`}
          activeTab={activeTab === 1}
        >
          <CardHorizontalPool />
        </div>
      </div>
      <img
        src="/pool/image.svg"
        className="absolute left-[50%] md:ml-[210px] ml-[-10px] -mt-40 hidden md:block"
        alt="Grupo_15890"
      />
    </>
  );
};
export default PoolsGamesScreen;
