/* log out routes */
import express from 'express';
import { printlog } from './../utils/helpers';
import auth from './../utils/auth';

const router = express.Router();
const useMockData = true || (process.env.MD === 'true');

// /game/gameid
router.get('/:gameId', auth, (req, res) => {
  const { db, io } = res;
  const { gameId }  = req.params;
  const userId = req.session.uid;

  if (userId) {
    db.addPlayer(gameId, userId);
  }

  // listen for client and then create a room and join
  // Ex. game-3
  io.sockets.on('connection', function (socket) {
    socket.on('room', function (room) {
      socket.join(room);
    });
  });

  printlog(`GET /game/${gameId}`, 'route');


  db.getPlayerBank(userId, gameId)
  .then((result) => {
    console.log(result);
    let bankValue = Number(result['bank_buyin']);
    let debt = false;

    if (bankValue < 0 ) {
      debt = true;
    }

    bankValue = Math.abs(bankValue);

    res.render('game', {
      user: {
        isAdmin: req.session.isAdmin,
        username: req.session.name,
        name: req.session.name,
        id: req.session.uid,
        bankValue,
        debt
      }
    });

  });


});

router.get('/', (req, res) => {
  res.redirect(302, '/');
});

export default router;