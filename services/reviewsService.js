const reviewModal = require("../modlas/Review");

const {
  getDocuments,
  createDocument,
  getDocumentById,
  updataDocumentById,
  deleteDocumentById,
} = require("./handle/handlersFactory");

exports.setUserId = (req, res, next) => {
  // if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
// @desc       create review from database
// @route      post api/v1/review
// @access     private
exports.createReview = createDocument(reviewModal);

// @desc       get reviews from database
// @route      post api/v1/reviews
// @access     public
exports.getReviews = getDocuments(reviewModal);

// @desc       get review from database
// @route      post api/v1/reviews
// @access     public
exports.getReviewById = getDocumentById(reviewModal);

// @desc       update review from database
// @route      post api/v1/reviews
// @access     private
exports.updateReview = updataDocumentById(reviewModal);

// @desc       del review from database
// @route      post api/v1/reviews
// @access     private
exports.delReview = deleteDocumentById(reviewModal);
