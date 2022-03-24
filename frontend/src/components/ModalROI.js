import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CalculatorIcon, ExternalLinkIcon } from "@heroicons/react/outline";

export default function ModalROI({ ROI, name, link }) {
  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(true);
  }

  return (
    <>
      <button type="button" onClick={openModal}>
        <img src="/farm/calculadora.svg" alt="lolli" />
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-30 inset-0 overflow-y-auto"
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

      
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-0 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full ">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-pink-100">
                    <CalculatorIcon
                      className="h-6 w-6 text-pink-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-4">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-bold text-gray-800 divide-y divide-gray-200  border-b border-gray-200 pb-4"
                    >
                      ROI
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-2">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                          <div className="overflow-hidden  sm:rounded-lg">
                            <table className="min-w-full ">
                              <thead className="">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                  >
                                    TIMEFRAME
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                  >
                                    ROI
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                  >
                                    LOLLI PER $1000
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {ROI.map((person) => (
                                  <tr key={person.timeframe}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                      {person.timeframe}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                      {person.roi}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                      {person.per}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                </div>
                <div className="mt-4 px-4 p-3">
                  <p className="text-sm text-gray-500">
                    Calculated based on current rates. Compounding once daily.
                    Rates are estimates provided for your convenience only, and
                    by no means represent guaranteed returns.
                  </p>
                </div>
                <div className="mt-5 sm:mt-6 mb-2">
                  <a
                    target="_blank"
                    className="inline-flex justify-center w-full  px-4 py-2  text-base font-bold text-pink-primary"
                    href={link}
rel="noreferrer"
                  >
                    Get {name}
                    <ExternalLinkIcon
                      className="ml-3 -mr-1 h-5 w-5"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>{" "}
    </>
  );
}
