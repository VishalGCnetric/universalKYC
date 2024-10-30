import React, { useState, useEffect, useRef } from 'react';
import { Camera, Upload, X, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Webcam from 'react-webcam';
import ReactCrop from 'react-image-crop';
import PassportLottie from './PassportGIF';
import LottieAnimation from './Idcardgif';
import logo from "../../public/uckyc.png"
const KYCApp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    consent: false,
    personalInfo: {
      firstName: '',
      middleName: '',
      lastName: '',
      phoneNumber: '',
      gender: ''
    },
    nationality: {
      country: '',
      dob: '',
      idType: '',
      idNumber: '',
      idIssueDate: '',
      idExpiryDate: '',
      issuingCountry: '',
      residenceCountry: ''
    },
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zipCode: ''
    },
    documents: {
      idPhoto: null,
      selfie: null
    }
  });

  const [countries, setCountries] = useState([]);
  const webcamRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [crop, setCrop] = useState({ unit: '%', width: 80, aspect: 16 / 9 });

  const pageVariants = {
    initial: {
      opacity: 0,
      x: '100%'
    },
    animate: {
      opacity: 1,
      x: 0
    },
    exit: {
      opacity: 0,
      x: '-100%'
    }
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

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setIsCameraOpen(false);
  };

  const handleCrop = (croppedImage) => {
    // Handle the cropped image
    setCapturedImage(croppedImage);
  };

  const Header = ({ title }) => (
    <motion.div 
      className="fixed top-0 left-0 right-0 bg-[#011452] text-white z-10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="max-w-lg mx-auto flex items-center p-4">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="mr-4 hover:bg-[#a5bfdb] p-2 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        <img src={logo} alt=""  className="h-10 m-2"/>
        <h1 className="text-2xl font-bold">UNIVERSAL KYC</h1>
      </div>
    </motion.div>
  );

  const ConsentStep = () => (
    <motion.div 
      className="max-w-lg mx-auto p-6 mt-16 "
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h2 className="text-4xl font-bold mb-4">Welcome to UNIVERSAL KYC program</h2>
      <p className="mb-6 text-2xl text-gray-600">
        Please read the <span className="text-[#011452]">terms</span> and click consent to continue.
        If you have submitted your documents, you can check your status.
      </p>
      <div className="flex gap-44 absolute bottom">
        <button
          onClick={() => {
            setFormData(prev => ({ ...prev, consent: true }));
            setStep(2);
          }}
          className="bg-[#011452] text-white px-8 py-3 rounded-lg hover:bg-[#0b33b8] transition-colors"
        >
          Consent
        </button>
        <button className="bg-gray-400 text-white px-8 py-3 rounded-lg hover:bg-gray-500 transition-colors">
          Deny
        </button>
      </div>
    </motion.div>
  );

  const PersonalInfoStep = () => (
    <motion.div 
      className="max-w-lg mx-auto p-6 mt-16"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
         <h2 className="text-2xl font-bold mb-4">Personal Info</h2>
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="First name"
            className="w-full p-4 border rounded-lg bg-gray-50"
            onChange={e => handleInputChange('personalInfo', 'firstName', e.target.value)}
          />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Middle name (optional)"
            className="w-full p-4 border rounded-lg bg-gray-50"
            onChange={e => handleInputChange('personalInfo', 'middleName', e.target.value)}
          />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Last name"
            className="w-full p-4 border rounded-lg bg-gray-50"
            onChange={e => handleInputChange('personalInfo', 'lastName', e.target.value)}
          />
        </div>
        <div className="relative">
          <input
            type="tel"
            placeholder="Telephone Number"
            className="w-full p-4 border rounded-lg bg-gray-50"
            onChange={e => handleInputChange('personalInfo', 'phoneNumber', e.target.value)}
          />
        </div>
        <div className="relative">
          <select
            className="w-full p-4 border rounded-lg bg-gray-50 appearance-none"
            onChange={e => handleInputChange('personalInfo', 'gender', e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <motion.button
          onClick={() => setStep(3)}
          className="w-full bg-[#011452] text-white p-4 rounded-lg hover:bg-[#011452] transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  );

  const DocumentCaptureStep = () => {
    return (
      <motion.div 
        className="max-w-lg mx-auto p-6 mt-16"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">AADHAAR CARD</h3>
            <p className="text-sm text-gray-600 mb-4">
              Please make sure that the document is clearly visible without any glare or shadows.
              Crop the document to show only the info page.
            </p>
          </div>

          <AnimatePresence>
            {isCameraOpen ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative"
              >
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full rounded-lg"
                />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                  <motion.button
                    onClick={capture}
                    className="bg-[#007AFE] text-white p-4 rounded-full"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Camera className="w-6 h-6" />
                  </motion.button>
                  <motion.button
                    onClick={() => setIsCameraOpen(false)}
                    className="bg-red-500 text-white p-4 rounded-full"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {capturedImage ? (
                  <div className="relative">
                    <img src={capturedImage} alt="Captured" className="w-full rounded-lg" />
                    <motion.button
                      onClick={() => setCapturedImage(null)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                ) : (
                  <><PassportLottie/>
                  <LottieAnimation/>
                    <motion.button
                      onClick={() => setIsCameraOpen(true)}
                      className="w-full bg-[#007AFE] text-white p-6 rounded-lg flex items-center justify-center gap-3"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                                    

                      <Camera className="w-6 h-6" />
                      Take Photos
                    </motion.button>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="file-upload"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setCapturedImage(reader.result);
                          };
                          if (file) {
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <motion.label
                        htmlFor="file-upload"
                        className="w-full bg-gray-100 text-gray-600 p-6 rounded-lg flex items-center justify-center gap-3 cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Upload className="w-6 h-6" />
                        Upload from device
                      </motion.label>
                    </div>
                  </>
                )}
                {capturedImage && (
                  <motion.button
                    onClick={() => setStep(6)}
                    className="w-full bg-[#007AFE] text-white p-4 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Next
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };

  // Similar structure for other steps...

  const NationalityStep = () => (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 mt-10">Nationality</h2>
      <div className="space-y-4">
        <select
          className="w-full p-2 border rounded"
          onChange={e => handleInputChange('nationality', 'country', e.target.value)}
        >
          <option value="">Select Nationality</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        <input
          type="date"
          className="w-full p-2 border rounded"
          onChange={e => handleInputChange('nationality', 'dob', e.target.value)}
        />
        <select
          className="w-full p-2 border rounded"
          onChange={e => handleInputChange('nationality', 'idType', e.target.value)}
        >
          <option value="">Select ID Type</option>
          <option value="passport">Passport</option>
          <option value="dl">Driving License</option>
          <option value="aadhaar">Aadhaar Card</option>
        </select>
        <input
          type="text"
          placeholder="ID Number"
          className="w-full p-2 border rounded"
          onChange={e => handleInputChange('nationality', 'idNumber', e.target.value)}
        />
        {['passport', 'dl'].includes(formData.nationality.idType) && (
          <input
            type="date"
            placeholder="ID Expiry Date"
            className="w-full p-2 border rounded"
            onChange={e => handleInputChange('nationality', 'idExpiryDate', e.target.value)}
          />
        )}
        <button
          onClick={() => setStep(4)}
          className="w-full bg-[#011452] text-white px-6 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
  const AddressStep = () => (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 mt-10">Address</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Address Line 1"
          className="w-full p-2 border rounded"
          onChange={e => handleInputChange('address', 'line1', e.target.value)}
        />
        <input
          type="text"
          placeholder="Address Line 2 (optional)"
          className="w-full p-2 border rounded"
          onChange={e => handleInputChange('address', 'line2', e.target.value)}
        />
        <input
          type="text"
          placeholder="City/District/Municipality"
          className="w-full p-2 border rounded"
          onChange={e => handleInputChange('address', 'city', e.target.value)}
        />
        <input
          type="text"
          placeholder="State/Province/County"
          className="w-full p-2 border rounded"
          onChange={e => handleInputChange('address', 'state', e.target.value)}
        />
        <input
          type="text"
          placeholder="Zip Code"
          className="w-full p-2 border rounded"
          onChange={e => handleInputChange('address', 'zipCode', e.target.value)}
        />
        <button
          onClick={() => setStep(5)}
          className="w-full bg-[#011452] text-white px-6 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
  
  const SelfieStep = () => {
    const [showCamera, setShowCamera] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const handleCapture = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
          handleInputChange('documents', 'selfie', reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <div className="max-w-lg mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Take Selfie</h2>
        <div className="space-y-4">
          {previewImage ? (
            <div className="relative">
              <img src={previewImage} alt="Preview" className="w-full rounded" />
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded"
              >
                Retake
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => setShowCamera(true)}
                className="w-full bg-[#011452] text-white px-6 py-4 rounded flex items-center justify-center gap-2"
              >
                <Camera className="w-6 h-6" />
                Take Selfie
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleCapture}
                className="w-full"
              />
            </div>
          )}
          {previewImage && (
            <button
              onClick={() => console.log('KYC Complete:', formData)}
              className="w-full bg-[#011452] text-white px-6 py-2 rounded"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    );
  };

  const steps = {
    1: { component: <ConsentStep />, title: "Consent" },
    2: { component: <PersonalInfoStep />, title: "Personal Info" },
    3: { component: <NationalityStep />, title: "Nationality" },
    4: { component: <AddressStep />, title: "Address" },
    5: { component: <DocumentCaptureStep />, title: "Document Capture" },
    6: { component: <SelfieStep />, title: "Take Selfie" }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title={steps[step].title} />
      <div mode="wait" className="relative pt-10">
        {steps[step].component}
      </div>
      
      <motion.div 
        className="fixed bottom-0 left-0 right-0  p-4 bg-white border-t"
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