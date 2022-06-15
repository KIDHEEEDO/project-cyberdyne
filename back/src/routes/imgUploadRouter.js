const imgUploadRouter = require("express").Router();
const upload = require("../middlewares/imgUploader.js");

imgUploadRouter.post(
  "/post-img",
  upload.array("image"),
  async (req, res, next) => {
    try {
      //array선언에 따른 전체 정보 다루는 방향으로 수정 필요
      const imgUrl = req.files[0].location;

      const result = { message: "success", data: imgUrl };
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = imgUploadRouter;
