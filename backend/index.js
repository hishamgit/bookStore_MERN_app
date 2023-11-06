import express from "express";
import { PORT, mongoDbURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRouter from "./routes/booksRouter.js";

const app = express();

//middleware for parsing request body
app.use(express.json());
//middleware for booksRouter
app.use('/book',booksRouter);

app.get("/", (req, res) => {
  res.status(234).send("Welcome buddy");
});



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
