const { check } = require("express-validator");
const slugify = require("slugify");
const validatorMiddlware = require("../../middlewares/validataor");

exports.getcatagoryValidator = [
  check("id").isMongoId().withMessage("catagory not found"),
  validatorMiddlware,
];

exports.createcatagoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3 })
    .withMessage("catagorymust be  large then 3")
    .isLength({ max: 32 })
    .withMessage("catagory must be less then 32")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddlware,
];

exports.updatacatagoryValidator = [
  check("id").isMongoId().withMessage("catagory id not valid"),
  check("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddlware,
];
exports.deletecatagoryValidator = [
  check("id").isMongoId().withMessage("catagory id not valid"),
  validatorMiddlware,
];
