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

const name = process.argv.slice(2).join();
const printFound = (people) => {
  console.log(`Found ${people.length} person(s) by the name '${name}':`);
};
const printPerson = (people) => {
  people.forEach((person) => {
    console.log(`- ${person.id}: ${person.first_name} ${person.last_name}, born ${person.birthdate.toString().slice(4, 15)}`);
  });
};

knex.select().from('famous_people')
  .where('first_name', name)
  .orWhere('last_name', name)
  .asCallback(function(err, rows) {
    if (err) {
      return console.error(err);
    }
    printFound(rows);
    printPerson(rows);
  }).then(() => {
    knex.destroy();
  });