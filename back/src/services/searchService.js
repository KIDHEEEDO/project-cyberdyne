const RecycleInfo = require("../models/funcs/RecycleInfo");

const searchService = {
  getInfoByText: async ({ text }) => {
    const searchedData = await RecycleInfo.searchData({ text });

    const category = searchedData[0].category;
    const recycleInfo = [];
    searchedData.map((info) =>
      recycleInfo.push({ details: info.details, info_img: info.info_img })
    );
    //data
    return { message: "success", data: { category, recycleInfo } };
  },
};

module.exports = searchService;
