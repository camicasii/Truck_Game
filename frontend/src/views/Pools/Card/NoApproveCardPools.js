import clsx from "clsx";
import React from "react";
import Dropdown from "../../../components/Dropdown";
import ModalROI from "../../../components/ModalROI";


const NoApproveCardPools = ({ pool }) => (
  <>
    <div className={clsx("", pool.rainbow === true && "shadowRainbo")}>
      <div
        className={clsx(
          "bg-white dark:bg-gray-800 dark:text-gray-200 shadow-sm rounded-lg overflow-hidden sm:p-4 p-5 "
        )}
        index={pool.id}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-2 ">
          <div>
            <h1 className="text-gray-500 font-black text-xl ">
              {pool.name} pool
            </h1>
            <img src={pool.image} alt="lolli" className="w-20 rounded-full" />
          </div>
          <div>
            <div className="grid gap-1">
              <p className=" font-semibold   text-white bg-gray-200 text-center  py-2 px-3 rounded-full my-2">
                {" "}
                Harvest
              </p>
              <p className="font-semibold   text-white bg-gray-200 text-center  py-2 px-3 rounded-full">
                Compound
              </p>
            </div>
          </div>
        </div>
        <div className="grid  ">
          <div className="flex space-x-2 mt-2">
            <p className="font-black text-3xl text-gray-500 ">0.000</p>
            <p className="font-semibold text-sm text-blue-secondary mt-3">
              ($0.00)
            </p>
          </div>
        </div>

        <div className="text-pink-primary text-md font-semibold mt-1">
          LOLLI earned
        </div>

        <div className="  text-center justify-items-center justify-center mt-4 ">
          <button
            type="button"
            className="inline-flex items-center px-8 py-2 border border-transparent text-base font-bold rounded-full shadow-sm text-white bg-pink-primary  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Approve contract
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-2 mt-4 px-2">
          <div className="text-pink-primary text-md font-semibold">APR:</div>
          <div className="text-gray-500 text-md font-semibold flex space-x-2 justify-end">
            <p>{new Intl.NumberFormat().format(pool.APR)}%</p>
            <ModalROI ROI={pool.ROI} name={pool.name} link={"#"} />
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-2 mt-2 px-2">
          <p className="text-pink-primary text-md font-semibold">Your Stake:</p>
          <p className="text-gray-500 text-md font-semibold flex space-x-2 justify-end">
            {pool.yourStake}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-2 mt-2 px-2">
          <p className="text-pink-primary text-md font-semibold">
            Stake value:
          </p>
          <p className="text-gray-500 text-md font-semibold flex space-x-2 justify-end">
            $ {pool.stakeValue}
          </p>
        </div>
        <div className="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="flex-shrink-0 w-full inline-flex items-center justify-center py-2 rounded-full shadow-sm text-sm font-medium text-pink-500 border  border border-pink-400 sm:flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Core
          </div>
          <div className="flex-1 w-full inline-flex items-center justify-center">
            {" "}
            <Dropdown />
          </div>
        </div>
      </div>
    </div>
  </>
);
export default NoApproveCardPools;
