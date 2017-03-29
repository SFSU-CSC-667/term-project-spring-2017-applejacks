const router = require('express').Router();
const printlog = require('./../../utils/helpers').printlog;

// load all App routes
router.use('/signup', require('./signup'));
router.use('/game',  require('./game'));
router.use('/login',  require('./login'));
router.use('/admin',  require('./admin'));
router.use('/lobby',  require('./lobby'));
router.use('/logout',  require('./logout'));
router.use('/chat',  require('./chat'));
router.use('/chat2',  require('./char2'));

// index route
router.get('/', (req, res) => {
  printlog('GET /', 'route');

  res.render('game', {
    user: {
      isAdmin: req.session.isAdmin,
      username: req.session.name
    }
  });
});

module.exports = router;