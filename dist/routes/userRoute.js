"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authentication_1 = require("../middlewares/authentication");
const router = (0, express_1.Router)();
router.get(
  "/profile",
  authentication_1.requireAuth,
  userController_1.getUserProfile
);
router.put(
  "/profile",
  authentication_1.requireAuth,
  userController_1.updateUserProfile
);
router.delete(
  "/profile",
  authentication_1.requireAuth,
  userController_1.deleteUserAccount
);
exports.default = router;
