const express = require('express');
const FavoritesService = require('./favorites-service');
const {requireAuth} = require('../middleware/jwt-auth');
const path = require('path');

const favoritesRouter = express.Router();
const jsonParser = express.json();

favoritesRouter
  .route('/')
  .all(requireAuth)
  //get list of favorites associated with user
  .get(async(req, res, next) => {
    try{
      let favorites = await FavoritesService.getUserFavorites(
        req.app.get('db'),
        req.user.id
      );

      return res.status(200).json(favorites);
    }
    catch(e){
      next();
    }
    
  })

  //add new favorite
  .post(jsonParser, async (req, res, next)=>{
    try{
      const {park_id} = req.body;
      const newFavorite = {user_id: req.user.id, park_id};
  
      for (const [key, value] of Object.entries(newFavorite))
        if (value == null)
          return res.status(400).json({
            error: `Missing '${key}' in request body`
          }); 

      let allFaves = await FavoritesService.getUserFavorites(
        req.app.get('db'),
        req.user.id
      );

      //check if park is already in the users favorites
      for(let i = 0; i < allFaves.length; i++){
        if(allFaves[i].park_id === newFavorite.park_id){
          return res.status(400).json({
            error: 'This park is already in your favorites'
          });
        }
      }
  
      //add favorites to db
      await FavoritesService.addNewFavorite(
        req.app.get('db'),
        newFavorite
      )
        .then(favorite => {
          return res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${favorite.id}`))
            .json(favorite);
        })
        .catch(next);
    }
    catch(e){
      next();
    }
   
  });
    
    
favoritesRouter
  .route('/:parkId')
  .all(requireAuth)
  
  //delete favorites from user list
  .delete(async (req, res, next) =>{
    
    try{
      await FavoritesService.removeFavorite(
        req.app.get('db'),
        req.params.parkId
      );
      
      return res.status(204).end();
    }
    catch(e){
      next();
    }
  });

    
    
  

module.exports = favoritesRouter;