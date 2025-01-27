const express = require("express");
const productRouter = require("./routes/productRoute");
const categoryRouter = require("./routes/categoryRoute");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json());

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 8080;
// console.log(process.env.PORT);

const conntectDb = require("./config/db");

app.use(cors());
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);

app.listen(PORT, () => {
  console.log(
    `Example app listening on port ${PORT}, 
    url is http://localhost:${PORT}`
  );
});

conntectDb();
