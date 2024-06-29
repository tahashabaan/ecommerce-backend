const slugify = require("slugify");
const bcrypt = require("bcryptjs");
const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/errorMiddleware");
const User = require("../../modlas/User");

exports.createUserValidator = [
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
    .withMessage("min password is 6 characters")
    .custom((val, { req }) => {
      if (val !== req.body.passwordConfirm)
        return Promise.reject(new Error("password not confirmed"));
    }),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("passwordConfirm is required "),

  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-AE", "ar-SA"])
    .withMessage("Invalid phone number only accepted Egy and SA Phone numbers"),

  check("profileImg").optional(),
  check("role").optional(),
  validatorMiddleware,
];

exports.updataPasswordUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  body("currentPassword")
    .notEmpty()
    .withMessage("You must enter your current password"),
  body("passwordConfirm")
    .notEmpty()
    .withMessage("You must enter the password confirm"),
  body("password")
    .notEmpty()
    .withMessage("You must enter new password")
    .custom(async (val, { req }) => {
      // verfiy current password
      const user = User.findById(req.params.id);
      if (!user) {
        throw new Error("There is no user for this id");
      }
      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!isCorrectPassword) {
        throw new Error("Incorrect current password");
      }

      // confirm
      if (val !== req.body.passwordConfirm) {
        throw new Error("Password Confirmation incorrect");
      }
      return true;
    }),
  validatorMiddleware,
];

exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  validatorMiddleware,
];

exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  body("title")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  validatorMiddleware,
];
