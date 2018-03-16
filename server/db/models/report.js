const Sequelize = require('sequelize')
const db = require('../db')

const Report = db.define('report', {
  duration: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  tone: {
    type: Sequelize.STRING,
    // possibly enum
  },
  pace: {
    type: Sequelize.INTEGER
  },
  umCount: {
    type: Sequelize.INTEGER,
  },
  likeCount: {
    type: Sequelize.INTEGER
  }
})

module.exports = Report
