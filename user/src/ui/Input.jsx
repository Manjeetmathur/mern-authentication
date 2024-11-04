import React from "react";
import "./input.css";
const Input = ({ placeholder, required, onChange, value, type }) => {
  return (
    <input
      type={type}
      required={required}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className="ui_input"
    />
  );
};

export default Input;
