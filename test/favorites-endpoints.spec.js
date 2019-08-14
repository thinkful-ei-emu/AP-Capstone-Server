const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe.only("Favorites Endpoints", function() {
  let db;

  const {
    testParks,
    testUsers,
    testReviews,
    testFavorites
  } = helpers.makeParksFixtures();

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

  describe(`GET /api/favorites`, () => {
    beforeEach("insert things", () =>
      helpers.seedParksTables(
        db,
        testUsers,
        testParks,
        testReviews,
        testFavorites
      )
    );

    it(`Gets all favorites, responding with 200 and all favorites`, () => {

      return supertest(app)
        .get("/api/favorites")
        .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
        .expect(200);
    });
  });

  describe(`POST /api/favorites`, () => {
    beforeEach("insert things", () =>
      helpers.seedParksTables(
        db,
        testUsers,
        testParks,
        testReviews,
        testFavorites
      )
    );

    it(`adds to favorites, responding with 201 and the new favorite`, function() {
      this.retries(3);

      const testUser = testUsers[0];

      const newFavorite = {
        user_id: testUser,
        park_id: 4
      };

      return supertest(app)
        .post("/api/favorites")
        .set("Authorization", helpers.makeAuthHeader(testUser))
        .send(newFavorite)
        .expect(201)
        .expect(res => {
          expect(res.body).to.have.property("id");
          expect(res.body.user_id).to.eql(newFavorite.user_id.id);
          expect(res.body.park_id).to.eql(newFavorite.park_id);
          expect(res.headers.location).to.eql(`/api/favorites/${res.body.id}`);
        })
        .expect(res =>
          db
            .from("favorites")
            .select("*")
            .where({ id: res.body.id })
            .first()
            .then(row => {
              expect(row.user_id).to.eql(newFavorite.user_id.id);
              expect(row.park_id).to.eql(newFavorite.park_id);
            })
        );
    });
  });

  describe(`DELETE /api/favorites`, () => {
    beforeEach("insert things", () =>
      helpers.seedParksTables(
        db,
        testUsers,
        testParks,
        testReviews,
        testFavorites
      )
    );

    it(`Deletes favorite and responds with 204 no content`, () => {
      const parkId = testFavorites[0].park_id;

      return supertest(app)
        .delete(`/api/favorites/${parkId}`)
        .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
        .expect(204);
    });
  });
});
