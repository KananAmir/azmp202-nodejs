const ProductModel = require("../models/productModel");

const getAllProducts = async (req, res) => {
  try {
    // const { name, sortBy = "name", order = "asc" } = req.query;
    const { name, sortBy, order, page = 1, limit } = req.query;

    let filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }
    const products = await ProductModel.find(filter)
      .populate("category", "name description")
      .sort({
        [sortBy]: order === "asc" ? 1 : -1,
      })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await ProductModel.countDocuments(filter);

    // console.log(total);

    res.status(200).json({
      data: products,
      currentPage: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
      message: "success!",
    });
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
  getAllProducts,
  getProductById,
  deleteProduct,
  postProduct,
  editProduct,
};
