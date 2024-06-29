const mongoose = require("mongoose");

// schame using
const catagorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      minLength: 3,
      maxLength: 14,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
    // subcatagory: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "subcatagory",

    // ],
  },

  { timestamps: true }
);

const setIamgeUrl = (doc) => {
  if (doc.image) {
    const imageUrl = ` ${process.env.BASE_URL_ENV}/catagory/${doc.image}`;
    doc.image = imageUrl;
  }
};

catagorySchema.post("init", (doc) => {
  setIamgeUrl(doc);
});

catagorySchema.post("save", (doc) => {
  setIamgeUrl(doc);
});

const Category = mongoose.model("catagory", catagorySchema);

module.exports = Category;
