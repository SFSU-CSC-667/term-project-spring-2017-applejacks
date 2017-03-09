/* signup routes */
var express      = require('express'),
  router         = express.Router(),
  printlog       = require('./../helpers').printlog;


function outputDeck () {
    var values = [1,2,3,4,5,6,7,8,9,10,'J','Q','K','A'],
  suits = ['spades', 'diamonds', 'clubs', 'hearts'],
   cards = [];

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
}

router.get('/', function (req, res) {
  printlog('GET /lobby', 'route');
  
  res.render('lobby', {
    cards: outputDeck()
  });
});

module.exports = router;