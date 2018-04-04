const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Speech = db.model('speech')
const AwsReport = db.model('awsReport')
const WatsonReport = db.model('watsonReport')

describe('Speech routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/speech', () => {
    const whitsEmail = 'whit@whit.com'
    const whitsSpeech = "Whit's Speech"
    const whitsOtherSpeech = "Whit's Other Speech"

    let speechId

    beforeEach(() => {
      return User.create({
        email: whitsEmail
      })
        .then(() =>
          Speech.create({
            title: whitsSpeech,
            userId: 1
          })
        )
        .then(createdSpeech => {
          speechId = createdSpeech.dataValues.id
          return AwsReport.create({
            url: 'https://www.amazon.com/speech-perfect',
            speechId
          })
        })
        .then(() => {
          return WatsonReport.create({
            speechId,
            duration: 10.5,
            umCount: 2,
            likeCount: 2,
            transcript: 'Um like hello um like world',
            confidence: 0.9,
            wordCount: 6
          })
        })
        .then(() =>
          Speech.create({
            title: whitsSpeech,
            userId: 1
          })
        )
        .then(createdSpeech => {
          speechId = createdSpeech.dataValues.id
          return AwsReport.create({
            url: 'https://www.amazon.com/speech-perfect-2',
            speechId
          })
        })
        .then(() => {
          return WatsonReport.create({
            speechId,
            duration: 11.5,
            umCount: 3,
            likeCount: 3,
            transcript: 'Um um like hello um like like world',
            confidence: 0.9,
            wordCount: 8
          })
        })
    })

    it('returns watson report data for a given speech', () => {
      return request(app)
        .get('/api/speech/watson-data/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.duration).to.equal(10.5)
        })
    })

    it('returns AWS data for a given speech', () => {
      return request(app)
        .get('/api/speech/aws-data/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.url).to.equal('https://www.amazon.com/speech-perfect')
        })
    })

    it('returns thesaurus alternatives for a given word', () => {
      return request(app)
        .get('/api/speech/thesaurus/eighty')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body).to.include('fourscore')
        })
    })

    it('returns speech data when searching by id', () => {
      return request(app)
        .get('/api/speech/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.title).to.equal(whitsSpeech)
        })
    })

    it('deletes a given speech', () => {
      return request(app)
        .delete('/api/speech/1')
        .expect(200)
        .then(() => request(app).get('/api/user/1'))
        .then(res => {
          console.log('response is', res.body)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.equal(1)
        })
    })

    it("deletes all of a given user's speeches", () => {
      return request(app)
        .delete('/api/speech/all/1')
        .expect(204)
        .then(() => request(app).get('/api/user/1'))
        .then(res => {
          console.log('response is', res.body)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.equal(0)
        })
    })

    it('modifies a speech title', () => {
      return request(app)
        .put('/api/speech/1')
        .send({ title: whitsOtherSpeech })
        .then(res => {
          console.log(res.body, 'is the response')
          expect(res.body).to.be.an('array')
          expect(res.body[1][0].title).to.equal(whitsOtherSpeech)
        })
    })
  })
})
