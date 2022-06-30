import RecycleInfo from "../models/funcs/RecycleInfo.js";

const recycleInfoService = {
  //POST /recycle-info
  analysisImg: async ({ imgBuffer }) => {
    //인공지능 파트로 이미지 정보 전달, 분석 결과
    const infos = await RecycleInfo.findRecycleCode({ imgBuffer });

    if (infos.length === 0) {
      return { message: "success", data: { infoCount: 0, imgInfo: [] } };
    }
    const imgInfo = infos.map((info) => ({
      code: info.classId,
      confidence: (info.confidence * 100).toFixed(2),
      xyxy: info.xyxy,
      xywh: info.xywh,
    }));

    //분석 결과, 총 code 개수
    const infoCount = imgInfo.length;

    return { message: "success", data: { infoCount, imgInfo } };
  },

  //GET /recycle-info/img
  getInfoByCodes: async ({ code }) => {
    //검색 결과
    const infos = await RecycleInfo.findInfoByCodes({ code });

    //전달 데이터 형태 변경
    const recycleInfos = infos.map((info) => {
      const recycleInfo = Object.entries(info.recycleInfo).map(
        ([key, value]) => {
          return { details: key, imgInfo: value };
        }
      );
      return {
        code: info.code,
        category: info.category,
        page: recycleInfo.length,
        recycleInfo,
      };
    });

    return { message: "success", data: recycleInfos };
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
    const recycleInfo = infos.map((info) => ({
      details: info.details,
      infoImg: info.info_img,
    }));

    return { message: "success", data: { page, category, recycleInfo } };
  },
};

export default recycleInfoService;
