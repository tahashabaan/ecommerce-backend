const { check } = require("express-validator");
const { default: slugify } = require("slugify");
const validatorMiddlware = require("../../middlewares/validataor");

exports.getSubcatagoryValidator = [
  check("id").isMongoId().withMessage("id not valided"),
  validatorMiddlware,
];

exports.createSubcatagoryValidator = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("the subcatagory Name is must be large 3 character")
    .isLength({ max: 32 })
    .withMessage("the subcatagory Name is must be less 32 character")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("catagory").isMongoId().withMessage("id not field"),
  validatorMiddlware,
];

exports.updataSubcatagoryValidator = [
  check("id").isMongoId().withMessage("id not valided"),
  check("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddlware,
];
