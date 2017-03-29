const db = require('./../database/database');
const serverController = require('./server-controller');
const printlog = require('./../utils/helpers').printlog;

// initialize database and create game tables if needed
db.init().then(() => {
  db.createTable({
    ifNotExists: true,
    tableName: 'users',
    uniqueId: false,
    columns: ['email', 'password', 'lastlogin', 'isadmin'],
    types: ['vc-60 u nn pk', 'vc-100 nn', 'bs', 'bool']
  })
  .then(res => printlog('Table [users] created.'))
  .catch(errObj => printlog('createTable() -> ' + errObj, 'error'));
});

const appRouter = require('./controllers');
const port = serverController.getPort(3000);
let app = serverController.getApp();

// create express erver
const appServer = app.listen(port, () => {
  printlog('Server started on port ' + appServer.address().port, 'init');
  printlog('Using mockdata: ' + (process.env.MD === true ? 'TRUE' : 'FALSE'), 'init');

  if (process.env.NODE_ENV === 'development') {
    printlog('~~~~~  DEV MODE  ~~~~~', 'init');
  }
});

// Socket.io setup
const io = require('socket.io')(appServer);
let chatSocket = null;

io.on('connection', function (socket) {
  // chatSocket = chatSocket || socket;
  chatSocket = socket;

  console.log('connected');
  chatSocket.on('my other event', function (data) {
    console.log(data);
  });
});


// middlewar to add "io" to response object
app.use(function(req, res, next){
  res.io = io;
  next();
});


// setting up server
app = serverController.createServer([appRouter], app);
