const asyncHandler = require("express-async-handler");
const User = require("../modlas/User");

exports.addAdressToUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.usre._id,
    {
      $addToSet: { address: req.body },
    },
    { new: true }
  );

  console.log(result);

  res.status(200).json({
    status: "success",
    message: "Product added successfully to your wishlist.",
    data: user.wishlist,
  });
});

exports.removeAdressfromUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.usre._id,
    {
      $pull: { address: { _id: req.params.addressId } },
    },
    { new: true }
  );

  console.log(result);

  res.status(200).json({
    status: "success",
    message: "Product removed from your wishlist.",
    data: user.wishlist,
  });
});

exports.getlogedUserAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.usre._id).populate("address");

  res.status(200).json({
    status: "success",
    results: user.address.length,
    data: user.address,
  });
});
