/* log out routes */
import express from 'express';
import { printlog } from './../utils/helpers';

const router = express.Router();

router.get('/', (req, res) => {
  const { db } = res;
  printlog('GET /logout', 'route');

  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        printlog(err);
      } else {
        res.redirect('/');
      }
    });
  } else {
    printlog('session no instantiated', 'error');
  }
});

export default router;