const Sequelize = require('sequelize')
const db = require('../db')

const Speech = db.define('speech', {},{
    scopes: {
      populated: () => ({
        include: [{all: true}]
      })
    }
})

module.exports = Speech
