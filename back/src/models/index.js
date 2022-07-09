"use strict";

import fs from "fs";
import Sequelize from "sequelize";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import User from "./schemas/users.js";
import Point from "./schemas/points.js";
import Quiz from "./schemas/quizs.js";
import Post from "./schemas/posts.js";
import Comment from "./schemas/comments.js";
import RecycleCategory from "./schemas/recycle_categories.js";
import RecycleInfo from "./schemas/recycle_infos.js";
import config from "../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
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

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = User(sequelize, Sequelize);
db.point = Point(sequelize, Sequelize);
db.quiz = Quiz(sequelize, Sequelize);
db.post = Post(sequelize, Sequelize);
db.comment = Comment(sequelize, Sequelize);
db.recycleCategory = RecycleCategory(sequelize, Sequelize);
db.recycleInfo = RecycleInfo(sequelize, Sequelize);

export default db;
