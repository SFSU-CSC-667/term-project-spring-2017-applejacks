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
const app = serverController.createServer([appRouter]).listen(port, () => {
  printlog('Server started on port ' + app.address().port, 'init');
  printlog('Using mockdata: ' + (process.env.MD === true ? 'TRUE' : 'FALSE'), 'init');

  if (process.env.NODE_ENV === 'development') {
    printlog('~~~~~  DEV MODE  ~~~~~', 'init');
  }
});
