import express from "express";
import { PORT, mongoDbURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

//middleware for parsing request body
app.use(express.json());

app.get("/", (req, res) => {
  res.status(234).send("Welcome buddy");
});

app.post("/book", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res
        .status(400)
        .send({
          message: "send all required fields :title,author,publishYear",
        });
    }
    const Book1 = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book1 = await Book.create(Book1);
    res.status(201).send(book1);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route to get all books
app.get('/book',async(req,res)=>{
    try {
        const books=await Book.find()
        res.status(200).json({
            count:books.length,
            data:books
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message:error.message})
    }
})
//route to get one book by Id
app.get('/book/:id',async(req,res)=>{
    try {
        const id=req.params.id;                //same as   const {id}=req.params
        const book=await Book.findById(id)
        res.status(200).json({book});
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message:error.message})
    }
})
//route to update a book data
app.put('/book/:id',async(req,res)=>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            res.status(400).send({message: "send all required fields :title,author,publishYear"});
        }
        const {id}=req.params;
        const result=await Book.findByIdAndUpdate(id,req.body)
        if(!result){
            res.status(400).send({message: "book not found"});
        }else{
            res.status(200).send({message:"Updated successfully"});
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message:error.message})
    }
})
//route to delete a book
//route to get one book by Id
app.delete('/book/:id',async(req,res)=>{
    try {
        const {id}=req.params;               //same as   const id=req.params.id; 
        const result=await Book.findByIdAndDelete(id)
        if(!result){
            res.status(400).send({message: "book not found"});
        }else{
            res.status(200).send({message:"Deleted successfully"});
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message:error.message})
    }
})

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
