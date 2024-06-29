const dotenv = require("dotenv");

// Load environment variables
// const envPath =
//   process.env.NODE_ENV !== "development"
//     ? `.env.${process.env.NODE_ENV}`
//     : ".env.development";

dotenv.config({ path: `.env.development` });
const {
  PORT,
  MONGO_URI,
  JWT_SECRET_KEY,
  JWT_EXPIRE_TIME,
  BASE_URL_ENV,
  DB_URL,
} = process.env;

module.exports = {
  PORT,
  MONGO_URI,
  JWT_SECRET_KEY,
  JWT_EXPIRE_TIME,
  BASE_URL_ENV,
  DB_URL,
};
