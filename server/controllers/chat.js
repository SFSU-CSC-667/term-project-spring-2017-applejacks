/* chat routes */
const express = require('express');
const router = require('express').Router();
const db = require('./../../database/database');
const printlog = require('./../../utils/helpers').printlog;

router.get('/', (req, res) => {
  printlog('GET /chat', 'route');

  res.render('chat', {
    user: {
      isAdmin: req.session.isAdmin,
      username: req.session.name
    }
  });
});

module.exports = router;