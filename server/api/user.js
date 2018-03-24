const router = require('express').Router()
const { User, Speech }  = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:userId', (req, res, next) => {
  Speech.findAll({
    where: {
      userId: req.params.userId
    }
  })
  .then(foundSpeeches => res.json(foundSpeeches))
})
