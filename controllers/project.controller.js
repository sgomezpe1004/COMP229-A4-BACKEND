import Project from '../models/project.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'
const create = async (req, res) => { 
const project = new Project(req.body) 
try {
await project.save()
return res.status(200).json({ 
message: "Successfully Created!"
})
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}
const list = async (req, res) => { 
try {
let projects = await Project.find().select('title firstname lastname email completion description') 
res.json(projects)
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}
const projectByID = async (req, res, next, id) => { 
try {
let project = await Project.findById(id) 
if (!project)
return res.status(400).json({ 
error: "project not found"
})
req.project = project 
next()
} catch (err) {
return res.status('400').json({ 
error: "Could not retrieve project"
}) 
}
}
const read = (req, res) => {
//req.profile.hashed_password = undefined 
//req.profile.salt = undefined
return res.json(req.project) 
}
const update = async (req, res) => { 
try {
let project = req.project
project = extend(project, req.body) 
project.updated = Date.now() 
await project.save()
//project.hashed_password = undefined 
//project.salt = undefined
res.json(project) 
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}
const remove = async (req, res) => { 
    try {
    let project = req.project
    let deletedProject = await project.deleteOne() 
    //deletedProject = undefined
    return res.status(200).json({ 
        message: "Successfully deleted!"
        });
      
    } catch (err) {
    return res.status(400).json({
    error: errorHandler.getErrorMessage(err) 
    })
    } 
    }
    

const removeMany = async (req, res) => {
    const { ids } = req.body; 
    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({
            error: "Please provide an array of IDs to delete."
        });
    }
    try {
        const result = await Project.deleteMany({ _id: { $in: ids } });
        return res.status(200).json({
            message: `${result.deletedCount} projects successfully deleted!`
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

export default { create, projectByID, read, list, remove,removeMany, update }