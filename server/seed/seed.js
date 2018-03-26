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
    Speech.create({title: 'Test Speech One', userId: 1}),
    Speech.create({title: 'Test Speech Two', userId: 1}),
    Speech.create({title: 'Test Speech Three', userId: 2}),
    Speech.create({title: 'Test Speech Four', userId: 3}),
    Speech.create({title: 'Failed Speech', userId: 1}),
    Speech.create({title: 'Test Speech Six', userId: 1}),
    Speech.create({title: 'Test Speech Seven', userId: 1}),
    Speech.create({title: 'Test Speech Eight', userId: 1}),
    Speech.create({title: 'Best Speech Ever', userId: 1}),
    Speech.create({title: 'Test Speech Nine', userId: 1}),
    Speech.create({title: 'Test Speech Ten', userId: 1}),
    Speech.create({title: 'Test Speech Twelve', userId: 1}),
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
    WatsonReport.create({duration: 1000, umCount: 10, likeCount: 10, speechId: 1, wordCount: 4, transcript: 'Test transcript number 1'}),
    WatsonReport.create({duration: 2000, umCount: 20, likeCount: 20, speechId: 2, wordCount: 4, transcript: 'Test transcript number 2'}),
    WatsonReport.create({duration: 3000, umCount: 30, likeCount: 30, speechId: 3, wordCount: 4, transcript: 'Test transcript number 3'}),
    WatsonReport.create({duration: 4000, umCount: 40, likeCount: 40, speechId: 4, wordCount: 4, transcript: 'Test transcript number 4'}),
    WatsonReport.create({duration: 1000, umCount: 10, likeCount: 10, speechId: 5, wordCount: 4, transcript: 'Test transcript number 1'}),
    WatsonReport.create({duration: 2000, umCount: 20, likeCount: 20, speechId: 6, wordCount: 4, transcript: 'Test transcript number 2'}),
    WatsonReport.create({duration: 3000, umCount: 30, likeCount: 30, speechId: 7, wordCount: 4, transcript: 'Test transcript number 3'}),
    WatsonReport.create({duration: 4000, umCount: 40, likeCount: 40, speechId: 8, transcript: 'Test transcript number 4'}),
    WatsonReport.create({duration: 4000, umCount: 40, likeCount: 40, speechId: 9, transcript: 'Test transcript number 4'}),
    WatsonReport.create({duration: 100000, umCount: 10, likeCount: 10, speechId: 10, wordCount: 4, transcript: 'Thomas Jefferson once said I'm a great believer in luck, and I find the harder I work, the more I have of it. What, though, is luck? Webster's dictionary suggests that luck is the events or circumstances that operate for or against an individual.In truth, luck has nothing to do with something operating for or against you. Luck is not a matter of chance. It is a matter of being open to new experiences, perseverance, hard work, and positive thinking.  When seventeen year old Steven Spielberg spent some time with his cousin in the summer of 1965, they toured Universal pictures. The tram stopped at none of the sound stages. Spielberg snuck off on a bathroom break to watch a bit of the real action. When he encountered an unfamiliar face who demanded to know what he was doing, he told him his story. The man turned out to be the head of the editorial department. Spielberg got a pass to the lot for the very next day and showed a very impressed Chuck Silvers four of his eight millimeter films. This was the foot in the door Spielberg needed to start squatting on the lot, a decision that led to his first contract with Universal Studios. Studies have shown that lucky people tend to be far more open to new experiences. Those who are unlucky are creatures of habit, never varying from one day to the next. If you want to be lucky, add some variety to your life. Meet new people, go to new places, and increase the possibility of those chance opportunities the lucky people always seem to run into.'}),
    WatsonReport.create({duration: 200000, umCount: 20, likeCount: 20, speechId: 11, wordCount: 4, transcript: 'Test transcript number 2'}),
    WatsonReport.create({duration: 300000, umCount: 30, likeCount: 30, speechId: 12, wordCount: 4, transcript: 'Test transcript number 3'}),
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
