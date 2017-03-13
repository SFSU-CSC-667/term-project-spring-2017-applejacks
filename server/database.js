var url       = require('url'),
  printlog    = require('./helpers').printlog,
  pgp         = require('pg-promise')(),

  db = {
    // instance of the pg-promise library object
    _datab: null,

    // has a successful connection been made with postgres db
    _dbConnected: false,

    // This gets set in the init() after postgres looks for a database to connect with
    _localDbName: null,

    init: function () {
      // create instance of db, one per application
      this._datab = this._datab || pgp(this._getConfig());
      return this._datab.connect()
        .then(obj => {
            printlog('Connected to database [' + obj.client.database + ']');
            this._dbConnected = true;
            this._localDbName = obj.client.database;
            // release connection
            return obj.done();
        })
        .catch(error => {
          printlog('Failed to connect to database', 'error');
          printlog(error, 'error');
        })
      ;
    },

    _getDbName: function () {
      var str = process.env.DATABASE_URL || '',
        params = url.parse(str) || {};

      // es6 syntax for simplicity
      return params.pathname ? `[${params.pathname.split('/')[1]}]` : `[${this._localDbName}]`;
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
      }

      // See documentation for default values
      // https://github.com/brianc/node-postgres/wiki/Client
      return {};
    },

    createTable: function (data) {
      data = data || {};
      printlog('Attempting create table... [' + data.tableName + ']');

      // `postgresdb-# \d <name>` will display the created table
      const query = this._buildCreateQuery(data);

      printlog(query, 'db');
      return this._datab.none(query);
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

    /**
     * Create CREATE query string
     * CREATE TABLE IF NOT EXISTS users (
     *   email VARCHAR(60) UNIQUE NOT NULL,
     *   password VARCHAR(100) NOT NULL,
     *   lastlogin BIGSERIAL,
     *   isadmin BOOLEAN)
     *
     * @param {String} data.tableName - table name
     * @param {Boolean} data.ifNotExists - Whether or not to add 'IF NOT EXISTS' to query
     * @param {Array} data.types - the Postgres type corresponding to each column name
     * @param {Array} data.columns - the table columns
     * @param {Boolean} data.uniqueId - whether or not to create a table column "id" that is the primary key
     */
    _buildCreateQuery: (data) => {
      let query = `CREATE TABLE ${data.ifNotExists ? 'IF NOT EXISTS ' : ''}`;
      let i = 0;
      let len = 0;
      let val = [];

      const typeMappings = {
        bool: 'BOOLEAN',
        money: 'MONEY',
        date: 'DATE',
        varchar: (n) => `VARCHAR(${n.split('-')[1]})`,
        pk: 'PRIMARY KEY',
        u: 'UNIQUE',
        nn: 'NOT NULL',
        int: 'INTEGER',
        bs: 'BIGSERIAL'
      };

      const parseVal = (typeString) => {
        let values = typeString.split(' ');
        let pgValues = [];

        pgValues = values.map((val, i) => {
          if (~val.indexOf('-')) {
            return typeMappings.varchar(val);
          }

          if (val === 'pk' && data.uniqueId) {
            return;
          }

          return typeMappings.hasOwnProperty(val) ? typeMappings[val] : 'ERROR';
        });

        return pgValues.join(' ');
      };

      query += `${data.tableName} (${data.uniqueId ? 'id SERIAL PRIMARY KEY,' : ''}`;
      val = data.columns.map((val, i, columns) => {
        return val + ' ' + parseVal(data.types[i]);
      });

      return query + `${val})`;
    },

    /**
     * Create INSERT query string
     * INSERT INTO users (email,password,lastlogin,isadmin) VALUES
     *   ('testemail@gmail','$2a$08$sKQtgvGw3a8SujWUXqUFduesv',1489028533344,false)
     *
     * @param {String} data.table - table name
     * @param {Array} data.values - array of values
     * @param {Array} data.columns - the table columns the values will map to
     * @param {String} data.key - the unique column name
     */
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

    addUser: function (data) {
      printlog('Attempting insert user... ['+ data.key +']');

      return this._datab.tx(function (t) {
        var q2Str = this._buildInsertQuery({
          table: data.table,
          columns: data.columns,
          values: data.values
        }),
        q1Str, q1, q2;

        data.keyval = data.values[data.columns.indexOf(data.key)];
        q1Str = `SELECT * FROM ${data.table} WHERE ${data.key}='${data.keyval}'`;
        q1 = t.none(q1Str);
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

module.exports.db = db;
