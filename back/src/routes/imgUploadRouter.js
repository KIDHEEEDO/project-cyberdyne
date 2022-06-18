const imgUploadRouter = require("express").Router();
const upload = require("../middlewares/imgUploader.js");

imgUploadRouter.post(
  "/post-img",
  upload.array("image"),
  async (req, res, next) => {
    try {
      const files = req.files;
      const imgUrl = [];
      files.map((file) => imgUrl.push(file.location));

      const result = { message: "success", data: imgUrl };
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = imgUploadRouter;
