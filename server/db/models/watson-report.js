const Sequelize = require('sequelize')
const db = require('../db')

const WatsonReport = db.define('watsonReport', {
  duration: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  umCount: {
    type: Sequelize.INTEGER,
  },
  likeCount: {
    type: Sequelize.INTEGER
  },
  transcript: {
    type: Sequelize.TEXT
  },
  confidence: {
    type: Sequelize.DECIMAL
  }
})

module.exports = WatsonReport

