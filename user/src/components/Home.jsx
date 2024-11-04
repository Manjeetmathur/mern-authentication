import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { FaHome } from "react-icons/fa";
import "../auth/auth.css";
const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logOutHandler = () => {
    localStorage.setItem("token", "");
    navigate("/login");
  };

  return (
    <div>
      <div className="auth_main">
        <div>
          <div className="auth_container">
            <div className="auth_header">
              <div className="auth_icon">
                <FaHome />
              </div>
              <p className="auth_head">Welcome To Home</p>
            </div>
          </div>
          {token ? (
            <Button onClick={logOutHandler}>log out</Button>
          ) : (
            <Link to={"/login"}>
              <Button>log in</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
