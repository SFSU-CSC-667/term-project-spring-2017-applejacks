/* signup routes */
import express from 'express';
import { printlog } from './../utils/helpers';
import bcrypt from 'bcrypt';

const router = express.Router();
const STARTING_BANK_VALUE = 10000; // $10,000

/*
 * GET - desktop route
 */
router.get('/', (req, res) => {
  const { db } = res;
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
  const { db } = res;
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
  const { email, username, pwd, pwdConfirm } = body;

  if (!Object.keys(body).length) {
    printlog('Error --> POST data did not exist', 'error');
    return;
  }

  if (pwd !== pwdConfirm) {
    printlog('Error --> Confirm password did not match original', 'error');
    return;
  }

  bcrypt.hash(pwd, saltRounds, (err, hash) => {
    printlog('bcrypt generated hash -> ' + hash);

    // Store hash in your password DB.
    db.addUser({
      tableName: 'users',
      columns: ['email','username', 'password','last_login','date_joined', 'bank_value', 'is_admin'],
      values: [email, (username || '') ,hash, Date.now(), Date.now(), STARTING_BANK_VALUE, false],
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

export default router;