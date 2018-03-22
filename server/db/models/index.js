const User = require('./user')
const Speech = require('./speech')
const AwsReport = require('./aws-report')
const BvReport = require('./bv-report')
const WatsonReport = require('./watson-report.js')

Speech.belongsTo(User)
AwsReport.belongsTo(Speech)
BvReport.belongsTo(Speech)
WatsonReport.belongsTo(Speech)
Speech.hasOne(AwsReport)
Speech.hasOne(BvReport)
Speech.hasOne(WatsonReport)

module.exports = {
  User,
  Speech,
  AwsReport,
  BvReport,
  WatsonReport
}
