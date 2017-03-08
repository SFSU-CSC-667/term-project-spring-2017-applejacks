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
  res.render('signup', {

  });
});

/*
 * POST - API
 */
router.post('/', function (req, res) {
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
    printlog('Error --> POST data did not exist');
    return;
  }

  if (body.pwd !== body.pwdConfirm) {
    printlog('Error --> Confirm password did not match original');
    return;
  }

  // uncomment when we are ready to start encryptingn passwords
  // bcrypt.hash(body.pwd, saltRounds, function(err, hash) {
  //   // Store hash in your password DB. 
  //   db.addUser({
  //     email: body.email || '',
  //     password: hash
  //     isAdmin: false,
  //     table: 'users'
  //   });
  // });

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