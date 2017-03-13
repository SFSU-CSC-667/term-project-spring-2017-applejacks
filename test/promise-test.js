var db = require('./../server/database').db,
  should = require('chai').should(),
  // test vars
  TEST_TABLE = 'testtable';

before(function () {
  return db.init().then(function () {
    return db.createTable({
      ifNotExists: true,
      tableName: TEST_TABLE,
      uniqueId: false,
      columns: ['email', 'password', 'lastlogin', 'isadmin'],
      types: ['vc-60 u nn pk', 'vc-100 nn', 'bs', 'bool']
    });
  });
});

describe('#addUser()', function () {
  it('add new user to database', function () {
    db.addUser({
      tableName: 'testtable',
      columns: ['email','password','lastlogin','isadmin'],
      values: ['tester@gmail.com', 'hash123', 1489039539666, false],
      key: 'email',
      keyval: 'tester@gmail.com'
    }).should.be.fulfilled;
  });
});

after(function () {
  return db.dropTable(TEST_TABLE);
});