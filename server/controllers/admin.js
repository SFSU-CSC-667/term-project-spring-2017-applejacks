/* admin routes */
var express      = require('express'),
  db             = require('./../database').db, // ./database is the relative path
  router         = express.Router(),
  printlog       = require('./../helpers').printlog;

router.get('/drop/:table', function (req, res) {
  printlog('GET /admin/drop/:table', 'route');
  var tableName = req.params.table;
  tableName = tableName || '';

  db.dropTable(tableName).catch(function (err) {
    res.render('signup', {
      err: err
    });
  });
});

router.get('/', function (req, res) {
  printlog('GET /admin', 'route');
  
  // db.deleteUser({table: 'users', email: 'sam@sam'}).catch(err => {console.log(err)});

  var rows = [],
    i,
    offset = new Date().getTimezoneOffset() / -60;

    if (process.env.MD === 'true') {
      res.render('admin', {rows: [
        {email: 'sam@test.com', password: 'password', lastlogin: 'Jane 4, 2017, Monday', isadmin: false},
        {email: 'sam@test.com', password: 'password', lastlogin: 'Jane 4, 2017, Monday', isadmin: false},
        {email: 'sam@test.com', password: 'password', lastlogin: 'Jane 4, 2017, Monday', isadmin: false},
        {email: 'sam@test.com', password: 'password', lastlogin: 'Jane 4, 2017, Monday', isadmin: false},
        {email: 'sam@test.com', password: 'password', lastlogin: 'Jane 4, 2017, Monday', isadmin: false},
        {email: 'sam@test.com', password: 'password', lastlogin: 'Jane 4, 2017, Monday', isadmin: false},
        {email: 'sam@test.com', password: 'password', lastlogin: 'Jane 4, 2017, Monday', isadmin: false},
        {email: 'sam@test.com', password: 'password', lastlogin: 'Jane 4, 2017, Monday', isadmin: false},
        {email: 'sam@test.com', password: 'password', lastlogin: 'Jane 4, 2017, Monday', isadmin: false},
        {email: 'sam@test.com', password: 'password', lastlogin: 'Jane 4, 2017, Monday', isadmin: false}
      ]});
    }
    
  db.getTable('users')
    .then(function (rows) {
      // printlog(rows);
      // I don't like looping through records here :(
      for (i = 0, len = rows.length; i < len; i++) {
        var unixval = parseInt(rows[i].lastlogin, 10);

        // Stackoverflow - http://stackoverflow.com/questions/11124322/get-date-time-for-a-specific-time-zone-using-javascript
        var today = new Date(unixval + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" );

        rows[i].lastlogin = today.toString();
      }

      res.render('admin', {rows: rows});
    })
    .catch(function (err) {      
      printlog('getTable() error ---> ' + err);
    });
});

module.exports = router;