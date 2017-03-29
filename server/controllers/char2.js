/* log out routes */
const express = require('express');
const router = require('express').Router();
const db = require('./../../database/database');
const printlog = require('./../../utils/helpers').printlog;

router.get('/', (req, res) => {
  printlog('GET /chat2', 'route');
  res.render('chat')

});

router.post('/', (req, res) => {
  const {body} = req;
  console.log('POST body -> ', body);
  res.io.emit('news', { hello: body.message });
});

module.exports = router;