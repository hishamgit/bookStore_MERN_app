import express from "express";
import { PORT, mongoDbURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRouter from "./routes/booksRouter.js";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import { userAuthMiddleware } from "./middlewares/userAuth.js";

const app = express();

//middleware for handling cors
//option 1:allow all origins with default of cors();
app.use(cors({
  credentials: true,
  origin: true,
}));
//option 2:allow custom origins
// app.use(
//     cors({
//     origin:"http://localhost:3000",
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type']
// })
// )

//middleware for parsing request body
app.use(express.json());
//middleware for cookie
app.use(cookieParser());
//middlewares for Routers
app.use("/api/book", booksRouter);
app.use("/api/auth", authRouter);

app.get("/api", (req, res) => {
  res.status(234).send("Welcome buddy");
});
app.post("/api", userAuthMiddleware);

mongoose
  .connect(mongoDbURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
