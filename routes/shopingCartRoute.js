const express = require("express");

const {
  addProductToShopingCart,
  getLogedUserDate,
  removeProductFromShopingCart,
  clearProductFromCart,
  updateQuantity,
  applyCoupon,
} = require("../services/shopingCartService");

const authService = require("../services/authService");

const router = express.Router();

router.use(authService.protect, authService.allowTo("user"));

router
  .route("/")
  .get(getLogedUserDate)
  .post(addProductToShopingCart)
  .delete(clearProductFromCart);

router.put("/applyCoupon", applyCoupon);

router
  .route("/:itemId")
  .put(updateQuantity)
  .delete(removeProductFromShopingCart);

module.exports = router;
