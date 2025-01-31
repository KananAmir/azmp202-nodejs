const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const register = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Bu email artıq istifadə edilib!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = UserModel({ ...req.body, password: hashedPassword });
    await newUser.save();
    res.status(201).json({
      message: "successfully registered!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    // if (!user) {
    //   return res.status(400).json({ message: "email yanlışdır!" });
    // }

    // const isPasswordMatch = await bcrypt.compare(password, user.password);

    // if (!isPasswordMatch) {
    //   return res.status(400).json({ message: "password yanlışdır!" });
    // }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ message: "email və ya password yanlışdır!" });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      //   { expiresIn: 60 * 60 },
      { expiresIn: "1h" }
    );

    // console.log(token);

    res.status(200).json({
      message: "login uğurla tamamlandı!",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { register, login };
