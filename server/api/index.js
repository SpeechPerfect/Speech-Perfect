const router = require('express').Router()
module.exports = router
const { audioRouter} = require('./audio')

router.use('/users', require('./users'))
router.use('/watson', require('./watson'))
router.use('/audio', audioRouter )

// router.use((req, res, next) => {
//   const error = new Error('Not Found')
//   error.status = 404
//   next(error)
// }
