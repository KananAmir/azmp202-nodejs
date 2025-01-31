const express = require("express");
const {
  getAllProducts,
  getProductById,
  deleteProduct,
  postProduct,
  editProduct,
} = require("../controllers/productController");
const { productImageUpload } = require("../middlewares/multerMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware(["user", "admin"]), getAllProducts);
router.get("/:id", authMiddleware(["user", "admin"]), getProductById);
router.delete("/:id", authMiddleware(["admin"]), deleteProduct);
router.post(
  "/",
  authMiddleware(["admin"]),
  productImageUpload.single("image"),
  postProduct
);
router.put("/:id", authMiddleware(["admin"]), editProduct);

module.exports = router;
