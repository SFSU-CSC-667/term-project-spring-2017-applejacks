## How to run the app

1. `git clone https://github.com/SFSU-CSC-667/term-project-spring-2017-applejacks.git`
2. `cd term-project-spring-2017-applejacks`
3. `npm install`
4. `node server.js`
5. visit [localhost:3000](http://localhost:3000/)

### Markdown formatting and syntax
https://help.github.com/articles/basic-writing-and-formatting-syntax/

View the live heroku site [here](https://applejacks.herokuapp.com)

### How to install local Postgres
1. http://postgresapp.com/
    - install on website
    - move to apps folder
    - double click
    - run this command `sudo mkdir -p /etc/paths.d && echo /Applications/Postgres.app/Contents/Versions/latest/bin | sudo tee /etc/paths.d/postgresapp` and then restart your Terminal application. Upon restarting, `psql` command should be available.

2. Heroku postgres [here](https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js)

3. Testing local postgres - [blog post](http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/#.WL0PvBLyuHo)
    - open up 3 terminal windows (1. server, 2. postgres, 3. used for `curl` commands)
    - `curl --data "email=tester@test&pwd=123" http://127.0.0.1:3000/login;`
    - `select * from users;` to test newly added addition into table
    - `drop table users;` to remove table
