import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  const controls = useAnimation();

  React.useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    });
  }, [controls]);

  const popupVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut", delay: 0.2 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut", delay: 0.4 } },
  };

  const exitVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  return (
    <motion.div
      variants={popupVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="fixed inset-0 bg-black bg-opacity-100 z-[3330]" // Removed flex and items-center
    >
      <motion.div
        variants={exitVariants}
        initial="visible"
        animate="visible"
        className="absolute inset-0 flex justify-center items-center" // Absolute positioning for centering
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-800 focus:outline-none"
        >
          <FaTimes size={20} />
        </button>

        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-center p-8 rounded-lg" // Removed bg-white and shadow
        >
          <motion.h2 className="text-2xl font-bold mb-4" variants={textVariants} initial="hidden" animate="visible">
            Remix on the RAVE
          </motion.h2>
          <motion.p className="text-gray-400 mb-6 max-w-[600px] text-xl leading-[2.4]" variants={textVariants} initial="hidden" animate="visible">
            A mystical Sacral dJ remix of RAVE by rising techno star Audentity Ghost. Exclusively available on Sacral Track and released on the legendary IDALL Lab label. RAVE delivers a powerful minimal techno sound, captivating listeners with its synths and ethereal vocals.
          </motion.p>

          <motion.div variants={buttonVariants} initial="hidden" animate="visible" className="flex flex-wrap gap-4 justify-center">
            <a href="https://sacraltrack.store" target="_blank" rel="noopener noreferrer" className="rounded-2xl underline text-white font-bold py-3 px-4 focus:outline-none">
              Go Sacral Track
            </a>
            <a href="https://soundcloud.com/audentityghost" target="_blank" rel="noopener noreferrer" className="underline text-white font-bold py-3 px-4 rounded-2xl focus:outline-none">
              Audentity Ghost
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Popup;
