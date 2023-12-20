const path = require("path");
const ImageModel = require("./model");
const multer = require("multer");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

const imageUpload = async (req, res) => {
  const { filename } = req.file;
  try {
    const newImage = new ImageModel({ image: filename });
    const saveImage = await newImage.save();
    res.status(200).json({ data: saveImage });
  } catch (error) {
    res.status(500).json({ message: "Error aayo", error });
  }

  console.log(filename);
};

const getImage = async (req, res) => {
  try {
    const img = await ImageModel.find();
    res.status(200).json({ image: img });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = { imageUpload, upload,getImage };
