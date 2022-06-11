const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const Post = sequelize.define(
    "posts",
    {
      post_id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      post_img: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      content: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "posts",
      schema: "public",
      timestamps: true,
      indexes: [
        {
          name: "posts_pkey",
          unique: true,
          fields: [{ name: "post_id" }],
        },
      ],
    }
  );
  return Post;
};
