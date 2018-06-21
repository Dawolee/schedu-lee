const router = require('express').Router()
const { Event } = require('../db/models')

router.get('/:month/:year', (req, res, next) => {
  console.log(req.body)
  Event.findAll({ where: { month: req.params.month, year: req.params.year } })
    .then(events => res.json(events))
    .catch(next)
})

module.exports = router
