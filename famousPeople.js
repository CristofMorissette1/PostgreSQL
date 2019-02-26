const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client(settings);

const name = process.argv[2];


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * 
                FROM famous_people 
                WHERE (first_name='${name}') OR (last_name='${name}')`, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Searching...`);
    console.log(`Found this result`);
    console.log(result.rows); 
    client.end();
  });
});