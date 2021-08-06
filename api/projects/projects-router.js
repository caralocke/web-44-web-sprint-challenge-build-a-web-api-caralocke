// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const router = express.Router()
const { validateProjectId, validateProject } = require('./projects-middleware')

router.get('/', (req, res) => {
    Projects.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({ message: err.message})
        })
})

router.get('/:id', validateProjectId, (req, res) => {
    const { id } = req.params
    Projects.get(id)
    .then(project => {
        res.status(200).json(project)
    })
})

router.post('/', validateProject, (req, res) => {
        const { name, description, completed } = req.body
        const { id } = Date.now()
        const newProject = { id, name, description, completed }
        Projects.insert(newProject)
            .then(project => {
            res.status(201).json(project);
            })
})

router.put('/:id', validateProjectId, validateProject, (req, res) => {
    Projects.update(req.params.id, req.body)
        .then(project => {
            res.status(200).json(project)
        })    
})

router.delete('/:id', validateProjectId, (req, res) => {
    const { id } = req.params
    Projects.get(id)
        .then(project => {
            Projects.remove(id)
                .then(() => {
                    res.status(200).json(project)
                })
        })
        .catch(err => {
            res.status(500).json({ message: err.message})
        })
})

router.get('/:id/actions', validateProjectId, (req, res) => {
    const { id } = req.params
    Projects.getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({ message: err.message})
        })
})

module.exports = router