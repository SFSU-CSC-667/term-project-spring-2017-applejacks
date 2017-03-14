const router = require('express').Router();
const printlog = require('./../helpers').printlog;

// load all App routes
router.use('/signup', require('./signup'));
router.use('/login',  require('./login'));
router.use('/admin',  require('./admin'));
router.use('/lobby',  require('./lobby'));

// index route
router.get('/', (req, res) => {
  printlog('GET /', 'route');

  res.render('home', {
    user: {
      isAdmin: req.session.isAdmin,
      username: req.session.name
    }
  });
});

module.exports = router;