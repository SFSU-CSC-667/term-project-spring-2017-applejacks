import db from './../database/database';
import chai from 'chai';

const should = chai.should();
// test vars
const TEST_TABLE = 'testtable';

before(() => {
  return db.init().then(() => {
    return db.createTable({
      ifNotExists: true,
      tableName: TEST_TABLE,
      uniqueId: false,
      columns: ['email', 'password', 'lastlogin', 'isadmin'],
      types: ['vc-60 u nn pk', 'vc-100 nn', 'bs', 'bool']
    });
  });
});

describe('#addUser()', () => {
  // Testing addUser() function
  it('add new user to database', () => {
    db.addUser({
      tableName: 'testtable',
      columns: ['email','password','lastlogin','isadmin'],
      values: ['tester@gmail.com', 'hash123', 1489039539666, false],
      key: 'email'
    }).should.be.fulfilled;
  });

  // Testing updateUser() function
  it('Update existing user in database', () => {
    db.updateUser({
      tableName: 'testtable',
      col: 'email',
      oldval: 'tester@gmail.com',
      newval: 'updatedemail@gmail.com'
    }).should.be.fulfilled;
  });
});

after(() => db.dropTable(TEST_TABLE));