var watson = require('watson-developer-cloud')

var authorization = new watson.AuthorizationV1({
  username: process.env.WATSON_USERNAME,
  password: process.env.WATSON_PASSWORD,
  url: 'https://stream.watsonplatform.net/authorization/api', // Speech tokens
})

authorization.getToken({
  url: 'https://stream.watsonplatform.net/text-to-speech/api'
},
function (err, token) {
  if (!token) {
    console.log('error:', err)
  } else {
    // Use your token here
  }
})
