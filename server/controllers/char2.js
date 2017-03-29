/* log out routes */
const express = require('express');
const router = require('express').Router();
const db = require('./../../database/database');
const printlog = require('./../../utils/helpers').printlog;

router.get('/', (req, res) => {
  printlog('GET /chat2', 'route');
  res.render('chat');


  // allow page to render before emitting data that user joined
  // this will be refactored once we attach sessions to socket
  setTimeout(() => {
    res.io.emit('news', { hello: 'User joined' });
  }, 500);

});

router.post('/', (req, res) => {
  const {body} = req;
  console.log('POST body -> ', body);
  res.io.emit('news', { hello: body.message });
  res.send(true);
});

module.exports = router;