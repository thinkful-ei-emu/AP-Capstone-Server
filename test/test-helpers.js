const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
    return [
      {
        id: 1,
        user_name: 'test-user-1',
        full_name: 'Test user 1',
        password: 'password',
        date_created: '2029-01-22T16:28:32.615Z'
      },
      {
        id: 2,
        user_name: 'test-user-2',
        full_name: 'Test user 2',
        password: 'password',
        date_created: '2029-01-22T16:28:32.615Z'
      },     
    ]
  }

function makeParksArray() {
    return [
      {
        id: 1,
        park_name: "Bayville Farms Park",
        park_city: "Virginia Beach",
        park_address: "4132 First Court Road",
        park_hours: "Please Consult for Hours: https://www.vbgov.com/government/departments/parks-recreation/parks-trails/city-parks/Documents/park-closing-times.pdf"
      },
      {
        id: 4,
        park_name: "Maple Avenue Dog Park",
        park_city: "Norfolk",
        park_address: "176 Maple Ave",
        park_hours: "7 AM - 6 PM"
        
      },
      {
        id: 12,
        park_name: "Chesapeake City Park",
        park_city: "Chesapeake",
        park_address: "900 City Park Drive",
        park_hours: "7 AM - 8 PM"
      }
    ]
  }


function makeReviewsArray(users, parks) {
  return [
    {
      id: 1,
      rating: 2,
      text: 'First test review!',
      park_id: parks[0].id,
      user_id: users[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z').toLocaleDateString(),
    },
    {
      id: 2,
      rating: 3,
      text: 'Second test review!',
      park_id: parks[1].id,
      user_id: users[1].id,
      date_created: new Date('2029-01-22T16:28:32.615Z').toLocaleDateString(),
    }
    ]
}

function makeFavoritesArray(users, parks){
    return[
        {
            id: 1,
            park_id: parks[0].id,
            user_id: users[0].id,
        },

        {
            id: 2,
            park_id: parks[0].id,
            user_id: users[1].id,
        }
    ]
}

function makeParksFixtures() {
    const testUsers = makeUsersArray()
    const testParks = makeParksArray()
    const testReviews = makeReviewsArray(testUsers, testParks)
    const testFavorites = makeFavoritesArray(testUsers, testParks)
    return { testUsers, testParks, testReviews, testFavorites }
  }


function cleanTables(db) {
    return db.raw(
      `TRUNCATE
        dog_parks_list,
        dog_parks_users,
        reviews,
        favorites
        RESTART IDENTITY CASCADE`
    )
  }


function seedUsers(db, users){
    const preppedUsers = users.map(user=>({
      ...user,
      password: bcrypt.hashSync(user.password, 1)
    }))
    
    return db.into('dog_parks_users').insert(preppedUsers)
      .then(()=>
        db.raw(
          `SELECT setval('dog_parks_users_id_seq', ?)`,
          [users[users.length -1].id]
        )
      )
  }

function seedParksTables(db, users, parks, reviews=[], favorites=[]) {
    return db.transaction(async trx =>{
      await seedUsers(trx, users)
      await trx.into('dog_parks_list').insert(parks)
      await trx.raw(
        `SELECT setval('dog_parks_list_id_seq', ?)`,
        [parks[parks.length -1].id]
      )
      if(reviews.length){
        await trx.into('reviews').insert(reviews)
        await trx.raw(
          `SELECT setval('reviews_id_seq', ?)`,
          [reviews[reviews.length -1].id]
        )
      }
      if(favorites.length){
        await trx.into('favorites').insert(favorites)
        await trx.raw(
          `SELECT setval('favorites_id_seq', ?)`,
          [favorites[favorites.length -1].id]
        )
      }
    })
     
  }

function makeAuthHeader(user, secret = process.env.JWT_SECRET){
    const token = jwt.sign({user_id: user.id}, secret, {
      subject: user.user_name,
      algorithm: 'HS256'
    })
    return `Bearer ${token}`
  }

module.exports = {
    makeAuthHeader,
    makeFavoritesArray,
    makeParksArray,
    makeParksFixtures,
    makeReviewsArray,
    makeUsersArray,
    seedParksTables,
    seedUsers,
    cleanTables
}