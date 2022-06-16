module.exports = (sequelize, Sequelize) => {
  const recycleInfo = sequelize.define(
    "recycle_info",
    {
      details: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      mark_img: {
        type: Sequelize.STRING,
      },
      recycle_method: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      related_item: {
        type: Sequelize.STRING,
      },
      related_item_img: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      non_related_item: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      tip: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      tip_img: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return recycleInfo;
};
