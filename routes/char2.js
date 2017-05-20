/* log out routes */
import express from 'express';
import { printlog } from './../utils/helpers';
import moment from 'moment';

const router = express.Router();

router.get('/', (req, res) => {
  printlog('GET /chat2', 'route');
  res.render('chat');

});

router.post('/', (req, res) => {
  const { body } = req;
  const { db } = res;

  console.log(req.session);
  console.log('POST body -> ', body);
  res.io.emit('message', {
    msg: body.message,
    username: req.session.name || 'guest-'+req.session.color,
    color: req.session.color,
    fromNow: moment().format("ddd, h:mma")
  });
  res.send(true);
});

export default router;