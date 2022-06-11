module.exports = (sequelize, Sequelize) => {
  const recycleCategory = sequelize.define(
    "recycle_category",
    {
      code: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return recycleCategory;
};
