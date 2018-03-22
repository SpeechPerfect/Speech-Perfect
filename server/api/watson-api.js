const router = require('express').Router()
const { Speech } = require('../db/models')
let multer = require('multer')
const upload = multer({dest: '/tmp'})

const { promisify } = require('util')
var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1')
var fs = require('fs')
let result

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

router.post('/', upload.single('soundFile'), (req, res, next) => {
    console.log('REQ BODY IS', req.file)
    const params = {
      audio: fs.createReadStream(req.file.path),
      content_type: 'audio/wav rate=44100'
    }
    dataAnalysis(params)
    .then(results => {
      console.log('RESULTS ARE ***', results[0])
      res.json(results)
    })
    .catch(next)
})

// To be used in the future
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
