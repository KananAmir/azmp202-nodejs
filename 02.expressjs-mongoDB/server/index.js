const express = require("express");
const mongoose = require("mongoose");
// const pw = "azmp202";

const app = express();
const PORT = 8080;

app.use(express.json());
const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const ProductModel = mongoose.model("Products", ProductSchema);

//get all
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

//search by title
app.get("/api/products/search", async (req, res) => {
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
});

// get one
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

// delete one
app.delete("/api/products/:id", async (req, res) => {
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
});

// add one
app.post("/api/products", async (req, res) => {
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
});

// update

app.put("/api/products/:id", async (req, res) => {
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
});

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
