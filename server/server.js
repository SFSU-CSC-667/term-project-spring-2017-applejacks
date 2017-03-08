var express  = require('express'),
  exphbs     = require('express-handlebars'),
  bodyParser = require('body-parser'),
  path       = require('path'),
  db         = require('./database').db, // ./database is the relative path
  session    = require('express-session'),
  printlog   = require('./helpers').printlog,
  // server variables
  app        = express(),
  appRouter  = require('./controllers'),
  env        = process.env.NODE_ENV || 'production',
  port       = process.env.PORT || 3000,
  sess; 

app.set('env', env);

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main'
}));
app.set('view engine', '.hbs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../public')));
// load routes
app.use(appRouter);

sess = {
  secret: 'super secret session not being stored on github',
  resave: true,
  saveUninitialized: false, // setting false for now. Need to look into this
  cookie: {}
};

if (app.get('env') === 'development') {
  // app.set('trust proxy', 1); // trust first proxy
  // sess.cookie.secure = true; // serve secure cookies
  app.use(session(sess))
}

db.createTable({name: 'users'})
.catch(function (errObj) {  
  printlog('createTable() -> ' + errObj);
});

app.listen(port, function() {
  printlog('Server started on port ' + port);
  printlog('Using mockdata: ' + (process.env.MD === true ? 'TRUE' : 'FALSE'));
  if (process.env.NODE_ENV === 'development') {
    printlog('~~~~~  DEV MODE  ~~~~~');
  }
});