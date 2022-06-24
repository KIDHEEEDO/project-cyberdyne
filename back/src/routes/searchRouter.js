import { Router } from "express";
import searchService from "../services/searchService.js";

const searchRouter = Router();

//GET /search : 분리배출 방법 검색
searchRouter.get("/", async (req, res, next) => {
  try {
    //검색어를 받는다
    const text = req.query.text;

    //검색 결과
    const searchedDataList = await searchService.getInfoByText({
      text,
    });

    if (searchedDataList.errorMessage) {
      throw new Error(searchedDataList.errorMessage);
    }

    res.status(200).json(searchedDataList);
  } catch (e) {
    next(e);
  }
});

export default searchRouter;
