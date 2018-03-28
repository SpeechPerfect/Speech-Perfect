const router = require('express').Router() //eslint-disable-line new-cap
const { Speech, WatsonReport } = require('../db/models')
let multer = require('multer')
const upload = multer({ dest: '/tmp' })
const { promisify } = require('util')
var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1')
var fs = require('fs')
let speechId = ''

const dataAnalysis = async params => {
  var speechToText = new SpeechToTextV1({
    username: process.env.WATSON_USERNAME,
    password: process.env.WATSON_PASSWORD,
    url: 'https://stream.watsonplatform.net/speech-to-text/api/'
  })

  const speechToTextPromisified = promisify(
    speechToText.recognize.bind(speechToText)
  )
  const { results } = await speechToTextPromisified(params)
  return results
}

// add regex to account for end of sentence

const analyzeTranscript = str => {
  let obj = {}
  obj.umCount = 0
  obj.likeCount = 0
  const strArr = str.split(' ')
  for (let i = 0; i < strArr.length; i++) {
    if (strArr[i] === 'um' || strArr[i] === '%HESITATION') obj.umCount++
    if (strArr[i] === 'like') obj.likeCount++
  }
  return obj
}

const getConfidence = (dataArr, transcriptLength) => {
  const totalConfidence = dataArr
    .map((x, i) => {
      return dataArr[i].confidence * (x.sectionLength / transcriptLength)
    })
    .reduce((a, b) => a + b)
  return totalConfidence
}

const getLengthAndConfidence = arr => {
  let transcriptLength = 0
  let sectionInfo = []
  arr.map(result => {
    let obj = {}
    const sectionLength = result.alternatives[0].transcript.trim().split(' ')
      .length
    obj.sectionLength = sectionLength
    obj.confidence = result.alternatives[0].confidence
    sectionInfo.push(obj)
    transcriptLength += sectionLength
    return result.alternatives[0].transcript
  })
  let totalConfidence = getConfidence(sectionInfo, transcriptLength)
  console.log('TOTAL CONFIDENCE', totalConfidence)
  console.log('RETURNED VALUE', [transcriptLength, totalConfidence])
  return [transcriptLength, totalConfidence]
}

const getTranscript = arr => {
  return arr.map(result => result.alternatives[0].transcript.trim()).join(' ')
}

router.post('/upload/:userId', upload.single('soundFile'), (req, res, next) => {
  console.log('req body is', req.body)
  const params = {
    audio: fs.createReadStream(req.file.path),
    content_type: 'audio/wav rate=44100' //eslint-disable-line camelcase
  }
  dataAnalysis(params)
    .then(results => {
      const speechConfidence = getLengthAndConfidence(results)[1]
      if (speechConfidence < 0.75) {
        return res.status(400).json('Low confidence')
      }
      const speechTranscript = analyzeTranscript(
        results[0].alternatives[0].transcript
      )
      Speech.create({
        userId: req.params.userId
      }).then(speech => {
        speechId = speech.id
        return WatsonReport.create({
          speechId: speech.id,
          transcript: getTranscript(results),
          likeCount: speechTranscript.likeCount,
          umCount: speechTranscript.umCount,
          wordCount: getLengthAndConfidence(results)[0],
          confidence: speechConfidence.toFixed(2),
          // get from AWS or front-end
          duration: req.body.duration / 1000
        })
          .then(createdWReport => {
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

module.exports = router
