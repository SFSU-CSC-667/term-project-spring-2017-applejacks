/* signup routes */
var express      = require('express'),
  router         = express.Router(),
  printlog       = require('./../helpers').printlog;

/*
 * GET - desktop route
 */
router.get('/', function (req, res) {
  res.render('signup', {

  });
});

/*
 * POST - API
 */
router.post('/', function (req, res) {
  var body = req.body || {};

  if (!Object.keys(body).length) {
    printlog('Error --> POST data did not exist');
    return;
  }

  if (body.pwd !== body.pwdConfirm) {
    printlog('Error --> Confirm password did not match original');
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