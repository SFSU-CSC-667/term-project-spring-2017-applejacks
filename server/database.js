var pg        = require('pg'),
  url         = require('url'),
// var Promise = require("bluebird"); // clean up other `async` libraries
  printlog    = require('./helpers').printlog,
  pgp         = require('pg-promise')(),


  db = {
    _pool: null,

    init: function () {
      this._pool = this._pool || this._createPool();

      // pg.defaults.ssl = true;
      this._pool.connect(function (err, client) {
        if (err) {
          throw err;
        }

        printlog('Connected to postgres! Getting schemas...');

        var query = client.query(
          'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');

        query.on('end', function () { client.end(); });
        // after the above two comamnds, `sambecker-# \d items` will display the created table

        client
          .query('SELECT table_schema,table_name FROM information_schema.tables;')
          .on('row', function (row) {
            printlog(JSON.stringify(row));
          });
      });
    },

    _createPool: function () {
      var str = process.env.DATABASE_URL || '';

      if (str) {
        var params = url.parse(str);
        var auth = params.auth.split(':');

        var config = {
          user: auth[0],
          password: auth[1],
          host: params.hostname,
          port: params.port,
          database: params.pathname.split('/')[1],
          ssl: true
        };

        this._pool = new pg.Pool(config);
      } else {
        this._pool = new pg.Pool({
          // user: auth[0],
          // password: auth[1],
          host: 'localhost',
          port: 5432,
          database: 'sambecker'
        });
      }

      return this._pool;
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
            'password VARCHAR(40) not null,' +
            'lastLogin BIGSERIAL,' +
            'isAdmin BOOLEAN)'
        );

        query.on('end', function () { client.end(); });
        // after the above two comamnds, `sambecker-# \d items` will display the created table
      });
    },

    getTable: function (tableName) {
      // var promise = new Promise();

      // this._pool = this._pool || this._createPool();
      // // pg.defaults.ssl = true;
      // this._pool.connect(function(err, client, done) {
      //   if (err) throw err;
      //   printlog('Connected to postgres! Fetching table... ['+ tableName +']');

      //    var query = client
      //     .query("select * from " + tableName + ";", function (err, result) {
      //       printlog('RESULTS of select * ---> ' + result);
      //       promise.resolve(result.rows[0]);
      //     });
      // }); // connection end

      // return promise;
      if (!this.datab) {
        var config = this._getConfig();
        this.datab = pgp(config);
      }

      return this.datab.any("select * from users;");
    },

    addUser: function (data) {
      this._pool = this._pool || this._createPool();
      // pg.defaults.ssl = true;
      this._pool.connect(function (err, client, done) {
        if (err) {
          throw err;
        }

        printlog('Connected to postgres! Inserting user... ['+ data.email +']');

         var q = client
          // .query("SELECT * from users where email = '" + data.email + "';")
          .query("select count(*) from users where email='tester123@test';", function (err, result) {
            recordExists = result.rows[0].count === 1;

            if (recordExists) {
              return false;
            } else {
              var queryString = 'INSERT INTO ' + data.table + '(email, password, lastLogin, isAdmin) values($1, $2, $3, $4)',
                query = client.query(queryString, [data.email, data.password, Date.now(), data.isAdmin]);
            }
          });
      }); // connection end
    },

    deleteUser: function (email) {

    }
  };

module.exports.db = db;
