const sharp = require("sharp");
const asyncHandler = require("express-async-handler");

const ApiError = require("../utilis/apiError");
const productModal = require("../modlas/Product");
const { handleMultImages } = require("./handle/handleImageUploading");
const {
  getDocuments,
  createDocument,
  getDocumentById,
  updataDocumentById,
  deleteDocumentById,
} = require("./handle/handlersFactory");

exports.uploadProductImages = handleMultImages([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 50 },
]);

exports.handleImageUploading = (req, res, next) => {
  const imageCover = req.body.imageCover;
  req.imageCover = imageCover || " ";
  next();
};

exports.filterProductImages = (req, res, next) => {
  if (req.imageCover) {
    req.body.imageCover = req.imageCover;
    return next();
  }
  if (req.files.imageCover && req.files) {
    const uniqueImageCover = `product-${Math.round(
      Math.random() * 1e9
    )}-${Date.now()}.jpeg`;
    sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toformat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/product/${uniqueImageCover}`);

    req.body.imageCover = uniqueImageCover;
  }

  if (req.files.images) {
    req.body.images = [];
    req.files.images.map((image, index) => {
      const uniqueImageName = `product-${Math.round(
        Math.random() * 1e9
      )}-${Date.now()}-${index + 1}.jpeg`;
      sharp(image.buffer)
        .resize(2000, 1333)
        .toformat("jpeg")
        .jpeg({ quality: 95 })
        .toFile(`uploads/product/${uniqueImageName}`);

      req.body.images.push(uniqueImageName);
    });
  }

  next();
};
// @desc   create a new product in database
// @route  post api/v1/products
// @acess  private
exports.createProduct = createDocument(productModal);

// @desc   read a  product from database
// @route  get api/v1/products
// @acess  public
exports.getProduct = getDocuments(productModal);

// @desc   read a  product from database
// @route  get api/v1/products
// @acess  public
exports.getProductByID = getDocumentById(productModal);

// @desc   updata a  product from database
// @route  get api/v1/products
// @acess  private
exports.updataProductByID = updataDocumentById(productModal);

// @desc   del a  product from database
// @route  del api/v1/products
// @acess  private
exports.deleteProductByID = deleteDocumentById(productModal);

exports.addWishList = asyncHandler(async (req, res, next) => {
  // console.log(req.params.id)
  // productModal.wishlist.push({productId:req.body.productId});
  // await productModal.save();
});
