import * as React from 'react'
import { motion } from "framer-motion";
const IndexHome = () => {
  

  const childVariants = {
    initial: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <div className="hero-headline flex flex-col items-center justify-center  text-center z-20 mb-24">
  
          <img
            alt="card img"
            className="rounded-t z-10 w-[300px] lg:-mt-3"
            src="/header.png"
          />

        <motion.div className="md:w-5/6 max-w-2xl flex flex-col justify-center mt-4"  initial="initial"
            animate="visible"
            variants={{
              initial: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}>
          <motion.div className="text-xl font-bold text-white z-10" variants={childVariants}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.           </motion.div>
        

        </motion.div>
      </div>
    </>
  );
};
export default IndexHome;
