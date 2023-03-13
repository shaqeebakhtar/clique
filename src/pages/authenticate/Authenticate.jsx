import React, { useState } from "react";
import StepPhoneEmail from "../steps/stepPhoneEmail/StepPhoneEmail";
import StepOtp from "../steps/stepOtp/StepOtp";

import "./Authenticate.css";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
};

const Authenticate = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  const onContinue = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <section className="authenticate | container">
      <Step onClick={onContinue} />
    </section>
  );
};

export default Authenticate;
