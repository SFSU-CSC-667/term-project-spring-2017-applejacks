/* login routes */
const router = require('express').Router();
const db = require('./../database');
const printlog = require('./../helpers').printlog;
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
  printlog('POST /login', 'route');
  const {pwd, email} = req.body;

  // TODO: add middleware auth here

  db.getPassword({tableName: 'users', key: 'email', val: email})
  .then((hash) => {
    hash = hash.password;

    // Load hash from your password DB.
    bcrypt.compare(pwd, hash, (err, resp) => {
      if (resp) {
        // if (!req.session.email) {
          // req.session.id = 99;
          req.session.name = email;
        // }

        printlog(`${pwd}=${hash} -> ${resp}`);
        // redirect to lobby after user has logged in
        res.redirect(200, '/');
      } else {
        printlog(`Password '${pwd}' does not match.`, 'error');
        res.redirect(401, '/signup');
      }
    });
  })
  .catch((error) => {
    printlog(error, 'error');
    res.redirect(500, '/signup');
  });



});

module.exports = router;