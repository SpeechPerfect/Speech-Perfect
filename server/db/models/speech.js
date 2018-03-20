const Sequelize = require('sequelize')
const db = require('../db')

const Speech = db.define('speech', {
  title: {
    type: Sequelize.STRING
  }
}, {
    scopes: {
      populated: () => ({
        include: [{all: true}]
      })
    }
})

module.exports = Speech
