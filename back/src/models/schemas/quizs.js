const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('quizs', {
    quiz_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    question: {
      type: DataTypes.STRING,
      allowNull: true
    },
    multiples: {
      type: DataTypes.STRING,
      allowNull: true
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'quizs',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "quizs_pk",
        unique: true,
        fields: [
          { name: "quiz_id" },
        ]
      },
    ]
  });
};
