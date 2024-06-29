const path = require("path");

const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const swaggerUI = require("swagger-ui-express");

const docSwagger = require("./docs/swagger.json");
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
const subcatagoryRoute = require("./routes/subCatagoryRoute");
const brandRoute = require("./routes/brandRoute");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const profileRoute = require("./routes/profileRoute");
const reviewRoute = require("./routes/reviewRoute");
const wishlistRoute = require("./routes/wishlistRoute");
const addressRoute = require("./routes/addressRoute");
const shopingCartRoute = require("./routes/shopingCartRoute");
const ApiError = require("./utilis/apiError");
const globalMiddleware = require("./middlewares/errorMiddleware");
const { webhookCheckout } = require("./services/orderService");

// appExpress
const app = express();

// env
// dotenv.config({ path: ".env.development"});

// middalewares
// 01- body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(compression());

// 02- logging development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`'nouserRoutede develpment':${process.env.NODE_ENV}`);
}

// connection database
// home
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(docSwagger));
// routes
// 01-categories
app.use("/api/v1/categories", categoryRoute);
// app.use("/api/v1/categories/:id", categoryRoute);

// 02-subcategories
app.use("/api/v1/subcategories", subcatagoryRoute);
// app.use("/api/v1/subcategories/:id", subcatagoryRoute);

// 03-brands
app.use("/api/v1/brands", brandRoute);
// app.use("/api/v1/brands/:id", brandRoute);

// 04-products
app.use("/api/v1/products", productRoute);
// app.use("/api/v1/products/:id", productRoute);

// 05-users
app.use("/api/v1/users", userRoute);

// 06- profile page
app.use("/api/v1/me", profileRoute);
// app.use("/api/v1/users/:id", userRoute);

// 06-auth
app.use("/api/v1/auth", authRoute);

// 06-reviews
app.use("/api/v1/reviews", reviewRoute);
// app.use("/api/v1/reviews/:id", reviewRoute);

// 06-wishlist
app.use("/api/v1/wishlist", wishlistRoute);
// app.use('/api/v1/reviews/:id', reviewRoute);

// 07-addresses
app.use("/api/v1/address", addressRoute);

// 07-Shoping
app.use("/api/v1/shopingCart", shopingCartRoute);

app.use(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res, next) => {
    try {
      await webhookCheckout(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);
// handling error route not found
app.all("*", (req, res, next) => {
  next(new ApiError(`not can find route: ${req.originalUrl}`, 400));
});

// return eror it catch from express handler
app.use(globalMiddleware);

//listing app
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  dbConnection();
});

// // handle unhandled rejection
process.on("unhandledRejection", (err) => {
  console.log(`unhandled rejection Error ${err.name} ${err.message}`);
  server.close(() => {
    console.log("shuting down.......");
    process.exit(1);
  });
});
