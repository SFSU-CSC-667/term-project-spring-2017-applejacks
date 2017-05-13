-- CREATE THE USER TABLE IF IT DOES NOT EXIST
CREATE TABLE IF NOT EXISTS users
(
  id SERIAL PRIMARY KEY,
  email VARCHAR (60) UNIQUE NOT NULL,
  password VARCHAR (100) NOT NULL,
  username VARCHAR (100),
  last_login BIGSERIAL,
  date_joined BIGINT,
  bank_value BIGINT,
  is_admin BOOLEAN
);

INSERT INTO users (id, email, password, username, last_login, date_joined, bank_value, is_admin) VALUES ('-1', 'dealer@blackjack.com', '$2a$08$5YDJhS1Y/GfcXovay0RQ/OBPh3k1NXVjX3oDsZy7.0GJux2Cc0Zd6', 'DEALER', '1493489382384', '1493489382384', '1000000000', 'TRUE');

-- CREATE THE SESSION TABLE IF IT DOES NOT EXIST
-- CREATE TABLE IF NOT EXISTS session
-- (
--   sid VARCHAR NOT NULL COLLATE "default" PRIMARY KEY,
--   sess json NOT NULL,
--   expire TIMESTAMP(6) NOT NULL
-- );

CREATE TABLE IF NOT EXISTS session (
 sid varchar NOT NULL,
 sess json NOT NULL,
 expire timestamp(6) NOT NULL
) WITH (OIDS=FALSE);

-- adding drop table for testing purposes
-- drop table games;

-- CREATE THE GAMES TABLE IF IT DOES NOT EXIST
CREATE TABLE IF NOT EXISTS games
(
  id SERIAL PRIMARY KEY,
  create_date BIGINT,
  is_active BOOLEAN,
  current_player_turn INT,
  p_count INT
);

-- CREATE THE PLAYERS TABLE IF IT DOES NOT EXIST
CREATE TABLE IF NOT EXISTS players
(
  id SERIAL PRIMARY KEY,
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  bet_placed BIGINT,
  bank_buyin BIGINT
);

-- CREATE THE MESSAGES TABLE IF IT DOES NOT EXIST
CREATE TABLE IF NOT EXISTS messages
(
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  user_id VARCHAR (60) REFERENCES users(email) ON DELETE CASCADE,
  msg TEXT,
  msg_timestamp TIMESTAMP(6)
);


-- adding drop table for testing purposes
-- drop table game_cards;

-- CREATE THE GAME_CARDS TABLE IF IT DOES NOT EXIST
CREATE TABLE IF NOT EXISTS game_cards
(
  id SERIAL PRIMARY KEY,
  game_id INTEGER,
  user_id VARCHAR(60),
  value VARCHAR(8),
  suit VARCHAR(8),
  orderr INTEGER,
  in_play BOOLEAN
);
