const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database(':memory', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to sqlite database.');
});
 
db.serialize(async () => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY ASC, username TEXT, password TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS animals (id INTEGER PRIMARY KEY ASC, name TEXT)");
  // db.run("CREATE TABLE IF NOT EXISTS edges " +
  // 	"(id INTEGER PRIMARY KEY ASC, fromId INT, toId INT," +
  // 	"FOREIGN KEY(fromId) REFERENCES nodes(id), FOREIGN KEY(toId) REFERENCES nodes(id))");
  // db.run("CREATE UNIQUE INDEX unique_edge ON edges(toId, fromId);");
});

module.exports = db