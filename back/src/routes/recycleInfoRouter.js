const recycleInfoRouter = require("express").Router();
const recycleInfoService = require("../services/recycleInfoService");
// const { body, validationResult } = require("express-validator");
// const loginRequired = require("../middlewares/loginRequired");

//post_recycle/info: 사용자의 이미지를 분석해 분리배출 방법을 안내한다.
recycleInfoRouter.post("/info", async (req, res, next) => {
  try {
    //사용자의 이미지
    const { img } = req.body;

    //안내할 분리배출 방법 정보
    const recycleInfo = await recycleInfoService.passImg({
      img,
    });

    res.status(201).json(recycleInfo);
  } catch (error) {
    next(error);
  }
});
module.exports = recycleInfoRouter;
