import React from "react";
import "./ButtonContinue.css";

const ButtonContinue = ({ onClick }) => {
  return (
    <button className="btn--continue | fw-bold" onClick={onClick}>
      Get OTP
    </button>
  );
};

export default ButtonContinue;
