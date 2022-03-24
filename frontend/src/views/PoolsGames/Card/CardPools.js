import React from "react";
import ApproveCardPoolsGames from "./ApproveCardPoolsGames";
import NoApproveCardPoolsGames from "./NoApproveCardPoolsGames";
import poolsData from "./poolsGamesData";
import { motion } from "framer-motion";

const CardPools = ({ searchTerm }) => {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-12 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {poolsData
            .filter((pool) => {
              if (searchTerm === "") {
                return pool;
              } else if (
                pool.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return pool;
              }
            })
            .map((pool) => {
              return true ? (
                <ApproveCardPoolsGames pool={pool} />
              ) : (
                <NoApproveCardPoolsGames pool={pool} />
              );
            })}
        </motion.div>
      </div>
    </>
  );
};
export default CardPools;
