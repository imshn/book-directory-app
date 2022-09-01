const { Schema } = require("mongoose");

const bookSchema = new Schema(
  {
    bookId: { type: String, max: 25 },
    bookName: { type: String, required: true, max: 25 },
    author: { type: String, required: true, max: 25 },
    genres: { type: String, required: true, max: 30 },
  },
  {
    timestamps: true,
  }
);

module.exports = { bookSchema };
