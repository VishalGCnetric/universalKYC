import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import { ConsentStep } from './ConsentStep';
import { PersonalInfoStep } from './PersonalInfoStep';
import { NationalityStep } from './NationalityStep';
import { AddressStep } from './AddressStep';
import { ReviewStep } from './ReviewStep';
import { DocumentCaptureStep } from './CaptureDoc';
import SelfieStep from './SelfieStep';
import SuccessStep from './SuccessStep';

const KYCApp = () => {
  const [step, setStep] = useState(1);
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    consent: false,
    personalInfo: { firstName: '', middleName: '', lastName: '', phoneNumber: '', gender: '' },
    nationality: { country: '', dob: '', idType: '', idNumber: '', idIssueDate: '', idExpiryDate: '', issuingCountry: '', residenceCountry: '' },
    address: { line1: '', line2: '', city: '', state: '', zipCode: '' },
    documents: { idPhoto: null, selfie: null, idType: 'passport' }
  });

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(data => {
        const sortedCountries = data
          .map(country => country.name.common)
          .sort();
        setCountries(sortedCountries);
      });
  }, []);

  useEffect(() => {
    // Scroll to top on every step change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const steps = [
    { id: 1, component: <ConsentStep setStep={setStep} setFormData={setFormData} /> },
    { id: 2, component: <PersonalInfoStep setStep={setStep} formData={formData} handleInputChange={handleInputChange} /> },
    { id: 3, component: <NationalityStep setStep={setStep} countries={countries} formData={formData} handleInputChange={handleInputChange} /> },
    { id: 4, component: <AddressStep setStep={setStep} formData={formData} handleInputChange={handleInputChange} /> },
    { id: 5, component: <ReviewStep setStep={setStep} formData={formData} /> },
    { id: 6, component: <DocumentCaptureStep setStep={setStep} formData={formData} setFormData={setFormData} /> },
    { id: 7, component: <SelfieStep setStep={setStep} formData={formData} setFormData={setFormData} /> },
    { id: 8, component: <SuccessStep /> }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header step={step} setStep={setStep} />
      <AnimatePresence mode="wait">
        {steps.map(s => s.id === step && (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
          >
            {s.component}
          </motion.div>
        ))}
      </AnimatePresence>
      <motion.div 
        className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
      >
        <div className="max-w-lg mx-auto flex justify-center space-x-2">
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={i}
              className={`h-2 w-2 rounded-full ${i + 1 === step ? 'bg-[#011452]' : 'bg-gray-200'}`}
              animate={{ scale: i + 1 === step ? 1.2 : 1 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default KYCApp;
