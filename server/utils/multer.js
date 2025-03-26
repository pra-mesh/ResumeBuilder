const multer = require("multer");
const storage = (storageloaction = "public/uploads") =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, storageloaction);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });
const upload = (storage, fileSize = 1000000) =>
  multer({
    storage,
    limits: { fileSize },
    // Add file filters (png, jpg, jpeg)
  });

module.exports = { storage, upload, multer };
