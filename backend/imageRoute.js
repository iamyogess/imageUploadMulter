const express = require("express");
const router = express.Router();

const { imageUpload, upload, getImage } = require("./imageController");

router.post("/upload", upload.single("file"), imageUpload);
router.get("/getimage", getImage);

module.exports = router;
