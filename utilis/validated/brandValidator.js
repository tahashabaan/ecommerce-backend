const {check } =require('express-validator');
const slugify = require('slugify');
const validatorMiddlware = require('../../middlewares/validataor');

exports.getBrandValidated =[ 
    check('id').isMongoId().withMessage('brand id not found'),
    validatorMiddlware
]

exports.createBrandValidated = [
    check('name')
    .notEmpty()
    .isLength({min:3}).withMessage('brand must be  large then 3')
    .isLength({max:32}).withMessage('brand  must be less then 32')
    .custom((val, {req}) => {
        req.body.slug = slugify(val);
        return true;
    }),
    validatorMiddlware
]

exports.updataBrandValidated =[ 
    check('id').isMongoId().withMessage('brand id not found'),
    check('name').custom((val, {req}) => {
        req.body.slug = slugify(val);
        return true;
    }),
    validatorMiddlware
]