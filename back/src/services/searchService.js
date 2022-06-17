const RecycleInfo = require("../models/funcs/RecycleInfo");

const searchService = {
  getInfoByText: async ({ text }) => {
    const searchedDataList = await RecycleInfo.searchData({ text });

    return { message: "success", data: searchedDataList };
  },
};

module.exports = searchService;
