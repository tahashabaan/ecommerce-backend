const mongoose = require("mongoose");

const cuponCodeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    // code:{
    //     type:String,
    //     required:true,
    //     unique: true ,
    //     minLength:6,
    //     maxLength:6,
    //     trim:true,
    //     lowercase:true
    // },
    discount: { type: Number, required: true },
    isPercent: { type: Boolean, required: true, default: true },
    expireDate: { type: Date, required: true, default: Date.now() },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cuponCode", cuponCodeSchema);
