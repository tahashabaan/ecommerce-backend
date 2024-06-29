/* eslint-disable import/no-extraneous-dependencies */
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");

const apiError = require("../utilis/apiError");
const Category = require("../modlas/Category");
const { handleSingleImage } = require("./handle/handleImageUploading");
const {
  getDocuments,
  createDocument,
  getDocumentById,
  updataDocumentById,
  deleteDocumentById,
} = require("./handle/handlersFactory");

exports.uploadCatagoryIamge = handleSingleImage("image");

exports.filterImage = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const uniqueFilename = `catagory-${Math.round(
    Math.random() * 1e9
  )}-${Date.now()}.jpeg`;
  //sharp image then save it in file
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/catagory/${uniqueFilename}`);

  req.body.image = uniqueFilename;
  next();
});

// @desc       get data from database
// @route      get api/v1/categories
// @access     public
exports.getCategory = getDocuments(Category);

// @desc      add data in database
// @route     post api/v1/categories
// @access    private
exports.createCategory = createDocument(Category);

// @desc      get data in database specify params id
// @route     get api/v1/categories:id
// @access    public
exports.getCategoryById = getDocumentById(Category);

// @desc      update data in database by params id
// @route     put api/v1/categories: id
// @access    public
exports.updateCategory = updataDocumentById(Category);

// @desc      delete data in database by params id
// @route     delete api/v1/categories: id
// @access    public
exports.deleteCategory = deleteDocumentById(Category);
