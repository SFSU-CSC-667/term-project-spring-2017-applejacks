import express from 'express';
import { printlog } from './../utils/helpers';
import loginRoute from './login';
import signupRoute from './signup';
import adminRoute from './admin';
import lobbyRoute from './lobby';
import gameRoute from './game';
import logoutRoute from './logout';
import chatRoute from './char2';

const router = express.Router();

// load all App routes
router.use('/login',  loginRoute);

router.use('/signup', signupRoute);
router.use('/game',  gameRoute);
router.use('/admin',  adminRoute);
router.use('/lobby',  lobbyRoute);
router.use('/logout',  logoutRoute);
router.use('/chat2',  chatRoute);

// index route
router.get('/', (req, res) => {
  const { db } = res;
  let pageToRender = req.session.name ? 'lobby' : 'signup';

  printlog('GET /', 'route');
console.log('session name is ' + req.session.name);
  res.render(pageToRender, {
    user: {
      isAdmin: req.session.isAdmin,
      username: req.session.name
    }
  });
});

// module.exports = router;
export default router;