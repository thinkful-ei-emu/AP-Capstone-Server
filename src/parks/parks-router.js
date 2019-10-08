const express = require('express');
const ParksService = require('./parks-service');

const parksRouter = express.Router();

parksRouter
  .route('/')
//get park based on query term
  .get( async (req, res, next) => {
    try{
      const {search = ''} = req.query;

      await ParksService.searchByCityName(
        req.app.get('db'),
        search,
      )
        .then(parks => {
          let results = parks.map(park=>{
            return {
              id: park.id,
              park_name: park.park_name, 
              park_city: park.park_city,
              park_address: park.park_address,
              park_hours: park.park_hours,
              park_rating: park.park_rating,
            };
          });
    
          return res.status(200).json(results);
        })  
            
        .catch(next);
    }
    catch(e){
      next();
    }
    
  });


parksRouter
  //get park by id
  .route('/:park_id')
  .all(checkParkExists)
  .get(async (req, res, next) =>{
    try{
      await ParksService.getById(
        req.app.get('db'),
        req.params.park_id,
      )
        .then(park=>{
          return res.status(200).json({
            id: park.id,
            park_name: park.park_name, 
            park_city: park.park_city,
            park_address: park.park_address,
            park_hours: park.park_hours,
            park_rating: park.park_rating
          }); 
        })
        .catch(next);
    }
    catch(e){
      next();
    }
  });

//check if park exists
async function checkParkExists(req, res, next) {
  try {
    const park = await ParksService.getById(
      req.app.get('db'),
      req.params.park_id,
    );
    
    if (!park)
      return res.status(404).json({
        error: 'Park does not exist'
      });
    
    res.park = park;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = parksRouter;