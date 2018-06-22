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

router.delete('/:id', (req, res, next) => {
  Event.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.json(''))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  Event.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    //finding by ID again since .update returns how many instances were updated
    .then(() => Event.findById(req.params.id))
    .then(event => {
      res.json(event)
    })
    .catch(next)
})

module.exports = router
