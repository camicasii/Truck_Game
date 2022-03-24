import React, { useState,useEffect,useContext } from "react";

import { motion } from "framer-motion";
import { Switch } from "@headlessui/react";
import {useMasterChefV2} from '../../hooks/useContract'
import {BigNumber} from 'ethers'
import Web3Context from '../../context/Web3Context'
import { MailIcon, PhoneIcon } from '@heroicons/react/solid'
const Inventory = (  ) =>{


const people = [
  {
    title: 'Captain Thompson',
    rare: 1,
    id: 1924,
    type: 'terror',
    imageUrl:
      'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
  {
    title: 'Captain Thompson',
    rare: 1,
    id: 1924,
    type: 'terror',
    imageUrl:
      'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
  {
    title: 'Captain Thompson',
    rare: 1,
    id: 1924,
    type: 'terror',
    imageUrl:
      'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
  // More people...
]

  return(
  <>
 <div className="sm:-my-5 -my-3 sm:mx-0 lg:mx-2 sm:p-4 p-12">
        <motion.div className="sm:-my-5 -my-3 mx-auto max-w-screen-xl z-50 rounded-t z-10">
          <motion.div className="text-center flex flex-col mt-8 mb-12 font-pocket">
            <motion.div className="text-6xl font-black text-shadow z-10">
              NFT Inventory{" "}
            </motion.div>
            <br/>

          </motion.div>
 <motion.div className="text-center flex flex-col">
            <motion.div className="z-10">
             <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
      {people.map((inventory) => (
        <li
          key={inventory.title}
          className="col-span-1 flex flex-col text-center bg-black rounded-md bg-opacity-40 borders"
        >
          <div className="flex-1 flex flex-col p-8">
            <h1 className="mb-4 font-pocket text-3xl text-shadow-green">{inventory.title}</h1>
            <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-lg" src={inventory.imageUrl} alt="" />
            <dl className="mt-4 flex-grow flex flex-col justify-between ">
              <dt className="sr-only">Title</dt>
              <dd className="text-gray-500 text-sm text-[#7dfc4b] font-pocket text-2xl">{inventory.title}</dd>
      <dt className="sr-only">Rare</dt>
              <dd className="text-gray-500 text-sm text-[#7dfc4b] font-pocket text-2xl">Rare: {inventory.rare}</dd>
 <dt className="sr-only">ID</dt>
              <dd className="text-gray-500 text-sm text-[#7dfc4b] font-pocket text-2xl">ID: {inventory.id}</dd>
 <dt className="sr-only">Type</dt>
              <dd className="text-gray-500 text-sm text-[#7dfc4b] font-pocket text-2xl">Type: {inventory.type}</dd>

            </dl>
          </div>
          <div>
          
          </div>
        </li>
      ))}
    </ul>
  </motion.div>
          </motion.div>
        </motion.div>
      </div>
  </>
)}
export default Inventory
