import React, { useState } from "react";
import ButtonContinue from "../../../../components/button/ButtonContinue";

import "./Email.css";

const Email = ({ onClick }) => {
  const [email, setEmail] = useState("");

  return (
    <div className="step--email">
      <label className="input-label | fs-body-sm" htmlFor="email">
        Enter your email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@domain.com"
      />
      <ButtonContinue onClick={onClick} />
    </div>
  );
};

export default Email;
