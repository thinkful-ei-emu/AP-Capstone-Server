const FavoritesService = {

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
            'dog_parks_list.park_rating'
            )
        .from('favorites')
        .innerJoin('dog_parks_users', 'favorites.user_id', 'dog_parks_users.id')
        .innerJoin('dog_parks_list', 'favorites.park_id', 'dog_parks_list.id')
        .where('favorites.user_id', userId)
    },

    getAllFavorites(db){
        return db
        .select(
            'favorites.user_id',
            'favorites.park_id',
            'dog_parks_list.park_name',
            'dog_parks_list.park_address',
            'dog_parks_list.park_city',
            'dog_parks_list.park_hours',
            'dog_parks_list.park_rating'
            )
        .from('favorites')
        .innerJoin('dog_parks_users', 'favorites.user_id', 'dog_parks_users.id')
        .innerJoin('dog_parks_list', 'favorites.park_id', 'dog_parks_list.id')
    }
        
}

module.exports = FavoritesService