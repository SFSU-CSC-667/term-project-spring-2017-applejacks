/* log out routes */
import express from 'express';
import { printlog } from './../utils/helpers';

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

router.get('/', (req, res) => {
  const { db } = res;
  printlog('GET /game', 'route');

  if (useMockData) {
    res.render('game', mockGameState);
  } else {
    res.render('game', {});
  }

  setTimeout(() => {
    res.io.emit('news', { hello: 'User joined' });
  }, 500);

});

export default router;