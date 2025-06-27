import React from 'react';

const StepProgress = ({ currentStep, onStepClick }) => {
  const stepNames = [
    "Introduction",
    "Objective",
    "Education",
    "Work Experience",
    "Skills",
    "Languages",
    "Proficiency",
    "Training",
    "Referees",
    "Completes",
    // "Preview"
  ];
  

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 -translate-y-1/2"></div>
        
        {stepNames.map((name, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isFuture = stepNumber > currentStep;

          return (
            <div 
              key={stepNumber} 
              className="relative z-10 flex flex-col items-center"
              onClick={() => onStepClick(stepNumber)}
            >
              {/* Step dot with number */}
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer
                  ${isActive ? 'bg-blue-600 text-white scale-125' : ''}
                  ${isCompleted ? 'bg-green-500 text-white' : ''}
                  ${isFuture ? 'bg-gray-300 text-gray-600' : ''}
                  font-medium text-xs
                `}
                title={name}
              >
                {stepNumber}
              </div>
              
              {/* Tooltip */}
              {/* {(isActive || isCompleted) && (
               <div className="absolute top-full mt-2 transform -translate-x-1/2 left-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                  {name}
                </div>
              )}  */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;