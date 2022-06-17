const searchRouter = require("express").Router();
const searchService = require("../services/searchService");
const loginRequired = require("../middlewares/loginRequired");

searchRouter.use(loginRequired);

searchRouter.get("/", async (req, res, next) => {
  try {
    const text = req.query.text;

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

module.exports = searchRouter;
