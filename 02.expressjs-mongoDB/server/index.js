const express = require("express");
const mongoose = require("mongoose");
// const pw = "azmp202";

const app = express();
const PORT = 8080;

const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const ProductModel = mongoose.model("Products", ProductSchema);

app.get("/api/products", async (req, res) => {
  try {
    const products = await ProductModel.find({});
    // console.log(products);
    // res.status.send()
    res.status(200).json({ data: products, message: "success!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
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
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "failed to delete! | product not found!" });
    }
    res.status(200).json({
      deletedProduct: deletedProduct,
      message: "deleted successfully!",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.post("/api/products", async (req, res) => {});
app.put("/api/products/:id", async (req, res) => {});

mongoose
  .connect(
    "mongodb+srv://amirovknn:azmp202@cluster0.knpfe.mongodb.net/amirovkanan?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected!");
    app.listen(PORT, () => {
      console.log(
        `Example app listening on port ${PORT}, url is http://localhost:${PORT}`
      );
    });
  });
