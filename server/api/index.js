const router = require('express').Router()
module.exports = router

router.use('/user', require('./user'))
router.use('/watson-api', require('./watson-api'))
router.use('/audio', require('./audio'))
router.use('/speech', require('./speech'))

// router.use((req, res, next) => {
//   const error = new Error('Not Found')
//   error.status = 404
//   next(error)
// }
