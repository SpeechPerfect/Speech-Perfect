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

let getConfidence = (dataArr, transcriptLength) => {
  let totalConfidence = dataArr.map((x , i) => {
    return dataArr[i].confidence * (x.sectionLength / transcriptLength )
  }).reduce((a, b) => a + b)
  return totalConfidence

}

let getLengthAndConfidence = (arr) => {
  let transcriptLength  = 0
  let sectionInfo = []
  let transcript = arr.map(result => {
    let obj = {}
    const sectionLength = result.alternatives[0].transcript.trim().split(' ').length
    obj.sectionLength = sectionLength
    obj.confidence = result.alternatives[0].confidence
    sectionInfo.push(obj)
    transcriptLength += sectionLength
    return result.alternatives[0].transcript
  })
  let totalConfidence = getConfidence(sectionInfo, transcriptLength)
  console.log('TOTAL CONFIDENCE',totalConfidence)
  console.log('RETURNED VALUE',[transcriptLength, totalConfidence])
  return [transcriptLength, totalConfidence]
}

let getTranscript = (arr) => {
  return arr.map(result => result.alternatives[0].transcript.trim()).join(' ')
}

router.post('/upload/:userId', upload.single('soundFile'), (req, res, next) => {
    const params = {
      audio: fs.createReadStream(req.file.path),
      content_type: 'audio/wav rate=44100'
    }
    dataAnalysis(params)
    .then(results => {
      let speechConfidence = getLengthAndConfidence(results)[1]
      if (speechConfidence < 0.85) {
        return res.status(400).json('Low confidence')
      }
      let speechTranscript = analyzeTranscript(results[0].alternatives[0].transcript)
      Speech.create({
        userId: req.params.userId
      })
      .then((speech) => {
        speechId = speech.id
        return WatsonReport.create({
          speechId: speech.id,
          transcript: getTranscript(results),
          likeCount: speechTranscript.likeCount,
          umCount: speechTranscript.umCount,
          wordCount: getLengthAndConfidence(results)[0],
          confidence: speechConfidence.toFixed(2),
          // get from AWS or front-end
          duration: 0
        })
        .then((createdWReport) => {
          return speech.update({
            WatsonReportId: createdWReport.id
          })
        })
        .then(() => {
          res.json(speechId)
        })
      })
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  console.log('params', req.params)
  Speech.scope('populated').findById(req.params.id)
    .then(result => res.json(result))
})


module.exports = router
