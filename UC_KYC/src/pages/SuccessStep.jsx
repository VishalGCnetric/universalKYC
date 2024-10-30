import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';
import successAnimation from './Success.json';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SuccessStep = () => {
  const [showText, setShowText] = useState(false);
const navigate=useNavigate();
  useEffect(() => {
    // Show text after a short delay
    const timer = setTimeout(() => {
      setShowText(true);
    }, 1000); // Adjust delay time based on animation length
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col mt-40 items-center justify-center text-center p-6">
      <Lottie
      
        loop={true}
        animationData={successAnimation}
        play
        style={{ width: 150, height: 150 }}
      />
      {showText && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-6"
        >
          <h2 className="text-2xl font-semibold text-green-600">Thank You For Registering With Us!!</h2>
          <p className="text-gray-600 mt-2">
          Your details are submitted successfully.
          <br />
          Please check after some time for your KYC status.
          </p>
          <button
        onClick={()=>navigate("/")}
        className="flex-1 bg-[#011452] text-white px-8 py-3 mt-8 rounded-lg hover:bg-[#0b33b8] transition-colors"
      >
        Go To Home
      </button>
        </motion.div>
      )}
    </div>
  );
};

export default SuccessStep;
