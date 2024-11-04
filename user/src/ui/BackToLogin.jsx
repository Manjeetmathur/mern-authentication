import React from "react";
import "./backToLogin.css"
import { FaArrowLeft } from "react-icons/fa6";
const BackToLogin = ({ onClick, type, children }) => {
  return (
    <button className="ui_back" onClick={onClick} type={type}>
       <FaArrowLeft className="arrow"/>
      {children}
    </button>
  );
};

export default BackToLogin;
