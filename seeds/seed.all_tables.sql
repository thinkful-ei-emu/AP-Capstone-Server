BEGIN;

  TRUNCATE
    dog_parks_list,
    dog_parks_users,
    favorites,
    reviews
  RESTART IDENTITY CASCADE;

  
INSERT INTO dog_parks_list (park_name, park_city, park_address, park_hours)
VALUES
('Bayville Farms Park', 'Virginia Beach', '4132 First Court Road', 'Please Consult for Hours: https://www.vbgov.com/government/departments/parks-recreation/parks-trails/city-parks/Documents/park-closing-times.pdf'),
('Red Wing Park', 'Virginia Beach', '1398 General Booth Blvd', 'Please Consult for Hours: https://www.vbgov.com/government/departments/parks-recreation/parks-trails/city-parks/Documents/park-closing-times.pdf'),
('Woodstock Park', 'Virginia Beach', '5709 Providence Road', 'Please Consult for Hours: https://www.vbgov.com/government/departments/parks-recreation/parks-trails/city-parks/Documents/park-closing-times.pdf'),
('Maple Avenue Dog Park', 'Norfolk', '176 Maple Ave', '7 AM - 6 PM'),
('Meadowbrook Dog Park', 'Norfolk', '1625 W Little Creek Rd', '7 AM - 7 PM'),
('Colonial Greenway Dog Park', 'Norfolk', '405 Delaware Ave', '6 AM - 7:30 PM'),
('Lafayette Dog Park', 'Norfolk', '1270 Lafayette Blvd', '6 AM - 7:30 PM'),
('Stockley Gardens Dog Park', 'Norfolk', '1300 Stockley Gardens', '7 AM - 8:30 PM'),
('Tait Terrace Dog Park', 'Norfolk', '2717 Tait Terrace', '6 AM - 7:30 PM'),
('Granby Street Dog Walk', 'Norfolk', '400 Granby St', '6 AM - 7:30 PM'),
('Bea Arthur Dog Park', 'Norfolk', '501 Front St', '8 AM - 7:30 PM'),
('Chesapeake City Park', 'Chesapeake', '900 City Park Drive', '7 AM - 8 PM'),
('Deep Creek Park', 'Chesapeake', '437 S. George Washington Highway', '6 AM - 6 PM'),
('Elizabeth River Park', 'Chesapeake', '1400 Elizabeth River Way', 'Sunrise to Sunset'),
('Western Branch Dog Park', 'Chesapeake', '4437 Portsmouth Blvd', 'Sunrise to Sunset'),
('Fido Field Dog Park', 'Newport News', '105 City Farm Road', 'Sunrise - 9 PM'),
('Sandy Bottom Bark Park', 'Hampton', '1255 Big Bethel Road', 'Sunrise to sunset 7 days a week except for Christmas and inclement weather.'),
('Ridgway Bark Park', 'Hampton', '85 E. Mercury Blvd', '7:00 AM until sunset'),
('Lake Meade Dog Park', 'Suffolk', '2011 Holly Lawn Parkway', '6 AM - 8 PM');


INSERT INTO dog_parks_users (user_name, full_name, password)
VALUES
('adp', 'adp', '$2a$12$OAsALjR0lqEmeE47PQ.5AehfXyHbekvj4Ej3EMMKT/a4AoB87YYfa');

INSERT INTO favorites (user_id, park_id)
VALUES
(1, 1),
(1, 2),
(1, 3);

INSERT INTO reviews (text, rating, user_id, park_id)
VALUES
('Great park', 1, 1, 4),
('Horrible Park', 2, 1, 5),
('Okay Park', 3, 1, 6),
('Decent Park', 4, 1, 4),
('Pup enjoyed it a lot', 5, 1, 5),
('Great Park', 5, 1, 6),
('Okay Park', 2, 1, 7),
('Okay Park', 2, 1, 8),
('Okay Park', 2, 1, 9),
('Okay Park', 2, 1, 10),
('Okay Park', 2, 1, 11),
('Okay Park', 2, 1, 12),
('Okay Park', 2, 1, 13),
('Okay Park', 2, 1, 14),
('Okay Park', 2, 1, 15),
('Okay Park', 2, 1, 16),
('Okay Park', 2, 1, 17),
('Okay Park', 2, 1, 18),
('Okay Park', 2, 1, 19),
('Okay Park', 2, 1, 1),
('Okay Park', 2, 1, 2),
('Okay Park', 2, 1, 3);



COMMIT;
