const Sequelize = require('sequelize);
const db = require(.../db)

const Speeches = db.define('speeches', {
 audioRecording: {
    type: Sequelize.STRING
  },
  transcript: {
    type: Sequelize.TEXT
  }
})

module.exports = Speeches

