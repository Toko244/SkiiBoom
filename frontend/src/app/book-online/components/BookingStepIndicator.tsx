interface BookingStepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export default function BookingStepIndicator({ currentStep, steps }: BookingStepIndicatorProps) {
  return (
    <div className="w-full py-6 px-4 bg-card rounded-lg shadow-subtle mb-6">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-outfit font-semibold text-sm transition-all duration-300 ${
                  index < currentStep
                    ? 'bg-success text-white'
                    : index === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {index < currentStep ? '✓' : index + 1}
              </div>
              <span
                className={`mt-2 text-xs font-inter font-medium text-center ${
                  index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-2 transition-all duration-300 ${
                  index < currentStep ? 'bg-success' : 'bg-border'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}