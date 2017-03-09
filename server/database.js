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
      var str = process.env.DATABASE_URL || '',
        params = {},
        auth = [];

      if (str) {
        params = url.parse(str);
        auth = params.auth.split(':');

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
      var queryString = `drop table ${tableName}`;
      // trying to prevent malicious attacks by not allowing ';drop table <name>;'
      if (~tableName.indexOf(';')) {
        return;
      }

      printlog('Attempting drop table... ['+ tableName +']');
      printlog(queryString, 'db');    

      return this._datab.none(queryString);
    },

    getTable: function (tableName) {   
      var queryString = `select * from ${tableName}`;
      
      printlog('Attempting get table... ['+ tableName +']');  
      printlog(queryString, 'db');      
      
      return this._datab.any(queryString);
    },


    _buildInsertQuery: (data) => {
      if (!data) {
        printlog('Error: buildInsert() empty data {}', 'error');
        return '';
      }

      if (!data.table) {
        printlog('Error: buildInsert() no table name', 'error');
        return '';
      }
      
      if (!data.columns) {
        printlog('Error: buildInsert() empty columns []', 'error');
        return '';
      }

      if (!data.values) {
        printlog('Error: buildInsert() empty values []', 'error');
        return '';
      }
      
      let columnString = '(' + data.columns.join(',') + ')';
      let valueString = data.values.reduce(
      (accumulator, currObj, currentIndex, array) => {
        let str = '',
          type = typeof(currObj); 
          console.log(type);
        if (type === 'object') {
          if (currObj.type === 'postgres') {
            str = `${currObj.value}`;
          } else if (currObj.type === 'string') {
            str = `'${currObj.value}'`;
          } else if (currObj.type === 'number' || currObj.type === 'boolean') {
            str = currObj.value;
          }
        } else {
          if (type === 'string') {
            str = `'${currObj}'`;
          } else if (type === 'number' || type === 'boolean') {
            str = currObj;
          } 
        }      
        
        if (currentIndex < array.length - 1) {
          str += ',';
        } else {
          str += ')';
        }
        
        return accumulator + str;
      }, '(');
      let baseStr = `INSERT INTO ${data.table} ${columnString} VALUES ${valueString}`;
            
      return baseStr;
    },


    /**
     * Adding user to database
     * INSERT INTO users (email,password,lastlogin,isadmin) VALUES 
     *   ('testemail@gmail','$2a$08$sKQtgvGw3a8SujWUXqUFduesv',1489028533344,false)
     *
     * @param {String} data.table - table name
     * @param {Array} data.values - array of values
     * @param {Array} data.columns - the table columns the values will map to
     * @param {String} data.key - the column name that the INSERT is based on
     * @param {String} data.keyval - the value used to determine if record exists
     */
    addUser: function (data) {           
      printlog('Attempting insert user... ['+ data.key +']');

      return this._datab.tx(function (t) {
        var q2Str = this._buildInsertQuery({
          table: data.table,
          columns: data.columns,
          values: data.values
        }),
          q1Str = `SELECT * FROM ${data.table} WHERE ${data.key}='${data.keyval}'`,               
          q1 = t.none(q1Str),
          q2 = t.any(q2Str);

        printlog(q1Str, 'db');
        printlog(q2Str, 'db');
     
        // will successfully resolve if each query resolves in succession        
        return t.batch([q1, q2]); 
      }.bind(this));              
    },
    
    updateUser: function (data) {
      printlog('Attempting update user... ['+ data.oldval +']');

      return this._datab.tx(function (t) {
        // batch queries
        var q1Str = `SELECT * FROM ${data.table} WHERE ${data.col}='${data.oldval}'`,         
          q2Str = `UPDATE ${data.table} set ${data.col}='${data.newval}' where ${data.col}='${data.oldval}'`,          
          q1 = t.one(q1Str),
          q2 = t.none(q2Str);
    
        printlog(q1Str, 'db');
        printlog(q2Str, 'db');

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
