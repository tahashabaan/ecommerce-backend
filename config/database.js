const mongoose = require("mongoose");
const env = require("./index");

const dbConnection = async (DB_URL = " ") => {
  try {
    DB_URL = env.DB_URL || DB_URL;
    const res = await mongoose.connect(DB_URL);
    console.log(`' connected database'${res.connection.host}`);
  } catch (err) {
    console.log(`err conneted with database :${err}`);
  }
};

module.exports = dbConnection;
