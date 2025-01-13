const express = require("express");
const {
  getProducts,
  getProductById,
  deleteProduct,
  addNewData,
  updateData,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
router.post("/", addNewData);
router.put("/:id", updateData);

module.exports = router;
