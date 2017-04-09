/* admin routes */
import express from 'express';
import { printlog } from './../utils/helpers';

const router = express.Router();

router.get('/drop/:table', (req, res) => {
  const tableName = req.params.table || '';
  const { db } = res;

  printlog('GET /admin/drop/:table', 'route');

  db.dropTable(tableName).catch((err) => {
    printlog(err, 'error');
    res.render('signup', {
      err: err
    });
  });
});

router.get('/', (req, res) => {
  const { db } = res;
  printlog('GET /admin', 'route');

  if (process.env.MD === 'true') {
    res.render('admin', {
      rows: [
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
      ]
    });
  }

  db.getTable('users')
    .then((rows) => {
      let i;
      let len;
      // I don't like looping through records here :(
      for (i = 0, len = rows.length; i < len; i++) {
        // Stackoverflow - http://stackoverflow.com/questions/11124322/get-date-time-for-a-specific-time-zone-using-javascript
        let offset = new Date().getTimezoneOffset() / -60;
        let unixval = parseInt(rows[i].lastlogin, 10);
        let today = new Date(unixval + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" );

        rows[i].lastlogin = today.toString();
      }

      res.render('admin', {rows: rows});
    })
    .catch((err) => {
      printlog('getTable() error ---> ' + err, 'error');
    });
});

export default router;

