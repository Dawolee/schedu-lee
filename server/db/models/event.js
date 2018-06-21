const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('event', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  startTime: {
    type: Sequelize.INTEGER
  },
  endTime: {
    type: Sequelize.INTEGER
  },
  month: {
    type: Sequelize.INTEGER
  },
  year: {
    type: Sequelize.INTEGER
  },
  day: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.STRING
  }
})
