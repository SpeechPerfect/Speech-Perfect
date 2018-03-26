const Sequelize = require('sequelize')
const db = require('../db')

const BvReport = db.define('bvReport', {
  tone: {
    type: Sequelize.STRING
    // possibly enum
  },
  pace: {
    type: Sequelize.INTEGER
  }
})

module.exports = BvReport
