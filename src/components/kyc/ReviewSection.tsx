import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { useKYCStore } from '@/lib/store2';
import { toast } from '@/components/ui/use-toast';

export const ReviewSection = ({ onBack, onSubmit }) => {
  const { 
    documentType, 
    idNumber, 
    issueDate, 
    expiryDate, 
    selfieImage 
  } = useKYCStore();

  const handleSubmit = () => {
    if (!selfieImage) {
      toast({
        title: "Missing Information",
        description: "Selfie image is missing. Please go back and take a selfie.",
        variant: "destructive"
      });
      return;
    }
    
    // Proceed with submission
    onSubmit();
    
    toast({
      title: "Verification Submitted",
      description: "Your verification has been submitted successfully.",
      variant: "default"
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-gray-900">
          Review Verification
        </h2>
        <p className="text-sm text-gray-500">
          Please review all the information you've provided before final submission.
        </p>
      </div>

      {/* Review Cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* ID Card Verification */}
        <Card className="p-6 border border-gray-200 rounded-lg">
          <h3 className="font-medium text-lg mb-4">ID Card Verification</h3>
          
          {/* ID Preview */}
          <div className="aspect-video bg-gray-50 rounded-lg mb-6" />
          
          {/* ID Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">ID Number</span>
              <span className="font-medium">BD1234567890</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Issue Date</span>
              <span className="font-medium">10 January 2020</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Expiry Date</span>
              <span className="font-medium">10 January 2030</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Status</span>
              <span className="text-yellow-500">Pending Review</span>
            </div>
          </div>
        </Card>

        {/* Selfie Verification */}
        <Card className="p-6 border border-gray-200 rounded-lg">
          <h3 className="font-medium text-lg mb-4">Selfie Verification</h3>
          
          {/* Selfie Preview */}
          <div className="aspect-video bg-gray-50 rounded-lg mb-6 overflow-hidden">
            {selfieImage ? (
              <img 
                src={selfieImage} 
                alt="Selfie" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-red-500">Missing selfie image</p>
              </div>
            )}
          </div>
          
          {/* Verification Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Face Match</span>
              <span className="font-medium">Match with ID</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Liveness Check</span>
              <span className="text-green-500">Passed</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Status</span>
              <span className="text-yellow-500">Pending Review</span>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Error messages section */}
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Possible reasons:</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 font-bold">⚠️</span>
            <span className="text-sm text-gray-600">Missing or unclear document images</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 font-bold">⚠️</span>
            <span className="text-sm text-gray-600">Mismatched information</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 font-bold">⚠️</span>
            <span className="text-sm text-gray-600">System error</span>
          </li>
        </ul>
      </div>
    </div>
  );
}; 