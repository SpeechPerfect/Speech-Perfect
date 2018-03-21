

const { promisify } = require('util')
var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1')
var fs = require('fs')
// const file = require('../api/audio')
let result

let dataAnalysis = async (file) => {
  var speechToText = new SpeechToTextV1({
    username: '5f91240c-763e-4810-a807-a284fab5e895',
    password: 'a2izVkdaw1ox',
    url: 'https://stream.watsonplatform.net/speech-to-text/api/'
  })


    var paramsOne = {
    model: 'en-US_BroadbandModel',
    content_type: 'audio/wav',
    'interim_results': true,
    'max_alternatives': 3,
    'word_confidence': false,
    timestamps: false,
    keywords: ['colorado', 'tornado', 'tornadoes'],
    'keywords_threshold': 0.5
  }

  var recognizeStream = speechToText.createRecognizeStream(paramsOne)


  var params = {
    // From file
    audio: fs.createReadStream('/Users/micahfriedland/Desktop/Fullstack Academy/Senior-Phase/Speech-Perfect/assets/audio-file.flac'),
    content_type: 'audio/wav rate=44100'
  }

  console.log('audio',audioFile)

 const speechToTextPromisified = promisify(speechToText.recognize.bind(speechToText))
 const { results } = await speechToTextPromisified(params)
 console.log(results)
}

module.exports = dataAnalysis

// Stretch Goal
// or streaming
// fs.createReadStream('./resources/speech.wav')
//   .pipe(speechToText.createRecognizeStream({ content_type: 'audio/l16 rate=44100' }))
//   .pipe(fs.createWriteStream('./transcription.txt'))



// let dataAnalysis = async (audioFile) => {
//   var speechToText = new SpeechToTextV1({
//     username: 'username',
//     password: 'pass word',
//     url: 'https://stream.watsonplatform.net/speech-to-text/api/'
//   })
  
//   var S3 = require('aws-sdk').S3, S3S = require('s3-streams')


// console.log('audio', audioFile)
  // var paramsOne = {
  //   model: 'en-US_BroadbandModel',
  //   content_type: 'audio/wav',
  //   'interim_results': true,
  //   'max_alternatives': 3,
  //   'word_confidence': false,
  //   timestamps: false,
  //   keywords: ['colorado', 'tornado', 'tornadoes'],
  //   'keywords_threshold': 0.5
  // }


  // var download = S3S.ReadStream(new S3(), {
  //   Bucket: 'speech-perfect2',
  //   Key: '1521573306868',
  //   // Any other AWS SDK options 
  // })
// console.log('audio',download)
//   var recognizeStream = speechToText.createRecognizeStream(paramsOne)

// axios.get(audioFile)
// .then(res => {
//   console.log(res)
//   axios.post("https://stream.watsonplatform.net/speech-to-text/api/v1/recognize?model=en-US_NarrowbandModel", {Authorization: {username: '5f91240c-763e-4810-a807-a284fab5e895',
//   password: 'a2izVkdaw1ox'}, "Content-Type":'audio/flac'})
//   .then(thing => console.log("HJ",thing)).catch(console.error)
  
  // var params = {
  //   // From file
  //   audio: res,
  //   content_type: 'audio/flac rate=44100',
  // }
  // const speechToTextPromisified = promisify(speechToText.recognize.bind(speechToText))
  // const { results } = speechToTextPromisified(params).catch(err => console.log(err))
  // // console.log('results', results)
  // return results
//   // console.log(results)
// }).catch(console.error)
// // .then((results) => console.log('results', results)) 
// }


// let result
