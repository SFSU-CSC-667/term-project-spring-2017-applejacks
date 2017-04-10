/* signup routes */
import express from 'express';
import { printlog } from './../utils/helpers';

const router = express.Router();

const outputDeck = () => {
  const values = [1,2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
  const suits = ['spades', 'diamonds', 'clubs', 'hearts'];
  let cards = [];

  for (var i=0; i<suits.length; i++) {
    for (var k=0; k<values.length; k++) {
      cards.push({
        value: values[k],
        hearts: suits[i] === 'hearts',
        clubs: suits[i] === 'clubs',
        diamonds: suits[i] === 'diamonds',
        spades: suits[i] === 'spades',
      });
    }
  }

  return cards;
};

router.get('/', (req, res) => {
  const { db } = res;
  printlog('GET /lobby', 'route');

  db.getGames()
  .then((games) => {
    console.log(games);

    res.render('lobby', {
      cards: outputDeck(),
      games: games,
      user: {
        isAdmin: req.session.isAdmin,
        username: req.session.name
      }
    });

  })
  .catch((err) => {
    res.render('lobby');
  });
});

export default router;