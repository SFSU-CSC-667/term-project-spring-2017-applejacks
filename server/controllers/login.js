/* login routes */
const router = require('express').Router();
const db = require('./../database');
const printlog = require('./../helpers').printlog;

router.post('/', (req, res) => {
  printlog('POST /login', 'route');
  // TODO: add middleware auth here

  // Load hash from your password DB.
  // bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
  //     // res == true
  // });

  // redirect to lobby after user has logged in
  res.render('lobby', {});
});

module.exports = router;