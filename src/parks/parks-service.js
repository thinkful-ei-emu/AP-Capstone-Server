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

};

module.exports = ParksService;
