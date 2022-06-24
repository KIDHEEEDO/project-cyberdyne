import db from "../index.js";
import QueryTypes from "sequelize";
const recycleInfoModel = db.recycleInfo;
const recycleCategoryModel = db.recycleCategory;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const RecycleInfo = {
  //POST /recycleInfo
  //인공지능 파트로 이미지 정보 전달
  findRecycleCode: async ({ encoded }) => {
    //인공지능 파트 연결

    //인공지능 연결 전, tests용 결과 return 랜덤
    const code = Math.floor(Math.random() * 15);
    //tests용 결과 return -> 0:종이류
    //const code = 0;

    return code;
  },

  //POST /recycleInfo
  //분석 결과에 따른 분리배출 정보
  findInfoByCode: async ({ code }) => {
    const infos = await sequelize.query(
      `SELECT recycle_categories.category, recycle_infos.details, recycle_infos.info_img
      FROM recycle_infos
      INNER JOIN recycle_categories
      ON recycle_infos.code=recycle_categories.code
      WHERE recycle_infos.code=$code`,
      {
        bind: { code: code },
        type: QueryTypes.SELECT,
      }
    );

    return infos[0];
  },

  //GET /search
  //분리배출 정보 검색
  searchData: async ({ text }) => {
    const searchedData = await sequelize.query(
      `SELECT recycle_categories.category, recycle_infos.details, recycle_infos.info_img
      FROM recycle_infos
      INNER JOIN recycle_categories 
      ON recycle_infos.code=recycle_categories.code
      WHERE (details LIKE '%'||$text||'%') OR (related_item LIKE '%'||$text||'%')`,
      {
        bind: { text: text },
        type: QueryTypes.SELECT,
      }
    );

    return searchedData[0];
  },
};

export default RecycleInfo;
