/* chat routes */
/*


      NO LONGER USED

*/
const express = require('express');
const router = require('express').Router();
const db = require('./../../database/database');
const printlog = require('./../utils/helpers').printlog;

// socket.io setup
const app = express();
app.io = require('socket.io')();

router.get('/', (req, res) => {
  printlog('GET /chat', 'route');

  res.render('chat', {
    user: {
      isAdmin: req.session.isAdmin,
      username: req.session.name
    }
  });
});

app.io.sockets.on('connection', function(socket){
    socket.on('send message', function(data){
        app.io.sockets.emit('new message', data);
    });
});

export default router;