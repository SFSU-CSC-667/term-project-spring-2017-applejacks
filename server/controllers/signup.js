/* signup routes */
var express      = require('express'),
  bcrypt         = require('bcrypt'),
  router         = express.Router(),
  db             = require('./../database').db, // ./database is the relative path
  printlog       = require('./../helpers').printlog;

/*
 * GET - desktop route
 */
router.get('/', function (req, res) {
  printlog('GET /signup', 'route');
  res.render('signup', {

  });
});

/*
 * POST - API
 */
router.post('/', function (req, res) {
  printlog('POST /signup', 'route');
  var body = req.body || {},

  /*
   * Cost of increasing number of salt rounds
   *
   * rounds=8 : ~40 hashes/sec
   * rounds=9 : ~20 hashes/sec
   * rounds=10: ~10 hashes/sec
   * rounds=11: ~5  hashes/sec
   */
    saltRounds = 8;

  if (!Object.keys(body).length) {
    printlog('Error --> POST data did not exist', 'error');
    return;
  }

  if (body.pwd !== body.pwdConfirm) {
    printlog('Error --> Confirm password did not match original', 'error');
    return;
  }

  bcrypt.hash(body.pwd, saltRounds, function (err, hash) {
    printlog('bcrypt generated hash -> ' + hash);

    // Store hash in your password DB.
    db.addUser({
      tableName: 'users',
      columns: ['email','password','lastlogin','isadmin'],
      values: [body.email, hash, Date.now(), false],
      key: 'email'
    })
    .then(function () {
      // redirect to lobby after user has signed up
      res.redirect('/lobby');
    }).catch(function (err) {
      // if user sign up fails, send user the error
      res.render('signup', {
        err: err
      });
    });
  });
});

module.exports = router;