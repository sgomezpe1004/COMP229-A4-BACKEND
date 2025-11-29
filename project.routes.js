import express from "express";
import projectCtrl from "../controllers/project.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();


router.post("/", authCtrl.requireSignin, projectCtrl.create);


router.get("/", authCtrl.requireSignin, projectCtrl.list);


router.route("/:projectId")
  .get(authCtrl.requireSignin, projectCtrl.read)
  .put(authCtrl.requireSignin, projectCtrl.update)
  .delete(authCtrl.requireSignin, projectCtrl.remove);

router.param("projectId", projectCtrl.projectByID);

export default router;
