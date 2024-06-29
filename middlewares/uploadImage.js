const multer = require("multer");

const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {},
  filename: (req, file, cb) => {},
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

// calling it in services to handle it and can use in services to handle sharp
// name
exports.uploadSingleImage = (image) => upload.single(image);

// images ['', 4]
exports.uploadArrayImages = (images) => upload.array(images);
// [{
//     name:, maxCount
// }]
exports.uploadFieldImages = (fileds) => upload.fields(fileds);
