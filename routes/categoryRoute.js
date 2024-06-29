const express = require("express");
const {
  getcatagoryValidator,
  createcatagoryValidator,
  updatacatagoryValidator,
  deletecatagoryValidator,
} = require("../utilis/validated/catagoryValidator");

const {
  getCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  uploadCatagoryIamge,
  filterImage,
} = require("../services/categoryService");

const subcatagoryRoute = require("./subCatagoryRoute");

const authService = require("../services/authService");

const router = express.Router();

router
  .route("/")
  .get(getCategory)
  .post(
    authService.protect,
    authService.allowTo("mange", "admin"),
    uploadCatagoryIamge,
    filterImage,
    createcatagoryValidator,
    createCategory
  );

router
  .route("/:id")
  .get(getcatagoryValidator, getCategoryById)
  .put(
    authService.protect,
    authService.allowTo("mange", "admin"),
    uploadCatagoryIamge,
    filterImage,
    updatacatagoryValidator,
    updateCategory
  )
  .delete(
    authService.protect,
    authService.allowTo("admin"),
    deletecatagoryValidator,
    deleteCategory
  );

router.use("/:catagoryId/subcategories", subcatagoryRoute);

module.exports = router;
