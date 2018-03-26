const User = require('./user')
const Speech = require('./speech')
const AwsReport = require('./aws-report')
const WatsonReport = require('./watson-report.js')

Speech.belongsTo(User)
AwsReport.belongsTo(Speech)
WatsonReport.belongsTo(Speech)
Speech.hasOne(AwsReport, { onDelete: 'cascade' })
Speech.hasOne(WatsonReport, { onDelete: 'cascade' })

module.exports = {
  User,
  Speech,
  AwsReport,
  WatsonReport
}
