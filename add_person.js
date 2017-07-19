const settings = require("./settings");
const knex = require('knex')({
  client: 'pg',
  version: '9.5.2',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
});

const newPerson = process.argv.slice(2);

knex.insert({
  first_name: newPerson[0],
  last_name: newPerson[1],
  birthdate: newPerson[2]
}).into('famous_people')
  .then(() => {
    console.log(`Thanks for adding ${newPerson[0]} ${newPerson[1]} to the database.`)
  })
  .finally(() => {
    knex.destroy();
  });