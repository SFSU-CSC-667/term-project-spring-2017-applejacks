/* login routes */
const router = require('express').Router();
const db = require('./../../database/database');
const printlog = require('./../../utils/helpers').printlog;
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
        res.redirect('/');

        // allow page to render before emitting data that user joined
        // this will be refactored once we attach sessions to socket
        setTimeout(() => {
          res.io.emit('news', { hello: `${req.session.name} joined.` });
        }, 500);
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