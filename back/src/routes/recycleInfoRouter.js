const recycleInfoRouter = require("express").Router();
const recycleInfoService = require("../services/recycleInfoService");
// const { body, validationResult } = require("express-validator");
const loginRequired = require("../middlewares/loginRequired");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

recycleInfoRouter.use(loginRequired);

//post_recycle/info: 사용자의 이미지를 분석해 분리배출 방법을 안내한다.
recycleInfoRouter.post("/", upload.single("image"), async (req, res, next) => {
    try {
        const buffer = req.file.buffer;
        //인코딩 타입 인공지능 데이터 타입따라 변경
        const encoded = Buffer.from(buffer).toString("base64");

        const info = await recycleInfoService.analysisImg({ encoded });
        //인공지능 영역에서 디코딩 후, 분석
        // const decode = Buffer.from(encode, "base64");

        res.status(201).json(info);
    } catch (error) {
        next(error);
    }
});
module.exports = recycleInfoRouter;
