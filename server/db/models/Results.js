const Sequelize = require('sequelize);
const db = require(.../db)

const Reports = db.define('reports', {
  userId: {
    type: Sequelize.INTEGER //foreignkey?,
    allowNull: false
    },
  speechId: {
    type: Sequelize.INTEGER //foreignkey?,
    allowNull: false
  },
  time: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  tone: {
    Sequelize.STRING
  },
  pace: {
    Sequelize.STRING
  }
  ummCount: {
    type: Sequelize.INTEGER
  },
  likeCount: {
    type: Sequelize.INTEGER
  }
})

module.exports = Reports
