const User = require('./user')
const Speech = require('./speech')
const AwsReport = require('./aws-report')
const BvReport = require('./bv-report')
const WatsonReport = require('./watson-report.js')

Speech.belongsTo(User)
Speech.hasOne(AwsReport)
Speech.hasOne(WatsonReport)
AwsReport.belongsTo(Speech)
BvReport.belongsTo(Speech)
WatsonReport.belongsTo(Speech)

module.exports = {
  User,
  Speech,
  AwsReport,
  BvReport,
  WatsonReport
}
