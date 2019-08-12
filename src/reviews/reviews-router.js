const express = require('express')
const ReviewsService = require('./reviews-service')
const {requireAuth} = require('../middleware/jwt-auth')
const path = require('path')

const reviewsRouter = express.Router()
const jsonParser = express.json()


reviewsRouter
.route('/')
.get((req, res, next)=>{
    ReviewsService.getAllReviews(
        req.app.get('db'),
    )
    .then(reviews=>{
        let results = reviews.map(review=>{
            return {
                id: review.id,
                text: review.text,
                rating: review.rating,
                date_created: review.date_created,
                park_id: review.park_id
            }
        
        })

        res.json(results)
    })
    .catch(next)
})

reviewsRouter
.route('/addReview')
.post(requireAuth, jsonParser, (req, res, next) =>{
    const {park_id, rating, text} = req.body
    const newReview = {park_id, rating, text}

    for (const [key, value] of Object.entries(newReview))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

    newReview.user_id = req.user.id

    ReviewsService.insertReview(
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
                })
        })
        .catch(next)
})

module.exports = reviewsRouter