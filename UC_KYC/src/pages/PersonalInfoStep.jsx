import React from 'react';
import { motion } from 'framer-motion';

export const PersonalInfoStep = ({ formData, handleInputChange, setStep }) => {
  const validateForm = () => {
    const { firstName, lastName, phoneNumber, gender } = formData.personalInfo;
    return firstName && lastName && phoneNumber && gender;
  };

  return (
    <motion.div 
      className="max-w-lg mx-auto p-6 mt-16"
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '-100%' }}
    >
      <h2 className="text-4xl text-center py-2 font-bold mb-4">Personal Information</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="First Name *"
          value={formData.personalInfo.firstName}
          onChange={e => handleInputChange('personalInfo', 'firstName', e.target.value)}
          className="w-full p-4 border rounded-lg bg-gray-50"
          required
        />
        <input
          type="text"
          placeholder="Middle Name (optional)"
          value={formData.personalInfo.middleName}
          onChange={e => handleInputChange('personalInfo', 'middleName', e.target.value)}
          className="w-full p-4 border rounded-lg bg-gray-50"
        />
        <input
          type="text"
          placeholder="Last Name *"
          value={formData.personalInfo.lastName}
          onChange={e => handleInputChange('personalInfo', 'lastName', e.target.value)}
          className="w-full p-4 border rounded-lg bg-gray-50"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number *"
          value={formData.personalInfo.phoneNumber}
          onChange={e => handleInputChange('personalInfo', 'phoneNumber', e.target.value)}
          className="w-full p-4 border rounded-lg bg-gray-50"
          required
        />
        <select
          value={formData.personalInfo.gender}
          onChange={e => handleInputChange('personalInfo', 'gender', e.target.value)}
          className="w-full p-4 border rounded-lg bg-gray-50"
          required
        >
          <option value="">Select Gender *</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <button
          onClick={()=>setStep(3)}
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