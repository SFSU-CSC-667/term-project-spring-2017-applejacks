import express from 'express';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import path from 'path';
import { printlog } from './utils/helpers';
import db from './database/database';
import apiRoutes from './api';
import appRouter from './routes';
import socketio from 'socket.io';
import session from 'express-session';
import connPgSimple from 'connect-pg-simple';

const app = express();

// initialize database and create game tables if needed
db.init().then(() => {
  const file = './database/setup-queries.sql';
  db.loadAndExecute(file)
  .then((query) => printlog(`${file} queried successfully.`))
  .catch((err) => printlog(err, 'error'));
});

// production ready function to retrieve port that server
// should run on
const getPort = (port=3000) => {
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

// setting up server
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
app.use(express.static(path.join(__dirname, './public')));

// session setup
const pgSessionStore = connPgSimple(session);
app.use(session({
  name: 'null',
  store: new pgSessionStore(),
  secret: 'some other secret',
  resave: false,
  saveUninitialized: false, // only save a known session (login)
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

// start Express server
const port = getPort();
const appServer = app.listen(port, () => {
  printlog('Server started on port ' + appServer.address().port, 'init');
  printlog('Using mockdata: ' + (process.env.MD === true ? 'TRUE' : 'FALSE'), 'init');

  if (process.env.NODE_ENV === 'development') {
    printlog('~~~~~  DEV MODE  ~~~~~', 'init');
  }
});

// Socket.io setup
const io = socketio(appServer);
let chatSocket = null;

io.on('connection', function (socket) {
  // chatSocket = chatSocket || socket;
  chatSocket = socket;

  console.log('connected');
  chatSocket.on('my other event', function (data) {
    console.log(data);
  });
});

/**
 * Middleware
 * - this has to come before routes are created
 * - attach `database` and `io` instance to all response objects
 * - all APIs and routes pass through middleware before being executed
 */
app.use((req, res, next) => {
  res.io = io;
  res.db = db;
  next();
});

// load desktop routes
app.use(appRouter);

// load API routes
app.use('/api', apiRoutes);


