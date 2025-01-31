const express = require("express");
const {
  getAllUsers,
  getUserById,
  deleteUser,
  editUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.put("/:id", editUser);

module.exports = router;
