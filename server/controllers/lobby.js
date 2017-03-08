/* signup routes */
var express      = require('express'),
  router         = express.Router(),
  printlog       = require('./../helpers').printlog;

router.get('/', function (req, res) {
  res.render('lobby', {});
});

module.exports = router;