import express from 'express';
import { printlog } from './../utils/helpers';
import signupRoute from './signup';
import loginRoute from './login';
import adminRoute from './admin';
import lobbyRoute from './lobby';
import gameRoute from './lobby';
import logoutRoute from './logout';
import chatRoute from './char2';

const router = express.Router();

// load all App routes
router.use('/signup', signupRoute);
router.use('/game',  gameRoute);
router.use('/login',  loginRoute);
router.use('/admin',  adminRoute);
router.use('/lobby',  lobbyRoute);
router.use('/logout',  logoutRoute);
router.use('/chat2',  chatRoute);

// index route
router.get('/', (req, res) => {
  const { db } = res;
  printlog('GET /', 'route');

  res.render('game', {
    user: {
      isAdmin: req.session.isAdmin,
      username: req.session.name
    }
  });
});

// module.exports = router;
export default router;