var express      = require('express'),
  router         = express.Router(),
  signUpRoutes   = require('./signup'),
  loginRoutes    = require('./login'),
  adminRoutes    = require('./admin'),
  lobbyRoutes    = require('./lobby'),
  printlog       = require('./../helpers').printlog;

// load all App routes
router.use('/signup', signUpRoutes);
router.use('/login',  loginRoutes);
router.use('/admin',  adminRoutes);
router.use('/lobby',  lobbyRoutes);

// index route
router.get('/', function (req, res) {
  res.render('home', {
    user: {
      isAdmin: true,
      username: 'admin'
    }
  });
});

module.exports = router