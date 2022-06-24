import { Router } from "express";
import recycleInfoService from "../services/recycleInfoService.js";

import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });

const recycleInfoRouter = Router();

//POST /recycleInfo : 사용자가 등록한 이미지 분석, 분리배출 방법 안내
recycleInfoRouter.post("/", upload.single("image"), async (req, res, next) => {
  try {
    //사용자가 등록한 이미지 정보
    const buffer = req.file.buffer;
    //이미지 정보를 인코딩
    const encoded = Buffer.from(buffer).toString("base64");
    //이미지 정보 전달, 분석 결과
    const info = await recycleInfoService.analysisImg({ encoded });

    //인공지능 영역에서 디코딩 후, 분석
    // const decode = Buffer.from(encode, "base64");

    res.status(201).json(info);
  } catch (error) {
    next(error);
  }
});
export default recycleInfoRouter;
