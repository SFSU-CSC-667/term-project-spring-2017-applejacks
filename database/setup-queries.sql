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

-- CREATE THE SESSION TABLE IF IT DOES NOT EXIST
CREATE TABLE IF NOT EXISTS session
(
  sid VARCHAR NOT NULL COLLATE "default" PRIMARY KEY,
  sess json NOT NULL,
  expire TIMESTAMP(6) NOT NULL
);

-- adding drop table for testing purposes
drop table games;

-- CREATE THE GAMES TABLE IF IT DOES NOT EXIST
CREATE TABLE IF NOT EXISTS games
(
  id SERIAL PRIMARY KEY,
  create_date BIGINT,
  is_active BOOLEAN,
  current_player_turn INT
);

-- CREATE THE PLAYERS TABLE IF IT DOES NOT EXIST
CREATE TABLE IF NOT EXISTS players
(
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  user_id VARCHAR (60) REFERENCES users(email) ON DELETE CASCADE,
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
drop table game_cards;

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
