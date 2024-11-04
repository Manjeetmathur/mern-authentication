import React, { useEffect, useRef, useState } from "react";
import "./auth.css";
import { FaFingerprint } from "react-icons/fa";
import Button from "../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import BackToLogin from "../ui/BackToLogin";
import Timer from "./Timer";
import toast from "react-hot-toast";
import LoadingButton from "../ui/LoadingButton";
const VerifyOTP = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);

  const [loading, setLoading] = useState(false);
  const [expire, setExpire] = useState(false);

  const inputRef = [ref1, ref2, ref3, ref4, ref5, ref6];

  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp5, setOtp5] = useState("");
  const [otp6, setOtp6] = useState("");

  const inputOtp = [setOtp1, setOtp2, setOtp3, setOtp4, setOtp5, setOtp6];

  const navigate = useNavigate();

  const [time, setTime] = useState(null);

  useEffect(() => {
    if (ref1.current) {
      ref1.current.focus();
    }
  }, []);

  const inputChange = (event, location) => {
    if (location < 5 && event.target.value) {
      inputRef[location + 1].current.focus();
    }
    inputOtp[location](event.target.value);
  };

  const token = localStorage.getItem("otp-token");

  useEffect(() => {
    const getTime = async () => {
      try {
        
      console.log("HIIII");
        const data = await fetch("http://localhost:5555/user/otp", {
          method : "POST",
          body : JSON.stringify({token}),
          headers : {
            "Content-Type": "application/json"
          }
        });
        
      console.log("HIIII");
        const response = await data.json();
        if (response.success) {
          const remainingTime =
            new Date(response.data).getTime() - new Date().getTime();
          // console.log("remain ", remainingTime);

          if (remainingTime > 0) {
            setTime(remainingTime);
          } else {
            setExpire(true);
          }
          // console.log(response.data);
        }
      } catch (error) {}
    };
    getTime();
  }, []);

  // console.log("time  : ",time);

  const finalOtp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // console.log(finalOtp);
      const data = await fetch("http://localhost:5555/user/otp", {
        method: "POST",
        body: JSON.stringify({ otp: finalOtp }),
        headers: { "Content-Type": "application/json" },
      });
      const response = await data.json();
      setLoading(false);
      if (response.success) {
        toast.success(response.message);
        setTime(1*60000)
        setExpire(true)
        navigate("/password/updatePassword");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const resendHandler = async(e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const data = await fetch("/user/forget-password",{
        method : "Post",
        body : JSON.stringify({email : localStorage.getItem("email")}),
        headers : {"Content-Type": "application/json"}
      })

      const response = await data.json()
      setLoading(false)
      if(response.success){
        navigate('/otp/verifyOTP')
        localStorage.setItem("otp-token",response.data)
        toast.success(response.message)

      }else{
        toast.error(response.message)
      }
      
    } catch (error) {
      toast.error(error.meassage)
    }
  }

  return (
    <div className="auth_main">
      <form action="" onSubmit={submitHandler}>
        <div className="auth_container">
          <div className="auth_header">
            <div className="auth_icon">
              <FaFingerprint />
            </div>
            <p className="auth_heading">Verify OTP</p>
            <p className="auth_desc">
              Enter your 6-digit OTP we have just sent at your mail
            </p>
          </div>
          <div className="auth_item">
            <label htmlFor="">OTP *</label>
            <div className="otp_input">
              {inputRef.map((item, index) => {
                return (
                  <input
                    required
                    key={index}
                    onChange={(event) => inputChange(event, index)}
                    ref={item}
                    onInput={(event) => {
                      if (event.target.value.length > 1) {
                        event.target.value = event.target.value.slice(0, 1);
                      }
                    }}
                    type="number"
                    className="ui_input input_digit"
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="auth_action">
          <Button type="submit">
            <LoadingButton loading={loading} title="verify" />
          </Button>
        </div>
        <div className="">
          {time !== null && !expire ? (
            <Timer setExpire={setExpire} time={time} />
          ) : (
            <div className="forget_pass timer" onClick={resendHandler} >resend otp</div>
          )}
        </div>
        <div className="">
          <Link to={"/login"} className="forget_pass">
            <BackToLogin>Back to login</BackToLogin>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default VerifyOTP;
