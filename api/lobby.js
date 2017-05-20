import express from 'express';
import { printlog } from './../utils/helpers';
import queries from './../constants/queries';

const router = express.Router();

// createGame
// POST /lobby/:playerId/createGame
router.post('/:playerId/createGame', (req, res) => {
  const { playerId } = req.params;
  const { db, io } = res;
printlog('playerId = ' + playerId);
  db.createGame(playerId)
  .then((gameId) => {
      var nsp = io.of('/my-namespace');
      nsp.on('connection', function(socket){
        printlog('someone connected');
      });

      // return the new game state here
      res.json(gameId)
   })
   .catch((error) => {
      printlog(error);
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