import express from 'express';
import { printlog } from './../utils/helpers';

const router = express.Router();

// createGame
// POST /lobby/:playerId/createGame
router.post('/:playerId/createGame', (req, res) => {
  const { playerId } = req.params;
  const { db, io } = res;

  // return the new game state here
  res.json({})
});

// joinGame
// POST /lobby/:playerId/createGame
router.post('/:playerId/joinGame', (req, res) => {
  const { playerId } = req.params;
  const { db, io } = res;

  // return the new game state here
  res.json({})
});

export default router;