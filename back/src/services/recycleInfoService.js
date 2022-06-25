import RecycleInfo from "../models/funcs/RecycleInfo.js";

const recycleInfoService = {
  //POST /recycle-info
  analysisImg: async ({ imgBuffer }) => {
    //인공지능 파트로 이미지 정보 전달, 분석 결과
    //const result = await RecycleInfo.findRecycleCode({ imgBuffer });
    // if (result.length === 0) {
    //   const errorMessage = "분석 실패! 재촬영 요청";
    //   return { errorMessage };
    // }
    // //분석 결과 중 recycle_category_code 추출
    // const code = result[0].classId;

    // //recycle_category_code에 따른 분리배출 정보

    //테스트 가능 코드
    const code = await RecycleInfo.findRecycleCode({ imgBuffer });
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

  //GET /recycle-info/?code
  getInfoByCode: async ({ code }) => {
    //코드 타입 확인 (number)
    if (!typeof code === "number") {
      const errorMessage = "잘못된 코드 입력";
      return { errorMessage };
    }

    //검색 결과
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
