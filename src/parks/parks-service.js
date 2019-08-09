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

      //logic for querying avg rating
      // select dog_parks_list.park_name, avg(reviews.rating)
      // from dog_parks_list
      // inner join reviews on dog_parks_list.id = reviews.park_id
      // group by dog_parks_list.id
  },

  getById(db, park_id){
    return db
    .select(
      "id",
      "park_name",
      "park_city",
      "park_address",
      "park_hours",
      "park_rating"
    )
    .from("dog_parks_list")
    .where('id', park_id)
    .first()
  }

};

module.exports = ParksService;
