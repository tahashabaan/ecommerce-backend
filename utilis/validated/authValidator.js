const slugify = require("slugify");
const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/errorMiddleware");
const User = require("../../modlas/User");

exports.signUpValidator = [
  check("name")
    .notEmpty()
    .withMessage("Product required")
    .trim()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .isEmail()
    .withMessage("email is not  valid")
    .notEmpty()
    .withMessage("email is required")
    .custom((val) => {
      User.findOne({ email: val }).then((user) => {
        if (user) return Promise.reject(new Error("E-mail already in user"));
      });
    }),

  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("min password is 6 characters"),
  // check('passwordConfirm')
  //   .notEmpty()
  //   .withMessage('passwordConfirm is required '),
  validatorMiddleware,
];

exports.signInValidator = [
  check("email")
    .isEmail()
    .withMessage("email is not  valid")
    .notEmpty()
    .withMessage("email is required"),

  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("min password is 6 characters"),

  validatorMiddleware,
];
