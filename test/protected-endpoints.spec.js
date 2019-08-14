const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe.only(`Protected endpoints`, () => {
  let db;

  const { testUsers, testParks, testReviews, testFavorites } = helpers.makeParksFixtures();

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  beforeEach("insert things", () =>
    helpers.seedParksTables(
        db,
        testUsers,
        testParks,
        testReviews,
        testFavorites
        )
  );

  const protectedEndpoints = [
    {
        name: "POST /api/reviews",
        path: "/api/reviews",
        method: supertest(app).post,
    },

    {
        name: "GET /api/favorites",
        path: "/api/favorites",
        method: supertest(app).get,
    },

    // {
    //     name: "POST /api/favorites",
    //     path: "/api/favorites",
    //     method: supertest(app).post,
    // }

  ];

  protectedEndpoints.forEach(endpoint => {
    describe(endpoint.name, () => {
      it(`Responds with 401 'Missing bearer token' when no bearer token`, () => {
        return endpoint.method(endpoint.path)
          .expect(401, { error: `Missing bearer token` });
      });

      it(`responds 401 'Unauthorized reqest' when invalid JWT secret`, () => {
        const validUser = testUsers[0]
        const invalidSecret = 'bad-secret'
        return endpoint.method(endpoint.path)
          .set("Authorization", helpers.makeAuthHeader(validUser, invalidSecret))
          .expect(401, { error: `Unauthorized request` });
      });

      it(`responds 401 'Unauthorized request' when sub in payload`, () => {
        const invalidUser = { user_name: "user-not-existy", id: 1 };
        return endpoint.method(endpoint.path)
          .set("Authorization", helpers.makeAuthHeader(invalidUser))
          .expect(401, { error: `Unauthorized request` });
      });

    });
  });
});
