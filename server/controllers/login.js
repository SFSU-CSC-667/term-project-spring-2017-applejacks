/* login routes */
var express      = require('express'),
  router         = express.Router(),
  printlog       = require('./../helpers').printlog;

router.post('/', function (req, res) {
  var body = req.body || {};
  if (!Object.keys(body).length) {
    return;
  }

  db.addUser({
    email: body.email || '',
    password: body.pwd || '',
    isAdmin: false,
    table: 'users'
  });

  // redirect to lobby after user has logged in
  res.render('lobby', {});
});

module.exports = router;