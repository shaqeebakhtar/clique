import React, { useState } from "react";
import Phone from "./phone/Phone";
import Email from "./email/Email";

import "./StepPhoneEmail.css";

const phoneEmail = {
  phone: Phone,
  email: Email,
};

const StepPhoneEmail = ({ onClick }) => {
  const [type, setType] = useState("phone");
  const Component = phoneEmail[type];

  return (
    <div className="step--phone-email">
      <div className="tab-type">
        <button
          className={`btn-type btn--phone ${
            type === "phone" ? "active" : ""
          } | fw-bold`}
          onClick={() => setType("phone")}
        >
          Phone
        </button>
        <button
          className={`btn-type btn--email ${
            type === "email" ? "active" : ""
          } | fw-bold`}
          onClick={() => setType("email")}
        >
          Email
        </button>
      </div>
      <Component onClick={onClick} />
    </div>
  );
};

export default StepPhoneEmail;
