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
  const { step, setStep, documentType, selfieUploaded } = useKYCStore();

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
    if (step === 3) {
      // Handle submission
      console.log("Verification submitted");
    } else {
      setStep(step + 1);
    }
  };
  
  const handleBack = () => step > 1 && setStep(step - 1);

  return (
    <main className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-medium">KYC Verification</h1>
        <p className="text-gray-500">Verify your identity and get started</p>
      </div>

      <div className="flex gap-8">
        {/* Steps Section */}
        <div className="w-1/4">
          <StepsIndicator currentStep={step} />
        </div>

        {/* Main Content - Double Border Design */}
        <div className="w-3/4">
          <div className="absolute w-[825px] h-[690px] bg-neutral-50 rounded-xl overflow-hidden border border-solid border-[#f1f1f1]">
            <div className="relative w-[813px] h-[678px] m-1.5 bg-white rounded-[10px] overflow-hidden border border-solid border-[#f1f1f1]">
              <div className="p-7">
                {step === 1 && (
                  <>
                    <DocumentSelection 
                      documentTypes={documentTypes}
                      onNext={handleNext}
                    />
                    {documentType && <UploadSection onNext={handleNext} />}
                  </>
                )}
                
                {step === 2 && (
                  <SelfieSection onNext={handleNext} />
                )}

                {step === 3 && (
                  <ReviewSection 
                    onBack={handleBack}
                    onSubmit={handleNext}
                  />
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute bottom-6 right-7 flex items-center gap-3">
                {step > 1 && (
                  <Button
                    variant="outline"
                    className="px-6 py-2 text-foundationbrandprimary-blueprimary-blue-500 bg-foundationbrandprimary-blueprimary-blue-50"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                )}
                <Button
                  variant="default"
                  className="px-6 py-2 bg-foundationbrandprimary-blueprimary-blue-500 text-white"
                  onClick={handleNext}
                  disabled={(step === 1 && !documentType) || (step === 2 && !selfieUploaded)}
                >
                  {step === 3 ? 'Submit Verification' : 'Next'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default KYCVerification;