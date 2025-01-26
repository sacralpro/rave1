"use client";

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
      className="fixed inset-0 bg-black bg-opacity-100 z-[3330]"
    >
      <motion.div
        variants={exitVariants}
        initial="visible"
        animate="visible"
        className="absolute inset-0 flex justify-center items-center"
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
          className="text-center p-8 rounded-lg"
        >
          <motion.h2 className="text-2xl font-bold mb-4" variants={textVariants} initial="hidden" animate="visible">
            Experience the RAVE - A Minimal Techno Masterpiece
          </motion.h2>
          
          <img 
            src="/path/to/image.jpg" 
            alt="Audentity Ghost live performance at a minimal techno rave" 
            className="rounded-lg hidden mb-4" 
          />

          <motion.p className="text-gray-400 mb-6 max-w-[600px] text-xl leading-[2.4]" variants={textVariants} initial="hidden" animate="visible">
            Discover the mystical Sacral DJ remix of <strong>RAVE</strong> by rising techno star <strong>Audentity Ghost</strong>! Exclusively available on <a className="underline" href="https://sacraltrack.store" target="_blank" rel="noopener noreferrer">Sacral Track</a> and released on the legendary <strong>IDALL Lab</strong>. This remix delivers a powerful minimal techno sound, captivating listeners with magnificent synths, deep basslines, and ethereal vocals. Immerse yourself in the underground vibes of the minimal techno scene and let the music take over your soul!
          </motion.p>

          <motion.div variants={buttonVariants} initial="hidden" animate="visible" className="flex flex-wrap gap-4 justify-center">
            <a href="https://sacraltrack.store" target="_blank" rel="noopener noreferrer" className="rounded-2xl underline text-white font-bold py-3 px-4 focus:outline-none">
              Go to Sacral Track
            </a>
            <a href="https://soundcloud.com/audentityghost" target="_blank" rel="noopener noreferrer" className="underline text-white font-bold py-3 px-4 rounded-2xl focus:outline-none">
              Follow Audentity Ghost
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Popup;
