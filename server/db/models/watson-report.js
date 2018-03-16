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
  }
})

module.exports = WatsonReport

