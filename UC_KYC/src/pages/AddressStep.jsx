// AddressStep.js
import React from 'react';
import { motion } from 'framer-motion';

export const AddressStep = ({ formData, handleInputChange, setStep }) => {
  const validateForm = () => {
    const { line1, city, state, zipCode } = formData.address;
    return line1 && city && state && zipCode;
  };

  return (
    <motion.div 
      className="max-w-lg mx-auto p-6 mt-16"
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '-100%' }}
    >
      <h2 className="text-2xl font-bold mb-4">Address Details</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Address Line 1 *"
          value={formData.address.line1}
          onChange={e => handleInputChange('address', 'line1', e.target.value)}
          className="w-full p-4 border rounded-lg bg-gray-50"
          required
        />
        <input
          type="text"
          placeholder="Address Line 2 (optional)"
          value={formData.address.line2}
          onChange={e => handleInputChange('address', 'line2', e.target.value)}
          className="w-full p-4 border rounded-lg bg-gray-50"
        />
        <input
          type="text"
          placeholder="City/District *"
          value={formData.address.city}
          onChange={e => handleInputChange('address', 'city', e.target.value)}
          className="w-full p-4 border rounded-lg bg-gray-50"
          required
        />
        <input
          type="text"
          placeholder="State/Province *"
          value={formData.address.state}
          onChange={e => handleInputChange('address', 'state', e.target.value)}
          className="w-full p-4 border rounded-lg bg-gray-50"
          required
        />
        <input
          type="text"
          placeholder="ZIP/Postal Code *"
          value={formData.address.zipCode}
          onChange={e => handleInputChange('address', 'zipCode', e.target.value)}
          className="w-full p-4 border rounded-lg bg-gray-50"
          required
        />
        <button
          onClick={()=>setStep(5)}
          disabled={!validateForm()}
          className={`w-full p-4 rounded-lg text-white transition-colors ${
            validateForm() ? 'bg-[#011452] hover:bg-[#0b33b8]' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};