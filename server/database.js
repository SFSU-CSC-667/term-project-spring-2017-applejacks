var pg        = require('pg'),
  url         = require('url'),
  printlog    = require('./helpers').printlog,
  pgp         = require('pg-promise')(),

  db = {
    // instance of the pg-promise library object
    _datab: null,

    // has a successful connection been made with postgres db
    _dbAlive: false,

    // add your own local postgres db name here
    _localDbName: 'sambecker', 

    init: function () {
      // create instance of db, one per application      
      this._datab = this._datab || pgp(this._getConfig());  
      this._dbAlive = this._datab.constructor.name === 'Database' ? true : false;
      
      if (this._dbAlive) {
        printlog( ('Connected to postgres table ' + this._getDbName()) );
      } else {
        printlog('Failed to connect to db!');
      }
    },

    _getDbName: function () {
      var str = process.env.DATABASE_URL || '',
        params = url.parse(str) || {};
      
      // es6 syntax for simplicity
      return params.pathname ? params.pathname.split('/')[1] : `[${this._localDbName}]`;
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
          host: 'localhost',
          port: 5432,
          database: this._localDbName
        };
      }
    },

    createTable: function (tableSchema) {      
      printlog('Attempting create table... [' + tableSchema.name + ']');        

      // `postgresdb-# \d <name>` will display the created table
      return this._datab.none('CREATE TABLE ' + tableSchema.name + '(' +
          'email VARCHAR(60) PRIMARY KEY UNIQUE,' +
          'password VARCHAR(100) not null,' +
          'lastlogin BIGSERIAL,' +
          'isadmin BOOLEAN)'
      );        
    },

    dropTable: function (tableName) {           
      // trying to prevent malicious attacks by not allowing ';drop table <name>;'
      if (~tableName.indexOf(';')) {
        return;
      }

      printlog('Attempting drop table... ['+ tableName +']');        
      return this._datab.none('drop table ' + tableName);
    },

    getTable: function (tableName) {   
      printlog('Attempting get table... ['+ tableName +']');        
      return this._datab.any('select * from ' + tableName);
    },

    /**
     * Adding user to database

     * @param {String} data.table - table name
     * @param {String} data.email - unique email
     * @param {String} data.hash - hashed password created in routing controller
     * @param {Boolean} data.isadmin - is the user an admin
     */
    addUser: function (data) {           
      printlog('Attempting insert user... ['+ data.email +']');
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
        return t.batch([q1, q2]); 
      });              
    },

    updateUser: function (options) {
      printlog('Attempting update user... ['+ options.email +']');
      return this._datab.tx(function (t) {
        // batch queries
        var q1 = t.one('SELECT * FROM ' + data.table + ' WHERE email=$1', [data.email]),
          q2 = t.none('DELETE FROM ' + data.table + ' WHERE email=$1', [data.email]);
    
        // will successfully resolve if each query resolves in succession        
        return t.batch([q1,q2]); 
      });  
    },

    deleteUser: function (data) {
      printlog('Attempting remove user... ['+ data.email +']');
      return this._datab.tx(function (t) {
        // batch queries
        var q1 = t.one('SELECT * FROM ' + data.table + ' WHERE email=$1', [data.email]),
          q2 = t.none('DELETE FROM ' + data.table + ' WHERE email=$1', [data.email]);
    
        // will successfully resolve if each query resolves in succession        
        return t.batch([q1,q2]); 
      });  
    }
  };

// create database instance
// setup any configs
db.init();

module.exports.db = db;
