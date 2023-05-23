import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

const hostname = process.env.DB_HOST;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DATABASE_NAME;
const dialect = "mysql";

const sequelize = new Sequelize(database!, username!, password, {
  host: hostname,
  dialect,
  repositoryMode: true,
  pool: {
    max: 10,
    min: 0,
    acquire: 20000,
    idle: 5000,
  },
  define: {
    freezeTableName: true,
    underscored: true,
  },
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, // get client's timeZone
});

export default sequelize;
