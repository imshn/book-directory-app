const express = require("express");
const router = express.Router();
const {
  CreateBook,
  getAllBooks,
  updateBookById,
  getBookById,
  deleteBookById,
} = require("../controller/bookController");

router.get("/books", getAllBooks);
router.post("/book/create", CreateBook);
router.put("/book/:bookId", updateBookById);
router.delete("/book/:bookId", deleteBookById);
router.get("/book/:bookId", getBookById);

module.exports = router;
