const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recycle_categories', {
    code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'recycle_categories',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "recycle_categories_pkey",
        unique: true,
        fields: [
          { name: "code" },
        ]
      },
    ]
  });
};
