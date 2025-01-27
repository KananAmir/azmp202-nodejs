const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    stock: { type: Number, required: true },
    image: { type: String, required: true },
    ratings: { type: Number, default: 0 },
    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: String,
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const ProductModel = mongoose.model("Products", ProductSchema);

module.exports = ProductModel;
