
import React, { useState } from 'react'
import { Tab } from '@headlessui/react'
import Swap from './Swap';
import Liquidity from './Liquidity';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Tabs() {
  let [categories] = useState({
    Swap: [
      {
        id: 1,
        component: <Swap />,
        
      },
   
    ],
    Liquidity: [
      {
        id: 1,
      component: <Liquidity />
           },

    ],

  })

  return (
    <div className="md:w-full w-[400px] max-w-lg  px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-full">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm leading-5 font-medium text-white rounded-full flex justify-center pr-12',
                  'focus:outline-none ',
                  selected && category === 'Liquidity'
                    ? 'bg-blue-400 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white' &&
             selected && category === 'Swap'
                    ? 'bg-pink-primary shadow focus:ring-2 ring-offset-2 ring-offset-pink-400 ring-white ring-opacity-60'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white' 
                )
              }
            >
              {category === 'Swap' ? (
    <img src="/trade/Grupo_14393.svg" alt="svg" className="w-[40px]"/>
              ) : (
                  <img src="/trade/chemical2.svg" alt="svg" className="w-[40px]"/>
              )}
                        <p className="mt-2 ml-4 text-md font-bold">{category}
</p>              </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'md:px-8 px-0',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-100'
              )}
            >
              <ul>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className=""
                  >
                    {post.component}
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

