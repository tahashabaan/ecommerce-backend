const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchame = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 6,
    },
    passwordChangedAt: Date,
    profileImage: {
      type: String,
    },
    phone: String,
    role: {
      type: String,
      enum: ["user", "admin", "mange"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
    passwordResetCode: Number,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    wishlist: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "product",
      },
    ],
    // embed document
    address: [
      {
        id: { type: mongoose.Schema.ObjectId },
        alias: String,
        details: String,
        phone: String,
        city: String,
        postalCode: String,
      },
    ],
  },
  { timestamps: true }
);

userSchame.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("users", userSchame);
