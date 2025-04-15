import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useKYCStore } from '@/lib/store2';
import { Card } from '../ui/card';

export const SelfieSection = ({ onNext }) => {
  const { setSelfieUploaded } = useKYCStore();
  const [selfieImage, setSelfieImage] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState({
    faceMatch: 'Match with ID',
    livenessCheck: 'Passed',
    status: 'Pending Review'
  });

  const handleTakePhoto = () => {
    // Simulate taking a photo
    setTimeout(() => {
      setSelfieUploaded(true);
      setSelfieImage('/placeholder-selfie.jpg'); // Replace with actual captured image
      onNext();
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
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
      <div className="flex gap-8 mt-4">
        {!selfieImage ? (
          // Camera Section
          <div className="flex-1">
            <div className="bg-gray-50 border border-dashed border-gray-200 rounded-lg p-8">
              <div className="flex flex-col items-center gap-6">
                {/* Camera Circle */}
                <div className="relative">
                  <div className="w-48 h-48 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <img
                      src="/camera-icon.svg"
                      alt="Camera"
                      className="w-16 h-16 text-gray-400"
                    />
                  </div>
                  {/* Dotted Circle Overlay */}
                  <div className="absolute inset-0 w-48 h-48 rounded-full border-2 border-dashed border-gray-300 animate-pulse" />
                </div>

                {/* Instructions */}
                <p className="text-sm text-gray-500 text-center max-w-sm">
                  Position your face within the circle and ensure your face is clearly visible. Remove glasses and hats for better results.
                </p>

                {/* Take Photo Button */}
                <Button
                  onClick={handleTakePhoto}
                  className="bg-[#46366B] hover:bg-[#46366B]/90 text-white flex items-center gap-2 px-6 py-2 rounded-md"
                >
                  <svg 
                    className="w-5 h-5" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Take Photo
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Review Cards
          <div className="flex-1 grid grid-cols-2 gap-4">
            {/* ID Card Verification */}
            <Card className="p-4">
              <h3 className="font-medium mb-4">ID Card Verification</h3>
              <div className="aspect-video bg-gray-100 rounded-lg mb-4">
                {/* ID Card Preview */}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">ID Number</span>
                  <span>BD1234567890</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Issue Date</span>
                  <span>10 January 2020</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Expiry Date</span>
                  <span>10 January 2030</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <span className="text-yellow-500">Pending Review</span>
                </div>
              </div>
            </Card>

            {/* Selfie Verification */}
            <Card className="p-4">
              <h3 className="font-medium mb-4">Selfie Verification</h3>
              <div className="aspect-video bg-gray-100 rounded-lg mb-4">
                {selfieImage && (
                  <img src={selfieImage} alt="Selfie" className="w-full h-full object-cover rounded-lg" />
                )}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Face Match</span>
                  <span>{verificationStatus.faceMatch}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Liveness Check</span>
                  <span className="text-green-500">{verificationStatus.livenessCheck}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <span className="text-yellow-500">{verificationStatus.status}</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Guidelines Section */}
        <div className="w-80">
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
    </div>
  );
}; 