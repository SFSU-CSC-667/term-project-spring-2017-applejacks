/* signup routes */
var express      = require('express'),
  router         = express.Router(),
  printlog       = require('./../helpers').printlog;

router.get('/', function (req, res) {
  printlog('GET /lobby', 'route');
  
  res.render('lobby', {});
});

module.exports = router;