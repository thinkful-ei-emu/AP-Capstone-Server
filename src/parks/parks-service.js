const ParksService = {
    
  searchByCityName(db, searchTerm) {
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
      .where("park_city", "ILIKE", `%${searchTerm}%`)
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
