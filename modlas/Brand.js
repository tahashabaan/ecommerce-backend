const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      nique: true,
      minLength: 3,
      maxLength: 40,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
    // relationship with category
   
  },
  { timeseries: true }
);

const setIamgeUrl = (doc) => {
  if (doc.image) {
    const imageUrl = ` ${process.env.BASE_URL_ENV}/brand/${doc.image}`;
    doc.image = imageUrl;
  }
};

brandSchema.post("init", (doc) => {
  setIamgeUrl(doc);
});

brandSchema.post("save", (doc) => {
  setIamgeUrl(doc);
});

module.exports = mongoose.model("brand", brandSchema);
