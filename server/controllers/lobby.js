/* signup routes */
const express = require('express');
const router = require('express').Router();
const db = require('./../../database/database');
const printlog = require('./../../utils/helpers').printlog;


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
  printlog('GET /lobby', 'route');

  res.render('lobby', {
    cards: outputDeck(),
    user: {
      isAdmin: req.session.isAdmin,
      username: req.session.name
    }
  });
});

module.exports = router;