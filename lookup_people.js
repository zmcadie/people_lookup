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

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("select * from famous_people where first_name = $1::text or last_name = $1::text", [name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows[0].first_name); //output: 1
    client.end();
  });
});