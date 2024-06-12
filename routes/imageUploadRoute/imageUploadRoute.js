const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const {
  uploadImage,
  getImage,
} = require("../../services/imageUploadService/imageUploadService");

const imagesDir = "images/";
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const imageUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, imagesDir);
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + "_" + file.originalname);
    },
  }),
});

router.post("/api/v1/upload", imageUpload.single("image"), uploadImage);
router.get("/api/v1/image/:filename", getImage);

module.exports = router;
