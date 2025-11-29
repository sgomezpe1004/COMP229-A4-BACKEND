import express from "express";
import contactCtrl from "../controllers/contact.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/contacts")
  .get(authCtrl.requireSignin, contactCtrl.list)          // GET /api/contacts
  .post(authCtrl.requireSignin, contactCtrl.create)       // POST /api/contacts
  .delete(authCtrl.requireSignin, contactCtrl.removeMany);// DELETE /api/contacts (multiple)

router.route("/contacts/:contactId")
  .get(authCtrl.requireSignin, contactCtrl.read)          // GET /api/contacts/:contactId
  .put(authCtrl.requireSignin, contactCtrl.update)        // PUT /api/contacts/:contactId
  .delete(authCtrl.requireSignin, contactCtrl.remove);    // DELETE /api/contacts/:contactId

// Param middleware
router.param("contactId", contactCtrl.contactByID);

export default router;
