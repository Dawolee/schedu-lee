const Sequelize = require('sequelize')
const db = require('../db')

/*Created a simple model for times sake and ease of use. Using Sequelize
to communicate with PostgreSQL. startTime and endTime are strings to
make it easier to get retrieve input and update. */

module.exports = db.define('event', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  startTime: {
    type: Sequelize.STRING,
    allowNull: false
  },
  endTime: {
    type: Sequelize.STRING,
    allowNull: false
  },
  month: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  day: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})
