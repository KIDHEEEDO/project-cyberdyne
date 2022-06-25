import { Router } from "express";
import recycleInfoService from "../services/recycleInfoService.js";

import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });

const recycleInfoRouter = Router();

//POST /recycle-info : 사용자가 등록한 이미지 분석, 분리배출 방법 안내
recycleInfoRouter.post("/", upload.single("image"), async (req, res, next) => {
  try {
    //사용자가 등록한 이미지 정보
    const imgBuffer = req.file.buffer;
    //이미지 정보 전달, 분석 결과
    const info = await recycleInfoService.analysisImg({ imgBuffer });

    if (info.errorMessage) {
      throw new Error(info.errorMessage);
    }

    res.status(201).json(info);
  } catch (error) {
    next(error);
  }
});

//GET /recycle-info/?code : 분리배출 방법 검색
recycleInfoRouter.get("/", async (req, res, next) => {
  try {
    //검색어를 받는다
    const code = req.query.code;

    //검색 결과
    const info = await recycleInfoService.getInfoByCode({
      code,
    });

    if (info.errorMessage) {
      throw new Error(info.errorMessage);
    }

    res.status(200).json(info);
  } catch (e) {
    next(e);
  }
});
export default recycleInfoRouter;
