import express from 'express';
import { printlog } from './../utils/helpers';

const router = express.Router();


let gameState = {};
const isArray = (obj) => {
  return obj && obj.constructor.name === 'Array';
};

const normalizeForGameState = (cardObject, gameId) => {
  const userId = cardObject['user_id'];
  const card = {
    value: cardObject.value,
    suit: cardObject.suit,
    clubs: 'C' === cardObject.suit,
    hearts: 'H' === cardObject.suit,
    diamonds: 'D' === cardObject.suit,
    spades: 'S' === cardObject.suit
  };

  if (!gameState[gameId]) {
    gameState[gameId] = {};
  }

  if (isArray(gameState[gameId][userId]) && gameState[gameId][userId].length) {
    gameState[gameId][userId].push(card);
  } else {
    gameState[gameId][userId] = [card];
  }
};





// hit
// GET /api/game/:id/hit/:playerId
router.get('/:id/hit/:userId', (req, res) => {
  const { id, userId } = req.params;
  const { db, io } = res;

  console.log('HIT');

  db.dealUpdate(id, userId, 1)
  .then((card) => {
    let { value } = card[0];

    if (value === 'J' || value === 'Q' || value === 'K' || value === 'A') {
      value = 10;
    } else {
      value = Number(value);
    }

    gameState[id].total += value;

    if (gameState[id].total > 21) {
      gameState[id].bust = true;
    } else {
      gameState[id].bust = false;
    }

    normalizeForGameState(card[0], id);
    io.in('game-' + id).emit('PLAYER_BET', {gameState: gameState});
    io.in('game-' + id).emit('PLAYER_HIT', {gameState: gameState});
  });

  // return the new game state here
  res.json({})
});



// stay
// GET /api/game/:id/stay/:playerId
router.get('/:id/stay/:playerId', (req, res) => {
  const { id, playerId } = req.params;
  const { db, io } = res;

  // return the new game state here
  res.json({})
});


// bet
// POST /api/game/:id/bet/:userId
router.post('/:id/bet/:userId', (req, res) => {
  const { id, userId } = req.params;
  const { db, io } = res;
  const { bet } = req.body;

  // get player cards
  db.dealUpdate(id, userId, 2)
  .then((cards) => {
    let total = 0;

    // player
    cards.forEach((card) => {
      let { value } = card;

      normalizeForGameState(card, id);

      if (value === 'J' || value === 'Q' || value === 'K' || value === 'A') {
        value = 10;
      } else {
        value = Number(value);
      }

      total += value;
      gameState[id].total = total;

    });

    // get dealer cards
    db.dealUpdate(id, -1, 2)
    .then((cards) => {

      // dealer
      cards.forEach((card) => {
        normalizeForGameState(card, id);
      });

      io.in('game-' + id).emit('PLAYER_BET', {gameState: gameState});
    })
    .catch((err) => console.log('dealUpdate err', err));

  })
  .catch((err) => console.log('dealUpdate err', err));

  db.makeBet(bet, userId, id);

  // return the new game state here
  res.json({});
});


export default router;