const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./routes/productRoute");
const dotenv = require("dotenv");
dotenv.config();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 8080;
// console.log(process.env.PORT);

const app = express();
app.use(express.json());

app.use("/api/products", productRouter);

mongoose.connect(DB_URL).then(() => {
  console.log("Connected!");
  app.listen(PORT, () => {
    console.log(
      `Example app listening on port ${PORT}, url is http://localhost:${PORT}`
    );
  });
});
