var express  = require('express'),
  exphbs     = require('express-handlebars'),
  bodyParser = require('body-parser'),
  path       = require('path'),
  db         = require('./database').db,
  session    = require('express-session'),
  // server variables
  app        = express(),
  env        = process.env.NODE_ENV || 'production',
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
app.use(express.static(path.join(__dirname, 'public')));

sess = {
  secret: 'super secret session not being stored on github',
  resave: true,
  saveUninitialized: false, // setting false for now. Need to look into this
  cookie: {}
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))

// already created
// db.createTable({name: 'users'});

app.get('/', function (req, res) {
  res.render('home', {
    user: {
      isAdmin: true,
      username: 'admin'
    }
  });
});

function printlog (str) {
  var isDevMode = process.env.NODE_ENV === 'development';
  if (true || isDevMode) {
    // do not change this to printlog() !!!!!
    console.log(str);
  }
}

app.get('/admin', function (req, res) {
  var rows = [],
    i,
    offset = new Date().getTimezoneOffset() / -60;

  db.getTable('users')
    .then(function (rows) {
      printlog(rows);
      // I don't like looping through records here :(
      for (i = 0, len = rows.length; i < len; i++) {
        let unixval = parseInt(rows[i].lastlogin, 10);

        // Stackoverflow - http://stackoverflow.com/questions/11124322/get-date-time-for-a-specific-time-zone-using-javascript
        let today = new Date(unixval + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" );

        rows[i].lastlogin = today.toString();
      }
      res.render('admin', {rows: rows});
    })
    .catch(function (err) {
      printlog('getTable() error ---> ' + err);
    });
});

app.post('/login', function (req, res) {
  var body = req.body || {};
  if (!Object.keys(body).length) {
    return;
  }

  db.addUser({
    email: body.email || '',
    password: body.pwd || '',
    isAdmin: false,
    table: 'users'
  });
});

app.get('/signup', function (req, res) {
    res.render('signup', {

    });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  printlog('Server started on port ' + port);
  if (process.env.NODE_ENV === 'development') {
    printlog('~~~~~  DEV MODE  ~~~~~');
  }
});
