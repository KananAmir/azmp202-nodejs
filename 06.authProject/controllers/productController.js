const ProductModel = require("../models/productModel");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const getProducts = async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);

  try {
    if (!token) {
      return res.status(401).json({ message: "token tələb olunur!" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log(decoded);

    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized! You are not an admin!" });
    }

    const products = await ProductModel.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
const getProductById = async (req, res) => {
  //   const id = req.params.id;
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "product not found!" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "product not found!" });
    }
    res.status(200).json({
      message: "deleted successfully!",
      deletedProdouct: product,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const addNewData = async (req, res) => {
  console.log(req.body);

  try {
    const newProduct = ProductModel({ ...req.body });
    await newProduct.save();
    res.json({ message: "product added successfully", newProduct: newProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateData = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "product not found!" });
    }
    res.json({
      message: "product updated successfully",
      updatedProduct: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  addNewData,
  updateData,
};
