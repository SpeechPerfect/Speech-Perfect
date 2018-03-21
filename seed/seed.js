const { User } = require('../server/db/models')
const db = require('../server/db')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')

  // Users Seed
  const users = await Promise.all([
    User.create({email: 'Hello@hello.hello', password: '123'}),
    User.create({email: 'whit@whit.whit', password: '123'}),
    User.create({email: 'speech@speech.speech', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
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
