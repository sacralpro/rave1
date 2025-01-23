import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const TopNav = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="relative z-1020" ref={navRef}>
      <motion.div
        className="fixed top-0 left-0 pl-[30px] pr-[40px] w-full z-[2000] bg-transparent"
      >
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a className="cursor-pointer" href="https://sacraltrack.store">
              <div className="flex items-center">
                <img src="/images/st.png" alt="SACRAL TRACK" className="h-6 w-6 hidden md:block mr-2" />
                <span className="text-white ml-2 hidden md:block">SACRAL TRACK</span>
                <img src="/images/st.png" alt="SACRAL TRACK" className="h-6 w-6 md:hidden" />
              </div>
            </a>
          </div>

          <div className="text-center text-white ml-8 md:ml-[-120px]">
            <a href="/about" className="underline">about</a>
          </div>

      

          <a href="https://idalllab.webflow.io/" target="_blank" rel="noopener noreferrer">                
         {/* <span className="text-white hidden md:block">Idall Lab</span> */}

      <div className="relative w-8 h-8 rounded-full mr-3 mt-[-24px]">
        <img
          src="/images/idall.png"
          alt="Idall Lab Logo"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full cursor-pointer"
          style={{ animation: "rotate 10s linear infinite" }}
        />
      </div>
    </a>
         
        </div>
      </motion.div>
    </div>
  );
};

export default TopNav;
