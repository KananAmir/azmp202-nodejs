const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRouter = require("./routes/productRoute");

const DB_URL =
  "mongodb+srv://kananamirov:kananamirov@cluster0.dxome.mongodb.net/Wines?retryWrites=true&w=majority&appName=Cluster0";
const PASSWORD = "kananamirov";
const PORT = 8080;
const app = express();
app.use(cors());
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use(express.json());
app.use("/api/wines", productRouter);

mongoose.connect(DB_URL).then(() => {
  console.log("Connected!");
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
});
