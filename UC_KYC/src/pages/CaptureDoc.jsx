import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, X, RotateCw, RotateCcw } from 'lucide-react';
import Webcam from 'react-webcam';
import Cropper from 'react-easy-crop';
import PassportLottie from './PassportGIF';
import IdLottie from './Idcardgif';

export const DocumentCaptureStep = ({ formData, handleInputChange, setStep }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(16 / 9); // Default aspect ratio
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const webcamRef = useRef(null);

  const documentType = formData?.nationality?.idType;
  const showAnimation = documentType === 'passport' ? <PassportLottie /> : <IdLottie />;

  const handleCapture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setIsCameraOpen(false);
  }, [webcamRef]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createCroppedImage = async () => {
    const croppedImage = await getCroppedImg(capturedImage, croppedAreaPixels, rotation);
    setCroppedImageUrl(croppedImage);
  };

  const getCroppedImg = async (imageSrc, crop, rotation = 0) => {
    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const maxLen = Math.max(image.naturalWidth, image.naturalHeight);

    canvas.width = maxLen;
    canvas.height = maxLen;
    const ctx = canvas.getContext('2d');

    ctx.translate(maxLen / 2, maxLen / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-maxLen / 2, -maxLen / 2);

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      (maxLen - crop.width) / 2,
      (maxLen - crop.height) / 2,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      }, 'image/jpeg');
    });
  };

  return (
    <motion.div 
      className="max-w-lg mx-auto p-6 mt-20"
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '-100%' }}
    >
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">{documentType.toUpperCase()}</h3>
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
                  onClick={handleCapture}
                  className="bg-[#011452] text-white p-4 rounded-full"
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
                croppedImageUrl ? (
                  <div className="relative">
                    <img src={croppedImageUrl} alt="Cropped Preview" className="w-full rounded-lg" />
                    <motion.button
                      onClick={() => setStep(7)}
                      className="mt-4 w-full bg-[#011452] text-white p-4 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Next
                    </motion.button>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="w-full h-80 relative">
                      <Cropper
                        image={capturedImage}
                        crop={crop}
                        zoom={zoom}
                        rotation={rotation}
                        aspect={aspectRatio}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                      />
                    </div>
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => setRotation((prev) => prev - 90)}
                        className="bg-gray-200 p-2 rounded-full"
                      >
                        <RotateCcw className="w-5 h-5 text-gray-700" />
                      </button>
                      <button
                        onClick={() => setRotation((prev) => prev + 90)}
                        className="bg-gray-200 p-2 rounded-full"
                      >
                        <RotateCw className="w-5 h-5 text-gray-700" />
                      </button>
                    </div>
                    <div className="mt-4 flex justify-center gap-4">
                      <button
                        onClick={() => setAspectRatio(16 / 9)}
                        className={`px-3 py-2 ${aspectRatio === 16 / 9 ? 'bg-[#011452] text-white' : 'bg-gray-100'}`}
                      >
                        16:9
                      </button>
                      <button
                        onClick={() => setAspectRatio(3 / 2)}
                        className={`px-3 py-2 ${aspectRatio === 3 / 2 ? 'bg-[#011452] text-white' : 'bg-gray-100'}`}
                      >
                        3:2
                      </button>
                      <button
                        onClick={() => setAspectRatio(1 / 1)}
                        className={`px-3 py-2 ${aspectRatio === 1 / 1 ? 'bg-[#011452] text-white' : 'bg-gray-100'}`}
                      >
                        1:1
                      </button>
                    </div>
                    <motion.button
                      onClick={createCroppedImage}
                      className="mt-4 w-full bg-[#011452] text-white p-4 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Crop Image
                    </motion.button>
                  </div>
                )
              ) : (
                <>
                  {showAnimation}
                  <motion.button
                    onClick={() => setIsCameraOpen(true)}
                    className="w-full bg-[#011452] text-white p-6 rounded-lg flex items-center justify-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Camera className="w-6 h-6" />
                    Take Photo
                  </motion.button>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onload = () => setCapturedImage(reader.result);
                        reader.readAsDataURL(file);
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <motion.button
                      className="w-full bg-[#F1F1F1] text-[#011452] p-6 rounded-lg flex items-center justify-center gap-3"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Upload className="w-6 h-6" />
                      Upload from Device
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
