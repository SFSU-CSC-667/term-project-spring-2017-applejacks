import express from 'express';
import { printlog } from './../utils/helpers';

const router = express.Router();

// hit
// POST /api/game/:id/hit/:playerId
router.post('/:id/hit/:playerId', (req, res) => {
  const { id, playerId } = req.params;
  const { db, io } = res;

  // return the new game state here
  res.json({})
});

// stay
// POST /api/game/:id/stay/:playerId
router.post('/:id/stay/:playerId', (req, res) => {
  const { id, playerId } = req.params;
  const { db, io } = res;

  // return the new game state here
  res.json({})
});



let gameState = {};

const isArray = (obj) => {
  return obj && obj.constructor.name === 'Array';
};

const normalizeForGameState = (cardObject) => {
  const userId = cardObject['user_id'];
  const card = {
    value: cardObject.value,
    suit: cardObject.suit,
    clubs: 'C' === cardObject.suit,
    hearts: 'H' === cardObject.suit,
    diamonds: 'D' === cardObject.suit,
    spades: 'S' === cardObject.suit
  };

  if (isArray(gameState[userId]) && gameState[userId].length) {
    gameState[userId].push(card);
  } else {
    gameState[userId] = [card];
  }
};


// bet
// POST /api/game/:id/bet/:userId
router.post('/:id/bet/:userId', (req, res) => {
  const { id, userId } = req.params;
  const { db, io } = res;
  const { bet } = req.body;

  db.dealUpdate(id, userId, 2)
  .then((cards) => {

    cards.forEach((card) => {
      normalizeForGameState(card);
    });

    io.in('game-' + id).emit('PLAYER_BET', {gameState: gameState});
  })
  .catch((err) => console.log('dealUpdate err', err));

  db.makeBet(bet, userId, id);

  // return the new game state here
  res.json({});
});


export default router;