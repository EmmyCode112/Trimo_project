import React from 'react';

const StepsIndicator = ({ currentStep }) => {
  const steps = [
    { title: 'ID Verification', description: 'Browse and Upload' },
    { title: 'Selfie', description: 'Take a photo' },
    { title: 'Review', description: 'Verify details' },
  ];

  return (
    <div className="flex flex-col w-[344px] items-start">
      {steps.map((step, index) => (
        <div
          key={index}
          className="flex items-start gap-4 relative self-stretch w-full"
        >
          <div className="inline-flex flex-col items-center gap-1 pt-0 pb-1 px-0 relative self-stretch">
            <div
              className={`flex items-center justify-center relative w-8 h-8 ${
                currentStep === index + 1 ? "bg-primary-50" : "bg-basewhite"
              } rounded-2xl overflow-hidden ${
                currentStep === index + 1
                  ? "shadow-focus-ring-4px-primary-100"
                  : ""
              }`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 ${
                  currentStep === index + 1 ? "bg-primary-50" : ""
                } rounded-2xl border-2 border-solid ${
                  currentStep === index + 1
                    ? "border-foundationbrandprimary-blueprimary-blue-500"
                    : "border-[#eaecf0]"
                }`}
              >
                {index < currentStep ? (
                  <svg
                    className="w-4 h-4 text-foundationbrandprimary-blueprimary-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <div
                    className={`w-2.5 h-2.5 ${
                      currentStep === index + 1
                        ? "bg-foundationbrandprimary-blueprimary-blue-500"
                        : "bg-gray-200"
                    } rounded-[5px]`}
                  /> 
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`relative flex-1 w-0.5 grow ${
                  index < currentStep
                    ? "bg-foundationbrandprimary-blueprimary-blue-500"
                    : "bg-gray-200"
                } rounded-sm`}
              />
            )}
          </div>
          <div className="flex flex-col items-start gap-0.5 pt-1 pb-8 px-0 relative flex-1 grow">
            <div
              className={`relative self-stretch mt-[-1.00px] font-body-md-medium font-[number:var(--body-md-medium-font-weight)] ${
                currentStep === index + 1
                  ? "text-foundationbrandprimary-blueprimary-blue-500"
                  : "text-gray-700"
              } text-[length:var(--body-md-medium-font-size)] tracking-[var(--body-md-medium-letter-spacing)] leading-[var(--body-md-medium-line-height)] [font-style:var(--body-md-medium-font-style)]`}
            >
              {step.title}
            </div>
            <div
              className={`relative self-stretch font-body-md-regular font-[number:var(--body-md-regular-font-weight)] ${
                currentStep === index + 1
                  ? "text-foundationbrandprimary-blueprimary-blue-500"
                  : "text-gray-500"
              } text-[length:var(--body-md-regular-font-size)] tracking-[var(--body-md-regular-letter-spacing)] leading-[var(--body-md-regular-line-height)] [font-style:var(--body-md-regular-font-style)]`}
            >
              {step.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepsIndicator;