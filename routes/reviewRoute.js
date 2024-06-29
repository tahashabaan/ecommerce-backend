const express = require("express");

//auth
const authService = require("../services/authService");
// valdiator
const {
  createReviewValidator,
  updateReviewValidator,
  delReviewValidator,
} = require("../utilis/validated/reviewValidator");

// business logic
const {
  setUserId,
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  delReview,
} = require("../services/reviewsService");

const router = express.Router({ mergeParams: true });

router.use(authService.protect, authService.allowTo("user", "admin"));
router
  .route("/")
  .get(getReviews)
  .post(createReviewValidator, setUserId, createReview);

router
  .route("/:id")
  .get(getReviewById)
  .put(updateReviewValidator, updateReview)
  .delete(authService.allowTo("mange", "admin"), delReviewValidator, delReview);

module.exports = router;
