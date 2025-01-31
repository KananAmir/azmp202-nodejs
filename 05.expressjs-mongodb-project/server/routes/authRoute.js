const express = require("express");
const { register, login } = require("../controllers/authController");
const { getAllUsers, editUser } = require("../controllers/userController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", getAllUsers);
router.patch("/users/:id", editUser);

module.exports = router;
