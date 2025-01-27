const CategoryModel = require("../models/categoryModel");
const ProductModel = require("../models/productModel");

const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find({});

    res.status(200).json({ data: categories, message: "success!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({ message: "category not found!" });
    }

    res.status(200).json({ data: category, message: "success!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await CategoryModel.findByIdAndDelete(id);
    await ProductModel.deleteMany({ category: { _id: id } });
    const categories = await CategoryModel.find({});
    if (!deleteCategory) {
      return res
        .status(404)
        .json({ message: "failed to delete! | product not found!" });
    }
    res.status(200).json({
      deleteCategory: deleteCategory,
      message: "deleted successfully!",
      categories,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const postCategory = async (req, res) => {
  try {
    const newCategory = CategoryModel({ ...req.body });
    await newCategory.save();
    res.status(201).json({
      message: "category added successfully!",
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        message: "category not found!",
      });
    }

    res.status(200).json({
      message: "updated successfully!",
      updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  deleteCategory,
  postCategory,
  editCategory,
};
