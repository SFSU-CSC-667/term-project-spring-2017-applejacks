/* log out routes */
import express from 'express';
import { printlog } from './../utils/helpers';
import auth from './../utils/auth';

const router = express.Router();
const useMockData = true || (process.env.MD === 'true');

const mockGameState = {
  dealerHand: [
    {value: 'K', clubs: true},
    {value: 'A', diamonds: true}
  ],
  userHand: [
    {value: '10', clubs: true},
    {value: '4', clubs: true}
  ],
  card: {
    value: '2',
    clubs: true
  }
};

// /game/gameid
router.get('/:gameId', auth, (req, res) => {
  const { db } = res;
  const { gameId }  = req.params;
  const userId = req.session.uid;

  if (userId) {
    db.addPlayer(gameId, userId);
  }

  printlog(`GET /game/${gameId}`, 'route');
  mockGameState.user = {

        isAdmin: req.session.isAdmin,
        username: req.session.name,
        name: req.session.name,
        id: req.session.uid
      };


<<<<<<< HEAD
  db.dealCards(gameId,userId, 4)
  .then((err) => {
    console.log(err);
  })
  .catch((err) => {
    console.log(err);
  });

=======
>>>>>>> a9cbf4d128cde906d3055c9730ef9d9072cd38e6
  db.getCards(gameId)
  .then((deck) => {
    mockGameState.userHand = [
      {value: deck[0].value, suit: deck[0].suit, clubs: 'C' === deck[0].suit, hearts: 'H' === deck[0].suit, 'diamonds': 'D' === deck[0].suit, 'spades': 'S' === deck[0].suit},
      {value: deck[1].value, suit: deck[1].suit, clubs: 'C' === deck[1].suit, hearts: 'H' === deck[1].suit, 'diamonds': 'D' === deck[1].suit, 'spades': 'S' === deck[1].suit}
    ];
     mockGameState.dealerHand = [
      {value: deck[2].value, suit: deck[2].suit, clubs: 'C' === deck[2].suit, hearts: 'H' === deck[2].suit, 'diamonds': 'D' === deck[2].suit, 'spades': 'S' === deck[2].suit},
      {value: deck[3].value, suit: deck[3].suit, clubs: 'C' === deck[3].suit, hearts: 'H' === deck[3].suit, 'diamonds': 'D' === deck[3].suit, 'spades': 'S' === deck[3].suit}
    ];
    if (useMockData) {
      res.render('game', mockGameState);
    } else {
      res.render('game', {
        user: {
          isAdmin: req.session.isAdmin,
          username: req.session.name,
          id: req.session.uid
        }
      });
    }

    setTimeout(() => {
      res.io.emit('news', { hello: 'User joined.' });
    }, 500);

  })
  .catch((err) => {
    console.log(err);
  });
});

router.get('/', (req, res) => {
  // const { db } = res;
  // printlog('GET /game', 'route');

  // if (useMockData) {
  //   res.render('game', mockGameState);
  // } else {
  //   res.render('game', {});
  // }

  // setTimeout(() => {
  //   res.io.emit('news', { hello: 'User joined' });
  // }, 500);
  res.redirect(302, '/');

});

export default router;