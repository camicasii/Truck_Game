import React from "react";
import farmsData from "./farmsData";
import NoApproveCardFarm from "./NoApproveCardFarm";
import ApproveCardFarm from "./ApproveCardFarm";
import { motion } from 'framer-motion';

const FarmsCardGrid = ({ searchTerm }) => {
  const data = farmsData.map((farm) => {
      return (
        <ApproveCardFarm pool={farm} />
      )    });

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"    >
          {data} 
        </motion.div>
      </div>
    </>
  );
};

export default FarmsCardGrid;
