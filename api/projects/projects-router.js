// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const router = express.Router()

router.get('/', (req, res) => {
    Projects.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({ message: err.message})
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Projects.get(id)
    .then(project => {
      if(project) {
        res.status(200).json(project)
      } else {
        res.status(404).json({
          message: `Project with id of ${id} does not exist`
	});
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
})

module.exports = router