import express from 'express'
import qualificationCtrl from '../controllers/education.controller.js' 
import authCtrl from "../controllers/auth.controller.js";

    const router = express.Router()
    router.route('/qualifications').post(authCtrl.requireSignin, qualificationCtrl.create)
    router.route('/qualifications').get(authCtrl.requireSignin, qualificationCtrl.list)
    router.route('/qualifications').delete(authCtrl.requireSignin, qualificationCtrl.removeMany)
    router.param('qualificationId', qualificationCtrl.qualificationByID)
    router.route('/qualifications/:qualificationId').get(authCtrl.requireSignin, qualificationCtrl.read)
    router.route('/qualifications/:qualificationId').put(authCtrl.requireSignin, qualificationCtrl.update)
    router.route('/qualifications/:qualificationId').delete(authCtrl.requireSignin, qualificationCtrl.remove)

    export default router
