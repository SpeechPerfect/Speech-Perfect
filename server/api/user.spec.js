/* global describe beforeEach it */

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
          title: "Whit's Speech",
          userId: 1
        })
      )
    })

    it('GET /api/user', () => {
      return request(app)
        .get('/api/user')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(whitsEmail)
        })
    })

    it('GET /api/user/:userId', () => {
      return request(app)
        .get('/api/user/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].title).to.be.equal(whitsSpeech)
        })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
