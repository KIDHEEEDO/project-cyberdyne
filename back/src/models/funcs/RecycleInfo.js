const db = require("../index.js");
const recycleInfoModel = db.recycleInfo;
const recycleCategoryModel = db.recycleCategory;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const RecycleInfo = {
  //이미지를 인공지능에 전달한다
  findRecycleCode: async ({ encoded }) => {
    //인공지능 분석 결과를 return

    //인공지능 연결 전, tests용 결과 return 랜덤
    //const code = Math.floor(Math.random() * 15);

    //tests용 결과 return -> 0:종이류
    const code = 1;
    return code;
  },

  findInfoByCode: async ({ code }) => {
    const infos = await sequelize.query(
      `SELECT recycle_categories.category, recycle_infos.details, recycle_infos.info_img
      FROM recycle_infos
      INNER JOIN recycle_categories
      ON recycle_infos.code=recycle_categories.code
      WHERE recycle_infos.code='${code}'`
    );

    return infos[0];
  },
};

module.exports = RecycleInfo;
