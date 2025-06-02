import { CheckIcon } from "lucide-react";

const StepIndicator = ({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) => {
  const steps = [
    "Personal Info",
    "Education",
    "Experience",
    "Skills",
    "Projects",
    "Certifications",
    "Review",
  ];
  return (
    <div className="w-full mt-6">
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                currentStep > idx + 1
                  ? "border-primary bg-primary text-primary-foreground"
                  : currentStep === idx + 1
                  ? "border-primary text-primary"
                  : "border-muted-foreground text-muted-foreground"
              }`}
            >
              {idx + 1 < currentStep ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <span>{idx + 1}</span>
              )}
            </div>
            <span
              className={`mt-1 hidden text-xs sm:block ${
                idx + 1 === currentStep
                  ? "font-medium text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 hidden h-1 w-full bg-muted sm:block">
        <div
          className="h-1 bg-primary transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default StepIndicator;
