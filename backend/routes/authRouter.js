import express from "express";
import { User } from "../models/userModel.js";
import { createSecretToken } from "../util/secretToken.js";
import bcrypt from "bcrypt";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { email, username, password, createdAt } = req.body;
    if (!(email && password && username)) {
      return res.status(400).json({ message: "All input is required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "user already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id, email, username);
    res.cookie("token", token, {
      withCredentials: true,
    //   httpOnly: true,
    });
    res
      .status(201)
      .json({ message: "User signed up successfully", success: true, user });
  } catch (error) {
    console.log(error);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({ message: "enter each field " });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found " });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(400).json({ message: "password is incorrect " });
    }
    const token = createSecretToken(user._id, email, user.username);
    res.cookie("token", token, {
      withCredentials: true,
    //   httpOnly: false, //false
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true });
  } catch (error) {
    console.error(error);
  }
});
export default authRouter;
