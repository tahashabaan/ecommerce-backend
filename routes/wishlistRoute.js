const express = require("express");

const {
  addProductToWishList,
  removeProductFromWishList,
  getLoggedUserDate,
} = require("../services/wishlistService");

const authService = require("../services/authService");

const router = express.Router();

router
  .route("/")
  .post(authService.protect, authService.allowTo("user"), addProductToWishList)
  .delete(
    authService.protect,
    authService.allowTo("user"),
    removeProductFromWishList
  )
  .get(authService.protect, authService.allowTo("user"), getLoggedUserDate);

module.exports = router;
