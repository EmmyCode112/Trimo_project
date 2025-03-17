import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type Step = {
  id: string;
  title: string;
  completed: boolean;
};

interface ProgressBarProps {
  steps: Step[];
  currentStep: string;
}

const ProgressBar = ({ steps, currentStep }: ProgressBarProps) => {
  return (
    <div className="w-full flex items-center justify-between py-4 animate-fade-in">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.completed;
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={step.id}>
            <div className="campaign-step">
              {index !== 0 && (
                <div
                  className={cn(
                    "campaign-step-line",
                    (isActive || isCompleted) && "campaign-step-line-active",
                  )}
                />
              )}
              <div
                className={cn(
                  "campaign-step-circle",
                  isActive && "campaign-step-circle-active",
                  isCompleted && "campaign-step-circle-completed"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>
              <div
                className={cn(
                  "campaign-step-text",
                  isActive && "campaign-step-text-active"
                )}
              >
                {step.title}
              </div>
            </div>
            {!isLast && (
              <div
                className={cn(
                  "flex-1 h-[2px] bg-gray-200 mx-2",
                  isCompleted && "bg-campaign-purple"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProgressBar;