import { Fragment, useState, useEffect, useContext } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { MenuAlt2Icon, XIcon } from "@heroicons/react/outline";
import { Disclosure } from "@headlessui/react";
import { NavLink, useLocation } from "react-router-dom";
import { SidebarData } from "../../data/SidebarData";
import Link from "../link";
import Web3Context from "../../context/Web3Context";
import TokenContext from "../../context/TokenContext";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import config from '../../utils/config'
import { utils } from "ethers";

const navigation = [
  {
    name: "More",
    current: false,
    children: [
      { name: "Whitepaper EN", href:config.WHITEPAPER_EN },
      { name: "Whitepaper ES", href: config.WHITEPAPER_ES },
    ],
  },
];

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ children }) {
  const { accounts, isLoaded } = useContext(Web3Context);
  const { balanceOf_ } = useContext(TokenContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lolliBalance, setlolliBalance] = useState("00.00");
  const [acount_, setacount_] = useState("0x");
  const location = useLocation();
  useEffect(() => {    
    const start = "0X...";
    console.log(accounts);
    if(accounts==undefined)
    return
     const end = accounts.slice(38);     
    setacount_(`${start}...${end}`);
    return () => {};
  }, [accounts]);
  const [newActiveLink, setNewActiveLink] = useState(null);

  useEffect(() => {
    const balance = async () => {
      let balance = balanceOf_;      
      balance =utils.formatEther(balanceOf_);
      console.log(balanceOf_,"balanceOf_balanceOf_balanceOf_balanceOf_balanceOf_");
      setlolliBalance(Number(balance).toFixed(2));
    };
    if (isLoaded) balance();
    return () => {};
  }, [isLoaded, balanceOf_,accounts]);

  return (
    <>
      <div className="h-screen flex overflow-hidden ">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#fbf8fa]">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4 justify-center bg-[#2f2e2e] pb-4">
                  <img className="ml-3 w-40 mt-4" src="/logo.png" alt="logo" />
                </div>
                <div className="pt-5 flex-1 h-0 overflow-y-auto bg-[#2f2e2e]">
                  <nav className="px-2 space-y-1">
                    <ul className="mt-4 flex flex-col py-4 space-y-1 rounded-lg border-red-400 sm:ml-4 ml-0 text-center shadow-sm transition-all duration-500 justify-center">                                          
                      {SidebarData.map((item, index) => {
                        const active = "";
                        return (
                          <li key={index} className="pt-4 py-2">
                            <NavLink
                              to={item.url}
                              className={`font-medium focus:outline-none  text-white`}
                              inactiveClassName="text-white"
                              activeClassName={active}
                              isActive={(match, location) => {
                                match && setNewActiveLink(index); // <-- set active index
                                return match; // <-- return boolean
                              }}
                            >
                              <p
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? "bg-indigo-800 text-white bg-[#bb2801]"
                                    : "text-indigo-100 hover:bg-black bg-[#bb2801]",
                                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                )}
                              >
                                <item.icon
                                  className="mr-3 flex-shrink-0 h-6 w-6 text-white"
                                  aria-hidden="true"
                                />
                                {item.title}
                              </p>
                            </NavLink>
                          </li>
                        );
                      })}
                      {navigation.map((item) =>
                        !item.children ? (
                          <div key={item.name}>
                            <a
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? "bg-gray-100 text-black"
                                  : "bg-white text-black-600 hover:bg-gray-50 hover:text-gray-900",
                                "group w-full flex items-center pl-7 pr-2 py-2 text-sm font-medium rounded-md"
                              )}
                            >
                              {item.name}
                            </a>
                          </div>
                        ) : (
                          <Disclosure
                            as="div"
                            key={item.name}
                            className="space-y-1"
                          >
                            {({ open }) => (
                              <>
                                <Disclosure.Button
                                  className={classNames(
                                    "group w-full flex border border-primary items-center pr-2 py-2 text-center justify-center text-sm font-medium rounded-md focus:outline-none focus:ring-2"
                                  )}
                                 
                                >
                                  <svg
                                    className={classNames(
                                      open
                                        ? "text-gray-100 rotate-90"
                                        : "text-gray-100",
                                      "mr-2 flex-shrink-0 h-5 w-5 transform group-hover:text-white transition-colors ease-in-out duration-150"
                                    )}
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                  >
                                    <path
                                      d="M6 6L14 10L6 14V6Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                  <span className="text-gray-200  text-xl">
                                    {item.name}
                                  </span>
                                </Disclosure.Button>
                                <Disclosure.Panel className="space-y-1">
                              

                                
                                  {item.children.map((subItem) => (
                                    <a
                                      key={subItem.name}
                                      href={subItem.href}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="group w-full flex items-center pl-12 pr-2 py-2 text-center text-sm font-medium text-white rounded-md hover:text-red-400 hover:bg-gray-700 cursor-pointer flex"
                                    >
                                      {subItem.name}
                                    </a>
                                  ))}
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        )
                      )}
                    </ul>
                    <div>
                      <div className="grid md:grid-cols-3 lg:grid-cols-3 grid-cols-3 mt-2 px-6  py-2 pb-6 hidden">
                        <Link
                          to={config.TELEGRAM_ES}
                          target={"_blank"}
                          className="flex text-sm text-gray-500 hover:text-pink-500"
                        >
                          ES{" "}
                          <img
                            src="/Menu/telegram.svg"
                            className="w-6"
                            alt="telegram"
                          />
                        </Link>
                        <Link
                          to={config.TELEGRAM}
                          target={"_blank"}
                          className="flex text-sm text-gray-500 hover:text-pink-500"
                        >
                          EN{" "}
                          <img
                            src="/Menu/telegram.svg"
                            className="w-6 "
                            alt="telegram"
                          />
                        </Link>
                        <Link
                          to={
                            config.TELEGRAM_ANNOUNCEMENT_CHANNEL                            
                          }
                          target={"_blank"}
                          className="flex text-sm text-gray-500 hover:text-pink-500"
                        >
                          AC{" "}
                          <img
                            src="/Menu/telegram.svg"
                            className="w-6 "
                            alt="telegram"
                          />
                        </Link>
                        <Link
                          to={
                            config.GITHUB                          
                          }
                          target="_blank"
                          className="mt-4"
                        >
                          <img
                            src="/Menu/github.svg"
                            className="w-5"
                            alt="github"
                          />
                        </Link>
                        <Link
                          to={
                            config.TWITTER
                            }
                          target={"_blank"}
                          className="mt-4 flex text-gray-500"
                        >
                          <img
                            src="/Menu/twitter.svg"
                            className="w-6"
                            alt="twitter"
                          />
                        </Link>
                        <Link to="" className="mt-4 flex text-gray-500">
                          ES{" "}
                          <img
                            src="/Menu/global.svg"
                            className="w-4"
                            alt="global"
                          />
                        </Link>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden bg-[#1c201a] md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-[#bb2801]">
              <div className="flex items-center flex-shrink-0 px-4 justify-center ">
                <img
                  className=" w-20 invisible md:visible -mt-3"
                  src="/logo.png"
                  alt="logo"
                />
              </div>
              <div className="mt-5 flex-1 flex flex-col">
                {/*SIDEBAR ITEMS DESKTOP*/}
                <nav className="flex-1 px-2 space-y-1">
                  <div className="fixed flex flex-col top-0 left-0 w-64  h-full mt-[10px] ">
                    <div
                      className="overflow-y-auto overflow-x-hidden flex-grow bg-[#1c201a] px-4"
                      style={{ marginTop: "54px" }}
                    >
                      <ul className="mt-4 flex flex-col py-4 space-y-1 rounded-lg  border-red-400 sm:ml-4 ml-0 text-center shadow-sm transition-all duration-500 justify-center">
                        {SidebarData.map((item, index) => {
                          const active = "";
                          if(index==0)
                          return(
                            <li key={index} className="pt-4 py-2"
                             
                            >
                              <a 
                                className={`font-medium focus:outline-none  text-white
                                rounded-sm bg-[#bb2801]
                                group flex items-center px-2 py-2 text-sm font-medium  rounded-md
                                `}      
                                target="_blank"                         
                                href={item.url}    
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
                                to={item.url}
                                className={`font-medium focus:outline-none  text-white`}
                                inactiveClassName="text-white"
                                activeClassName={active}
                                isActive={(match, location) => {
                                  match && setNewActiveLink(index); // <-- set active index
                                  return match; // <-- return boolean
                                }}
                              >
                                <p
                                  key={item.name}
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-indigo-800 text-white bg-[#bb2801]"
                                      : "text-indigo-100 hover:bg-black bg-[#bb2801]",
                                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                  )}
                                >
                                  <item.icon
                                    className="mr-3 flex-shrink-0 h-6 w-6 text-white"
                                    aria-hidden="true"
                                  />
                                  {item.title}
                                </p>
                              </NavLink>
                            </li>
                          );
                        })}

                        {navigation.map((item) =>
                          !item.children ? (
                            <div key={item.name}>
                              <a
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-100 text-gray-900"
                                    : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                  "group w-full flex items-center pl-7 pr-2 py-2 text-sm font-medium rounded-md"
                                )}
                              >
                                {item.name}
                              </a>
                            </div>
                          ) : (
                            <Disclosure
                              as="div"
                              key={item.name}
                              className="space-y-1 "
                            >
                              {({ open }) => (
                                <>
                                  <Disclosure.Button
                                    className={classNames(
                                      "border border-primary group w-full flex items-center pr-2 py-2 text-center justify-center text-sm font-medium rounded-md focus:outline-none focus:ring-2 mb-4"
                                    )}
                                  >
                                    <svg
                                      className={classNames(
                                        open
                                          ? "text-gray-100 rotate-90"
                                          : "text-gray-100",
                                        "mr-2 flex-shrink-0 h-5 w-5 transform group-hover:text-white transition-colors ease-in-out duration-150"
                                      )}
                                      viewBox="0 0 20 20"
                                      aria-hidden="true"
                                    >
                                      <path
                                        d="M6 6L14 10L6 14V6Z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                    <span className="text-gray-200 text-xl">
                                      {item.name}
                                    </span>{" "}
                                  </Disclosure.Button>
                                  <Disclosure.Panel className="space-y-1">
                                    {item.children.map((subItem) => (
                                      <a
                                        target={`_blank`}
                                        key={subItem.name}
                                        href={subItem.href}
                                        className="group w-full flex items-center pl-12 pr-2 py-2 text-center text-sm font-medium text-white rounded-md hover:text-primary hover:bg-gray-700"
                                      >
                                        {subItem.name}
                                      </a>
                                    ))}
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                          )
                        )}
                      </ul>
                      <div>
                        <div className="grid md:grid-cols-3 lg:grid-cols-3 grid-cols-3 mt-2 px-6  py-2 pb-6 hidden">
                          <Link
                            to={config.TELEGRAM_ES}
                            target={"_blank"}
                            className="flex text-sm text-gray-500 hover:text-pink-500"
                          >
                            ES{" "}
                            <img
                              src="/Menu/telegram.svg"
                              className="w-6"
                              alt="telegram"
                            />
                          </Link>
                          <Link
                            to={config.TELEGRAM}
                            target={"_blank"}
                            className="flex text-sm text-gray-500 hover:text-pink-500"
                          >
                            EN{" "}
                            <img
                              src="/Menu/telegram.svg"
                              className="w-6 "
                              alt="telegram"
                            />
                          </Link>
                          <Link
                            to={
                              config.TELEGRAM_ANNOUNCEMENT_CHANNEL                              
                            }
                            target={"_blank"}
                            className="flex text-sm text-gray-500 hover:text-pink-500"
                          >
                            AC{" "}
                            <img
                              src="/Menu/telegram.svg"
                              className="w-6 "
                              alt="telegram"
                            />
                          </Link>
                          <Link
                            to={config.GITHUB}
                            target="_blank"
                            className="mt-4"
                          >
                            <img
                              src="/Menu/github.svg"
                              className="w-5"
                              alt="github"
                            />
                          </Link>
                          <Link
                            to={config.TWITTER}
                            target={"_blank"}
                            className="mt-4 flex text-gray-500"
                          >
                            <img
                              src="/Menu/twitter.svg"
                              className="w-6"
                              alt="twitter"
                            />
                          </Link>
                          <Link to="" className="mt-4 flex text-gray-500">
                            ES{" "}
                            <img
                              src="/Menu/global.svg"
                              className="w-4"
                              alt="global"
                            />
                          </Link>
                        </div>
                      </div>
                      {/*items*/}

                      {/*items-end*/}
                    </div>
                  </div>
                </nav>
                {/*SIDEBAR ITEMS DESKTOP*/}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-[#2f2e2e] shadow">
            <button
              type="button"
              className="px-4 border-r border-gray-400 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500  md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon
                className="h-6 w-6 text-red-500"
                aria-hidden="true"
              />
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex"></div>
              <div className="ml-4 flex items-center md:ml-6">
                {/* <div className="flex sm:space-x-2 space-x-1  text-center mt-2 px-3 py-2">
              <img src="/home/choco.svg" alt="choco" className="w-4"/>
  <h1 className="text-gray-800 bg-blue-200 rounded  font-normal text-sm ">20.00</h1>

            </div>
 <div className="flex sm:space-x-2 space-x-1  text-center mt-2 px-3 py-2">
              <img src="/home/Recurso_1.svg" alt="Recurso_1" className="w-4"/>
  <h1 className="text-gray-800 bg-pink-200 rounded  font-normal text-sm ">10.00</h1>

            </div>*/}
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div className="flex">
                    <span className="flex inline-flex relative none">
                      <div
                        className="flex sm:space-x-2 space-x-1  text-center mt-1 mr-3  rounded-full"
                        style={{
                          background:
                            "linear-gradient(#f8ff1e -10%,#f5b400,#d68214)",
                        }}
                      ></div>
                      <div className="flex text-center mt-1   rounded-md">
                        <h1 className="text-white font-black text-sm rounded  pt-2 px-4">
                          {lolliBalance} TTF
                        </h1>
                      </div>
                    </span>

                    <div className="px-2 mt-1.5">
                      <button
                        type="button"
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        {acount_}
                      </button>
                    </div>

                    <Menu
                      as="div"
                      className="relative inline-block text-left md:hidden block"
                    >
                      <div>
                        <Menu.Button className="bg-gray-700 rounded-full flex items-center text-red-300   px-1 py-1 mt-2">
                          <span className="sr-only">Open options</span>
                          <DotsVerticalIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
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
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 
                        rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? " text-white" : "text-white",
                                    "block px-4 py-2 text-sm group flex items-center"
                                  )}
                                >
                                  <img
                                    src="/tokenomics.png"
                                    alt="money"
                                    className="mr-3 h-5 w-5"
                                  />
                                  {lolliBalance} TTF
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
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
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="flex-1 relative overflow-y-auto focus:outline-none overflow-x-hidden">
            <div className="py-6">
              <div className="max-w-full mx-auto -px-4 sm:px-6 md:-px-20">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
