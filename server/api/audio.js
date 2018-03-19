const router = require('express').Router()
const { awsReport } = require('../db/models')
const multer  = require('multer')
const fs = require('fs')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const creds = require('../secrets')

// AWS.config.loadFromPath('./s3_config.json')

AWS.config.update(creds.creds)


const s3 = new AWS.S3()

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: creds.bucket,
    contentType: (req, file, cb) => {
      return cb(null, 'audio/x-wav')
    }, // multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname})
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

router.post('/upload', upload.single('soundFile'), (req, res, next) => {
  console.log('in post route, file is ', req.file)
  res.send('Successfully uploaded ' + req.file.fieldName + ' file!')
})

module.exports = router
