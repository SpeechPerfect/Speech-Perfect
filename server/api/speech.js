const router = require('express').Router()
const { WatsonReport, Speech, AwsReport } = require('../db/models')

router.get('/watson-data/:speechId', (req, res, next) => {
  WatsonReport.findOne({
    where: {
    speechId: req.params.speechId
  }})
  .then(result => res.json(result))
})

router.get('/aws-data/:speechId', (req, res, next) => {
  AwsReport.findOne({
    where: {
      speechId: req.params.speechId
    }
  })
  .then(result => res.json(result))
})

router.delete('/:speechId', (req, res, next) => {
  Speech.destroy({
    where: {
      id: req.params.speechId
    },
  })
  .then(deletedSpeech => res.json(deletedSpeech))
})

router.delete('/all/:userId', (req, res, next) => {
  Speech.destroy({
    where: {
      userId: req.params.userId
    },
  })
  .then(deletedSpeeches => res.json(deletedSpeeches))
})

router.put('/:speechId', (req, res, next) => {
  console.log('hit', req.params.speechId, req.body)
  Speech.update(req.body, {
    where: {
      userId: req.params.speechId
    },
    returning: true
  })
  .then(updatedSpeech => res.json(updatedSpeech))
})

module.exports = router
