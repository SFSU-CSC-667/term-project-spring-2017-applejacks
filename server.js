var express  = require('express'),
  exphbs     = require('express-handlebars'),
  bodyParser = require('body-parser'),
  path       = require('path'),
  app        = express(),
  env        = process.env.NODE_ENV || 'production';

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

app.get('/', function (req, res) {
    res.render('home', {

    });
});

app.get('/signup', function (req, res) {
    res.render('signup', {

    });
});

app.post('/login', function (req, res) {
  var body = req.body || {},
    email = body && body.email || '',
    pwd = body && body.email || '';


  res.send('posted');
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server started on port ' + port);
});
