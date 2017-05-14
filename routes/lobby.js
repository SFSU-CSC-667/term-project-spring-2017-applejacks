/* signup routes */
import express from 'express';
import { printlog } from './../utils/helpers';
import auth from './../utils/auth';

const router = express.Router();

router.get('/', auth, (req, res) => {
  const { db } = res;
  const { uid } = req.params;

  printlog('GET /lobby', 'route');

  db.getGames()
  .then((games) => {

    res.render('lobby', {
      games: games,
      user: {
        isAdmin: req.session.isAdmin,
        username: req.session.name,
        name: req.session.name,
        id: req.session.uid
      }
    });
  })
  .catch((err) => {
    printlog(err, 'error');
    res.render('lobby');
  });
});

export default router;