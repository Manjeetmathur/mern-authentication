import React, { useState } from "react";
import "./auth.css";
import Input from "../ui/Input";
import { CiLogin } from "react-icons/ci";
import Button from "../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingButton from "../ui/LoadingButton";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { url } from "../components/BackendLink";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)
  const [seen, setSeen] = useState(false);
  const [inputType, setInputType] = useState("password");
  const seenTypeHandler1 = () => {
    setSeen(false);
    setInputType("password");
  };
  const unseenTypeHandler1 = () => {
    setSeen(true);
    setInputType("text");
  };

  const submitHandler = async(event) => {
    event.preventDefault();
    // console.log(email,password);
    localStorage.clear()
    
    try {
      setLoading(true)
      const data =await fetch(`${url}/user/login`,{
        method : "POST",
        body : JSON.stringify({email,password}),
        headers : {
          "Content-Type": "application/json"
        }
      })
      const resopnse  = await data.json()
      setLoading(false)
      console.log(resopnse.message);
      
      if(resopnse.success){
        toast.success(resopnse.message)
        localStorage.setItem("token",resopnse.data)
        navigate("/")
      }
      else{
        toast.error(resopnse.message)
      }
      
    } catch (error) {
      console.log(error);
      
      toast.error(error.message)
    }

  };
  return (
    <div className="auth_main">
      <form action="" onSubmit={submitHandler}>
        <div className="auth_container">
          <div className="auth_header">
            <div className="auth_icon">
            <CiLogin />
            </div>
            <p className="auth_heading">Welcome Back</p>
            <p className="auth_desc">Login To Continue</p>
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
            <div className="eye3">
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
          <div className="auth_action">
            <Button type="submit">
              <LoadingButton loading={loading} title="Log in"/>
            </Button>
          </div>
          <div className="auth_option">
            <Link to={"/register"} className="forget_pass">
              Create A New Account
            </Link>
            <Link to={'/forget'} className="forget_pass">Forget Password ?</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
