const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
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

client.connect((err) => {
  console.log('searching...');
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("select * from famous_people where first_name = $1::text or last_name = $1::text", [name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    printFound(result.rows);
    printPerson(result.rows);
    client.end();
  });
});