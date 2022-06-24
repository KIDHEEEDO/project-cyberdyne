import Sequelize from "sequelize";
export default function (sequelize, DataTypes) {
  return sequelize.define(
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
        type: DataTypes.STRING,
        allowNull: false,
      },
      post_img: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
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
}
