import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';
import successAnimation from './passport.json';
import { motion } from 'framer-motion';

const SuccessStep = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Show text after a short delay
    const timer = setTimeout(() => {
      setShowText(true);
    }, 2000); // Adjust delay time based on animation length
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center p-6">
      <Lottie
        loop={false}
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
          <h2 className="text-2xl font-semibold text-green-600">Details Submitted Successfully!</h2>
          <p className="text-gray-600 mt-2">
            You will receive a response soon.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default SuccessStep;
