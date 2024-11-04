import React, { useState } from "react";
import "./auth.css";
import Input from "../ui/Input";
import { GrUpdate } from "react-icons/gr";
import Button from "../ui/Button";
import { Link , useNavigate} from "react-router-dom";
import BackToLogin from "../ui/BackToLogin";
import toast from "react-hot-toast";
import LoadingButton from "../ui/LoadingButton";
import { url } from "../components/BackendLink";
const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate()
  const [loading,setLoading]=useState(false)

  const submitHandler = async(event) => {
    event.preventDefault();
    const token = localStorage.getItem("otp-token")
    try {
      setLoading(true)
      const data = await fetch(`${url}/user/update-password`,{
        method:"PATCH",
        body:JSON.stringify({token,password,confirmPassword}),
        headers : {"Content-Type" : "application/json"}
      })
      
      // console.log("hii");
      const response = await data.json()
      // console.log("hii");
      setLoading(false)
      if(response.success){
        toast.success(response.message)
        navigate("/login")
      }
      else{
        toast.error(response.message)
      }

    } catch (error) {
      toast.error(error)
    }
  };
  return (
    <div className="auth_main">
      <form action="" onSubmit={submitHandler}>
        <div className="auth_container">
          <div className="auth_header">
            <div className="auth_icon">
              <GrUpdate />
            </div>
            <p className="auth_heading">Update Password</p>
            <p className="auth_desc">Enter your new password </p>
          </div>
          <div className="auth_item">
            <label htmlFor="">Password *</label>
            <Input
              placeholder="Enter Your Password . . . "
              type="text"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="auth_item">
            <label htmlFor="">Confirm Password *</label>
            <Input
              placeholder="Confirm Your Password . . . "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="text"
              required
            />
          </div>
          <div className="auth_action">
            <Button type="submit">
              <LoadingButton loading={loading} title="Update Password"/>
            </Button>
          </div>
          <div className="auth_option">
            <Link to={"/login"} className="forget_pass backtologin">
              <BackToLogin>Back to login</BackToLogin>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
