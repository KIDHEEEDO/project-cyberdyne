import { Router } from "express";
import kakaoService from "../services/kakaoService.js";
import naverService from "../services/naverService.js";

const authRouter = Router();

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

export default authRouter;
