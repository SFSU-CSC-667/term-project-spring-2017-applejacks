/* admin routes */
var express      = require('express'),
  router         = express.Router(),
  printlog       = require('./../helpers').printlog;

router.get('/', function (req, res) {
  var rows = [],
    i,
    offset = new Date().getTimezoneOffset() / -60;

    // TODO - move this under --mockdata flag when ready
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

  // db.getTable('users')
  //   .then(function (rows) {
  //     printlog(rows);
  //     // I don't like looping through records here :(
  //     for (i = 0, len = rows.length; i < len; i++) {
  //       var unixval = parseInt(rows[i].lastlogin, 10);

  //       // Stackoverflow - http://stackoverflow.com/questions/11124322/get-date-time-for-a-specific-time-zone-using-javascript
  //       var today = new Date(unixval + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" );

  //       rows[i].lastlogin = today.toString();
  //     }
  //     res.render('admin', {rows: rows});
  //   })
  //   .catch(function (err) {
  //     res.render('admin', {rows: [
  //       {email: 'sam@test.com', password: 'password', lastlogin: 'Jane 4, 2017, Monday', isadmin: false},
  //       {email: 'sam@test.com', password: 'password', lastlogin: 'Jane 4, 2017, Monday', isadmin: false},
  //       {email: 'sam@test.com', password: 'password', lastlogin: 'Jane 4, 2017, Monday', isadmin: false},
  //       {email: 'sam@test.com', password: 'password', lastlogin: 'Jane 4, 2017, Monday', isadmin: false},
  //       {email: 'sam@test.com', password: 'password', lastlogin: 'Jane 4, 2017, Monday', isadmin: false},
  //       {email: 'sam@test.com', password: 'password', lastlogin: 'Jane 4, 2017, Monday', isadmin: false},
  //       {email: 'sam@test.com', password: 'password', lastlogin: 'Jane 4, 2017, Monday', isadmin: false},
  //       {email: 'sam@test.com', password: 'password', lastlogin: 'Jane 4, 2017, Monday', isadmin: false},
  //       {email: 'sam@test.com', password: 'password', lastlogin: 'Jane 4, 2017, Monday', isadmin: false},
  //       {email: 'sam@test.com', password: 'password', lastlogin: 'Jane 4, 2017, Monday', isadmin: false}
  //     ]});
  //     printlog('getTable() error ---> ' + err);
  //   });
});

module.exports = router;