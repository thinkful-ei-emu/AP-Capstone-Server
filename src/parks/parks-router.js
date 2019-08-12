const express = require('express')
const ParksService = require('./parks-service')

const parksRouter = express.Router()

parksRouter
    .route('/')
    .get((req, res, next) => {
        const {search = ''} = req.query;

        const validCities = ['Virginia Beach', "Norfolk", "Chesapeake", "Hampton", "Newport News", "Suffolk"]

        let caseIns = validCities.map(city => {
            return city.toLowerCase()
        })

        if(!caseIns.includes(search) && !validCities.includes(search)){
            return res.status(400).json({
                error: 'Enter a Valid City'
            })
        }

        ParksService.searchByCityName(
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
                        rating: park.rating,
                        text: park.text
                    }
                })

                res.json(results)
            })  
        
            .catch(next)
    })


parksRouter
    .route('/:park_id')
    .all(checkParkExists)
    .get((req, res, next) =>{

        ParksService.getById(
            req.app.get('db'),
            req.params.park_id,
        )
            .then(park=>{
              return res.json({
                id: park.id,
                park_name: park.park_name, 
                park_city: park.park_city,
                park_address: park.park_address,
                park_hours: park.park_hours,
                park_rating: park.park_rating
               }) 
            })
            .catch(next)

    })

parksRouter
    .route('/:park_id/reviews/')
    .all(checkParkExists)
    .get((req, res, next)=>{
        ParksService.getReviewsForPark(
            req.app.get('db'),
            req.params.park_id
        )
        .then(reviews=>{
            let results = reviews.map(review=>{
                return {
                    id: review.id,
                    text: review.text,
                    rating: review.rating,
                    date_created: review.date_created
                }
            
            })

            res.json(results)
        })
        .catch(next)
    })


async function checkParkExists(req, res, next) {
    try {
        const park = await ParksService.getById(
        req.app.get('db'),
        req.params.park_id,
        )
    
        if (!park)
        return res.status(404).json({
            error: `Park does not exist`
        })
    
        res.park = park
        next()
    } catch (error) {
        next(error)
    }
    }

module.exports = parksRouter