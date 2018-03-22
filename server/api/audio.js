const router = require('express').Router()
const { AwsReport, WatsonReport, Speech, User } = require('../db/models')
const multer  = require('multer')
const fs = require('fs')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const creds = require('../secrets')
const upload = multer({dest: '/tmp'})

// AWS funcs

AWS.config.update(creds.creds)
const s3 = new AWS.S3()

const awsUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: creds.bucket,
    acl: 'public-read',
    contentType: (req, file, cb) => {
      return cb(null, 'audio/x-wav')
    }, // multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      console.log('FILE IS ', file)
      cb(null, {fieldName: file.fieldname})
    },
    key: function (req, file, cb) {

      cb(null, Date.now().toString())
    }
  })
})

// Watson funcs

const { promisify } = require('util')
var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1')

let dataAnalysis = async (params) => {
  var speechToText = new SpeechToTextV1({
    username: process.env.WATSON_USERNAME,
    password: process.env.WATSON_PASSWORD,
    url: 'https://stream.watsonplatform.net/speech-to-text/api/'
  })

 const speechToTextPromisified = promisify(speechToText.recognize.bind(speechToText))
 const { results } = await speechToTextPromisified(params)
 return results
}

// add regex to account for end of sentence

let analyzeTranscript = (str) => {
  let obj = {}
  obj.umCount = 0
  obj.likeCount = 0
  let strArr = str.split(' ')
  for (let i = 0; i < strArr.length; i++) {
    if (strArr[i] === 'um' || strArr[i] === '%HESITATION') obj.umCount++
    if (strArr[i] === 'like') obj.likeCount++
  }
  return obj
}

router.post('/upload', awsUpload.single('soundFile'), (req, res, next) => {
  console.log(req.body, 'is req.body!!!!')
  console.log('in post route, file is ', req.file)
  res.send('Successfully uploaded ' + req.file.fieldName + ' file!')
})

module.exports = router
