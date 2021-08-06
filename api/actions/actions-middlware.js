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

module.exports = {
    validateActionId
}