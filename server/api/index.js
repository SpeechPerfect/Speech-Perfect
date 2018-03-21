const router = require('express').Router()
module.exports = router
const { audioRouter} = require('./audio')

router.use('/users', require('./users'))
router.use('/watson-api', require('./watson-api'))
router.use('/audio', require('./audio'))
router.use('/speech', require('./speech'))

// router.use((req, res, next) => {
//   const error = new Error('Not Found')
//   error.status = 404
//   next(error)
// }
