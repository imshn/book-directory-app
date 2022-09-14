const express = require("express");
const router = express.Router();
const {
  CreateBook,
  getAllBooks,
  updateBookById,
  getBookById,
  deleteBookById,
} = require("../controller/bookController");
const { checkIfAuthenticated, checkUserType } = require("../middleware/auth");
// public routes
router.get("/all", getAllBooks);
router.get("/:bookId", getBookById);

//  private routes
router.use(checkIfAuthenticated, checkUserType);
router.post("/create", CreateBook);
router.put("/:bookId", updateBookById);
router.delete("/:bookId", deleteBookById);

module.exports = router;
