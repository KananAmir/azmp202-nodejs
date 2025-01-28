const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const productImageUpload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, //max: 5MB
});

module.exports = { productImageUpload };
