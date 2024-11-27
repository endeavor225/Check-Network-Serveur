const knex = require('knex');

module.exports = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: '5432',
    user: 'dronehive',
    password: '_8!mPf53Zy>9',
    database: 'front'
  },
});
