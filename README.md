# Speech Perfect

A mobile app that coaches you to become a better public speaker. Developed using create-react-native-app on the front end, and with an Express/Node.js back-end.

## Getting Started

A guide to installing our app on your local machine for dev purposes.

### Requirements

You will need your own AWS access ID and secret, as well as an AWS bucket set up to store audio. You will also need keys for [IBM Watson's Speech-To-Text API](https://www.ibm.com/watson/services/speech-to-text/).

### Installation

- Install from root directory using `npm run install`.

- Download [XDE](https://github.com/expo/xde) and an iOS simulator to your machine.

- Run `npm run start-native-client` to boot up the front end, and you'll see our app in the simulator.

- Run `npm run start-server` in a separate terminal to spin up the server.

- Change the bucket name in server/api/audio to your bucket.

## Testing

Run `npm run test` to test both client and server. Each folder also has its own test script.

## Contributing

Please submit a GitHub issue for bug and feature requests.


