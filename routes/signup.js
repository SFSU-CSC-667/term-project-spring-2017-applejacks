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
  console.log(req.session);

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
    // What is the right http error code??
    return res.status(401).json({
      error: 'Your password does not match.'
    });
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
    .then((data) => {
      db.getUser(email)
      .then((user) => {
        const { id, username, email } = user;

        console.log(req.session);
        // redirect to lobby after user has signed up
        if (typeof req.session.uid === 'undefined') {
          req.session.uid = id;
          req.session.name = username || email;
          req.session.isAdmin = true;
          // req.session.save();
        }

        res.status(200).json(true);
      })
      .catch((err) => {
        console.log(err);
      });
    })
    .catch((err) => {
      printlog(err, 'error');
      // if user sign up fails, send user the error
      res.status(401).json({
        error: 'You already have an account. Please try logging in.'
      });
    });
  });
});

export default router;