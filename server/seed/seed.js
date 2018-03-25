const { User, AwsReport, WatsonReport, Speech } = require('../db/models')
const db = require('../db')

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

  // Speeches Seed
  const speeches = await Promise.all([
    Speech.create({title: "Test Speech One", userId: 1}),
    Speech.create({title: "Test Speech Two", userId: 1}),
    Speech.create({title: "Test Speech Three", userId: 2}),
    Speech.create({title: "Test Speech Four", userId: 3}),
    Speech.create({title: "Failed Speech", userId: 1}),
    Speech.create({title: "Test Speech Six", userId: 1}),
    Speech.create({title: "Test Speech Seven", userId: 1}),
    Speech.create({title: "Test Speech Eight", userId: 1}),
    Speech.create({title: "Best Speech Ever", userId: 1}),
    Speech.create({title: "Test Speech Nine", userId: 1}),
    Speech.create({title: "Test Speech Ten", userId: 1}),
    Speech.create({title: "Test Speech Twelve", userId: 1}),
  ])

  console.log(`seeded ${speeches.length} speeches`)
  console.log(`seeded successfully`)

  // AWS Reports Seed
  const awsReports = await Promise.all([
    AwsReport.create({url: 'https://s3.amazonaws.com/speech-perfect/1521563302261', speechId: 1}),
    AwsReport.create({url: 'https://s3.amazonaws.com/speech-perfect/1521498174989', speechId: 2}),
    AwsReport.create({url: 'https://s3.amazonaws.com/speech-perfect/1521490159387', speechId: 3}),
    AwsReport.create({url: 'https://s3.amazonaws.com/speech-perfect/1521489804188', speechId: 4}),
    AwsReport.create({url: 'https://s3.amazonaws.com/speech-perfect/1521563302261', speechId: 5}),
    AwsReport.create({url: 'https://s3.amazonaws.com/speech-perfect/1521498174989', speechId: 6}),
    AwsReport.create({url: 'https://s3.amazonaws.com/speech-perfect/1521490159387', speechId: 7}),
    AwsReport.create({url: 'https://s3.amazonaws.com/speech-perfect/1521489804188', speechId: 8}),
    AwsReport.create({url: 'https://s3.amazonaws.com/speech-perfect/1521563302261', speechId: 9}),
    AwsReport.create({url: 'https://s3.amazonaws.com/speech-perfect/1521498174989', speechId: 10}),
    AwsReport.create({url: 'https://s3.amazonaws.com/speech-perfect/1521490159387', speechId: 11}),
    AwsReport.create({url: 'https://s3.amazonaws.com/speech-perfect/1521489804188', speechId: 12}),
  ])

  console.log(`seeded ${awsReports.length} AWS reports`)
  console.log(`seeded successfully`)

  // Watson Reports Seed
  const watsonReports = await Promise.all([
    WatsonReport.create({duration: 1000, umCount: 10, likeCount: 10, speechId: 1, transcript: "Test transcript number 1"}),
    WatsonReport.create({duration: 2000, umCount: 20, likeCount: 20, speechId: 2, transcript: "Test transcript number 2"}),
    WatsonReport.create({duration: 3000, umCount: 30, likeCount: 30, speechId: 3, transcript: "Test transcript number 3"}),
    WatsonReport.create({duration: 4000, umCount: 40, likeCount: 40, speechId: 4, transcript: "Test transcript number 4"}),
    WatsonReport.create({duration: 1000, umCount: 10, likeCount: 10, speechId: 1, transcript: "Test transcript number 1"}),
    WatsonReport.create({duration: 2000, umCount: 20, likeCount: 20, speechId: 2, transcript: "Test transcript number 2"}),
    WatsonReport.create({duration: 3000, umCount: 30, likeCount: 30, speechId: 3, transcript: "Test transcript number 3"}),
    WatsonReport.create({duration: 4000, umCount: 40, likeCount: 40, speechId: 4, transcript: "Test transcript number 4"}),
    WatsonReport.create({duration: 1000, umCount: 10, likeCount: 10, speechId: 1, transcript: "Test transcript number 1"}),
    WatsonReport.create({duration: 2000, umCount: 20, likeCount: 20, speechId: 2, transcript: "Test transcript number 2"}),
    WatsonReport.create({duration: 3000, umCount: 30, likeCount: 30, speechId: 3, transcript: "Test transcript number 3"}),
    WatsonReport.create({duration: 4000, umCount: 40, likeCount: 40, speechId: 4, transcript: "Test transcript number 4"}),
    WatsonReport.create({duration: 1000, umCount: 10, likeCount: 10, speechId: 1, transcript: "Test transcript number 1"}),
    WatsonReport.create({duration: 2000, umCount: 20, likeCount: 20, speechId: 2, transcript: "Test transcript number 2"}),
    WatsonReport.create({duration: 3000, umCount: 30, likeCount: 30, speechId: 3, transcript: "Test transcript number 3"}),
    WatsonReport.create({duration: 4000, umCount: 40, likeCount: 40, speechId: 4, transcript: "Test transcript number 4"}),
  ])

  console.log(`seeded ${watsonReports.length} Watson reports`)
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
