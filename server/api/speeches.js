const router = require('express').Router()
const { Speech } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Speech.scope('populated').findAll({})
    .then((result) => res.json(result))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Speech.scope('populated').findById(req.params.id)
    .then(result => res.json(result))
})
