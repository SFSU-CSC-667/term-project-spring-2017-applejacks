### How to run the app

1. `git clone https://github.com/SFSU-CSC-667/term-project-spring-2017-applejacks.git`
2. `cd term-project-spring-2017-applejacks`
3. `npm install yarn`
4. `yarn` or `yarn install`
5. `yarn run app #this will listen for server changes and redeploy`
6. visit [localhost:3000](http://localhost:3000/)

### Upgrading to latest version of Node via NPM
https://davidwalsh.name/upgrade-nodejs

### Markdown formatting, syntax, editor
- https://help.github.com/articles/basic-writing-and-formatting-syntax/
- https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
- https://stackedit.io/editor
- https://daringfireball.net/projects/markdown/syntax
- http://dillinger.io/


### How to install local Postgres
- **For Ubuntu  - https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-14-04**
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

### How to install "hub" - needed for pull requests
https://github.com/github/hub

## Git flow
#### Formatting commit messages
`[feature|architecture|bug|docs]["name_of_feature"] - short description of the change you made`
**Example:** `git commit -m "[feature][chatSystem] - added basic socket.io publish and subscribing"`

Get the latest code
```
git checkout master
git pull
```

Creating a feature branch (needed for pull request)
```
git checkout -b feature-1
git add .
git commit -m "this is a commit message"
```

I want to create a pull request. What to do?
```
git checkout master
git pull
git checkout feature-1
git rebase master
git push origin feature-1
hub pull-request
```

Remove feature branch after PR has been reviewed and merged
```
git checkout master
git pull
git branch -D feature-1
```

Small fix, no need for PR
```
## follow "feature branch" steps
git checkout master
git merge --squash <branch name>
```
