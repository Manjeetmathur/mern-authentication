import React from "react";
import Register from "./auth/Register";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import ForgetPass from "./auth/ForgetPass";
import VerifyOTP from "./auth/VerifyOTP";
import UpdatePassword from "./auth/UpdatePassword";
import Home from "./components/Home";
import Super from "./components/Super";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forget" element={<ForgetPass />} />
      <Route element={<Super />}>
        <Route path="/otp/verifyOTP" element={<VerifyOTP />} />
        <Route path="/password/updatePassword" element={<UpdatePassword />} />
      </Route>
    </Routes>
  );
};

export default App;
