const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const dotenv = require("dotenv");
dotenv.config();

// const token = jwt.sign({ foo: "bar" }, "shhhhh");

const register = async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Bu email artıq sistemdə var" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new UserModel({ ...req.body, password: hashedPassword });

    if (user) {
      return res.json({ message: "bu email artıq sistemdə var" });
    }
    await newUser.save();
    res.status(201).json({
      message: "user added successfully!",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(password);

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    console.log(user);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "unauthorized" });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 60 * 2,
      }
    );
    res.json({ token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
