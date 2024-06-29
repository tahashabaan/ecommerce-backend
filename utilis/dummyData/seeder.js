// const fs = require("fs" );
// require("colors");
// const dotenv = require("dotenv");
// const dbConnection = require("../../config/database");
// // eslint-disable-next-line import/newline-after-import
// const Product = require("../../modlas/Product");
// dotenv.config({ path: "../../config.env" });
const fs = require("fs");

const dotenv = require("dotenv");
const colors = require("colors");

const DB = require("../../config/database");
const Product = require("../../modlas/Product");

dotenv.config({ path: "../../.env.development" });
// const env = require("../../config");

// connect to DB
// console.log();
DB(process.env.DB_URL);

const products = JSON.parse(fs.readFileSync("./product.json"));
// Read data
// const products = JSON.parse(fs.readFileSync("./product.json"));
// const products = JSON.parse(fs.readFileSync("./product.json"));

// Insert data into DB
const insertData = async () => {
  try {
    await Product.create(products);
    // await Product.createMany(products)
    console.log("Data Inserted".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// node seeder.js -d
if (process.argv[2] === "-i") {
  insertData();
} else if (process.argv[2] === "-d") {
  destroyData();
}
