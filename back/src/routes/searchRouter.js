const searchRouter = require("express").Router();
const searchService = require("../services/searchService");
const loginRequired = require("../middlewares/loginRequired");

searchRouter.use(loginRequired);

searchRouter.get("/", async (req, res, next) => {
  try {
    const text = req.query.text;

    const searchedData = await searchService.getInfoByText({
      text,
    });

    if (searchedData.errorMessage) {
      throw new Error(searchedData.errorMessage);
    }

    res.status(200).json(searchedData);
  } catch (e) {
    next(e);
  }
});

module.exports = searchRouter;
