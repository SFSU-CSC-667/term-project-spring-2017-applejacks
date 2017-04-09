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

  console.log('POST body -> ', body);
  res.io.emit('news', {
    hello: body.message,
    fromNow: moment('2017-04-08 17:40').fromNow() // time since 4/8/17, 5:40pm
  });
  res.send(true);
});

export default router;