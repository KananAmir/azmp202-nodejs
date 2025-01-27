const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config();
const DB_URL = process.env.DB_URL;

const conntectDb = async () => {
  try {
    mongoose.connect(DB_URL).then(() => {
      console.log("Connected!");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = conntectDb;
