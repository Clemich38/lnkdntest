# LinkedIn test

# Web Application managing a list of notes

Using:
Node.js, Express, AngularJS, Bootstrap, PostgreSQL

Also used:
 - ORM: knex
 - Task runner: Gulp
 - Middleware authentication handling: Passport.js
 - Test Framework (Server): Mocha + Should.js


# To run the project

 - Clone repository
 - Install dependencies - `npm install`
 - Add a *.env* file
 - Create two local Postgres databases - `lnkdntest_db` and `lnkdntest_db_test`
 - Migrate - `knex migrate:latest --env development`
 - Seed - `knex seed:run --env development`
 - Run the development server - `gulp`
 - Test - `npm test`


# Not implemented yet

 - Server tests not fully implemented (notesController.js)
 - Client tests not implemented
