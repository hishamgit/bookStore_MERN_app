import express from "express";
import { PORT, mongoDbURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRouter from "./routes/booksRouter.js";
import cors from "cors";

const app = express();

//middleware for handling cors
//option 1:allow all origins with default of cors();
// app.use(cors());
//option 2:allow custom origins
app.use(
    cors({
    origin:"http://localhost:3000",
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type']
})
)
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
