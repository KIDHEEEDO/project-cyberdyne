const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "recycle_infos",
    {
      details: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      info_img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      related_item: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "recycle_categories",
          key: "code",
        },
      },
    },
    {
      sequelize,
      tableName: "recycle_infos",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "recycle_infos_pkey",
          unique: true,
          fields: [{ name: "details" }],
        },
      ],
    }
  );
};
