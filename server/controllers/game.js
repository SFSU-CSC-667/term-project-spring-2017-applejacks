/* log out routes */
const express = require('express');
const router = require('express').Router();
const db = require('./../../database/database');
const printlog = require('./../../utils/helpers').printlog;
const useMockData = (process.env.MD === 'true');

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

module.exports = router;