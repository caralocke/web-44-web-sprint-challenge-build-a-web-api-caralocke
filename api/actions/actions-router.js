// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
const { validateActionId } = require('./actions-middlware')
const router = express.Router()

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({ message: err.message})
        })
})

router.get('/:id', validateActionId, (req, res) => {
    const { id } = req.params
    Actions.get(id)
        .then(action => {
            res.status(200).json(action)
        })
})

module.exports = router