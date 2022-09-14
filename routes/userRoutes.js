const router = require("express").Router();
const {
  createUser,
  //   getUserTypeById,
  login,
  logout,
} = require("../controller/userController");
const { checkIfUserExists } = require("../middleware/auth");
router.post("/create", checkIfUserExists, createUser);
// router.get("/users/:userId", getUserTypeById);
router.post("/logout", logout);
router.post("/login", login);

module.exports = router;
