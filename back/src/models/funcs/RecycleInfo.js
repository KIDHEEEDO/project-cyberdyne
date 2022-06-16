const db = require("../index.js");
const recycleInfoModel = db.recycleInfo;
const recycleCategoryModel = db.recycleCategory;
const Sequelize = db.Sequelize;

const RecycleInfo = {
  //이미지를 인공지능에 전달한다
  findRecycleCode: async ({ img }) => {
    //인공지능 분석 결과를 return
    const result = 4;
    return result;
  },

  //code를 토대로, 분리배출 정보 table 생성
  findResultTable: async ({ code }) => {
    const table = await recycleCategoryModel.findOne({
      where: { code },
      include: [recycleInfoModel],
    });

    return { table };
  },
};

module.exports = RecycleInfo;
