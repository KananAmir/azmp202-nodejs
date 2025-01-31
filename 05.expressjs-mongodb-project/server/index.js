const express = require("express");
const productRouter = require("./routes/productRoute");
const categoryRouter = require("./routes/categoryRoute");
const authRouter = require("./routes/authRoute");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

dotenv.config();
const app = express();
app.use(express.json());

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 4000;
// console.log(process.env.PORT);

const conntectDb = require("./config/db");

app.use(cors());
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api", authRouter);

const nodemailer = require("nodemailer");

// ✉️ Nodemailer Transporter konfiqurasiyası
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "amirovknn@gmail.com", // Gmail e-poçt adresiniz
    pass: "Salam123", // Gmail üçün tətbiq şifrəniz
  },
});

// 📩 Email göndərən API
app.post("/send-email", async (req, res) => {
  console.log(req.body);

  const { to, subject, text } = req.body;

  try {
    const info = await transporter.sendMail({
      from: `"Admin" <amirovknn@gmail.com>`,
      to,
      subject,
      text,
    });

    res.status(200).json({ message: "Email göndərildi!", info });
  } catch (error) {
    res.status(500).json({ message: "Email göndərilmədi!", error });
  }
});
//middleware
// const logger = (req, res, next) => {
//   console.log("logger widdleware");
//   // console.log(req);
//   next();
// };
// app.get(
//   "/",
//   (req, res, next) => {
//     next();
//   },
//   (req, res) => {
//     res.json({ message: "home page" });
//   }
// );

// app.get("/home", logger, (req, res) => {
//   res.json({ message: "home" });
// });
// app.get("/about", logger, (req, res) => {
//   res.json({ message: "about" });
// });

//multer

// app.use("/static", express.static("uploads"));
// app.use("/static", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// const upload = multer({ dest: "uploads/" });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, //max: 5MB
});

app.post("/imageUpload", upload.single("image"), function (req, res, next) {
  console.log(req.file);
});

app.listen(PORT, () => {
  console.log(
    `Example app listening on port ${PORT}, 
    url is http://localhost:${PORT}`
  );
});

conntectDb();
