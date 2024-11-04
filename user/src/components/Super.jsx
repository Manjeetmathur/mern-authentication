import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";
import { url } from "./BackendLink";
const Super = () => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const getAccess = async () => {
      try {
        setLoading(true);
        const data = await fetch(`${url}/user/get-access`, {
          method: "POST",
          body: JSON.stringify({ token: localStorage.getItem("otp-token") }),
          headers: { "Content-Type": "application/json" },
        });

        const response = await data.json();

        if (response.success) {
          setLoading(false);
          setAuth(true);
        }
      } catch (error) {
        toast.error(error);
        setLoading(false);
      }
    };
    getAccess();
  }, []);

  console.log(auth,loading);

  if (loading) {
    return <h2>loading</h2>;
  }
  if(auth) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default Super;
