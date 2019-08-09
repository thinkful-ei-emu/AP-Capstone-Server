CREATE TABLE reviews(
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    rating INTEGER NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    user_id INTEGER
        REFERENCES dog_parks_users(id) ON DELETE CASCADE NOT NULL,
    park_id INTEGER
        REFERENCES dog_parks_list(id) ON DELETE CASCADE NOT NULL
)