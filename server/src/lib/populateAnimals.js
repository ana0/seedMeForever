const db = require('../connections/sqlite')

const createAnimals = async () => {
  db.run("INSERT INTO users(username, password) VALUES (?, ?)", ['admin', pass], (err) => {
    if (err) throw err;
    console.log('saved admin')
  });
}

module.exports = { createAnimals }