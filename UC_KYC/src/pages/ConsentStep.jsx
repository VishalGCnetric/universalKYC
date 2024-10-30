import React from 'react';
import { motion } from 'framer-motion';

export const ConsentStep = ({ setStep, }) => (
  <motion.div 
    className="max-w-lg mx-auto p-6 mt-20 mb-10"
    initial={{ opacity: 0, x: '100%' }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: '-100%' }}
  >
    <h2 className="text-4xl text-center font-bold mb-4">Welcome to
        <br />
         Universal KYC program</h2>
    <div className="bg-white p-6 my-8 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-semibold mb-4">Terms and Conditions</h3>
      <div className="prose prose-sm mb-8">
        <p>By proceeding, you agree to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Share your personal information for verification</li>
          <li>Allow secure storage of your documents</li>
          <li>Permit verification checks against provided information</li>
          <li>Receive updates about your KYC status</li>
        </ul>
      </div>
    </div>
    <div className="flex gap-4">
      <button
        onClick={()=>setStep(2)}
        className="flex-1 bg-[#011452] text-white px-8 py-3 rounded-lg hover:bg-[#0b33b8] transition-colors"
      >
        I Agree & Continue
      </button>
      <button 
        className="flex-1 bg-gray-400 text-white px-8 py-3 rounded-lg hover:bg-gray-500 transition-colors"
      >
        Decline
      </button>
    </div>
  </motion.div>
);