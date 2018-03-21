const router = require('express').Router()
const { Speech } = require('../db/models')
const dataAnalysis = require('../watson/stt')
module.exports = router






router.post('/', (req, res, next) => {
  console.log('reached new API')
  // console.log('reached new API')
  // Speech.scope('populated').findAll({})
    dataAnalysis('/Users/micahfriedland/Library/Developer/CoreSimulator/Devices/8B8F5557-132D-4021-BA8B-5E42C8B28E89/data/Containers/Data/Application/270AE03C-D84E-47BB-83EA-31C64BB606BA/Library/Caches/ExponentExperienceData/%2540anonymous%252Fspeech-perfect-16a86111-e08e-44cf-9ee5-ee72921c6604/AV/recording-6EF9D7EA-D1C6-400C-B63F-A00942A859F4.wav')
    // .then((result) => dataAnalysis())
    .then(results => {
      console.log('reached')
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
