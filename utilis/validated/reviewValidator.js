/* eslint-disable no-lonely-if */
const slugify = require("slugify");
const { check } = require("express-validator");

const validatorMiddleware = require("../../middlewares/errorMiddleware");
const Rview = require("../../modlas/Review");
const Product = require("../../modlas/Product");
const ApiError = require("../apiError");

exports.createReviewValidator = [
  check("title").optional(),
  check("ratings")
    .notEmpty()
    .withMessage("rating is required and 1...5")
    .isFloat({ min: 1, max: 5 })
    .withMessage("rating must be num and from 1...5")
    .custom(async (val, { req }) => {
      const isReviewFound = await Rview.findOne({
        user: req.body.user,
        product: req.body.product,
      });
      if (isReviewFound)
        return Promise.reject(new Error("email aleardy exicted"));
    }),
  check("user").isMongoId().withMessage("Invalid ID formate"),
  check("product").isMongoId().withMessage("Invalid ID formate"),

  validatorMiddleware,
];

exports.updateReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid  ID formate")
    .custom(async (idVal, { req }) => {
      const reviewUser = await Rview.findById(idVal);
      //check user found or not
      if (!reviewUser)
        return new Promise.reject(
          new Error("not can find User and Not can update review")
        );
      //check  the smama user create review
      if (reviewUser.user._id.toString() !== req.user._id.toString())
        return new Promise.reject(
          new Error("not allowed perform this product")
        );
    }),

  validatorMiddleware,
];

exports.delReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid  ID formate")
    .custom(async (idVal, { req }) => {
      if (req.body.role === "user") {
        const reviewUser = await Rview.findById(idVal);

        if (!reviewUser)
          return new Promise.reject(
            "not can find User and Not can delete review"
          );

        if (reviewUser.user.toString() !== req.user._id.toString())
          return new Promise.reject("not allowed delete this review");
      }

      return true;
    }),

  validatorMiddleware,
];
