// add middlewares here related to projects
const Projects = require('./projects-model')
function validateProjectId(req, res, next) {
    const { id } = req.params
    Projects.get(id)
        .then(project => {
            if(project) {
                next()
            } else {
                res.status(404).json({message :`Project with specified id of ${id} does not exist.`})
            }
        })
}

function validateProject(req, res, next) {
    const { name, description, completed } = req.body
    if(!name || !description || (completed == undefined)){
        res.status(400).json({ message: 'Please provide a name, description, and the completed status of the project.'})
    } else {
        next()
    }
}

module.exports = {
    validateProjectId,
    validateProject
}