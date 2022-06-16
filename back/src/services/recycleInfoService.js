const RecycleInfo = require("../models/funcs/RecycleInfo");

const recycleInfoService = {
  passImg: async ({ img }) => {
    //인공지능이 이미지 분석 진행
    const code = await RecycleInfo.findRecycleCode({ img });

    //분석 결과에 따른 분리배출 정보 결과
    const { table } = await RecycleInfo.findResultTable({ code });
    const result = {
      page: table.recycle_infos.length,
      table,
    };
    return { message: "success", result };
  },
};

module.exports = recycleInfoService;
