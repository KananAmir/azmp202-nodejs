const express = require("express");
const {
  getAllProducts,
  getProductById,
  deleteProduct,
  postProduct,
  editProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
router.post("/", postProduct);
router.put("/:id", editProduct);

module.exports = router;
