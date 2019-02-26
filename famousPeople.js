const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client(settings);

const name = process.argv[2];
const select = `SELECT * FROM famous_people WHERE (first_name='${name}') OR (last_name='${name}')`;

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(select, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    
    lookUpFamousPeople(result.rows);
     client.end();
  });
});

function lookUpFamousPeople(arrayOfFamousPeople) {
    arrayOfFamousPeople.forEach((person, index) => {
        console.log(`Searching...`);
        console.log(`Found ${arrayOfFamousPeople.length} person(s) by the name ${person.first_name}`)
        console.log(`- ${index + 1}: ${person.first_name} ${person.last_name}, born ${person.birthdate.toISOString().substring(0, 10)}`);
    })
}