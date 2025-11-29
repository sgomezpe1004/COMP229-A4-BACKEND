import express from "express";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// Create user
router.route("/").post(userCtrl.create);

// Profile routes
router.route("/profile")
  .get(authCtrl.requireSignin, userCtrl.getProfile)
  .put(authCtrl.requireSignin, userCtrl.updateProfile)
  .delete(authCtrl.requireSignin, userCtrl.deleteProfile);

// List users (admin only)
router.route("/")
  .get(authCtrl.requireSignin, userCtrl.isAdmin, userCtrl.list)
  .delete(authCtrl.requireSignin, userCtrl.isAdmin, userCtrl.removeMany);

// Single user routes
router.route("/:userId")
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

router.param("userId", userCtrl.userByID);

export default router;
