import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import TopNav from "@/components/TopNav";
import { motion, AnimatePresence } from "framer-motion";
import getStripe from "@/libs/getStripe";
import dynamic from "next/dynamic";
import Popup from '@/components/About'; // Adjust path as needed
import YandexMetrika from '@/components/YandexMetrika'; // Make sure the path is correct based on your structure.
import Lottie from 'lottie-react';
import animationData from '@/public/lottie/btn.json';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const AudioPlayer = dynamic(() => import('@/components/AudioPlayer'), { ssr: false });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hovering, setHovering] = useState(false);


  const handlePayment = async () => {
    try {
      const stripe = await getStripe();
      if (!stripe) {
        throw new Error("Stripe not initialized.");
      }

      const cartItems = [
        {
          name: "Album",
          price: 1.8,
          quantity: 1,
          description: "Full length(6:10) WAV remix from Sacral dJ for Audentity Ghost! It's RAVE!",
        },
      ];

      const response = await fetch('/api/checkout-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || `HTTP error! status: ${response.status}`;
        console.error("Error:", errorMessage);
        throw new Error(errorMessage);
      }

      const { sessionId } = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        throw new Error(`Stripe error: ${result.error.message}`);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please check the console for details.');
    }
  };

  const handleAboutClick = () => {
    setIsPopupOpen(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => {
    setHovering(true);
    // Start a timer to play the animation after 1 second
    animationTimeout = setTimeout(() => {
      setPlayAnimation(true);
    }, 3000);
  };




  return (
    <div>
      <Head>
        <title>Experience the Best in Minimal Techno | Audentity Ghost</title>
        <meta name="description" content="Discover powerful minimal techno tracks by Audentity Ghost, remixed by Sacral DJ. Join the rave scene now!" />
        <meta name="keywords" content="minimal techno, electronic music, rave music, Sacral DJ, Audentity Ghost, techno remix, club music, dance music, electronic dance, minimal beats, DJ sets, underground music" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="RAVE BY AUDENTITY GHOST - Minimal Techno Remix" />
        <meta property="og:description" content="Dive into the powerful sounds of minimal techno with this remix by Sacral DJ. Perfect for your next rave!" />
        <meta property="og:image" content="/images/back.png" />
        <meta property="og:url" content="https://ravers.vercel.app/" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <YandexMetrika enabled={true} /> {/* Add Yandex Metrika here */}

      <AnimatePresence>
        {isLoading && (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#030504] flex justify-center items-center z-50"
          >
            <img src="/preloader.gif" alt="Loader" className="w-50" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut", delay: 1 } },
        }}
      >
        <motion.div
          variants={{
            hidden: { y: -50, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeInOut", delay: 1.2 } },
          }}
          className="fixed w-full top-0 z-50"
        >
          <TopNav onAboutClick={handleAboutClick} />
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut", delay: 1.4 } },
          }}
          className="flex w-full flex-col justify-top mt-[12.5%] items-center h-full absolute z-[60]"
        >
          <p className="text-white text-3xl mb-5 md:mt-0 mt-[50px]">AUDENTITY GHOST</p>
          <h1 className="text-white text-5xl font-bold mt-[80px] md:mt-[0px] mb-4">RAVE</h1>
          <h2 className="text-white text-xl mb-8 mt-[0px]">REMIX BY SACRAL DJ</h2>

          <button
          onClick={handlePayment}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className={`relative rounded-3xl px-9 py-4 mt-5 bg-black bg-opacity-30 text-white border-2 border-pink-500 shadow-md focus:outline-none ${hovering ? 'ring-2 ring-pink-500 ring-offset-2 ring-offset-pink-100' : ''}`}
          style={{ transition: "transform 0.4s ease, box-shadow 0.3s ease" }}
        >
          {hovering && (
            <div className="absolute inset-0 z-10">
              <Lottie
                animationData={animationData}
                loop={true}
                play
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }} // Full coverage
              />
            </div>
          )}
          <span className="relative">GET IT RAVE!</span>
        </button>


        </motion.div>

        <div className="absolute z-[-1] back h-screen w-screen bg-[#030504] flex justify-center items-center md:mt-0 mt-[180px]">
          <img src="/images/back.jpg" alt="Background" className="md:w-[60vw] md:mt-[100px] mt-0 w-full h-full object-cover opacity-93" />
        </div>

        <motion.div
          variants={{
            hidden: { y: 50, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeInOut", delay: 1.6 } },
          }}
          className="w-full flex justify-center items-end p-4 mt-6 z-100"
        >
          {!menuOpen && <AudioPlayer />}
        </motion.div>
      </motion.div>
      
      {isPopupOpen && <Popup onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
}