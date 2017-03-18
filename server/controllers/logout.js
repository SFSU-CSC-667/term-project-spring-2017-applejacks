/* log out routes */
const express = require('express');
const router = require('express').Router();
const db = require('./../../database/database');
const printlog = require('./../../utils/helpers').printlog;


router.get('/', (req, res) => {
  printlog('GET /logout', 'route');

  req.session.destroy((err) => {
    if (err) {
      printlog(err);
    } else {
      res.redirect(200, '/');
    }
  });
});

module.exports = router;