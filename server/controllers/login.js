/* login routes */
var express      = require('express'),
  router         = express.Router(),
  printlog       = require('./../helpers').printlog;

router.post('/', function (req, res) {
  // TODO: add middleware auth here

  // redirect to lobby after user has logged in
  res.render('lobby', {});
});

module.exports = router;