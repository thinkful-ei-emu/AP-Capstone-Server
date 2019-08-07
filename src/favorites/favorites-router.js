const express = require('express')
const FavoritesService = require('./favorites-service')
//const {requireAuth} = require('../middleware/jwt-auth')

const favoritesRouter = express.Router()

favoritesRouter
    .route('/')
    .get((req, res, next) => {
        FavoritesService.getAllFavorites(
            req.app.get('db')
        )
        .then(favorites => {
    
            let favoritesList = favorites.map(favorite=>{
                 return {
                     user_id: favorite.user_id,
                     park_id: favorite.park_id,
                     park_name: favorite.park_name,
                     park_address: favorite.park_address,
                     park_city: favorite.park_city,
                     park_hours: favorite.park_hours,
                     park_rating: favorite.park_rating,
                 }
             })

             res.json(favoritesList)
        })
        .catch(next)
    })
    


favoritesRouter
    .route('/:userId')
    //.all(requireAuth)
    .get((req, res, next)=>{

        FavoritesService.getUserFavorites(
            req.app.get('db'),
            req.params.userId
        )
        .then(favorites => {
    
            let favoritesList = favorites.map(favorite=>{
                 return {
                     user_id: favorite.user_id,
                     user_name: favorite.user_name,
                     park_id: favorite.park_id,
                     park_name: favorite.park_name,
                     park_address: favorite.park_address,
                     park_city: favorite.park_city,
                     park_hours: favorite.park_hours,
                     park_rating: favorite.park_rating,
                 }
             })

             res.json(favoritesList)
        })
        .catch(next)
    })
    
  

module.exports = favoritesRouter