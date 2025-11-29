import Qualification from '../models/education.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'
const create = async (req, res) => { 
const qualification = new Qualification(req.body) 
try {
await qualification.save()
return res.status(200).json({ 
message: "Successfully created!"
})
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}
const list = async (req, res) => { 
try {
let qualifications = await Qualification.find().select('title firstname lastname email completion description') 
res.json(qualifications)
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}
const qualificationByID = async (req, res, next, id) => { 
try {
let qualification = await Qualification.findById(id) 
if (!qualification)
return res.status('400').json({ 
error: "qualification not found"
})
req.qualification = qualification 
next()
} catch (err) {
return res.status('400').json({ 
error: "Could not retrieve qualification"
}) 
}
}
const read = (req, res) => {
//req.qualification = undefined 
//req.profile.salt = undefined
return res.json(req.qualification) 
}
const update = async (req, res) => { 
try {
let qualification = req.qualification
qualification = extend(qualification, req.body) 
qualification.updated = Date.now() 
await qualification.save()
//user.hashed_password = undefined 
//user.salt = undefined
res.json(qualification) 
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}
const remove = async (req, res) => { 
try {
let qualification = req.qualification
let deletedQualification = await qualification.deleteOne() 

return res.status(200).json({ 
    message: "Successfully deleted!"
    }); 
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}

// New function to remove multiple contacts
const removeMany = async (req, res) => {
    const { ids } = req.body; // Assuming IDs are sent in the request body
    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({
            error: "Please provide an array of IDs to delete."
        });
    }
    try {
        const result = await Qualification.deleteMany({ _id: { $in: ids } });
        return res.status(200).json({
            message: `${result.deletedCount} qualifications successfully deleted!`
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};
export default { create, qualificationByID, read, list, remove, removeMany, update }
