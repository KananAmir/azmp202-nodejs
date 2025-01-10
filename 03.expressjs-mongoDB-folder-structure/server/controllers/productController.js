const ProductModel = require("../models/productModel");

const getAllProduct = async (req, res) => {
  console.log("aaa");

  try {
    const products = await ProductModel.find({});
    // console.log(products);
    // res.status.send()
    res.status(200).json({ data: products, message: "success!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const searchByTitle = async (req, res) => {
  const { title } = req.query;
  // console.log(title);

  try {
    // const products = await ProductModel.find({ title: title });
    const products = await ProductModel.find({
      title: { $regex: title, $options: "i" },
    });
    res.status(200).json({ data: products, message: "success!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "product not found!" });
    }

    res.status(200).json({ data: product, message: "success!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    const products = await ProductModel.find({});
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "failed to delete! | product not found!" });
    }
    res.status(200).json({
      deletedProduct: deletedProduct,
      message: "deleted successfully!",
      products: products,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const postProduct = async (req, res) => {
  const { title, description, price, category } = req.body;

  if (!title || !description || !price || !category) {
    return res
      .status(400)
      .json({ message: "Bad Request! All fileds should be add!" });
  }
  try {
    const newProduct = ProductModel({ ...req.body });
    await newProduct.save();
    res.status(201).json({
      message: "product added successfully!",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "product not found!",
      });
    }

    res.status(200).json({
      message: "updated successfully!",
      updatedProduct: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProduct,
  searchByTitle,
  getProductById,
  deleteProduct,
  postProduct,
  editProduct,
};
