import express from "express";
import { User } from "../models/userModel.js";
import { createSecretToken } from "../util/secretToken.js";


const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { email, username, password, createdAt } = req.body;
    if (!(email && password && username )) {
      res.status(400).send("All input is required");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "user already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id, email, username);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
    });
    res
      .status(201)
      .json({ message: "User signed up successfully", success: true, user });
  } catch (error) {
    console.log(error);
  }
});


export default authRouter;
