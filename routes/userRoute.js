const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  updataUserById,
  changePasswordById,
  delUserById,
  uploadUserIamge,
  filterImageUser,
} = require("../services/userService");

const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
} = require("../utilis/validated/userValidator");

const authService = require("../services/authService");

const router = express.Router();

router
  .route("/")
  .get(authService.protect, authService.allowTo("mange", "admin"), getUsers)
  .post(
    authService.protect,
    authService.allowTo("admin"),
    uploadUserIamge,
    filterImageUser,
    createUserValidator,
    createUser
  );
router
  .route("/:id")
  .get(
    authService.protect,
    authService.allowTo("admin"),
    getUserValidator,
    getUserById
  )
  .put(
    authService.protect,
    authService.allowTo("admin"),
    uploadUserIamge,
    filterImageUser,
    updateUserValidator,
    updataUserById
  )
  .delete(
    authService.protect,
    authService.allowTo("admin"),
    deleteUserValidator,
    delUserById
  );

router
  .route("changePassword/:id")
  .put(
    authService.protect,
    authService.allowTo("admin", "mange"),
    changePasswordById
  );

module.exports = router;
