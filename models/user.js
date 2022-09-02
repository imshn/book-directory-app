const { Schema } = require("mongoose");

const userSchema = new Schema(
  {
    userId: { type: String, max: 25, required: true },
    userName: { type: String, required: true, max: 25 },
    type: {
      type: String,
      max: 25,
      default: "reader",
      enum: {
        values: ["reader", "author"],
        message: "{VALUE} is not valid",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { userSchema };
