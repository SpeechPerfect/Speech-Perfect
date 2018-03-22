const router = require('express').Router()
const { Speech, WatsonReport } = require('../db/models')
let multer = require('multer')
const upload = multer({dest: '/tmp'})

const { promisify } = require('util')
var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1')
var fs = require('fs')

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

router.post('/', upload.single('soundFile'), (req, res, next) => {
    console.log('REQ BODY IS', req.file)
    const params = {
      audio: fs.createReadStream(req.file.path),
      content_type: 'audio/wav rate=44100'
    }
    dataAnalysis(params)
    .then(results => {
      let speechData = analyzeTranscript(results[0].alternatives[0].transcript)
      Speech.create({
        //userId: req.user.id
      })
      .then((speech) => {
        WatsonReport.create({
          speechId: speech.id,
          transcript: results[0].alternatives[0].transcript,
          likeCount: speechData.likeCount,
          umCount: speechData.umCount,
          // get from AWS or front-end
          duration: 0
        })
        .then((createdWReport) => {
          speech.update({
            WatsonReportId: createdWReport.id
          })
        })

      })
      res.json(results)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Speech.scope('populated').findById(req.params.id)
    .then(result => res.json(result))
})

module.exports = router


module.exports = router
