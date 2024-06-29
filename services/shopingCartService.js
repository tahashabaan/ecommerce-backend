const asyncHandler = require("express-async-handler");

const ApiError = require("../utilis/apiError");
const shopingCart = require("../modlas/ShopingCart");
const product = require("../modlas/Product");
const Cupon = require("../modlas/Cupon");

const totalPrice = (cart) =>
  cart.cartItems.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.price * currentValue.quantity,
    0
  );

exports.addProductToShopingCart = asyncHandler(async (req, res, next) => {
  const { productId, quantity, color } = req.body;
  const { price } = await product.findById(productId);
  let items = await shopingCart.findOne({ user: req.user._id });

  if (!items) {
    items = await shopingCart.create({
      user: req.user._id,
      cartItems: [{ product: productId, price, color }],
    });
  } else {
    const cartItemIsFound = items.cartItems.findIndex(
      (item) => item.product.toString() === productId && item.color === color
    );
    if (cartItemIsFound > -1) {
      items.cartItems[cartItemIsFound].quantity += 1;
      // const cartItem =  items.cartItems[cartItemIsFound];
      // cartItem.quantity +=1;
      // items.cartItems[cartItemIsFound]= cartItem;
    } else {
      items.cartItems.push({ product: productId, price, color });
    }
  }

  const totalPriceItem = totalPrice(items);

  items.totalPrice = totalPriceItem;

  await items.save();
  res.status(201).json({
    status: true,
    message: "product added to your cart",
    data: items,
  });
});

exports.getLogedUserDate = asyncHandler(async (req, res, next) => {
  const cart = await shopingCart.findOne({ user: req.user._id });
  if (!cart)
    return next(
      new ApiError(`There is no cart for this user id : ${req.user._id}`, 404)
    );

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

exports.removeProductFromShopingCart = asyncHandler(async (req, res, next) => {
  const items = await shopingCart.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: { _id: req.params.itemId },
    },
    { new: true }
  );

  const totalPriceItem = totalPrice(items);
  items.totalPrice = totalPriceItem;

  await cart.save();

  res.status(200).json({
    status: "success",
    numOfCartItems: items.cartItems.length,
    data: items,
  });
});

exports.clearProductFromCart = asyncHandler(async (req, res, next) => {
  await shopingCart.findOneAndDelete({ user: req.user._id });

  res.status(201).json({
    status: true,
    message: "product removed from your cart",
  });
});

exports.updateQuantity = asyncHandler(async (req, res, next) => {
  const { quantity } = req.body;
  const cart = await shopingCart.findOne({ user: req.usre._id });
  if (!cart) {
    return next(new ApiError(`there is no cart for user ${req.user._id}`, 404));
  }
  const items = cart.cartItems.find(
    (item) => item._id.toString() === req.params.itemId
  );
  if (items.length > 1) items.quantity = quantity;
  else {
    return next(
      new ApiError(`there is no item for this id :${req.params.itemId}`, 404)
    );
  }

  totalPrice(cart);
  await cart.save();

  res.status(200).json({
    status: "success",
    numOfCartItems: items.cartItems.length,
    data: items,
  });
});

exports.applyCoupon = asyncHandler(async (req, res, next) => {
  const coupon = await Cupon.findOne({
    name: req.body.name,
    expireDate: { $gt: Date.now() },
  });

  if (!coupon) {
    return next(new ApiError(`Coupon is invalid or expired`));
  }

  const cart = await shopingCart.findOne({ user: req.user._id });
  const totalPriceCoupon = cart.totalPrice; // 400 10
  cart.totalPriceAfterDisCount =
    totalPriceCoupon - ((totalPriceCoupon * coupon.discount) / 100).toFixed(2);

  await cart.save();

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});
