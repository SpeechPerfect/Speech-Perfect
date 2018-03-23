const router = require('express').Router()
const { Speech, WatsonReport } = require('../db/models')
let multer = require('multer')
const upload = multer({dest: '/tmp'})
const { promisify } = require('util')
var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1')
var fs = require('fs')
let speechId = ''

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


let getLength = (arr) => {
  let transcriptLength  = 0
  let sectionLengths = []
  let sectionConfidences = []
  let transcript = arr.map(result => {
    const sectionLength = result.alternatives[0].transcript.split(' ').length
    sectionLengths.push(sectionLength)
    sectionConfidences.push(result.alternatives[0].confidence)
    transcriptLength += sectionLength
    return result.alternatives[0].transcript
  })
 console.log({ transcriptLength, sectionConfidences, sectionLengths })
}

let getTranscript = (arr) => {
  return arr.map(result => result.alternatives[0].transcript.trim()).join(' ')
}

 let getConfidence = (sectionArr, confidenceArr, transcriptLength) => {
    return sectionArr.map((length,i) => {
      return confidenceArr[i] * (length / transcriptLength )
    }).reduce((a, b) => a + b)
  }

router.post('/upload/:userId', upload.single('soundFile'), (req, res, next) => {
    const params = {
      audio: fs.createReadStream(req.file.path),
      content_type: 'audio/wav rate=44100'
    }
    dataAnalysis(params)
    .then(results => {
      console.log(results)
      // console.log('version', results[0])
      // console.log('version 2', results[1])
      getTranscript(results)
      getLength(results)
      let speechTranscript = analyzeTranscript(results[0].alternatives[0].transcript)
      let confidence =  results[0].alternatives[0].confidence
      Speech.create({
        userId: req.params.userId
      })
      .then((speech) => {
        speechId = speech.id
        console.log(speechId, 'is the speech id')
        return WatsonReport.create({
          speechId: speech.id,
          transcript: getTranscript(results),
          likeCount: speechTranscript.likeCount,
          umCount: speechTranscript.umCount,
          confidence: confidence,
          // get from AWS or front-end
          duration: 0
        })
        .then((createdWReport) => {
          return speech.update({
            WatsonReportId: createdWReport.id
          })
        })
        .then(() => {
          console.log('speech id is', speechId)
          res.json(speechId)
        })
      })
    })
    // .then((results) => res.status(200).send(results))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  console.log('params', req.params)
  Speech.scope('populated').findById(req.params.id)
    .then(result => res.json(result))
})


router.get('/:userId/:speechId', (req, res, next) => {
  console.log('params')
  Speech.scope('populated').findById(req.params.speechId)
    .then(result => res.json(result))
})

module.exports = router
