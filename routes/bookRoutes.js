const express = require("express");
const router = express.Router();
const {
  CreateBook,
  getAllBooks,
  updateBookById,
  getBookById,
  deleteBookById,
} = require("../controller/bookController");
const { checkLoggedIn, checkUserType } = require("../middleware/auth");

router.get("/books", getAllBooks);
router.post("/book/create", checkLoggedIn, CreateBook);
router.put("/book/:bookId", checkLoggedIn, checkUserType, updateBookById);
router.delete("/book/:bookId", checkLoggedIn, checkUserType, deleteBookById);
router.get("/book/:bookId", getBookById);

module.exports = router;
