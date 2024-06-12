const path = require("path");

const uploadImage = (req, res) => {
  console.log(req.file);
  const imageUrl = `http://localhost:5000/api/v1/image/${req.file.filename}`;
  res.status(201).send({
    statusCode: 201,
    message: "Image Upload Successfully!",
    data: { imageUrl: imageUrl, fileName: req.file.originalname },
  });
};

const getImage = (req, res) => {
  const { filename } = req.params;
  const dirname = path.resolve();
  const fullFilepath = path.join(dirname, "images/" + filename);
  return res.sendFile(fullFilepath);
};

module.exports = { uploadImage, getImage };
