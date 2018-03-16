const User = require('./user')
const Report = require('./report')
const Speech = require('./speech')

Speech.belongsTo(User)
Report.belongsTo(Speech)
Report.belongsTo(User)

module.exports = {
  User,
  Report,
  Speech
}
