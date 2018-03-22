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

router.delete('/:userId', (req, res, next) => {
  Speech.destroy({
    where: {
      userId: req.params.userId
    },
  })
  .then(deletedSpeeches => res.json(deletedSpeeches))
})

router.delete('/userId:/speechId', (req, res, next) => {
  Speech.destroy({
    where: {
      id: req.params.speechId
    },
  })
  .then(deletedSpeech => res.json(deletedSpeech))
})

module.exports = router
