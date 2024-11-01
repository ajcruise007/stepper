import React, { useEffect, useRef, useState } from "react";

const Stepper = ({ stepConfig = [] }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margin, setMargin] = useState({ marginLeft: 0, marginRigth: 0 });
  const stepref = useRef([]);
  useEffect(() => {
    console.log(stepref.current.map((item) => item.offsetWidth));
    setMargin({
      marginLeft: stepref.current[0].offsetWidth / 2,
      marginRigth: stepref.current[stepConfig.length - 1].offsetWidth / 2,
    });
  }, []);

  const handleNextClick = () => {
    // if (currentStep === stepConfig.length) {
    //   setIsComplete(!isComplete);
    // }

    setCurrentStep((prevStep) => {
      if (prevStep === stepConfig.length) {
        setIsComplete(true);
        return prevStep;
      }
      return prevStep + 1;
    });
  };

  const ActiveComponent = stepConfig[currentStep - 1]?.Component;

  const calculateProgress = () => {
    console.log(currentStep - 1, stepConfig.length - 1);
    return ((currentStep - 1) / (stepConfig.length - 1)) * 100;
  };

  return (
    <div className="container">
      <div className="stepper">
        {stepConfig.map((step, index) => (
          <div
            key={index}
            ref={(el) => {
              stepref.current[index] = el;
            }}
            className={`step ${
              currentStep > index + 1 || isComplete ? "complete" : ""
            } ${currentStep === index + 1 ? "active" : ""}`}
          >
            <div className="step-number ">
              {currentStep > index + 1 || isComplete ? (
                <span>&#10003;</span>
              ) : (
                index + 1
              )}
            </div>
            <div className="step-name">{step.name}</div>
          </div>
        ))}
        <div
          className="progress-bar"
          style={{
            width: `calc(100% - ${margin.marginLeft + margin.marginRigth}px)`,
            marginLeft: margin.marginLeft,
            marginRight: margin.marginRigth,
          }}
        >
          <div
            className="progress"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
      </div>
      <ActiveComponent />
      <button onClick={handleNextClick} className="btn">
        {currentStep === stepConfig.length ? "Finish" : "Next"}
      </button>
    </div>
  );
};

export default Stepper;
