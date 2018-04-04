const router = require('express').Router() //eslint-disable-line new-cap
const { WatsonReport, Speech, AwsReport } = require('../db/models')
var thesaurus = require('thesaurus')

router.get('/watson-data/:speechId', (req, res, next) => {
  WatsonReport.findOne({
    where: {
      speechId: req.params.speechId
    }
  })
    .then(result => res.json(result))
    .catch(next)
})

router.get('/aws-data/:speechId', (req, res, next) => {
  AwsReport.findOne({
    where: {
      speechId: req.params.speechId
    }
  })
    .then(result => res.json(result))
    .catch(next)
})

router.get('/thesaurus/:word', (req, res, next) => {
  let word = req.params.word
  let wordList = thesaurus.find(word)
  res.json(wordList)
  // .catch(next)
})

router.get('/:speechId', (req, res, next) => {
  Speech.findById(req.params.speechId).then(speech => res.json(speech))
})

router.delete('/:speechId', (req, res, next) => {
  Speech.destroy({
    where: {
      id: req.params.speechId
    }
  })
    .then(deletedSpeeches => res.json(deletedSpeeches))
    .catch(next)
})

router.delete('/all/:userId', (req, res, next) => {
  Speech.destroy({
    where: {
      userId: req.params.userId
    }
  })
    .then(() => res.send(204))
    .catch(next)
})

router.put('/:speechId', (req, res, next) => {
  console.log('hit', req.params.speechId, req.body)
  Speech.update(req.body, {
    where: {
      id: req.params.speechId
    },
    returning: true
  })
    .then(updatedSpeech => res.json(updatedSpeech))
    .catch(next)
})

module.exports = router
