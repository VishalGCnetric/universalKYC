import React from 'react';
import { motion } from 'framer-motion';

export const NationalityStep = ({ formData, handleInputChange, countries, setStep }) => {
  const validateForm = () => {
    const { country, dob, idType, idNumber, idIssueDate, issuingCountry, residenceCountry } = formData.nationality;
    return country && dob && idType && idNumber && idIssueDate && issuingCountry && residenceCountry;
  };

  return (
    <motion.div 
      className="max-w-lg mx-auto p-6 mt-16"
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '-100%' }}
    >
      <h2 className="text-4xl text-center py-2 font-bold mb-4">Nationality & Identity</h2>
      <div className="space-y-4">
        
        {/* Nationality Selection */}
        <select
          value={formData.nationality.country}
          onChange={e => handleInputChange('nationality', 'country', e.target.value)}
          className="w-full p-4 border rounded-lg bg-gray-50"
          required
        >
          <option value="">Select Nationality *</option>
          {countries?.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Date of Birth *</label>
          <input
            type="date"
            value={formData.nationality.dob}
            onChange={e => handleInputChange('nationality', 'dob', e.target.value)}
            className="w-full p-4 border rounded-lg bg-gray-50"
            required
          />
        </div>

        {/* ID Type Selection */}
        <select
          value={formData.nationality.idType}
          onChange={e => handleInputChange('nationality', 'idType', e.target.value)}
          className="w-full p-4 border rounded-lg bg-gray-50"
          required
        >
          <option value="">Select ID Type *</option>
          <option value="passport">Passport</option>
          <option value="dl">Driving License</option>
          <option value="aadhaar">Aadhaar Card</option>
          <option value="pan">PAN Card</option>
          <option value="voterid">Voter ID</option>
        </select>

        {/* ID Number */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">ID Number *</label>
        <input
          type="text"
          placeholder={`${formData.nationality.idType || "ID"} Number *`}
          value={formData.nationality.idNumber}
          onChange={e => handleInputChange('nationality', 'idNumber', e.target.value)}
          className="w-full p-4 border rounded-lg bg-gray-50"
          required
        />
</div>
        {/* Issue Date */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">ID Issue Date *</label>
          <input
            type="date"
            value={formData.nationality.idIssueDate}
            onChange={e => handleInputChange('nationality', 'idIssueDate', e.target.value)}
            className="w-full p-4 border rounded-lg bg-gray-50"
            required
          />
        </div>

        {/* Conditional Expiry Date */}
        {['passport', 'dl'].includes(formData.nationality.idType) && (
          <div>
            <label className="block text-sm text-gray-600 mb-1">ID Expiry Date *</label>
            <input
              type="date"
              value={formData.nationality.idExpiryDate}
              onChange={e => handleInputChange('nationality', 'idExpiryDate', e.target.value)}
              className="w-full p-4 border rounded-lg bg-gray-50"
              required
            />
          </div>
        )}

        {/* Issuing Country */}
        <select
          value={formData.nationality.issuingCountry}
          onChange={e => handleInputChange('nationality', 'issuingCountry', e.target.value)}
          className="w-full p-4 border rounded-lg bg-gray-50"
          required
        >
          <option value="">Select Issuing Country *</option>
          {countries?.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        {/* Residence Country */}
        <select
          value={formData.nationality.residenceCountry}
          onChange={e => handleInputChange('nationality', 'residenceCountry', e.target.value)}
          className="w-full p-4 border rounded-lg bg-gray-50"
          required
        >
          <option value="">Select Residence Country *</option>
          {countries?.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        {/* Next Button */}
        <button
          onClick={() => setStep(4)}
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
