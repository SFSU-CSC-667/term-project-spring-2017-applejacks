var db = require('./../server/database').db,
  should = require('chai').should(),
  // test vars
  TEST_TABLE = 'testtable';

before(function() {
  return db.createTable({name:TEST_TABLE});
});

describe('#addUser()', function() {
  it('add new user to database', function() {
    db.addUser({
      table: 'testtable',
      columns: ['email','password','lastlogin','isadmin'],
      values: ['tester@gmail.com', 'hash123', 1489039539666, false],
      key: 'email',
      keyval: 'tester@gmail.com'
    }).should.be.fulfilled;    
  });
});

after(function() {
  return db.dropTable(TEST_TABLE);
});