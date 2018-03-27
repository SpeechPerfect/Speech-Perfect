const Sequelize = require('sequelize')
const db = require('../db')

const Speech = db.define(
  'speech',
  {
    title: {
      type: Sequelize.STRING,
      defaultValue: 'Test Speech'
    }
  },
  {
    scopes: {
      populated: () => ({
        include: [{ all: true }]
      })
    }
  }
)

module.exports = Speech
