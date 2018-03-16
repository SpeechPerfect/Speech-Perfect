const Sequelize = require('sequelize')
const db = require('../db')

const Speech = db.define('speech', {
  recordingUrl: {
    type: Sequelize.STRING
  },
  transcript: {
    type: Sequelize.TEXT
  }
})

module.exports = Speech
