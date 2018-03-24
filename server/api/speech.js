const router = require('express').Router()
const { WatsonReport, Speech, AwsReport } = require('../db/models')
var thesaurus = require('thesaurus')

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


router.get('/thesaurus/:word', (req, res, next) => {
  let word = req.params.word
  let wordList = thesaurus.find(word)
  res.json(wordList)
})

router.delete('/thesaurus/:word', (req, res, next) => {
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
