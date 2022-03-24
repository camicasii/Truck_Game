import React from "react";
import clsx from "clsx";
import ButtonPopover from "../ButtonPopover";
import ModalROI from "../../../components/ModalROI";
import Dropdown from "../../../components/Dropdown";

const NoApproveCardFarm = ({ farm }) => (
  <>
    <div
      key={farm.id}
      className={clsx("", farm.rainbow === true && "shadowRainbo")}
    >
      <div
        className={clsx(
          "bg-white dark:bg-gray-800 dark:text-gray-200 shadow-sm rounded-lg overflow-hidden sm:p-3 p-5 "
        )}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-2  flex items-center">
          <div>
            <img
              src={farm.image || "/farm/Grupo_15891.svg"}
              className="w-20"
              alt="lolli"
            />
          </div>
          <div>
            <h1 className="text-gray-500 font-bold text-[18px] text-right">
              {farm.name}
            </h1>
            <div className="flex justify-end">
              <span className="  inline-flex shadow-sm rounded-md">
                <ButtonPopover />
                <button
                  type="button"
                  className="-ml-px  inline-flex items-center px-4 py-2 rounded-full  bg-pink-primary text-sm font-bold text-white "
                >
                  {farm.distribution}x
                </button>
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-2 ">
          <div className="text-gray-500 text-md font-semibold">APR</div>
          <div className="text-gray-500 text-md font-semibold flex space-x-2 justify-end">
            <p>{new Intl.NumberFormat().format(farm.APR)}%</p>{" "}
            <ModalROI ROI={farm.ROI} name={farm.name} link={"#"} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-2 mt-2">
          <div className="text-gray-500 text-md font-semibold">Earn</div>
          <div className="text-gray-500 text-md font-semibold flex space-x-2 justify-end">
            <p>LOLLI</p>
          </div>
        </div>
        <div className="flex space-x-2 mt-2">
          <p className="font-semibold text-sm text-pink-primary">LOLLI</p>
          <p className="font-semibold text-sm text-gray-500">EARNED</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-2 mt-2">
          <div className="text-gray-500 text-md font-semibold px-3 py-2">
            {farm.earned}
          </div>
          <div className="text-gray-500 text-md font-semibold flex space-x-2 justify-end">
            <button type="button" className="px-8 py-3 text-white text-sm bg-gray-300  rounded-full transition-all ease-in-out duration-150">
              Harvest
            </button>{" "}
          </div>
        </div>
        <div className="flex space-x-2 mt-2">
          <p className="font-semibold text-sm text-pink-primary">
            {farm.name} LP
          </p>
          <p className="font-semibold text-sm text-gray-500">STAKED</p>
        </div>
        <div className="  text-center justify-items-center justify-center mt-4 ">
          <button
            type="button"
            className="inline-flex items-center px-8 py-2 border border-transparent text-base font-bold rounded-full shadow-sm text-white bg-pink-primary  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Approve contract
          </button>
        </div>

        <Dropdown />
      </div>
    </div>
  </>
);
export default NoApproveCardFarm;
