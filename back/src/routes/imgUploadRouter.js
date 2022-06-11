const imgUploadRouter = require("express").Router();
const upload = require("../middlewares/imgUploader.js");

imgUploadRouter.post(
  "/postImg",
  upload.array("image"),
  async (req, res, next) => {
    try {
      res.status(201).json("good");
    } catch (error) {
      next(error);
    }
  }
);

module.exports = imgUploadRouter;
