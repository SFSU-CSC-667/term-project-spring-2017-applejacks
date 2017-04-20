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

// const useMockData = true || (process.env.MD === 'true');

// const mockGameState = {
//   dealerHand: [
//     {value: 'K', clubs: true},
//     {value: 'A', diamonds: true}
//   ],
//   userHand: [
//     {value: '10', clubs: true},
//     {value: '4', clubs: true}
//   ],
//   card: {
//     value: '2',
//     clubs: true
//   }
// };

// router.get('/game/:gameId', (req, res) => {
//   const { db } = res;
//   const { gameId }  = req.params;

//   printlog(`GET /game/${gameId}`, 'route');

//   if (useMockData) {
//     res.render('game', mockGameState);
//   } else {
//     res.render('game', {});
//   }

//   setTimeout(() => {
//     res.io.emit('news', { hello: 'User joined' });
//   }, 500);
// });


// load all App routes
router.use('/login',  loginRoute);

router.use('/signup',  signupRoute);
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

  res.redirect(302, pageToRender);
});

// module.exports = router;
export default router;