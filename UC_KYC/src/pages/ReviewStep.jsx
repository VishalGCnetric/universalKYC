import React from 'react';
import { motion } from 'framer-motion';
import { Edit2 } from 'lucide-react';

export const ReviewStep = ({ formData, onEdit, setStep }) => {
  const sections = [
    {
      title: 'Personal Information',
      step: 2,
      data: [
        { label: 'Name', value: `${formData.personalInfo.firstName} ${formData.personalInfo.middleName} ${formData.personalInfo.lastName}` },
        { label: 'Phone', value: formData.personalInfo.phoneNumber },
        { label: 'Gender', value: formData.personalInfo.gender }
      ]
    },
    {
      title: 'Nationality & Identity',
      step: 3,
      data: [
        { label: 'Country', value: formData.nationality.country },
        { label: 'Date of Birth', value: formData.nationality.dob },
        { label: 'ID Type', value: formData.nationality.idType },
        { label: 'ID Number', value: formData.nationality.idNumber },
        { label: 'ID Issue Date', value: formData.nationality.idIssueDate },
        ...(formData.nationality.idExpiryDate && formData.nationality.idType !== 'pan' && formData.nationality.idType !== 'voterid'
          ? [{ label: 'ID Expiry Date', value: formData.nationality.idExpiryDate }]
          : []
        ),
        { label: 'Issuing Country', value: formData.nationality.issuingCountry },
        { label: 'Residence Country', value: formData.nationality.residenceCountry }
      ]
    },
    {
      title: 'Address',
      step: 4,
      data: [
        { label: 'Address', value: `${formData.address.line1} ${formData.address.line2}` },
        { label: 'City', value: formData.address.city },
        { label: 'State', value: formData.address.state },
        { label: 'ZIP Code', value: formData.address.zipCode }
      ]
    }
  ];

  return (
    <motion.div 
      className="max-w-lg mx-auto p-6 mt-16"
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '-100%' }}
    >
      <h2 className="text-4xl text-center py-2 font-bold mb-4">Review Information</h2>
      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg">{section.title}</h3>
              <button
                onClick={() =>setStep(section.step)}
                className="text-[#011452] hover:text-[#0b33b8] flex items-center gap-1"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            </div>
            <div className="space-y-2">
              {section.data.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.label}:</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={() => setStep(6)}
          className="w-full p-4 bg-[#011452] text-white rounded-lg hover:bg-[#0b33b8] transition-colors"
        >
          Confirm & Continue
        </button>
      </div>
    </motion.div>
  );
};
