const express = require("express");
const {
  getMe,
  updateMe,
  deleteMe,
  updatePasswordMe,
  getUserById,
  uploadUserIamge,
  filterImageUser,
} = require("../services/userService");

const {
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
} = require("../utilis/validated/userValidator");

const authService = require("../services/authService");

const router = express.Router();

router.use(authService.protect, authService.allowTo("user", "mange", "admin"));

router.get("/", getMe, getUserValidator, getUserById);
router.put("/update", uploadUserIamge, filterImageUser, updateMe);
router.put("/change-password", updatePasswordMe);
router.delete("/del", deleteMe);

module.exports = router;
