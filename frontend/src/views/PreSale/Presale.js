import React, { useState, useEffect, useContext } from "react";

import { motion } from "framer-motion";
import { Switch } from "@headlessui/react";
import { useMasterChefV2 } from "../../hooks/useContract";
import { BigNumber } from "ethers";
import Web3Context from "../../context/Web3Context";
import { MailIcon, PhoneIcon } from "@heroicons/react/solid";
const PreSale = () => {
  const people = [
    {
      title: "Captain Thompson",
      rare: 1,
      id: 1924,
      type: "terror",
      imageUrl: "/pack1.png",
    },
    {
      title: "Captain Thompson",
      rare: 1,
      id: 1924,
      type: "terror",
      imageUrl: "/pack2.png",
    },

    // More people...
  ];

  return (
    <>
      <div className="sm:-my-5 -my-3 sm:mx-0 lg:mx-2 sm:p-4 p-12">
        <motion.div className="sm:-my-5 -my-3 mx-auto max-w-screen-xl z-50 rounded-t z-10">
          <motion.div className="text-center flex flex-col mt-8 mb-12 font-pocket">
            <motion.div className="text-6xl font-black text-shadow z-10">
              PreSale{" "}
            </motion.div>
            <br />
          </motion.div>
          <motion.div className="text-center flex flex-col">
            <motion.div className="z-10">
              <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 lg:mx-20 mx-0 mb-20"
              >
                {/*Pack 1 NFT*/}
                <li className="col-span-1 flex flex-col text-center bg-white rounded-md bg-opacity-30 border-4 border-gray-900">
                  <div className="flex-1 flex flex-col p-8">
                    <img
                      className="w-56 h-96 flex-shrink-0 mx-auto rounded-lg"
                      src="/pack1.png"
                      alt=""
                    />
                    <dl className="mt-4 flex-grow flex flex-col justify-between ">
                      <dt className="sr-only">Title</dt>
                      <div className="lg:mx-6 mx-3 bg-opacity-30 ">
                        <select
                          id="location"
                          name="location"
                          className="mt-1 px-6 w-full mr-4  py-2 rounded-md font-pocket text-3xl bg-opacity-30 bg-white border-2 border-[#7dfc4b]"
                          defaultValue="Select Option"
                        >
                          <option>Select Option</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                        </select>
                      </div>
                      <div className="mt-4">
                        <button>
                          <img src="/button.png" className="w-52" alt="" />
                        </button>
                      </div>
                    </dl>
                  </div>
                  <div></div>
                </li>
                {/*Pack 1 NFT END*/}

                {/*Pack 2 NFT*/}
                <li className="col-span-1 flex flex-col text-center bg-white rounded-md bg-opacity-30 border-4 border-gray-900">
                  <div className="flex-1 flex flex-col p-8">
                    <img
                      className="w-56 h-96 flex-shrink-0 mx-auto rounded-lg"
                      src="/pack2.png"
                      alt=""
                    />
                    <dl className="mt-4 flex-grow flex flex-col justify-between ">
                      <dt className="sr-only">Title</dt>
                      <div className="lg:mx-6 mx-3 bg-opacity-30 ">
                        <select
                          id="location"
                          name="location"
                          className="mt-1 px-6 w-full mr-4  py-2 rounded-md font-pocket text-3xl bg-opacity-30 bg-white border-2 border-[#7dfc4b]"
                          defaultValue="Select Option"
                        >
                          <option>Select Option</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                        </select>
                      </div>
                      <div className="mt-4">
                        <button>
                          <img src="/button.png" className="w-52" alt="" />
                        </button>
                      </div>
                    </dl>
                  </div>
                  <div></div>
                </li>
                {/*Pack 2 NFT END*/}
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};
export default PreSale;
