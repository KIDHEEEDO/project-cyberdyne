import db from "../index.js";
import QueryTypes from "sequelize";
import { StaticPool } from "node-worker-threads-pool";

const recycleInfoModel = db.recycleInfo;
const recycleCategoryModel = db.recycleCategory;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

//worker_thread 연결
const filePath = "./src/utils/worker.js";
const pool = new StaticPool({
  size: 3,
  task: filePath,
  workerData: "인공지능 분석 요청",
});

const RecycleInfo = {
  //POST /recycleInfo
  //인공지능 파트로 이미지 정보 전달
  findRecycleCode: async ({ imgBuffer }) => {
    const result = await pool.exec(imgBuffer);
    return result;
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
