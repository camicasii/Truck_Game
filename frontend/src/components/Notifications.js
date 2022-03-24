import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "@heroicons/react/solid";

export default function Notifications() {
  const [show, setShow] = useState(true);

  return (
    <>
      <AnimatePresence>
        {/* Global notification live region, render this permanently at the end of the document */}
        <motion.div
          aria-live="assertive"
          className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-30"

          initial={{y: 50, opacity: 0}}
          animate={{y: 0, opacity: 1, transition: 10}}
          exit={{y: 50, opacity: 0}}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        >
          <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
            {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
            <Transition
              show={show}
              as={Fragment}
              enter="transform ease-out duration-300 transition"
              enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
              enterTo="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <img
                        src="https://camicasii.sfo3.digitaloceanspaces.com/sugarSwap/token/lollipop.svg"
                        className="h-6 w-6 text-green-400"
                        aria-hidden="true"
                        alt=""
                      />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className="text-sm font-medium text-gray-900">Note:</p>
                      <p className="mt-1 text-sm text-gray-700">
                        The pool "Deposit LOLLI, win LOLLI" will be enabled 6
                        hours prior to the official launch of the platform
                        exclusively to the people who participated on the
                        presale, as a benefit for supporting the project. You
                        may deposit your Lolli starting November 4 @ 16:00 UTC
                        (To secure your benefits, the pool will start to give
                        them on November 5 @ 8:00 UTC)
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                      <button
                        className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => {
                          setShow(false);
                        }}
                      >
                        <span className="sr-only">Close</span>
                        <XIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
