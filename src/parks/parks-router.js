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

        if(!caseIns.includes(search)){
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
                        park_rating: park.park_rating
                    }
                })

                res.json(results)
            })  
        
            .catch(next)
    })


parksRouter
    .route('/:park_id')
    .get((req, res, next) =>{

    })

module.exports = parksRouter