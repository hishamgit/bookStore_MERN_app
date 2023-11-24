import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const userAuthMiddleware = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false, message: "token not fond" });
  }
  jwt.verify(token, process.env.JWT_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false, message: "token verification failed" });
    } else {
      //   console.log(data);
      const user = await User.findById(data.id);
      if (user) {
        res.json({ status: true, user: user.username });
      } else {
        return res.json({ status: false, message: "user not found" });
      }
    }
  });
};
