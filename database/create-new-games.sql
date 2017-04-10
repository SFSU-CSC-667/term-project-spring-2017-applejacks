-- CREATE THE GAME_CARDS TABLE IF IT DOES NOT EXIST
CREATE TABLE IF NOT EXISTS game_cards
(
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  user_id VARCHAR (60) REFERENCES users(email) ON DELETE CASCADE,
  value CHAR(1),
  suit CHAR (1),
  order INTEGER,
  in_play BOOLEAN
);

-- * INSERT INTO users (email,password,lastlogin,isadmin) VALUES
--    *   ('testemail@gmail','$2a$08$sKQtgvGw3a8SujWUXqUFduesv',1489028533344,false)

-- insert into game_cards (user_id,value,suit,order,in_play)
-- values (123, 'K', 'C', -1, True)
