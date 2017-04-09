## `applejacks`

A multiplayer blackjack game with an integrated chat system.
**View the live heroku site** [here](https://applejacks.herokuapp.com)

[![JavaScript Style Guide: Good Parts](https://img.shields.io/badge/code%20style-goodparts-brightgreen.svg?style=flat)](https://github.com/SFSU-CSC-667/term-project-spring-2017-applejacks "applejacks - blackjack game")
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/SFSU-CSC-667/term-project-spring-2017-applejacks/issues)
[![codecov](https://codecov.io/gh/SFSU-CSC-667/term-project-spring-2017-applejacks/branch/master/graph/badge.svg)](https://codecov.io/gh/SFSU-CSC-667/term-project-spring-2017-applejacks)

### Tasks and Issues

- [x] Automated dev server redeployment
- [x] README docs
- [x] Basic nav
- [x] Deployment and hosting to production environment (Heroku)
- [x] Integration with Postgres (local and prod)
- [ ] Finish database API
- [ ] Create user sessions based on login credentials
- [ ] Create signup flow
- [ ] Asset compilation and page speed
- [ ] Asset bundling
- [ ] Add --mockdata as a flag during build for people who have no DB connection
- [ ] Open database api to admin user for easier db testing
- [ ] Set up basic socket.io framework for chat
- [ ] Add middleware for handling HTTP response codes (500, 404, etc)
- [ ] Helper functions
- [ ] Clean up Routing structure

### How to run the app

1. `git clone https://github.com/SFSU-CSC-667/term-project-spring-2017-applejacks.git`
2. `cd term-project-spring-2017-applejacks`
3. `npm install yarn`
4. `yarn` or `yarn install`
5. `yarn run app #this will listen for server changes and redeploy`
6. visit [localhost:3000](http://localhost:3000/)
