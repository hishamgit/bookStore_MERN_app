import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res.status(400).send({
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
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
//route to get one book by Id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id; //same as   const {id}=req.params
    const book = await Book.findById(id);
    res.status(200).json({ book });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
//route to update a book data
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res
        .status(400)
        .send({
          message: "send all required fields :title,author,publishYear",
        });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      res.status(400).send({ message: "book not found" });
    } else {
      res.status(200).send({ message: "Updated successfully" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
//route to delete a book
//route to get one book by Id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params; //same as   const id=req.params.id;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      res.status(400).send({ message: "book not found" });
    } else {
      res.status(200).send({ message: "Deleted successfully" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
