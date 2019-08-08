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
        .where()
    },

    addNewFavorite(db, newFavorite){
        return db
            .insert(newFavorite)
            .into('favorites')
            .returning('*')
            .then(([favorite]) => favorite)
    },

    removeFavorite(db, park_id){
        return db
            .from('favorites')
            .where('favorites.park_id', park_id)
            .delete()

            //logic delete from favorites 
            //where favorites.park_id = 2, works in dbeaver
    }
        
}

module.exports = FavoritesService