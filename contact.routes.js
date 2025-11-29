import express from "express";
import contactCtrl from "../controllers/contact.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/", authCtrl.requireSignin, contactCtrl.create);


router.get("/", authCtrl.requireSignin, contactCtrl.list);


router.route("/:contactId")
  .get(authCtrl.requireSignin, contactCtrl.read)
  .put(authCtrl.requireSignin, contactCtrl.update)
  .delete(authCtrl.requireSignin, contactCtrl.remove);

router.param("contactId", contactCtrl.contactByID);

export default router;
