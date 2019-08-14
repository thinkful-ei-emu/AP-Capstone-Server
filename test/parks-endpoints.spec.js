const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe.only('Parks Endpoints', function() {
  let db

  const {
    testUsers,
    testParks,
    testReviews,
    testFavorites
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

  describe(`GET /api/parks`, ()=>{
      beforeEach( 'insert things', ()=>
          helpers.seedParksTables(
              db,
              testUsers,
              testParks,
              testReviews,
              testFavorites
          )
      )

      it(`GET all parks with 200 response`, ()=>{
          return supertest(app)
            .get('/api/parks')
            .expect(200)
      })
  })

  describe(`GET /api/parks/:parkId`, ()=>{
      beforeEach( 'insert things', ()=>
        helpers.seedParksTables(
            db,
            testUsers,
            testParks,
            testReviews,
            testFavorites
        )
      )

      it(`GET specific park with 200`, ()=>{
          const parkId = 1

          return supertest(app)
            .get(`/api/parks/${parkId}`)
            .expect(200)
      })
  })

})