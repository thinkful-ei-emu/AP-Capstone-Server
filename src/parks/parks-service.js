const ParksService = {
    
  searchByCityName(db, searchTerm) {
    return db
      .select(
        "dog_parks_list.id AS id",
        "dog_parks_list.park_name AS park_name",
        "dog_parks_list.park_city AS park_city",
        "dog_parks_list.park_address AS park_address",
        "dog_parks_list.park_hours AS park_hours",
        db.raw(
          `AVG(reviews.rating) AS park_rating`
        ),
      )
      .from("dog_parks_list")
      .innerJoin('reviews', 'dog_parks_list.id', 'reviews.park_id')
      .where("park_city", "ILIKE", `%${searchTerm}%`)
      .groupBy('dog_parks_list.id')
  },

  getById(db, park_id){
    return db
    .select(
      "dog_parks_list.id AS id",
      "dog_parks_list.park_name AS park_name",
      "dog_parks_list.park_city AS park_city",
      "dog_parks_list.park_address AS park_address",
      "dog_parks_list.park_hours AS park_hours",
      db.raw(
        `AVG(reviews.rating) AS park_rating`
      ),
    )
    .from("dog_parks_list")
    .innerJoin('reviews', 'dog_parks_list.id', 'reviews.park_id')
    .where('dog_parks_list.id', park_id)
    .first()
    .groupBy('dog_parks_list.id')
  },

  getAllParks(db){
    return db
    .select(
      "dog_parks_list.id AS id",
      "dog_parks_list.park_name AS park_name",
      "dog_parks_list.park_city AS park_city",
      "dog_parks_list.park_address AS park_address",
      "dog_parks_list.park_hours AS park_hours",
      db.raw(
        `AVG(reviews.rating) AS park_rating`
      ),
    )
    .from("dog_parks_list")
    .innerJoin('reviews', 'dog_parks_list.id', 'reviews.park_id')
    .groupBy('dog_parks_list.id')
  }
  
};

module.exports = ParksService;
