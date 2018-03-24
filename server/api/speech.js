const router = require('express').Router()
const { Speech } = require('../db/models')

router.get('/:userId', (req, res, next) => {
  Speech.findAll({
    where: {
      userId: req.params.userId
    }
  })
  .then(foundSpeeches => res.json(foundSpeeches))
})

router.get('/:userId/:speechId', (req, res, next) => {
  console.log('params')
  Speech.scope('populated').findById(req.params.speechId)
    .then(result => res.json(result))
})

router.delete('/:userId/:speechId', (req, res, next) => {
  console.log("params", req.params)
  Speech.destroy({
    where: {
      id: req.params.speechId
    },
  })
  .then(deletedSpeech => res.json(deletedSpeech))
})

router.delete('/:userId', (req, res, next) => {
  console.log("hmm", req.params)
  Speech.destroy({
    where: {
      userId: req.params.userId
    },
  })
  .then(deletedSpeeches => res.json(deletedSpeeches))
})



module.exports = router
