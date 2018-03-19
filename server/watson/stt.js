

const { promisify } = require('util')
var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1')
var fs = require('fs')
let result

let dataAnalysis = async () => {
  var speechToText = new SpeechToTextV1({
    username: process.env.WATSON_USERNAME,
    password: process.env.WATSON_PASSWORD,
    url: 'https://stream.watsonplatform.net/speech-to-text/api/'
  })

  var params = {
    // From file
    audio: fs.createReadStream('/Users/micahfriedland/Desktop/Fullstack Academy/Senior-Phase/Speech-Perfect/assets/audio-file.flac'),
    content_type: 'audio/flac rate=44100'
  }

 const speechToTextPromisified = promisify(speechToText.recognize.bind(speechToText))
 const { results } = await speechToTextPromisified(params)
 return results
}

module.exports = dataAnalysis

// Stretch Goal
// or streaming
// fs.createReadStream('./resources/speech.wav')
//   .pipe(speechToText.createRecognizeStream({ content_type: 'audio/l16 rate=44100' }))
//   .pipe(fs.createWriteStream('./transcription.txt'))
