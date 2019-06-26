const db = require('../connections/sqlite')
const ipfs = require('./ipfs')

const saveArchive = (req, res) => {
  return new Promise(async (resolve, reject) => {
    if (!req.file) return reject(new Error('Must have animal file!'))
    let hash = null;
    try {
      hash = await ipfs.pin(req.file)
    } catch (err) {
      console.log(err)
    }
    db.get(`SELECT id, name, archiveId FROM animals WHERE id == ${req.params.id} AND archiveId IS NULL`, function(err, result) {
      if (err) return reject(err)
      if (!result) return reject(new Error('Animal is already registered or invalid!'))
      db.run("INSERT INTO archive(scientificName, name, filename, hash) VALUES (?, ?, ?, ?)",
        [req.body.scientificName, req.body.humanName, req.file.filename, hash], function(err) {
          if (err) return reject(err)
          db.run(`UPDATE animals SET archiveId = ${this.lastID} WHERE id = ${req.params.id};`, function(err) {
            if (err) return reject(err)
            return resolve({ msg: 'Uploaded animal file', id: this.lastID });
          })
        })
    })
  })
}

module.exports = { saveArchive }