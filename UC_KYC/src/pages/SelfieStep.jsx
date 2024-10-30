import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const SelfieStep = ({ setStep, formData, setFormData }) => {
  const webcamRef = useRef(null);
  const [selfie, setSelfie] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const captureSelfie = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSelfie(imageSrc);
    setIsCapturing(true);
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        selfie: imageSrc
      }
    }));
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-16 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Capture Selfie</h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={300}
      />
      <div className="flex justify-center mt-4">
        {!isCapturing ? (
          <button
            onClick={captureSelfie}
            className="bg-[#011452] text-white p-4 rounded-lg"
          >
            Capture Selfie
          </button>
        ) : (
          <img src={selfie} alt="Selfie" className="mt-4 rounded-lg" />
        )}
      </div>

      {isCapturing && (
        <div className="flex justify-between mt-4">
          <button
            onClick={() => {
              setSelfie(null);
              setIsCapturing(false);
            }}
            className="bg-red-500 text-white p-2 rounded-lg"
          >
            Retake
          </button>
          <button
            onClick={() => setStep(8)} // Go to Success Step
            className="bg-[#011452] text-white p-2 rounded-lg"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default SelfieStep;
