const express = require('express')
const FavoritesService = require('./favorites-service')
const {requireAuth} = require('../middleware/jwt-auth')
const path = require('path')

const favoritesRouter = express.Router()
const jsonParser = express.json()

favoritesRouter
    .route('/')
    .all(requireAuth)
    .get((req, res, next) => {
        FavoritesService.getUserFavorites(
            req.app.get('db'),
            req.user.id
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
    .post(jsonParser, (req, res, next)=>{
        const {park_id} = req.body
        const newFavorite = {user_id: req.user.id, park_id}

        for (const [key, value] of Object.entries(newFavorite))
        if (value == null)
          return res.status(400).json({
            error: `Missing '${key}' in request body`
          }) 

        FavoritesService.addNewFavorite(
            req.app.get('db'),
            newFavorite
        )
        .then(favorite => {
            res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${favorite.id}`))
                .json(favorite)
        })
        .catch(next)
    })
    .delete((req, res, next) =>{

        const {park_id} = req.body
        const removedFavorite = {user_id: req.user.id, park_id}

        FavoritesService.removeFavorite(
            req.app.get('db'),
            removedFavorite
        )
            .then(numRowsAffected =>{
                res.status(204).end()
            })
            .catch(next)
    })

    // FavoritesService.removeFavorite(
    //     req.app.get('db'),
    //     req.params.parkId
    // )
    // .then(numRowsAffected =>{
    //     res.status(204).end()
    // })
    
    
  

module.exports = favoritesRouter