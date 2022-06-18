const RecycleInfo = require("../models/funcs/RecycleInfo");

const recycleInfoService = {
  analysisImg: async ({ encoded }) => {
    //인공지능이 이미지 분석 진행
    const code = await RecycleInfo.findRecycleCode({ encoded });
    //분석 결과에 따른 분리배출 정보 결과
    const infos = await RecycleInfo.findInfoByCode({ code });
    const page = infos.length;
    const category = infos[0].category;
    const recycleInfo = [];
    infos.map((info) =>
      recycleInfo.push({ details: info.details, infoImg: info.info_img })
    );
    return { message: "success", data: { page, category, recycleInfo } };
  },
};

module.exports = recycleInfoService;
