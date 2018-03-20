const router = require('express').Router()
const { Speech } = require('../db/models')
const dataAnalysis = require('../watson/stt')
module.exports = router

router.post('/', (req, res, next) => {
  console.log('reached API')
  Speech.scope('populated').findAll({})
    .then((result) => dataAnalysis())
    .then(results => {
      console.log('api', results[0].alternatives)
      res.json(results)
    })
    .catch(next)
})

// To be used in the future
// router.get('/:id', (req, res, next) => {
//   Speech.scope('populated').findById(req.params.id)
//     .then(result => res.json(result))
// })

router.get('/:userId', (req, res, next) => {
  Speech.findAll({
    where: {
      userId: req.params.userId
    }
  })
  .then(foundSpeeches => res.json(foundSpeeches))
})
