/* signup routes */
const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require('./../database');
const printlog = require('./../helpers').printlog;

/*
 * GET - desktop route
 */
router.get('/', (req, res) => {
  printlog('GET /signup', 'route');
  res.render('signup', {
    user: {
      isAdmin: req.session.isAdmin,
      username: req.session.name
    }
  });
});

/*
 * POST - API
 */
router.post('/', (req, res) => {
  printlog('POST /signup', 'route');

  /*
   * Cost of increasing number of salt rounds
   *
   * rounds=8 : ~40 hashes/sec
   * rounds=9 : ~20 hashes/sec
   * rounds=10: ~10 hashes/sec
   * rounds=11: ~5  hashes/sec
   */
  const saltRounds = 8;
  const body = req.body || {};

  if (!Object.keys(body).length) {
    printlog('Error --> POST data did not exist', 'error');
    return;
  }

  if (body.pwd !== body.pwdConfirm) {
    printlog('Error --> Confirm password did not match original', 'error');
    return;
  }

  bcrypt.hash(body.pwd, saltRounds, (err, hash) => {
    printlog('bcrypt generated hash -> ' + hash);

    // Store hash in your password DB.
    db.addUser({
      tableName: 'users',
      columns: ['email','password','lastlogin','isadmin'],
      values: [body.email, hash, Date.now(), false],
      key: 'email'
    })
    .then(() => {
      // redirect to lobby after user has signed up
      res.redirect('/lobby');
    })
    .catch((err) => {
      // if user sign up fails, send user the error
      res.render('signup', {
        err: err
      });
    });
  });
});

module.exports = router;