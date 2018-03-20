const router = require('express').Router()
const { awsReport } = require('../db/models')
const multer  = require('multer')
const fs = require('fs')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const creds = require('../secrets')
const stt= require('../watson/stt')
const { 
   Speech,
   AwsReport,
   BvReport,
   WatsonReport} = require('../db/models')

// AWS.config.loadFromPath('./s3_config.json')

AWS.config.update(creds.creds)


const s3 = new AWS.S3()

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: creds.bucket,
    acl: 'public-read',
    contentType: (req, file, cb) => {
      return cb(null, 'audio/flac')
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
  Speech.create({
    //userId: req.user.id
  })
  .then((speech) => {
    AwsReport.create({
      speechId: speech.id,
      url: req.file.location
    })
    .then(aws => {
      
        stt(aws.url)
    })
    .then(data => console.log(data))
  })
})

module.exports = router
