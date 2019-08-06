CREATE TABLE dog_parks_list (
  id SERIAL PRIMARY KEY,
  park_name TEXT NOT NULL UNIQUE,
  park_city TEXT NOT NULL,
  park_address TEXT NOT NULL,
  park_hours TEXT NOT NULL,
  park_rating INTEGER NOT NULL
);