import express from 'express';
import { printlog } from './../utils/helpers';

const router = express.Router();

// hit
// POST /game/:id/hit/:playerId
router.post('/:id/hit/:playerId', (req, res) => {
  const { id, playerId } = req.params;
  const { db, io } = res;

  // return the new game state here
  res.json({})
});

// stay
// POST /game/:id/stay/:playerId
router.post('/:id/stay/:playerId', (req, res) => {
  const { id, playerId } = req.params;
  const { db, io } = res;

  // return the new game state here
  res.json({})
});

// bet
// POST /game/:id/bet/:playerId
router.post('/:id/bet/:playerId', (req, res) => {
  const { id, playerId } = req.params;
  const { db, io } = res;

  // return the new game state here
  res.json({})
});


export default router;