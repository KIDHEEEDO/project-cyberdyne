const recycleInfoRouter = require("express").Router();
const recycleInfoService = require("../services/recycleInfoService");
// const { body, validationResult } = require("express-validator");
// const loginRequired = require("../middlewares/loginRequired");

//post_recycle/info: 사용자의 이미지를 분석해 분리배출 방법을 안내한다.
recycleInfoRouter.post("/info", async (req, res, next) => {
  try {
    //사용자의 이미지
    const { img } = req.body;

    const info = await recycleInfoService.analysisImg({ encoded });
    //인공지능 영역에서 디코딩 후, 분석
    // const decode = Buffer.from(encode, "base64");
    //
    res.status(201).json(info);
  } catch (error) {
    next(error);
  }
});
module.exports = recycleInfoRouter;
