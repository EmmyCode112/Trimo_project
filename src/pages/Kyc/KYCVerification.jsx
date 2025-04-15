import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DocumentSelection } from "@/components/kyc/DocumentSelection";
import { UploadSection } from "@/components/kyc/UploadSection";
import { SelfieSection } from "@/components/kyc/SelfieSection";
import { ReviewSection } from "@/components/kyc/ReviewSection";
import { useKYCStore } from "@/lib/store2";
import StepsIndicator from '@/components/kyc/StepsIndicator';

const KYCVerification = () => {
  const { step, setStep } = useKYCStore();

  // Document type options
  const documentTypes = [
    {
      id: 1,
      title: "ID Card",
      description: "Create your account with ID Card",
      bgColor: "bg-[#f3f3f6]",
      borderColor: "border-[#ebebf0]",
      textColor: "text-foundationbrandprimary-blueprimary-blue-500",
      descriptionColor: "text-foundationbrandprimary-blueprimary-blue-400",
      icon: "/vuesax-linear-send-2-1.svg",
    },
    {
      id: 2,
      title: "Driving License",
      description: "Create your account with Driving License",
      bgColor: "bg-[#f6f3f5]",
      borderColor: "border-[#f0eaee]",
      textColor: "text-foundationbranddeep-purpledeep-purple-500",
      descriptionColor: "text-foundationbranddeep-purpledeep-purple-400",
      icon: "/vuesax-linear-status-up-1.svg",
    },
    {
      id: 3,
      title: "Voter's Card",
      description: "Create your account with Voter's Card",
      bgColor: "bg-[#f8f0f2]",
      borderColor: "border-[#f5e9ec]",
      textColor: "text-foundationbrandmaronmaron-500",
      descriptionColor: "text-foundationbrandmaronmaron-400",
      icon: "/vuesax-linear-wallet.svg",
    },
  ];

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">KYC Verification</h1>
        <p className="text-gray-500">Verify your identity and get started</p>
      </div>

      <div className="flex gap-8">
        {/* Steps Section */}
        <div className="w-1/4">
          <StepsIndicator currentStep={step} />
        </div>

        {/* Main Content */}
        <Card className="w-3/4">
          <CardContent className="p-6">
            {step === 1 && (
              <>
                <DocumentSelection 
                  documentTypes={documentTypes}
                  onNext={handleNext}
                />
                <UploadSection onNext={handleNext} />
              </>
            )}
            
            {step === 2 && (
              <SelfieSection onNext={handleNext} />
            )}

            {step === 3 && (
              <ReviewSection onComplete={handleNext} />
            )}

            <div className="flex justify-end gap-4 mt-8">
              {step > 1 && (
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
              )}
              <Button onClick={handleNext}>
                {step === 3 ? 'Complete' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KYCVerification;