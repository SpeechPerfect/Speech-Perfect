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
  console.log("DELETING ONE", req.params)
  Speech.destroy({
    where: {
      id: req.params.speechId
    },
  })
  .then(deletedSpeech => res.json(deletedSpeech))
})

router.delete('/all/:userId', (req, res, next) => {
  console.log("DELETING ALL", req.params)
  Speech.destroyAll({
    where: {
      userId: req.params.userId
    },
  })
  .then(deletedSpeeches => res.json(deletedSpeeches))
})

module.exports = router
