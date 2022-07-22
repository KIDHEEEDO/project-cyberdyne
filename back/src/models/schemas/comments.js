import Sequelize from "sequelize";
export default function (sequelize, DataTypes) {
  return sequelize.define(
    "comments",
    {
      comment_id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      post_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "posts",
          key: "post_id",
        },
        onDelete: "CASCADE",
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
      tableName: "comments",
      schema: "public",
      timestamps: true,
      indexes: [
        {
          name: "comments_pkey",
          unique: true,
          fields: [{ name: "comment_id" }],
        },
      ],
    }
  );
}
