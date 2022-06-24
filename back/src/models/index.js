"use strict";

import fs from "fs";
import Sequelize from "sequelize";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
import config from "../config/config.js";
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

// fs.readdirSync(`{__dirname}/schemas`)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

import User from "./schemas/users.js";
import Point from "./schemas/points.js";
import Quiz from "./schemas/quizs.js";
import Post from "./schemas/posts.js";
import Comment from "./schemas/comments.js";
import RecycleCategory from "./schemas/recycle_categories.js";
import RecycleInfo from "./schemas/recycle_infos.js";

db.user = User(sequelize, Sequelize);
db.point = Point(sequelize, Sequelize);
db.quiz = Quiz(sequelize, Sequelize);
db.post = Post(sequelize, Sequelize);
db.comment = Comment(sequelize, Sequelize);
db.recycleCategory = RecycleCategory(sequelize, Sequelize);
db.recycleInfo = RecycleInfo(sequelize, Sequelize);

export default db;
