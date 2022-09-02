const router = require("express").Router();
const {
  createUser,
  getUserTypeById,
  login,
  logout,
} = require("../controller/userController");
router.post("/user/create", createUser);
router.get("/users/:userId", getUserTypeById);
router.post("/user/logout", logout);
router.post("/user/login", login);

module.exports = router;
