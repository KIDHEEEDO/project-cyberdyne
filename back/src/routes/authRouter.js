const authRouter = require("express").Router();
const kakaoService = require("../services/kakaoService");
const naverService = require("../services/naverService");

authRouter.get("/kakao", async (req, res, next) => {
    try {
        const code = req.query.code;

        const user = await kakaoService.getToken({ code });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

authRouter.get("/naver", async (req, res, next) => {
    try {
        const code = req.query.code;

        const user = await naverService.getToken({ code });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

module.exports = authRouter;
