const session = require('express-session');

function SessionAuthentication (options) {
  // run this query if getting "relation does not exist" error
  // CREATE TABLE "session" (
  //   "sid" varchar NOT NULL COLLATE "default",
  //   "sess" json NOT NULL,
  //   "expire" timestamp(6) NOT NULL
  // )
  // WITH (OIDS=FALSE);
  // ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;


}

SessionAuthentication.prototype.newSession = (options) => {
  options.app.use(session({
    name: 'null',
    store: new (require('connect-pg-simple')(session))(),
    secret: 'some other secret',
    resave: false,
    // tableName : 'sessions',
    // schemaName: 'sambecker',
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
  }));
};

module.exports = SessionAuthentication;