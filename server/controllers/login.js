/* login routes */
var express      = require('express'),
  router         = express.Router(),
  db             = require('./../database').db, // ./database is the relative path
  printlog       = require('./../helpers').printlog;

router.post('/', function (req, res) {
  // TODO: add middleware auth here
  
  // Load hash from your password DB. 
  // bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
  //     // res == true 
  // });

  // redirect to lobby after user has logged in
  res.render('lobby', {});
});

module.exports = router;