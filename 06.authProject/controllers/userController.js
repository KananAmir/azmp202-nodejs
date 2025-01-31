const UserModel = require("../models/userModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});

    res.status(200).json({ data: users, message: "success!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "category not found!" });
    }

    res.status(200).json({ data: user, message: "success!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deleteUser) {
      return res
        .status(404)
        .json({ message: "failed to delete! | product not found!" });
    }
    res.status(200).json({
      deletedUser,
      message: "deleted successfully!",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "user not found!",
      });
    }

    res.status(200).json({
      message: "updated successfully!",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  editUser,
};
