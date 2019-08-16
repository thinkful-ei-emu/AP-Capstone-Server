## API Link: 

https://blooming-reef-25668.herokuapp.com/

This server is not meant to be re-used by other developers as it requires controlled data in terms of the park list.

## API Documentation: 

This API allows requests to the following endpoints:

/api/users: This endpoint allows for user registration. You can make a POST request to this endpoing with a request body that includes: password, user_name, and full_name. 

/api/auth: This endpoint allows for user login. You can make a POST request /api/auth/login. The request body must include user_name and password. 

/api/parks: The /api/parks endpoint allows for getting back a response body that include park id, park_name, park_city, park_address, park_hours, and park_rating. You can also make a GET request to /api/parks/:park_id, which will return only a single park at that specific id. 

/api/favorites: A GET request and POST request can be made to /api/favorites with correct authorization. With the GET request, you will receive a response body that includes user_id, park_id, park_name, park_address, park_city, park_hours, and park_rating. The size of the response body depends on the number of favorites stored to the user's id. A POST request can also be made to /api/favorites. The request body must include the park_id as the user_id will come from authentication. A DELETE request can also be made to /api/favorites/:parkId. This will take the params of the URL and delete the specified park. 

/api/reviews: GET and POST requests can be made to /api/reviews. A GET request will respond with a response body that includes id, text, rating, date_created, and park_id. A POST request can be made to /api/reviews as well. The request body must include park_id, rating, and text. 


## Stack:

Node, Express, PostgreSQL, Knex, Bcrypt, and JWT. 
