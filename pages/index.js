import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import TopNav from "@/components/TopNav";
import { motion, AnimatePresence } from "framer-motion";
//import AudioPlayer from "@/components/AudioPlayer";
import getStripe from "@/libs/getStripe";
import dynamic from "next/dynamic";


export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const AudioPlayer = dynamic(() => import('@/components/AudioPlayer'), { ssr: false });


  const handlePayment = async () => {
    try {
      const stripe = await getStripe(); // Убедитесь, что это разрешается
      if (!stripe) {
        throw new Error("Stripe not initialized."); // Проверяем, что Stripe правильно инициализирован.
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
      alert('Payment failed. Please check the console for details.'); // Показать сообщение об ошибке
    }
  };
  


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);



  return (
    <div className=" " >
      <Head>
        <title>AUDENTITY GHOST</title>
        <meta name="description" content="POWERFUL MINIMAL-TECHNO TRACK BY AUDENTITY GHOST REMIXED BY SACRAL DJ" />
        <meta name="keywords" content="sacral dj, rave, audentity ghost, minimalist techno, electronic music, dj gig, booking, music album, sasha, alexandr shaginov, idall lab, sacral track, rave, its rave, it's rave, idalllab" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="RAVE BY AUDENTITY GHOST" />
        <meta property="og:description" content="Must have super powerful minimal-techno remix by Sacral dJ for great sound producer Audentity Ghost!" />
        <meta property="og:image" content="/images/preview.png" />
        <meta property="og:url" content="https://ravers.vercel.app/" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>



     

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
          <TopNav setMenuOpen={setMenuOpen} />
        </motion.div>


        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut", delay: 1.4 } },
          }}
          className="flex w-full flex-col justify-top mt-[12.5%] items-center h-full absolute z-[60]" // Increased z-index
        >
          <p className="text-white text-3xl mb-5 md:mt-0 mt-[50px]">AUDENTITY GHOST</p>
          <h1 className="text-white text-5xl font-bold mt-[80px] md:mt-[0px] mb-4">RAVE</h1>
          <h2 className="text-white text-xl mb-8 mt-[0px]">REMIX BY SACRAL DJ</h2>


          <button
          onClick={handlePayment}
          className="rounded-2xl px-8 py-3 mt-5 bg-black bg-opacity-30 text-white border-2 border-pink-500 shadow-md hover:shadow-pink-500/50 active:scale-95"
          style={{ transition: "transform 0.2s ease" }}
        >
          GET IT RAVE!
        </button>

        </motion.div>

      
      <div className="absolute z-[-1] back h-screen w-screen bg-[#030504] flex justify-center items-center md:mt-0 mt-[180px]">
      <img src="/images/back.jpg" alt="back" className="md:w-[60vw] md:mt-[100px] mt-0 w-full h-full object-cover opacity-93" />
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
    </div>
  );
}
