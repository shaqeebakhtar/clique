import React from "react";
import "./Loader.css";

const Loader = ({ message }) => {
  return (
    <div className="loader">
      <div className="spinner"></div>
      <h3 className="fw-bold fs-title-sm">{message}</h3>
    </div>
  );
};

export default Loader;
