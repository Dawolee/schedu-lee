const db = require('../server/db')
const { Event } = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db is synced!')

  const events = await Promise.all([
    Event.create({
      name: 'Practice for music show',
      startTime: '10:00AM',
      endTime: '1:00PM',
      month: 1,
      year: 2018,
      day: 5,
      description: 'Get the band together for some practice!'
    }),
    Event.create({
      name: 'Go shopping for groceries',
      startTime: '10:00AM',
      endTime: '11:00AM',
      month: 1,
      year: 2018,
      day: 8,
      description: 'Need some fresh veggies and fruits.'
    }),
    Event.create({
      name: 'Go skate',
      startTime: '1:00PM',
      endTime: '5:00PM',
      month: 1,
      year: 2018,
      day: 15,
      description: 'Told Eric I would go skate with him at our local park.'
    }),
    Event.create({
      name: 'Study for upcoming interview',
      startTime: '3:00PM',
      endTime: '5:00PM',
      month: 2,
      year: 2018,
      day: 10,
      description: 'Gotta get a job!'
    }),
    Event.create({
      name: 'Work on side project',
      startTime: '7:00AM',
      endTime: '11:00AM',
      month: 2,
      year: 2018,
      day: 8,
      description: "It's not gonna finish itself!"
    }),
    Event.create({
      name: 'Eat dinner with the family',
      startTime: '6:00PM',
      endTime: '10:00PM',
      month: 1,
      year: 2018,
      day: 8,
      description: 'Yum! Remember to bring some wine!'
    }),
    Event.create({
      name: 'Go visit Nate',
      startTime: '2:00PM',
      endTime: '10:00PM',
      month: 2,
      year: 2018,
      day: 16,
      description: 'Gotta catch up with some good old friends.'
    })
  ])
  console.log(`seeded ${events.length} events`)
  console.log(`seeded successfully!!`)
}

seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

console.log('seeding...')
