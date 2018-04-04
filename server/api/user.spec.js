const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Speech = db.model('speech')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/user', () => {
    const whitsEmail = 'whit@whit.com'
    const whitsSpeech = "Whit's Speech"

    beforeEach(() => {
      return User.create({
        email: whitsEmail
      }).then(() =>
        Speech.create({
          title: whitsSpeech,
          userId: 1
        })
      )
    })

    it("returns the user's info", () => {
      return request(app)
        .get('/api/user')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(whitsEmail)
        })
    })

    it("returns the user's speech info", () => {
      return request(app)
        .get('/api/user/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].title).to.be.equal(whitsSpeech)
        })
    })
  })
})
