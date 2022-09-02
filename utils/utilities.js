const Joi = require("joi");

const validateBook = (book) => {
  const schema = Joi.object({
    bookId: Joi.string().min(3).required(),
    bookName: Joi.string().min(3).required(),
    author: Joi.string().min(3).required(),
    genres: Joi.string().min(3),
  });
  return schema.validate(book);
};

const validateUser = (book) => {
  const schema = Joi.object({
    userId: Joi.string().min(3).required(),
    userName: Joi.string().min(3).required(),
    type: Joi.string().valid(...["reader", "author"]),
  });
  return schema.validate(book);
};

module.exports = { validateBook,validateUser };
