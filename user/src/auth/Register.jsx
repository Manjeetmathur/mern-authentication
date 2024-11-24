import React, { useState } from "react";
import "./auth.css";
import Input from "../ui/Input";
import { FaFolderPlus } from "react-icons/fa";
import Button from "../ui/Button";
import BackToLogin from "../ui/BackToLogin";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import LoadingButton from "../ui/LoadingButton";
import { url } from "../components/BackendLink";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [seen, setSeen] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [seen2, setSeen2] = useState(false);
  const [inputType2, setInputType2] = useState("password");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
//"http://localhost:5555/user/register"
    try {
      setLoading(true);
      const response = await fetch(`${url}/user/register`, {
        method : "POST",
        body : JSON.stringify({email,password,name,confirmPassword}),
        headers : {
          "Content-Type": "application/json"
        }
      });

      const result = await response.json();
      setLoading(false);
//comment added

      if (result.success) {
        toast.success(result.message);
        navigate("/login");
      } else {
        console.log(result.message);

        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error);
    }

    //
  };

  const seenTypeHandler1 = () => {
    setSeen(false);
    setInputType("password");
  };
  const unseenTypeHandler1 = () => {
    setSeen(true);
    setInputType("text");
  };
  const seenTypeHandler2 = () => {
    setSeen2(false);
    setInputType2("password");
  };
  const unseenTypeHandler2 = () => {
    setSeen2(true);
    setInputType2("text");
  };

 

  return (
    <div className="auth_main">
    
      <form action="" onSubmit={submitHandler}>
        <div className="auth_container">
          <div className="auth_header">
            <div className="auth_icon">
              <FaFolderPlus />
            </div>
            <p className="auth_heading">Welcome</p>
            <p className="auth_desc">Create a new Account</p>
          </div>

          <div className="auth_item ">
            <label htmlFor="">Name *</label>
            <Input
              placeholder="Enter Your Name . . . "
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="auth_item">
            <label htmlFor="">Email *</label>
            <Input
              placeholder="Enter Your Email . . . "
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="auth_item">
            <label htmlFor="">Password *</label>
            <Input
              placeholder="Enter Your Password . . . "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={inputType}
              required
            />
            <div className="eye1">
              {seen ? (
                <div onClick={seenTypeHandler1}>
                  <FaEye />
                </div>
              ) : (
                <div onClick={unseenTypeHandler1}>
                  <FaEyeSlash />
                </div>
              )}
            </div>
          </div>
          <div className="auth_item">
            <label htmlFor="">Confirm Password *</label>
            <Input
              placeholder="Enter Your Password . . . "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={inputType2}
              required
            />
            <div className="eye2">
              {seen2 ? (
                <div onClick={seenTypeHandler2}>
                  <FaEye />
                </div>
              ) : (
                <div onClick={unseenTypeHandler2}>
                  <FaEyeSlash />
                </div>
              )}
            </div>
          </div>
          <div className="auth_action">
            <Button type="submit">
              <LoadingButton loading={loading} title="Register" />
            </Button>
          </div>
          <div className="">
            <Link to={"/login"} className="forget_pass">
              <BackToLogin>Back to login</BackToLogin>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
