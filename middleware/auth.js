const { model } = require("mongoose");
const { userSchema } = require("../models/user");

const checkIfAuthenticated = (req, res, next) => {
  if (!req.session.user)
    return res.status(401).send("You must be logged in to view this page.");
  return next();
};

const checkUserType = (req, res, next) => {
  if (req.session.user.type === "reader")
    return res
      .status(403)
      .send("You must be the author to make any changes to this book.");
  return next();
};

const checkIfUserExists = async (req, res, next) => {
  let reqData = req.body;
  let userModel = model("Users", userSchema);
  let user = await userModel.findOne({
    userName: reqData.userName,
  });
  if (user) return res.status(409).send("Username Already Exist!");
  return next();
};

module.exports = { checkIfAuthenticated, checkUserType, checkIfUserExists };
