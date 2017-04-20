import express from 'express';
import { printlog } from './../utils/helpers';
import queries from './../constants/queries';

const router = express.Router();

// createGame
// POST /lobby/:playerId/createGame
router.post('/:playerId/createGame', (req, res) => {
  const { playerId } = req.params;
  const { db, io } = res;

  db.createGame(playerId)
  .then((gameId) => {
      var nsp = io.of('/my-namespace');
      nsp.on('connection', function(socket){
        console.log('someone connected');
      });
      nsp.emit('game-created', gameId);


      // return the new game state here
      res.json({})
   })
   .catch((error) => {
    console.log(error);
      // Error, no records inserted
   });

});

// joinGame
// POST /lobby/:playerId/createGame
router.post('/:playerId/joinGame', (req, res) => {
  const { playerId } = req.params;
  const { db, io } = res;

  // return the new game state here
  // res.json({})
  res.redirect(302, '/game');
});

export default router;