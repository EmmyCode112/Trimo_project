import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { useKYCStore } from '@/lib/store2';

export const ReviewSection = ({ onBack, onSubmit }) => {
  const { documentType, idNumber, issueDate, expiryDate } = useKYCStore();

  return (
    <div className="flex flex-col gap-6 p-6">
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
        <Card className="p-6">
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
        <Card className="p-6">
          <h3 className="font-medium text-lg mb-4">Selfie Verification</h3>
          
          {/* Selfie Preview */}
          <div className="aspect-video bg-gray-50 rounded-lg mb-6" />
          
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

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="px-6 py-2"
        >
          Back
        </Button>
        <Button
          onClick={onSubmit}
          className="px-6 py-2 bg-[#46366B] text-white hover:bg-[#46366B]/90"
        >
          Submit Verification
        </Button>
      </div>
    </div>
  );
}; 