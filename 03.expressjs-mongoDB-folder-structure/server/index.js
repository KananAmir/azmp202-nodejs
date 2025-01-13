const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./routes/productRoute");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json());

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 8080;
// console.log(process.env.PORT);

app.use(cors());
app.use("/api/products", productRouter);

mongoose.connect(DB_URL).then(() => {
  console.log("Connected!");
  app.listen(PORT, () => {
    console.log(
      `Example app listening on port ${PORT}, 
      url is http://localhost:${PORT}`
    );
  });
});
