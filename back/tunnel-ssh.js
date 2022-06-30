// tunnel-ssh.js
//const pg = require("pg");
import pkg from "pg";
const { Client } = pkg;
import tunnel from "tunnel-ssh";
import dotenv from "dotenv";

dotenv.config();

const ssh_config = {
    username: process.env.SSH_USERNAME,
    password: process.env.SSH_PASSWORD,
    host: process.env.SSH_HOST,
    port: process.env.SSH_PORT,
    dstHost: process.env.SSH_DATABASE_HOST,
    dstPort: process.env.SSH_DATABASE_PORT,
};

tunnel(ssh_config, (error, server) => {
    if (error) {
        throw error;
    } else if (server !== null) {
        const client = new Client({
            host: process.env.SQL_HOST,
            user: process.env.SQL_USERNAME,
            password: process.env.SQL_PASSWORD,
            database: process.env.SQL_DATABASE,
            port: process.env.SQL_PORT,
        });
        client.connect();
    }
});
