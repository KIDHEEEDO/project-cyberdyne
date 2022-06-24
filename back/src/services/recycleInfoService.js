import RecycleInfo from "../models/funcs/RecycleInfo.js";

const recycleInfoService = {
  //POST /recycleInfo
  analysisImg: async ({ encoded }) => {
    //인공지능 파트로 이미지 정보 전달
    const code = await RecycleInfo.findRecycleCode({ encoded });
    //분석 결과에 따른 분리배출 정보
    const infos = await RecycleInfo.findInfoByCode({ code });

    //안내될 정보 페이지 수
    const page = infos.length;
    //전달 데이터 형태 변경
    const category = infos[0].category;
    const recycleInfo = [];
    infos.map((info) =>
      recycleInfo.push({ details: info.details, infoImg: info.info_img })
    );

    return { message: "success", data: { page, category, recycleInfo } };
  },
};

export default recycleInfoService;
