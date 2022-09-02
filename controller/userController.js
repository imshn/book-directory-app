const { userSchema } = require("../models/user");
const { model } = require("mongoose");
const { validateUser } = require("../utils/utilities");

const createUser = async (req, res) => {
  const reqData = req.body;
  try {
    const { error } = validateUser(reqData);
    if (error) return res.status(400).send(error.details[0].message);
    else {
      let userModel = model("Users", userSchema);

      let userData = new userModel(reqData);
      const newUser = await userData.save();

      if (!newUser) return res.status(400).send("User could not be created!");
      req.session.user = newUser;
      return res.status(201).send({ user: newUser });
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const login = async (req, res) => {
  const reqData = req.body;
  try {
    let userModel = model("Users", userSchema);
    let user = await userModel.findOne({ userName: reqData.username });
    if (!user) return res.status(404).send({ message: "User does not exist!" });
    req.session.user = user;
    res.status(200).send({ user: user });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const logout = async (req, res) => {
  const reqData = req.body;
  try {
    let userModel = model("Users", userSchema);
    let user = await userModel.findOne({ userId: reqData.userId });
    if (!user) return res.status(404).send({ message: "User does not exist!" });
    req.session.destroy(() => {
      console.log("Logged out!");
    });
    res.status(200).send({ message: "You have been logged out!" });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const getUserTypeById = async (req, res) => {};

module.exports = { createUser, getUserTypeById, login, logout };
