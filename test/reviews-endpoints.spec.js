const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe.only('Reviews Endpoints', function() {
  let db

  const {
    testParks,
    testUsers,
    testReviews,
  } = helpers.makeParksFixtures()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`GET /api/reviews`, ()=>{
    beforeEach('insert things', () =>
        helpers.seedParksTables(
            db,
            testUsers,
            testParks,
            testReviews
        )
    )

    it(`Gets all reviews, responding with 200 and all reviews`, ()=>{
        
        const expetedReviews = testReviews.map(review=>{
            return {
                id: review.id,
                text: review.text,
                rating: review.rating,
                date_created: review.date_created,
                park_id: review.park_id
            }
        })

        return supertest(app)
            .get('/api/reviews')
            .expect(200, expetedReviews)
    })
  })

  describe(`POST /api/reviews`, () => {
    beforeEach('insert things', () =>
      helpers.seedParksTables(
        db,
        testUsers,
        testParks,
      )
    )

    it(`creates an review, responding with 201 and the new review`, function() {

      this.retries(3)

      const testPark = testParks[0]

      const testUser = testUsers[0]

      const newReview = {
        text: 'Test new review',
        rating: 3,
        park_id: testPark.id,
      }

      return supertest(app)
        .post('/api/reviews')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(newReview)
        .expect(201)
        .expect(res => {
          expect(res.body).to.have.property('id')
          expect(res.body.rating).to.eql(newReview.rating)
          expect(res.body.text).to.eql(newReview.text)
          expect(res.body.park_id).to.eql(newReview.park_id)
          expect(res.headers.location).to.eql(`/api/reviews/${res.body.id}`)
        })
        .expect(res =>
          db
            .from('reviews')
            .select('*')
            .where({ id: res.body.id })
            .first()
            .then(row => {
              expect(row.text).to.eql(newReview.text)
              expect(row.rating).to.eql(newReview.rating)
              expect(row.thing_id).to.eql(newReview.thing_id)
              expect(row.user_id).to.eql(testUser.id)
            })
        )
    })

    const requiredFields = ['text', 'rating', 'park_id']

    requiredFields.forEach(field => {
      const testPark = testParks[0]

      const testUser = testUsers[0]

      const newReview = {
        text: 'Test new review',
        rating: 3,
        park_id: testPark.id,
      }

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newReview[field]

        return supertest(app)
          .post('/api/reviews')
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .send(newReview)
          .expect(400, {
            error: `Missing '${field}' in request body`,
          })
      })
    })
  })
})
