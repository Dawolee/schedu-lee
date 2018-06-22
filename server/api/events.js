const router = require('express').Router()
const { Event } = require('../db/models')

router.get('/:month/:year', (req, res, next) => {
  Event.findAll({ where: { month: req.params.month, year: req.params.year } })
    .then(events => res.json(events))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Event.create(req.body)
    .then(event => res.json(event))
    .catch(next)
})

module.exports = router
