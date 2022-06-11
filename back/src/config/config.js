require("dotenv").config();
const env = process.env;

const development = {
  username: env.SQL_USERNAME,
  password: env.SQL_PASSWORD,
  database: env.SQL_DATABASE,
  host: env.SQL_HOST,
  port: env.SQL_PORT,
  dialect: "postgres",
};
module.exports = { development };
