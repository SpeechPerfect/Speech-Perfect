const Sequelize = require('sequelize);
const db = require(.../db)

const Users = db.define('user', {
  audioRecording: {
     type: Sequelize.STRING
   },
   transcript: {
     type: Sequelize.TEXT
   }
 })

 module.exports = Users
