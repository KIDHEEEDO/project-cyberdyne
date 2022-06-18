const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('points', {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    point: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    route: {
      type: DataTypes.STRING,
      allowNull: false
    },
    raised_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    point_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'points',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "points_pk",
        unique: true,
        fields: [
          { name: "point_id" },
        ]
      },
    ]
  });
};
