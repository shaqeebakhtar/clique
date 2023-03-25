import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../../redux/authSlice";
import { verifyOtp } from "../../../utils/httpRequests";

import "./StepOtp.css";

const StepOtp = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();

  const { phone, hash } = useSelector((state) => state.auth.otp);

  const verifyAndSubmit = async () => {
    try {
      await verifyOtp({ phone, otp, hash }).then((res) => {
        dispatch(setAuth({ user: res.data.user }));
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="step--otp">
      <h3 className="fw-black fs-title">Enter OTP</h3>
      <p className="step--otp__text | fs-title-sm fw-bold">
        Code sent to +91 {phone}. Enter that code to proceed.
      </p>
      <input
        type="number"
        name="otp"
        id="otp"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button className="btn--verify | fw-bold" onClick={verifyAndSubmit}>
        Verify
      </button>
    </div>
  );
};

export default StepOtp;
