import express from "express";
import educationCtrl from "../controllers/education.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();


router.post("/", authCtrl.requireSignin, educationCtrl.create);

router.get("/", authCtrl.requireSignin, educationCtrl.list);

router.route("/:educationId")
  .get(authCtrl.requireSignin, educationCtrl.read)
  .put(authCtrl.requireSignin, educationCtrl.update)
  .delete(authCtrl.requireSignin, educationCtrl.remove);

router.param("educationId", educationCtrl.educationByID);

export default router;
