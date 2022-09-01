const { bookSchema } = require("../models/book");
const { model } = require("mongoose");
const Joi = require("joi");

// create controller
const CreateBook = (req, res, next) => {
  const reqData = req.body;

  try {
    let { error } = validateBook(reqData);
    if (error) return res.status(400).send(error.details[0].message);
    else {
      let bookModel = model("Books", bookSchema);
      let bookData = new bookModel(reqData);

      bookData.save((err, book) => {
        if (err) {
          res.status(500).send(err.message);
        } else {
          res.status(201).send(book);
        }
      });
    }
  } catch (err) {
    req.status(500).send(err.message);
  }
};

// fecth all books 
const getAllBooks = (req, res, next) => {
  try {
    const bookModel = model("Books", bookSchema);

    bookModel.find((err, response) => {
      if (err) {
        res.status(404).send(err.message);
      } else {
        res.status(200).send({ books: response });
      }
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// update a particular book
const updateBookById = async (req, res, next) => {
  try {
    const reqData = req.body;
    const bookModel = model("Books", bookSchema);
    const book = await bookModel.findOneAndUpdate(
      { bookId: req.params.bookId },
      { ...reqData },
      { new: true }
    );
    res.status(201).send(book);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


// delete a particular
const deleteBookById = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const bookModel = model("Books", bookSchema);
    const book = await bookModel.findOneAndDelete(
      { bookId: bookId },
      { new: true }
    );
    if (!book) return res.status(400).send("Cannot Delete this book");
    res.status(200).send({ message: "Book deleted successfully", book });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// fetch a particular book
const getBookById = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const bookModel = model("Books", bookSchema);
    const book = await bookModel.findOne({ bookId: bookId });
    if (!book) return res.status(404).send({ message: "Could not find book" });
    res.status(200).send({ book });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//  validate book data
const validateBook = (book) => {
  const schema = Joi.object({
    bookId: Joi.string().min(3).required(),
    bookName: Joi.string().min(3).required(),
    author: Joi.string().min(3).required(),
    genres: Joi.string().min(3),
  });
  return schema.validate(book);
};

module.exports = {
  CreateBook,
  getAllBooks,
  updateBookById,
  deleteBookById,
  getBookById,
};
