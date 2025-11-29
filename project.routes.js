import express from 'express'
import authCtrl from "../controllers/auth.controller.js";
import projectCtrl from '../controllers/project.controller.js' 

    const router = express.Router()
    router.route('/projects').post(authCtrl.requireSignin, projectCtrl.create)
    router.route('/projects').get(authCtrl.requireSignin, projectCtrl.list)
    router.route('/projects').delete(authCtrl.requireSignin, projectCtrl.remove)
    router.param('projectId', projectCtrl.projectByID)
    router.route('/projects/:projectId').get(authCtrl.requireSignin, projectCtrl.read)
    router.route('/projects/:projectId').put(authCtrl.requireSignin, projectCtrl.update)
    router.route('/projects/:projectId').delete(authCtrl.requireSignin, projectCtrl.remove)

    export default router