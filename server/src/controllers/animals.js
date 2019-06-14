const db = require('../connections/sqlite')

const readAnimals = (req, res, admin)  => {
  db.get('SELECT COALESCE(MAX(id)+1, 0) AS count FROM animals', function(err, result) {
  	if (err) throw err;
    console.log(result.count)
    const rand = Math.floor(Math.random() * (result.count - 1 + 1)) + 1;
    db.get(`SELECT name FROM animals WHERE id == ${rand}`, function(err, animal) {
      if (err) throw err;
      res.status(200).json(animal)
    })
  })
  //res.status(200).json('Unimplemented Animals endpoint')
}

const createAnimal = (req, res) => {
  if (!req.file) throw new Error('Must have animal file!')
  res.status(200).json('Unimplemented Animals endpoint')
}

const updateAnimals = (req, res)  => {
	res.status(200).json('Unimplemented Animals endpoint')
}

const deleteAnimals = (req, res)  => {
	res.status(200).json('Unimplemented Animals endpoint')
}

module.exports = {
  readAnimals,
  createAnimal,
  updateAnimals,
  deleteAnimals
}