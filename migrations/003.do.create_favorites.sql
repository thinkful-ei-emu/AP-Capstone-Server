CREATE TABLE favorites(
    user_id INT NOT NULL,
    park_id INT NOT NULL,
    PRIMARY KEY(user_id, park_id),
    FOREIGN KEY(user_id) REFERENCES dog_parks_users(id),
    FOREIGN KEY(park_id) REFERENCES dog_parks_list(id)
)