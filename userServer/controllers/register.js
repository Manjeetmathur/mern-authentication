import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import joi from "joi";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendMail from "../utils/sendMail.js";
const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // console.log(name, email, password, confirmPassword);

  try {
    if (password !== confirmPassword) {
      throw new Error("Password does not match . . .");
    }

    const finduser = await User.findOne({ email });

    if (finduser) {
      throw new Error("User Already registered . . .");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();

    return res.status(200).json({
      message: "user registered successfully . . .",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    if (!email || !password) {
      throw new Error("All fields are required . . .");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    // console.log(user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    // console.log(isPasswordValid);

    if (!isPasswordValid) {
      throw new Error("password is invalid . . .");
    }

    const tokenData = {
      _id: user._id,
      email: user.email,
    };

    const accessToken = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: 60 * 60 * 8,
    });
    const tokenOption = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("accessToken", accessToken, tokenOption).json({
      message: "login Successfully",
      data: accessToken,
      success: true,
      error: false,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    // console.log("user -forgt :", user);

    if (!user) {
      throw new Error("user not Found . . .");
    }
    // console.log(user.otp.otp,new Date(user.otp.sendTime).getTime(),new Date().getTime());
    const ans = user.otp.otp && user.otp.sendTime > new Date().getTime();
    // console.log("ans ", ans);

    if (ans) {
      throw new Error(
        `please wait until ${new Date(user.otp.sendTime).toLocaleTimeString()}`
      );
    }
    const otp = Math.floor(Math.random() * 90000) + 100000;

    const token = crypto.randomBytes(32).toString("hex");
    user.otp.otp = otp;
    user.otp.sendTime = new Date().getTime() + 1 * 60000;
    user.otp.token = token;
    // console.log(token,otp);

    await user.save();
    sendMail(otp, email);

    res.status(200).json({
      message: "OTP sent successfully",
      data: token,
      success: true,
      error: false,
    });
  } catch (error) {
    res.json({
      message: error,
      success: false,
    });
  }
};

const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  console.log("otp", otp);

  try {
    if (!otp) {
      throw new Error("Please enter otp. . . ");
    }
    const user = await User.findOne({ "otp.otp": otp });
    // console.log("user : ", user);

    if (!user) {
      // console.log("otp crass");
      res.status(400).json({ message: "enter correct OTP . . . " });
    }
    if (new Date(user.otp?.sendTime).getTime() < new Date().getTime()) {
      user.otp.otp = null;
      throw new Error("OTP Expired . . .");
    }
    user.otp.otp = null;
    await user.save();
    res.status(200).json({
      message: "OTP verified",
      success: true,
      error: false,
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

const updatePassowrd = async (req, res) => {
  const { token, password, confirmPassword } = req.body;

  try {
    // console.log(token, password, confirmPassword);
    const isPasswordMatched = confirmPassword === password;
    if (isPasswordMatched) {
      const hashPassword = await bcrypt.hash(password, 10);
      await User.findOneAndUpdate(
        { "otp.token": token },
        {
          $set: {
            password: hashPassword,
            "otp.token": null,
            "otp.sendTime": null,
          },
        },
        { new: true }
      );

      res.status(200).json({
        message: "Password Updated successsfully",
        success: true,
        error: false,
      });
    } else {
      console.log("hii");

      res.status(200).json({
        message: "Password not matched",
        success: false,
        error: true,
      });
      //  console.log(err);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getOtpTime = async (req, res) => {
  const { token } = req.body;
  // console.log(token);

  try {
    const user = await User.findOne({ "otp.token": token });
    if (!user) {
      throw new Error("Something went wrong . . .");
    } else {
      // console.log("manjeet");

      // console.log(user.otp.sendTime);

      res.status(200).json({
        message: "",
        success: true,
        error: false,
        data: user.otp.sendTime,
      });
    }
  } catch (error) {
    res.status(200).json({
      message: "something went wrong . . . ",
      success: false,
      error: true,
    });
  }
};

const getAccess = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await User.findOne({ "otp.token": token });
    if (user.otp.token === null) {
      throw new Error("Something went wrong");
    }

    res.status(200).json({
      message: "",
      success: true,
      error: false,
    });
  } catch (error) {
    
  }
};

export {
  register,
  login,
  forgetPassword,
  verifyOtp,
  getAccess,
  updatePassowrd,
  getOtpTime,
};

function validateUser(data) {
  const userSchema = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required(),
  });
  return userSchema.validate(data);
}
