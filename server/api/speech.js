const router = require('express').Router() //eslint-disable-line new-cap
const { WatsonReport, Speech, AwsReport } = require('../db/models')
var thesaurus = require('thesaurus')

router.get('/watson-data/:speechId', (req, res, next) => {
  WatsonReport.findOne({
    where: {
      speechId: req.params.speechId
    }
  }).then(result => res.json(result))
})

router.get('/aws-data/:speechId', (req, res, next) => {
  AwsReport.findOne({
    where: {
      speechId: req.params.speechId
    }
  }).then(result => res.json(result))
})

router.get('/thesaurus/:word', (req, res, next) => {
  let word = req.params.word
  let wordList = thesaurus.find(word)
  res.json(wordList)
})

router.delete('/:speechId', (req, res, next) => {
  Speech.destroy({
    where: {
      id: req.params.speechId
    }
  }).then(() => res.status(204))
})

router.delete('/all/:userId', (req, res, next) => {
  Speech.destroy({
    where: {
      userId: req.params.userId
    }
  }).then(() => res.status(204))
})

router.put('/:speechId', (req, res, next) => {
  console.log('hit', req.params.speechId, req.body)
  Speech.update(req.body, {
    where: {
      id: req.params.speechId
    },
    returning: true
  }).then(updatedSpeech => res.json(updatedSpeech))
})

module.exports = router
