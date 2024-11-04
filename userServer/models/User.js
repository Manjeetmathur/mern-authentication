// import { required, types } from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    otp: {
      otp: { type: String },
      sendTime: { type: Number },
      token: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);

