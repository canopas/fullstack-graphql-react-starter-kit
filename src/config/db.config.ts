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
  timezone: tzOffset(), // get client's timeZone,  format: +5:30
});

function tzOffset() {
  // Get the current timezone offset in minutes
  const tzOffset = -new Date().getTimezoneOffset();

  // Convert the offset to the desired format (+HH:MM or -HH:MM)
  const hours = Math.floor(tzOffset / 60);
  const minutes = Math.abs(tzOffset % 60);
  return `${hours >= 0 ? "+" : "-"}${Math.abs(hours)
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

export default sequelize;
