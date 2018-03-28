const router = require('express').Router() //eslint-disable-line new-cap
const { AwsReport } = require('../db/models')
const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const creds = require('../secrets')

/* eslint-disable */
AWS.config.update({"accessKeyId": process.env.AWS_ID, "secretAccessKey": process.env.AWS_KEY, "region": process.env.AWS_REGION})
/* eslint-enable */

const s3 = new AWS.S3()

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'speech-perfect',
    acl: 'public-read',
    contentType: (req, file, cb) => {
      return cb(null, 'audio/x-wav')
    }, // multerS3.AUTO_CONTENT_TYPE,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

router.post(
  '/upload/:speechId',
  upload.single('soundFile'),
  (req, res, next) => {
    console.log('in post route, file is ', req.file)
    AwsReport.create({
      url: req.file.location,
      speechId: req.params.speechId
    }).then(createdAws => res.json(createdAws))
    // res.send('Successfully uploaded ' + req.file.fieldName + ' file!')
  }
)

module.exports = router
