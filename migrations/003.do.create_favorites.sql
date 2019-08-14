CREATE TABLE favorites(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    park_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES dog_parks_users(id) ON DELETE CASCADE,
    FOREIGN KEY(park_id) REFERENCES dog_parks_list(id) ON DELETE CASCADE
)