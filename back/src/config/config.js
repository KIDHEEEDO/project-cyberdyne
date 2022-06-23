require("dotenv").config();
const { SQL_USERNAME, SQL_PASSWORD, SQL_DATABASE, SQL_HOST, SQL_PORT } =
  process.env;

const development = {
  username: SQL_USERNAME,
  password: SQL_PASSWORD,
  database: SQL_DATABASE,
  host: SQL_HOST,
  port: SQL_PORT,
  dialect: "postgres",
};

module.exports = { development };
