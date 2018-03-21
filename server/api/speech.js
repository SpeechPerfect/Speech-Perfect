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

module.exports = router
