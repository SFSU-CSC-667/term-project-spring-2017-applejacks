var pg        = require('pg'),
  url         = require('url'),
// var Promise = require("bluebird"); // clean up other `async` libraries
  printlog    = require('./helpers').printlog,
  pgp         = require('pg-promise')(),

  db = {
    _datab: null,

    init: function () {
      // create instance of db, one per application      
      this._datab = this._datab || pgp(this._getConfig());      
    },

    _getConfig: function () {
      var str = process.env.DATABASE_URL || '';

      if (str) {
        var params = url.parse(str);
        var auth = params.auth.split(':');

        return {
          user: auth[0],
          password: auth[1],
          host: params.hostname,
          port: params.port,
          database: params.pathname.split('/')[1],
          ssl: true
        };
      } else {
        return {
          // user: auth[0],
          // password: auth[1],
          host: 'localhost',
          port: 5432,
          database: 'sambecker'
        };
      }
    },

    createTable: function (tableSchema) {
      this._pool = this._pool || this._createPool();

      // pg.defaults.ssl = true;
      this._pool.connect(function (err, client) {
        if (err) {
          throw err;
        }

        printlog('Connected to postgres! Creating new table... [' + tableSchema.name + ']');

        var query = client.query(
          'CREATE TABLE ' + tableSchema.name + '(' +
            'email VARCHAR(60) PRIMARY KEY UNIQUE,' +
            'password VARCHAR(100) not null,' +
            'lastLogin BIGSERIAL,' +
            'isAdmin BOOLEAN)'
        );

        query.on('end', function () { client.end(); });
        // after the above two comamnds, `sambecker-# \d items` will display the created table
      });
    },

    dropTable: function (tableName) {     
      if (tableName.indexOf(',') !== -1) {
        return;
      }

      return this._datab.none('drop table $1', [tableName]);
    },

    getTable: function (tableName) {           
      return this._datab.any('select * from ' + tableName);
    },

    addUser: function (data) {           
      printlog('Connected to postgres! Inserting user... ['+ data.email +']');
      return this._datab.tx(function (t) {
        // batch queries
        var q1 = t.none('SELECT * FROM ' + data.table + ' WHERE email=$1', [data.email]),
          q2 = t.any('INSERT INTO ' + data.table +'(${this~}) VALUES(${email},${password},${lastlogin},${isadmin})', {
          email: data.email,
          password: data.hash || '',
          lastlogin: Date.now(),
          isadmin: data.isAdmin
        });
     
        // will successfully resolve if each query resolves in succession
        // all of the queries are to be resolved; 
        return t.batch([q1, q2]); 
      });              
    },

    deleteUser: function (data) {
      printlog('Connected to postgres! Removing user... ['+ data.email +']');
      return this._datab.tx(function (t) {
        // batch queries
        var q1 = t.one('SELECT * FROM ' + data.table + ' WHERE email=$1', [data.email]),
          q2 = t.none('DELETE FROM ' + data.table + ' WHERE email=$1', [data.email]);
    
        // will successfully resolve if each query resolves in succession
        // all of the queries are to be resolved; 
        return t.batch([q1,q2]); 
      });  
    }
  };

db.init();

module.exports.db = db;
