const Sequelize = require('sequelize')
const db = require('../db')

const AwsReport = db.define('awsReport', {
  url: {
    type: Sequelize.STRING
  }
})

module.exports = AwsReport
