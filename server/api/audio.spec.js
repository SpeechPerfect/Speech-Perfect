/* global describe beforeEach it */

// const {expect} = require('chai')
// const request = require('supertest')
// const { db, AwsReport } = require('../db')
// const app = require('../index')

// describe('User routes', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('/api/audio/', () => {
//     const codysEmail = 'cody@puppybook.com'

//     beforeEach(() => {
//       return AwsReport.create({
//         email: codysEmail
//       })
//     })

//     it('GET /api/audio', () => {
//       return request(app)
//         .get('/api/audio')
//         .expect(200)
//         .then(res => {
//           expect(res.body).to.be.an('object')
//           expect(res.body[0].email).to.be.equal(codysEmail)
//         })
//     })
//   })
// })
