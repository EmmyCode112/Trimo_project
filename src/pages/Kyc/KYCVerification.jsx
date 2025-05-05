import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { DocumentSelection } from "@/components/kyc/DocumentSelection";
import { UploadSection } from "@/components/kyc/UploadSection";
import { SelfieSection } from "@/components/kyc/SelfieSection";
import { ReviewSection } from "@/components/kyc/ReviewSection";
import { useKYCStore } from "@/lib/store2";
import StepsIndicator from '@/components/kyc/StepsIndicator';
import { toast } from '@/components/ui/use-toast';
import { Smartphone, QrCode, Copy } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Icons } from "@/assets/assets";

const KYCVerification = () => {
  const { step, setStep, documentType, selfieUploaded } = useKYCStore();
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [mobileModalOpen, setMobileModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const modalRef = useRef(null);
  const dragRef = useRef(null);
  const isMobile = window.innerWidth <= 768;

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

  const handleDragStart = (e) => {
    if (!isMobile) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragRef.current = { startY: clientY };
  };

  const handleDragMove = (e) => {
    if (!dragRef.current || !isMobile || !modalRef.current) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const delta = clientY - dragRef.current.startY;

    if (delta > 100) {
      setMobileModalOpen(false);
      dragRef.current = null;
    } else {
      modalRef.current.style.transform = `translateY(${Math.max(0, delta)}px)`;
    }
  };

  const handleDragEnd = () => {
    if (!modalRef.current || !isMobile) return;
    modalRef.current.style.transform = "";
    dragRef.current = null;
  };

  const handleNext = () => {
    if (step === 3) {
      const isSuccess = Math.random() > 0.2;
      
      if (isSuccess) {
        toast({
          title: "KYC Submission Successful!",
          description: "Your verification details have been submitted successfully. Our team is reviewing your information, and you'll receive an update shortly.",
          variant: "default",
          className: "bg-green-50 border-green-200 text-green-800",
          action: (
            <Button variant="outline" size="sm" onClick={() => toast.dismiss()}>
              ✕
            </Button>
          ),
        });
      } else {
        toast({
          title: "KYC Submission Failed",
          description: "We encountered an issue while processing your KYC submission.",
          variant: "destructive",
          className: "bg-red-50 border-red-200 text-red-800",
          action: (
            <Button variant="outline" size="sm" onClick={() => toast.dismiss()}>
              ✕
            </Button>
          ),
        });
        
        toast({
          title: "Possible reasons:",
          description: (
            <ul className="space-y-2 mt-2">
              <li className="flex items-start gap-2">
                <span className="text-yellow-500">⚠️</span>
                <span>Missing or unclear document images</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500">⚠️</span>
                <span>Mismatched information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500">⚠️</span>
                <span>System error</span>
              </li>
            </ul>
          ),
          variant: "default",
          className: "bg-yellow-50 border-yellow-200 text-yellow-800",
        });
      }
      
      setSubmissionStatus(isSuccess ? 'success' : 'error');
    } else {
      setStep(step + 1);
    }
  };
  
  const handleBack = () => step > 1 && setStep(step - 1);

  const handleSendLink = () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to receive the verification link.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Link Sent!",
      description: `A secure verification link has been sent to ${email}. The link will expire in 24 hours.`,
      variant: "default",
      className: "bg-green-50 border-green-200 text-green-800",
    });
  };
  
  const handleCopyLink = () => {
    const token = Math.random().toString(36).substring(2, 15);
    const link = `https://yourapp.com/kyc/mobile/${token}`;
    
    navigator.clipboard.writeText(link).then(() => {
      toast({
        title: "Link Copied!",
        description: "A secure verification link has been copied to your clipboard. The link will expire in 24 hours.",
        variant: "default",
        className: "bg-green-50 border-green-200 text-green-800",
      });
    });
  };

  return (
    <main className="p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-medium">KYC Verification</h1>
          <p className="text-gray-500">Verify your identity and get started</p>
        </div>
        
        <Button 
          variant="outline" 
          className="flex items-center gap-2 bg-[#46366B] text-white hover:bg-[#46366B]/90"
          onClick={() => setMobileModalOpen(true)}
        >
          <Smartphone size={16} />
          Continue on Mobile
        </Button>
      </div>

      <div className="flex gap-8">
        <div className="w-1/4">
          <StepsIndicator currentStep={step} />
        </div>

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

      {mobileModalOpen && (
        <div className="fixed flex items-center justify-center max-md:items-end inset-0 z-50 bg-[#C7C7C74D] backdrop-blur-[8.1px]">
          <div
            ref={modalRef}
            className={`bg-white ${
              isMobile
                ? "inset-x-0 bottom-0 rounded-t-[40px] p-3"
                : "w-[517px] rounded-[40px] p-[22px]"
            }`}
            onTouchStart={handleDragStart}
            onMouseDown={handleDragStart}
            onTouchMove={handleDragMove}
            onMouseMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            onMouseUp={handleDragEnd}
          >
            {isMobile && (
              <div className="w-[81px] h-2 bg-gray-300 rounded-full mx-auto mt-4" />
            )}
            
            <div className="p-4">
              <div className="flex justify-between gap-2 items-start mb-6">
                <div>
                  <h2 className="font-medium text-[18px] text-[#1A1A1A] mb-[10px]">
                    Continue Verification on Mobile
                  </h2>
                  <p className="text-[14px] font-normal text-[#767676]">
                    Scan this QR code with your mobile device to continue the verification process.
                  </p>
                </div>
                <img 
                  src={Icons.crossIcon} 
                  alt="close" 
                  className="cursor-pointer" 
                  onClick={() => setMobileModalOpen(false)} 
                />
              </div>
              
              <div className="bg-[#F1F1F1] rounded-[15px] p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col items-center">
                    <div className="bg-white p-4 rounded-lg mb-4 w-full max-w-[200px] aspect-square flex items-center justify-center">
                      <QrCode size={150} className="text-[#46366B]" />
                    </div>
                    <p className="text-sm text-gray-500 text-center">
                      Scan this QR code with your mobile device
                    </p>
                  </div>
                  
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-500 mb-4">Or receive a link via email</p>
                    <div className="flex gap-2 mb-4">
                      <Input 
                        type="email" 
                        placeholder="example@email.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-grow"
                      />
                      <Button 
                        variant="default" 
                        className="bg-[#46366B] hover:bg-[#46366B]/90 whitespace-nowrap"
                        onClick={handleSendLink}
                      >
                        Send Link
                      </Button>
                    </div>
                    
                    <div className="flex flex-col gap-4 mt-4">
                      {["Selfie", "Browse and Upload", "Review and Submit"].map((step, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#46366B]"></div>
                          <span className="text-sm">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center mt-6">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={handleCopyLink}
                  >
                    <Copy size={16} />
                    Copy Link
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default KYCVerification