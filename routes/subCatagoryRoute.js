const express = require("express");
const {
  getSubcatacoryServices,
  createSubcatacoryService,
  getSubcatacoryServiceById,
  updataSubcatacoryServiceById,
  removeSubcatacoryServiceById,
  setCatagoryIdToBody,
  filterObj,
} = require("../services/subcatagoryServices");

const {
  getSubcatagoryValidator,
  createSubcatagoryValidator,
} = require("../utilis/validated/subCatagoryValidator");
const authService = require("../services/authService");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(filterObj, getSubcatacoryServices)
  .post(
    authService.protect,
    authService.allowTo("mange", "admin"),
    setCatagoryIdToBody,
    createSubcatagoryValidator,
    createSubcatacoryService
  );

router
  .route("/:id")
  .get(getSubcatagoryValidator, getSubcatacoryServiceById)
  .put(
    authService.protect,
    authService.allowTo("mange", "admin"),
    getSubcatagoryValidator,
    updataSubcatacoryServiceById
  )
  .delete(
    authService.protect,
    authService.allowTo("admin"),
    getSubcatagoryValidator,
    removeSubcatacoryServiceById
  );

module.exports = router;
