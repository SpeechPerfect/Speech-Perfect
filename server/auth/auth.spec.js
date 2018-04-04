const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('Auth routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/auth/login', () => {
    const whitsEmail = 'whit@whit.com'

    beforeEach(() => {
      return User.create({
        email: whitsEmail,
        password: 'abcde'
      })
    })

    it('recognizes an existing user', () => {
      return request(app)
        .post('/auth/login')
        .send({ email: whitsEmail, password: 'abcde' })
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.email).to.be.equal(whitsEmail)
        })
    })

    it('sends a 401 if the user enters the wrong password', () => {
      return request(app)
        .post('/auth/login')
        .send({ email: whitsEmail, password: 'abcd' })
        .expect(401)
    })

    it('signs up a new user', () => {
      return request(app)
        .post('/auth/signup')
        .send({ email: 'bob@bob.com', password: '12345' })
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.email).to.be.equal('bob@bob.com')
        })
    })
  })
})
