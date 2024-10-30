import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from "../../public/uckyc.png";

const Header = ({ step, setStep }) => (
  <motion.div className="fixed top-0 left-0 right-0 bg-[#011452] text-white z-10" initial={{ y: -100 }} animate={{ y: 0 }}>
    <div className="max-w-lg mx-auto flex items-center p-4">
      {step > 1 && (
        <button onClick={() => setStep(step - 1)} className="mr-4 hover:bg-[#a5bfdb] p-2 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      <img src={logo} alt="Logo" className="h-10 m-2" />
      <h1 className="text-2xl font-bold">UNIVERSAL KYC</h1>
    </div>
  </motion.div>
);

export default Header;
