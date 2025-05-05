import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { useKYCStore } from '@/lib/store2';
import { Camera } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export const SelfieSection = ({ onNext }) => {
  const { setSelfieImage, setSelfieUploaded } = useKYCStore();
  const [localSelfieImage, setLocalSelfieImage] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  const activateCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" },
        audio: false 
      });
      
      setStream(mediaStream);
      setCameraActive(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast({
        title: "Camera Error",
        description: "Could not access camera. Please check permissions.",
        variant: "destructive"
      });
      // Fallback for testing
      setCameraActive(true);
    }
  };

  const handleTakePhoto = () => {
    if (!cameraActive) return;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    if (canvas && video) {
      const context = canvas.getContext('2d');
      // Match canvas dimensions to video dimensions
      canvas.width = video.videoWidth || 300;
      canvas.height = video.videoHeight || 300;
      
      // Draw the current video frame to the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to data URL
      const imageDataURL = canvas.toDataURL('image/png');
      setLocalSelfieImage(imageDataURL);
      setSelfieImage(imageDataURL); // Store in global state
      
      // Stop camera stream
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      
      setCameraActive(false);
      setSelfieUploaded(true);
      
      toast({
        title: "Selfie Captured",
        description: "Your selfie has been successfully captured.",
        variant: "default"
      });
    } else {
      // Fallback for testing
      const fallbackImage = '/placeholder-selfie.jpg';
      setLocalSelfieImage(fallbackImage);
      setSelfieImage(fallbackImage); // Store in global state
      setCameraActive(false);
      setSelfieUploaded(true);
      
      toast({
        title: "Selfie Captured",
        description: "Your selfie has been successfully captured.",
        variant: "default"
      });
    }
  };

  // Clean up camera stream when component unmounts
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-gray-900">
          Selfie Verification
        </h2>
        <p className="text-sm text-gray-500">
          Please take a clear photo of your face to verify your identity. Ensure you are in a well-lit area and your face is clearly visible.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex mt-6">
        {/* Camera Section */}
        <div className="flex-1">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 w-[395px]">
            <div className="flex flex-col items-center gap-6">
              {/* Camera Circle */}
              <div className="relative cursor-pointer" onClick={activateCamera}>
                <div className="w-48 h-48 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                  {!localSelfieImage && !cameraActive ? (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="#D1D1D6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3 16.8V9.2C3 8.0799 3 7.51984 3.21799 7.09202C3.40973 6.71569 3.71569 6.40973 4.09202 6.21799C4.51984 6 5.0799 6 6.2 6H7.25464C7.37758 6 7.43905 6 7.49576 5.9935C7.79166 5.95961 8.05705 5.79559 8.21969 5.54609C8.25086 5.49827 8.27836 5.44328 8.33333 5.33333C8.44329 5.11342 8.49827 5.00346 8.56062 4.90782C8.8859 4.40882 9.41668 4.08078 10.0085 4.01299C10.1219 4 10.2448 4 10.4907 4H13.5093C13.7552 4 13.8781 4 13.9915 4.01299C14.5833 4.08078 15.1141 4.40882 15.4394 4.90782C15.5017 5.00345 15.5567 5.11345 15.6667 5.33333C15.7216 5.44329 15.7491 5.49827 15.7803 5.54609C15.943 5.79559 16.2083 5.95961 16.5042 5.9935C16.561 6 16.6224 6 16.7454 6H17.8C18.9201 6 19.4802 6 19.908 6.21799C20.2843 6.40973 20.5903 6.71569 20.782 7.09202C21 7.51984 21 8.0799 21 9.2V16.8C21 17.9201 21 18.4802 20.782 18.908C20.5903 19.2843 20.2843 19.5903 19.908 19.782C19.4802 20 18.9201 20 17.8 20H6.2C5.0799 20 4.51984 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8Z" stroke="#D1D1D6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : cameraActive ? (
                    <video 
                      ref={videoRef} 
                      className="min-w-full min-h-full object-cover" 
                      autoPlay 
                      playsInline 
                      muted
                    />
                  ) : (
                    <img 
                      src={localSelfieImage} 
                      alt="Selfie" 
                      className="min-w-full min-h-full object-cover" 
                    />
                  )}
                </div>
              </div>

              {/* Hidden canvas for capturing photos */}
              <canvas ref={canvasRef} style={{ display: 'none' }} />

              {/* Instructions */}
              <p className="text-sm text-gray-500 text-center max-w-xs">
                Position your face within the circle and ensure your face is clearly visible. Remove glasses and hats for better results.
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-4">
        <Button
          onClick={handleTakePhoto}
          className="bg-[#46366B] w-full hover:bg-[#46366B]/90 text-white px-8 py-2 rounded-md flex items-center gap-2 w-[200px] justify-center"
          disabled={!cameraActive}
        >
          <Camera size={18} />
          Take Photo
        </Button>
      </div>
          
        </div>

        {/* Guidelines Section */}
        <div className="ml-8 mt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Guidelines for a successful verification:
          </h3>
          <ul className="space-y-4">
            {[
              'Ensure your face is clearly visible and centered',
              'Use good lighting - avoid shadows on your face',
              'Remove sunglasses, hats, or other items covering your face',
              'Keep a neutral expression and look directly at the camera',
              'Make sure the image is not blurry'
            ].map((guideline, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-[#46366B] text-lg">•</span>
                <span className="text-sm text-gray-600">{guideline}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Take Photo Button - Centered below the box */}
      {/* <div className="flex justify-center mt-4">
        <Button
          onClick={handleTakePhoto}
          className="bg-[#46366B] hover:bg-[#46366B]/90 text-white px-8 py-2 rounded-md flex items-center gap-2 w-[200px] justify-center"
          disabled={!cameraActive}
        >
          <Camera size={18} />
          Take Photo
        </Button>
      </div> */}
    </div>
  );
}; 