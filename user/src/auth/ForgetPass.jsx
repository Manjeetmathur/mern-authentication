import React, { useState } from "react";
import "./auth.css";
import Input from "../ui/Input";
import { CiLogin } from "react-icons/ci";
import Button from "../ui/Button";
import { Link , useNavigate} from "react-router-dom";
import BackToLogin from "../ui/BackToLogin";
import toast from "react-hot-toast";
import LoadingButton from "../ui/LoadingButton";
const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate()
  const [loading,setLoading]=useState(false)
  //hii

  
  const submitHandler = async(event) => {
    event.preventDefault();
    try {
      setLoading(true)
      
      const data = await fetch("http://localhost:5555/user/forget-password", {
        method : "POST",
        body : JSON.stringify({email}),
        headers : {
          "Content-Type": "application/json"
        }
      });

      const response = await data.json()
      setLoading(false)
      if(response.success){
        
        localStorage.setItem("email",email)
        navigate('/otp/verifyOTP')
        localStorage.setItem("otp-token",response.data)
        toast.success(response.message)

      }else{
        toast.error(response.message)
      }
      
    } catch (error) {
      toast.error(error.meassage)
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
            <p className="auth_heading">Forgot Your Password</p>
            <p className="auth_desc">Enter Your Registered Email, we will send 6-digit OTP </p>
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
          
          <div className="auth_action">
            
              <Button type='submit'>
                <LoadingButton loading={loading} title="Send OTP"/>
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

export default ForgetPass