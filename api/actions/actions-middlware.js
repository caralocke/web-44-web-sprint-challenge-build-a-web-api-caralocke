// add middlewares here related to actions
const Actions = require('./actions-model')

function validateActionId(req, res, next) {
    const { id } = req.params
    Actions.get(id)
        .then(action => {
            if(action) {
                next()
            } else {
                res.status(404).json({message :`Project with id of ${id} does not exist`})
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message})
        })
}

function validateAction(req, res, next) {
    const { description, notes, completed, project_id } = req.body
    if(!description || !notes || !project_id || (completed == undefined)) {
        res.status(400).json({ message: 'Please provide a description, some notes, the completed status, and a project id.'})
    } else {
        next()
    }
}

module.exports = {
    validateActionId,
    validateAction
}