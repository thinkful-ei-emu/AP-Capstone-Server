const FavoritesService = {

  //get favorites according to use
  getUserFavorites(db, userId){
    return db
      .select(
        'favorites.user_id',
        'dog_parks_users.user_name',
        'favorites.park_id',
        'dog_parks_list.park_name',
        'dog_parks_list.park_address',
        'dog_parks_list.park_city',
        'dog_parks_list.park_hours',
        db.raw(
          'AVG(reviews.rating) AS park_rating'
        ),
      )
      .from('favorites')
      .innerJoin('dog_parks_users', 'favorites.user_id', 'dog_parks_users.id')
      .innerJoin('dog_parks_list', 'favorites.park_id', 'dog_parks_list.id')
      .innerJoin('reviews', 'dog_parks_list.id', 'reviews.park_id')
      .where('favorites.user_id', userId)
      .groupBy('favorites.user_id', 
        'dog_parks_users.user_name',
        'favorites.park_id',
        'dog_parks_list.park_name',
        'dog_parks_list.park_address',
        'dog_parks_list.park_city',
        'dog_parks_list.park_hours');

  },

  //add new favorite
  addNewFavorite(db, newFavorite){
    return db
      .insert(newFavorite)
      .into('favorites')
      .returning('*')
      .then(([favorite]) => favorite);
  },

  //delete favorite
  removeFavorite(db, parkId){
    return db
      .from('favorites')
      .where('favorites.park_id', parkId)
      .del();
  }
        
};

module.exports = FavoritesService;