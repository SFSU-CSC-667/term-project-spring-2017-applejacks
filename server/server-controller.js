const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const printlog = require('./../utils/helpers').printlog;
const SessionAuthentication = require('./session-auth');
const db = require('./../database/database');
const app = express();

// session authentication setup
const sessionAuth = new SessionAuthentication();

function ServerController () {

}

ServerController.prototype.getPort = (port) => {
  if (port === undefined ||
      isNaN(parseInt(port, 10)) ||
      port === null) {
    return 0;
  }

  if (process.env.NODE_ENV === 'development') {
    return parseInt(port, 10);
  }

  return process.env.PORT;
};

ServerController.prototype.getApp = () => app;

ServerController.prototype.createServer = (routers, app) => {
  app.set('env', process.env.NODE_ENV || 'production');
  app.set('view engine', '.hbs');

  app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main'
  }));

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, '/../public')));

/*
  db.createSessionTable()
  .catch((err) => {
    printlog(err);
  });
*/

  // start sessions
  sessionAuth.newSession({
    app: app
  });

  // load routes
  routers.forEach((val) => {
    app.use(val);
  });

  return app;
};

module.exports = new ServerController();