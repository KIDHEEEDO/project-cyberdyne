"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize = new Sequelize({
  username: config.username,
  password: config.password,
  database: config.database,
  host: config.host,
  port: config.port,
  dialect: "postgres",
  logging: false,
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./schemas/users.js")(sequelize, Sequelize);
db.point = require("./schemas/points.js")(sequelize, Sequelize);
db.quiz = require("./schemas/quizs.js")(sequelize, Sequelize);
//model정의
db.post = require("./schemas/posts.js")(sequelize, Sequelize);
db.comment = require("./schemas/comments.js")(sequelize, Sequelize);
db.recycleCategory = require("./schemas/recycle_categories.js")(
  sequelize,
  Sequelize
);
db.recycleInfo = require("./schemas/recycle_infos.js")(sequelize, Sequelize);

module.exports = db;
