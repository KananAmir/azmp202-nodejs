const express = require("express");
const {
  getAllCategories,
  getCategoryById,
  deleteCategory,
  postCategory,
  editCategory,
} = require("../controllers/categoryController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware(["user", "admin"]), getAllCategories);
router.get("/:id", authMiddleware(["user", "admin"]), getCategoryById);
router.delete("/:id", authMiddleware(["admin"]), deleteCategory);
router.post("/", authMiddleware(["admin"]), postCategory);
router.put("/:id", authMiddleware(["admin"]), editCategory);

module.exports = router;
