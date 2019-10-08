const express = require('express');
const ReviewsService = require('./reviews-service');
const {requireAuth} = require('../middleware/jwt-auth');
const path = require('path');

const reviewsRouter = express.Router();
const jsonParser = express.json();


reviewsRouter
  .route('/')
  //get all reviews
  .get(async (req, res, next)=>{
    try{
      await ReviewsService.getAllReviews(
        req.app.get('db'),
      )
        .then(reviews=>{
          let results = reviews.map(review=>{
            return {
              id: review.id,
              text: review.text,
              rating: review.rating,
              date_created: new Date(review.date_created).toLocaleDateString(),
              park_id: review.park_id
            };
              
          });
      
          return res.status(200).json(results);
        })
        .catch(next);
    }
    catch(e){
      next();
    }
   
  })

  //add new review
  .post(requireAuth, jsonParser, async (req, res, next) =>{
    try{
      const {park_id, rating, text} = req.body;
      const newReview = {park_id, rating, text};

      for (const [key, value] of Object.entries(newReview))
        if (value == null)
          return res.status(400).json({
            error: `Missing '${key}' in request body`
          });

      newReview.user_id = req.user.id;

      let reviews = await ReviewsService.getAllReviews(
        req.app.get('db')
      );

      //validation if user has already made a review for this park
      for( let i = 0; i < reviews.length; i++){
        if(reviews[i].park_id === newReview.park_id && reviews[i].user_id === newReview.user_id){
          return res.status(400).json({
            error: 'You have already added a review for this park'
          });
        }
      }
      await ReviewsService.insertReview(
        req.app.get('db'),
        newReview
      )
        .then(review =>{
          res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${review.id}`))
            .json({
              id: review.id,
              text: review.text,
              rating: review.rating,
              date_created: review.date_created,
              park_id: review.park_id,
              user: review.user
            });
        })
        .catch(next);

    }
    catch(e){
      next();
    }
  });

module.exports = reviewsRouter;